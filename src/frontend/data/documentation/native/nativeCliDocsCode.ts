export const cliEverydayFlow = `\
bunx absolute mobile init                 # once: create the native projects
bun dev                                   # every day: web plus emulator and simulator
bunx absolute mobile sync                 # after changing the mobile config or device features
bunx absolute mobile build android        # a signed store build
bunx absolute mobile publish android --play-track internal`;

export const cliUpdateFlow = `\
bunx absolute mobile update build --classification bug-fix \\
  --key-id 2026-10 --signing-key ~/.config/absolutejs/mobile-update.pem \\
  --within-submitted-purpose
bunx absolute mobile update publish .absolutejs/mobile/updates/<release> --rollout 0.05
bunx absolute mobile update status`;
