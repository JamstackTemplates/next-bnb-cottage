# Honeysuckle Cottage B&B (`next-bnb-cottage`)

A self-contained static Next.js website for **Honeysuckle Cottage B&B**, a four-room Cotswold-stone
bed and breakfast in Bibury, Gloucestershire. Designed around a linocut tea-towel aesthetic with
casement-window rooms, a printed breakfast menu card, a painted Bibury walking map and a
cross-stitch house-rules sampler.

> Sample gallery template: the business, hosts and contact details are fictitious; Bibury and the
> local landmarks are real public places.

## Preview locally

Requires Node 24+ and npm.

```sh
npm ci
npm run dev
```

To build and preview the static export:

```sh
npm run check
npm start
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home: cottage hero, four casement windows, breakfast teaser, hosts’ note, painted walking map, finding us and `BedAndBreakfast` JSON-LD |
| `/rooms/` | Four rooms with interactive filters (Sleeps 3, Dog-friendly, Ground floor), alternating spreads and amenities |
| `/breakfast/` | Serving times, printed breakfast menu card with dietary marks, allergen notice and supplier frieze |
| `/local-guide/` | Painted Bibury walking map with numbered pins, a “Further afield” signpost for drives and a filterable two-column gazetteer |
| `/house-rules/` | Cross-stitch house-rules sampler, children/dogs/accessibility notes and how enquiries work |
| `/contact/` | Postcard checklist, hosted Jamstacks enquiry form (or email fallback), phone-line badge and map |
| `/404.html` | Linocut fingerpost-in-the-hedge error page |

## Make it yours

| File | Owns |
| --- | --- |
| `content/business.ts` | Cottage name, email, telephone, address, directions, check-in/out & breakfast times, daily phone hours and enquiry guidance |
| `content/rooms.ts` | The four rooms (prices, bed, sleeps, floor, `openForEnquiries`, features) and shared amenities |
| `content/breakfast.ts` | Breakfast sections, dishes, supplements, dietary marks (`v`, `vg`, `gf-option`), `available` and `seasonal` flags |
| `content/local-guide.ts` | Numbered pins (`mapPin`; on-foot places also `mapX`/`mapY` and optional short `mapLabel`), distances, notes and host tips |
| `public/map/` | Painted walking map: `bibury-light.webp` and `bibury-dark.webp` (1376×768, same layout) |
| `content/house-rules.ts` | Sampler rules grouped by arrival/staying/departure (pulling check-in/out times from `content/business.ts`) and practical notes |
| `public/rooms/` | Painted window illustration per room, shown on Home and `/rooms/`: `<room-id>-light.webp` and `<room-id>-dark.webp` (768×954) |
| `app/**/page.tsx` | Page-specific headings, introductions, prose and calls to action |
| `site.config.json` | Public name, meta description, hostname, `timeZone` (`Europe/London`) and Jamstacks `siteId`/`cdnUrl` |
| `app/tailwind.input.css` | Light ("linen in the morning") and dark ("the garden after dusk") tokens, textures, casement motion and print styles |
| `lib/structured-data.ts` | `BedAndBreakfast` JSON-LD derived from `content/business.ts` and `content/rooms.ts` |
| `app/sitemap.ts` | Public routes included in `sitemap.xml` |

### Common owner edits

- **Update a room price or pause enquiries:** Edit `pricePerNightGBP` or `openForEnquiries` in
  `content/rooms.ts`. Rebuilding updates the Home window label, the `/rooms/` spread and the
  schema `priceRange` automatically.
- **Add or rename a room:** Also add `public/rooms/<room-id>-light.webp` and `-dark.webp` (768×954).
  `npm test` fails and names the room if either image is missing.
- **Add or move a walk on the map:** Set `mapX`/`mapY` in `content/local-guide.ts` to the percentage
  from the map's left and top edges where the pin's point should sit (for example, St Mary's tower is
  about `72.3`, `25.4`). Drive destinations need no coordinates; they appear on the signpost.
- **Change seasonal breakfast availability:** Set `available: true` or `false` (and `supplementGBP`)
  in `content/breakfast.ts`.
- **Update check-in or breakfast times:** Edit `business.times` in `content/business.ts`. Both the
  Home/Footer/Breakfast displays and the House Rules sampler read from this single source.

## Typography & licences

All fonts are self-hosted via Fontsource under the SIL Open Font License 1.1 (`OFL-1.1`):

- **IM Fell English** (`@fontsource/im-fell-english`) — display headings and wordmark
- **IM Fell English SC** (`@fontsource/im-fell-english-sc`) — small-caps labels, navigation and prices
- **Rosario** (`@fontsource-variable/rosario`) — body copy and UI
- **Cedarville Cursive** (`@fontsource/cedarville-cursive`) — hosts’ signature and breakfast slip accent

## Public configuration & Contact contract

`site.config.json` keeps the Jamstacks provisioner shape (`name`, `description`, `domain`,
`timeZone`, `jamstacks.siteId`, `jamstacks.cdnUrl`, optional `provisioningId`).

- When `JAMSTACKS_SITE` (or `site.config.json` `jamstacks.siteId`) is set, `/contact/` renders the
  hosted `<jamstacks-support-form>` and one `{cdn}/sites/{siteId}/embed.js` bootstrap.
- When unset, `/contact/` renders a visible email fallback with no embed host or script.
- Navigation to and from `/contact/` uses full-document loads via `SiteLink`.
- Copy treats every stay request as an enquiry confirmed in writing; no payment is taken on the site.

## Checks and deployment

```sh
npm run check
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

`jamstacks/` holds removable gallery-only publishing metadata and captures; ordinary builds, tests
and GitHub Pages deployments do not read it. Validate gallery captures separately with:

```sh
node --test jamstacks/config.test.mjs
```
