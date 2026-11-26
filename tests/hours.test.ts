import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import {
  DAYS,
  PHONE_LINE_NEUTRAL,
  openingLabel,
  phoneLineStatus,
  validateHours,
  type OpeningHours,
} from '../lib/hours.ts';

const hours: OpeningHours[] = DAYS.map(day => day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' });
const at = (date: string, zone = 'America/New_York') => openingLabel(hours, zone, new Date(date));

test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(at('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});

test('closed weekdays and week wrap find the next service', () => {
  assert.equal(at('2026-11-16T18:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(at('2026-11-15T23:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(openingLabel(DAYS.map(day => ({ day })), 'UTC'), 'Closed · see opening hours');
});

test('missing/invalid zones stay neutral and DST changes preserve local service times', () => {
  assert.equal(at('2026-11-17T14:00:00Z', ''), 'See opening hours');
  assert.equal(at('2026-11-17T14:00:00Z', 'Mars/Base'), 'See opening hours');
  assert.equal(at('2026-03-08T12:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-03-08T13:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-01T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-01T14:00:00Z'), 'Open now · until 17:00');
});

test('invalid/incomplete/overnight intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(hours));
  for (const opens of ['24:00', '9:00', '18:00']) {
    assert.throws(() => validateHours(hours.map(x => x.day === 'Tuesday' ? { ...x, opens } : x)), /Tuesday/);
  }
  assert.throws(() => validateHours(hours.slice(1)), /Monday/);
  assert.throws(() => validateHours(hours.map(x => x.day === 'Tuesday' ? { ...x, closes: undefined } : x)), /Tuesday/);
});

test('cottage phone-line boundaries in Europe/London including March & October BST transitions', () => {
  const phone = (iso: string) => phoneLineStatus(business.phoneHours, 'Europe/London', new Date(iso));

  // Winter (GMT = UTC): 07:59 closed, 08:00 open, 19:59 open, 20:00 closed
  assert.deepEqual(phone('2026-01-15T07:59:00Z'), { open: false, label: 'Phone line opens at 8am — email any time' });
  assert.deepEqual(phone('2026-01-15T08:00:00Z'), { open: true, label: 'Phone answered now' });
  assert.deepEqual(phone('2026-01-15T19:59:00Z'), { open: true, label: 'Phone answered now' });
  assert.deepEqual(phone('2026-01-15T20:00:00Z'), { open: false, label: 'Phone line opens at 8am — email any time' });

  // Last Sunday of March 2026 (29 March): clocks spring forward at 01:00 UTC -> BST (UTC+1)
  // 07:59 BST = 06:59Z, 08:00 BST = 07:00Z, 19:59 BST = 18:59Z, 20:00 BST = 19:00Z
  assert.equal(phone('2026-03-29T06:59:00Z').open, false);
  assert.equal(phone('2026-03-29T07:00:00Z').open, true);
  assert.equal(phone('2026-03-29T18:59:00Z').open, true);
  assert.equal(phone('2026-03-29T19:00:00Z').open, false);

  // Last Sunday of October 2026 (25 October): clocks fall back at 01:00 UTC -> GMT (UTC+0)
  assert.equal(phone('2026-10-25T07:59:00Z').open, false);
  assert.equal(phone('2026-10-25T08:00:00Z').open, true);
  assert.equal(phone('2026-10-25T19:59:00Z').open, true);
  assert.equal(phone('2026-10-25T20:00:00Z').open, false);

  // Missing or invalid time zone falls back to neutral text
  assert.deepEqual(phoneLineStatus(business.phoneHours, '', new Date('2026-01-15T12:00:00Z')), {
    open: null,
    label: PHONE_LINE_NEUTRAL,
  });
});
