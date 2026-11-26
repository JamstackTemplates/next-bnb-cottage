import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { breakfastSections, validateBreakfast } from '../content/breakfast.ts';
import { business } from '../content/business.ts';
import { houseRuleNotes, houseRules, validateHouseRules } from '../content/house-rules.ts';
import { guidePlaces, validateLocalGuide } from '../content/local-guide.ts';
import { roomImagePaths, roomPriceRange, rooms, validateRooms } from '../content/rooms.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

const ROOT = fileURLToPath(new URL('../', import.meta.url));

function collectFiles(dir: string, ext: RegExp): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) results.push(...collectFiles(full, ext));
    else if (ext.test(entry.name)) results.push(full);
  }
  return results;
}

test('business content has actionable required fields', () => {
  for (const key of ['name', 'tagline', 'introduction', 'email', 'phone'] as const) {
    assert.ok(business[key].trim(), `business.${key}: required`);
  }
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.ok(business.enquiries.title.trim(), 'business.enquiries.title: required');
  assert.ok(business.enquiries.introduction.trim(), 'business.enquiries.introduction: required');
  assert.match(
    business.enquiries.introduction,
    /confirmed in writing/i,
    'enquiry copy must state rooms are only booked once confirmed in writing',
  );
  assert.ok(business.enquiries.usefulToInclude.length >= 6);
  for (const tip of business.enquiries.usefulToInclude) {
    assert.ok(tip.trim(), 'business.enquiries.usefulToInclude: empty tip');
  }
});

test('rooms data validates and errors name the room ID', () => {
  assert.doesNotThrow(() => validateRooms(rooms));
  assert.equal(roomPriceRange(rooms), '£115–£165');

  assert.throws(
    () => validateRooms(rooms.map((r) => (r.id === 'orchard' ? { ...r, sleeps: 6 } : r))),
    /orchard/,
  );
  assert.throws(
    () => validateRooms(rooms.map((r) => (r.id === 'dovecote' ? { ...r, pricePerNightGBP: 25 } : r))),
    /dovecote/,
  );
  assert.throws(
    () => validateRooms(rooms.map((r) => (r.id === 'honeysuckle' ? { ...r, features: [] } : r))),
    /honeysuckle/,
  );
  assert.throws(() => validateRooms([...rooms, rooms[0]]), /honeysuckle/);
});

test('every room has light and dark window illustrations in public/rooms', () => {
  for (const room of rooms) {
    for (const path of Object.values(roomImagePaths(room.id))) {
      assert.ok(existsSync(join(ROOT, 'public', path)), `rooms[${room.id}]: missing public${path}`);
    }
  }
});

test('breakfast menu validates and errors name the item or section ID', () => {
  assert.doesNotThrow(() => validateBreakfast(breakfastSections));
  const pancakes = breakfastSections
    .flatMap((s) => s.items)
    .find((item) => item.id === 'pancakes');
  assert.ok(pancakes && pancakes.available === false, 'pancakes sample should be out of season');

  assert.throws(
    () =>
      validateBreakfast(
        breakfastSections.map((s) => ({
          ...s,
          items: s.items.map((item) =>
            item.id === 'smoked-trout' ? { ...item, supplementGBP: 20 } : item,
          ),
        })),
      ),
    /smoked-trout/,
  );
  assert.throws(
    () =>
      validateBreakfast(
        breakfastSections.map((s) => ({
          ...s,
          items: s.items.map((item) =>
            item.id === 'granola' ? { ...item, dietary: ['dairy-free' as never] } : item,
          ),
        })),
      ),
    /granola/,
  );
  assert.throws(
    () =>
      validateBreakfast(
        breakfastSections.map((s) =>
          s.id === 'to-drink'
            ? { ...s, items: s.items.map((item) => ({ ...item, available: false })) }
            : s,
        ),
      ),
    /to-drink/,
  );
});

