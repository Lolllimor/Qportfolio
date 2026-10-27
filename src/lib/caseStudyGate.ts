import { createHmac, timingSafeEqual } from 'node:crypto';

export const INTERSWITCH_STUDY_COOKIE = 'interswitch-study';

function expectedPassword() {
  return process.env.INTERSWITCH_CASE_STUDY_PASSWORD ?? '';
}

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function studyAccessToken() {
  const password = expectedPassword();
  if (!password) return '';
  return createHmac('sha256', password)
    .update('interswitch-mobile-app')
    .digest('hex');
}

export function passwordMatches(input: string) {
  const expected = expectedPassword();
  if (!expected || !input) return false;
  return safeEqual(input, expected);
}

export function hasStudyAccess(value: string | undefined) {
  const token = studyAccessToken();
  if (!token || !value) return false;
  return safeEqual(value, token);
}
