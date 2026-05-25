export const abuseGuard = `\
import { createAbuseGuard, defaultBotClassifier } from '@absolutejs/auth';

// The decision pipeline: IP allow/deny (exact or IPv4 CIDR) + a CAPTCHA hook +
// a bot classifier -> allow / challenge / deny. The framework half of WorkOS
// "Radar" (which is hosted-only); you supply the signals.
export const abuse = createAbuseGuard({
  // wrap Turnstile / reCAPTCHA / hCaptcha; return true to pass
  verifyCaptcha: (token) => verifyTurnstile(token),
  // built-in User-Agent heuristic, or pass your own (e.g. an AI-agent detector)
  classifyBot: defaultBotClassifier,
  ipDeny: ['203.0.113.0/24'],
  captchaAction: 'challenge' // default 'deny'
});`;
export const abuseLogin = `\
// Run it at the top of register / login, where the request context is available.
// Pairs with the adaptive risk engine — run both.
const { action, reasons } = await abuse.assess({
  captchaToken: body.captchaToken,
  ip: request.headers.get('x-forwarded-for') ?? undefined,
  userAgent: request.headers.get('user-agent') ?? undefined
});

if (action === 'deny') return status('Forbidden', { reasons });
if (action === 'challenge') return status('Bad Request', 'captcha_required');
// action === 'allow' -> proceed with the credential work`;