test('local guide validates pins, coordinates, distances and categories', () => {
  assert.doesNotThrow(() => validateLocalGuide(guidePlaces));
  assert.throws(
    () =>
      validateLocalGuide(
        guidePlaces.map((p) => (p.id === 'arlington-row' ? { ...p, mapPin: 99 } : p)),
      ),
    /consecutive/,
  );
  assert.throws(
    () =>
      validateLocalGuide(
        guidePlaces.map((p) => (p.id === 'rack-isle' ? { ...p, mapX: 120 } : p)),
      ),
    /rack-isle/,
  );
  // A walk added without map coordinates would have no pin on the painted map.
  assert.throws(
    () =>
      validateLocalGuide(
        guidePlaces.map((p) => (p.id === 'ablington' ? { ...p, mapX: undefined } : p)),
      ),
    /ablington.*required for on-foot/,
  );
  // Drive destinations sit off the map, so they need no coordinates.
  assert.ok(guidePlaces.some((p) => p.travel === 'drive' && p.mapX === undefined));
  assert.throws(
    () =>
      validateLocalGuide(
        guidePlaces.map((p) => (p.id === 'rack-isle' ? { ...p, mapLabel: '  ' } : p)),
      ),
    /rack-isle.*mapLabel/,
  );
  assert.throws(
    () =>
      validateLocalGuide(
        guidePlaces.map((p) => (p.id === 'cirencester' ? { ...p, distanceMiles: 40 } : p)),
      ),
    /cirencester/,
  );
});

test('house rules validate and reference single-source check-in and check-out times', () => {
  assert.doesNotThrow(() => validateHouseRules(houseRules));
  const combined = houseRules.map((r) => `${r.title} ${r.detail}`).join(' ');
  assert.ok(combined.includes(business.times.checkIn), 'rules must include check-in time from business.ts');
  assert.ok(combined.includes(business.times.checkOut), 'rules must include check-out time from business.ts');

  const notesText = houseRuleNotes.map((n) => `${n.heading} ${n.body}`).join(' ');
  assert.match(notesText, /dog/i);
  assert.match(notesText, /children/i);

  assert.throws(
    () =>
      validateHouseRules(
        houseRules.map((r) => (r.id === 'keys' ? { ...r, stitch: 'lantern' as never } : r)),
      ),
    /keys/,
  );
});

test('BedAndBreakfast JSON-LD derives from content and escapes closing script tags', () => {
  const schema = businessStructuredData();
  assert.equal(schema['@type'], 'BedAndBreakfast');
  assert.equal(schema.name, business.name);
  assert.equal(schema.email, business.email);
  assert.equal(schema.telephone, business.phoneSchema);
  assert.equal(schema.checkinTime, business.times.checkIn);
  assert.equal(schema.checkoutTime, business.times.checkOut);
  assert.equal(schema.priceRange, roomPriceRange(rooms));
  assert.equal(schema.petsAllowed, true);
  assert.equal(schema.address.postalCode, 'GL7 5NJ');
  assert.ok(schema.amenityFeature.length >= 7);

  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});

test('page copy and content forbid instant-booking and payment claims', () => {
  const forbidden = /\b(book now|reserve now|instant booking|booking confirmed|pay now)\b/i;
  const files = [
    ...collectFiles(join(ROOT, 'content'), /\.ts$/),
    ...collectFiles(join(ROOT, 'app'), /\.tsx$/),
    ...collectFiles(join(ROOT, 'components'), /\.tsx$/),
  ];
  for (const file of files) {
    const text = readFileSync(file, 'utf8');
    assert.doesNotMatch(text, forbidden, `Forbidden booking/payment phrasing in ${file}`);
  }
});

test('breakfast page includes allergen note, rooms explorer handles closed rooms, and sitemap lists all routes', () => {
  const breakfastPage = readFileSync(join(ROOT, 'app/breakfast/page.tsx'), 'utf8');
  assert.match(breakfastPage, /gluten, eggs, milk, nuts and sesame/i);

  const roomsExplorer = readFileSync(join(ROOT, 'components/rooms-explorer.tsx'), 'utf8');
  assert.match(roomsExplorer, /Not taking enquiries this season/);

  const sitemap = readFileSync(join(ROOT, 'app/sitemap.ts'), 'utf8');
  for (const route of ['/rooms/', '/breakfast/', '/local-guide/', '/house-rules/', '/contact/']) {
    assert.ok(sitemap.includes(route), `sitemap missing ${route}`);
  }
});
