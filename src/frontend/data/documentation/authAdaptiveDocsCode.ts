export const adaptiveEngine = `\
import {
  createNeonKnownDeviceStore,
  createNeonLoginHistoryStore,
  createRiskEngine
} from '@absolutejs/auth';

// Bind the two stores (and any overrides) once, then reuse the engine.
export const risk = createRiskEngine({
  knownDeviceStore: createNeonKnownDeviceStore(process.env.DATABASE_URL),
  loginHistoryStore: createNeonLoginHistoryStore(process.env.DATABASE_URL),
  // Every rule's action + threshold is overridable:
  rules: { new_country: 'allow' }, // e.g. don't step up just for a new country
  maxTravelKmh: 1000, // impossible_travel threshold (default 900)
  velocityMaxAttempts: 5 // deny after N attempts within velocityWindowMs
});

// Built-in rules (defaults): new_device -> step_up, new_country -> step_up,
// impossible_travel -> deny, velocity -> deny. The overall action is the most
// severe rule that fires (allow < step_up < deny).`;
export const adaptiveLogin = `\
// In your login / OAuth-callback handler — where the request context exists —
// assess the attempt, record it, then act on the verdict.
const context = {
  deviceId, // your device cookie / fingerprint
  geo: await lookupGeo(ipAddress), // you own geo resolution (no bundled GeoIP)
  ipAddress,
  userId: user.sub
};

const { action, reasons } = await risk.assessRisk(context);
await risk.recordAttempt({ ...context, outcome: action });

if (action === 'deny') {
  return status('Forbidden', { reasons }); // block outright
}
if (action === 'step_up') {
  return status('OK', { status: 'mfa_required' }); // route into the MFA gate
}
// action === 'allow' -> promote the session as usual`;
export const adaptiveTrust = `\
// After the user clears the step-up (MFA verified), remember this device so the
// new_device rule stops firing for it next time:
await risk.trustDevice(user.sub, deviceId, 'Work laptop');`;
