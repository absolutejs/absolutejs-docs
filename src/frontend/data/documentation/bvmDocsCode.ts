type TerminalSession = {
	command: string;
	output: string;
};

export const bvmActivate = `\
# bash and zsh: activate bvm in the terminal you installed from
eval "$("$HOME/.bvm/bin/bvm" env)"

# fish
"$HOME/.bvm/bin/bvm" env --shell fish | source`;

export const bvmInstallNpm = `\
npm install --global @absolutejs/bvm
# or run it once without installing
npx @absolutejs/bvm --version`;

export const bvmInstallUnix = `\
curl -fsSL https://raw.githubusercontent.com/absolutejs/bvm/main/install.sh | sh`;

export const bvmInstallWindows = `\
powershell -c "irm https://raw.githubusercontent.com/absolutejs/bvm/main/install.ps1 | iex"`;

export const bvmPinProject = `\
# Pin this project (and every directory below it) to one version
echo 1.4.2-absolute.1 > .bun-version
bun --version                       # runs 1.4.2-absolute.1 here

# Or require a range in package.json; bvm picks the newest installed match
# { "engines": { "bun": ">=1.4.0" } }`;

export const bvmQuickstart = `\
bvm -v                              # bvm 0.1.3
bvm install latest --default        # newest official Bun, used everywhere
bun --version                       # 1.4.2
bvm install 1.4.2-absolute.1        # AbsoluteJS's patched build of 1.4.2
bvm ls                              # installed versions; marks current and default`;

export const bvmSelfUpdate = `\
bvm self update                     # newest signed bvm release
bvm uninstall 1.4.0                 # remove a Bun version`;

export const bvmUninstall = `\
# Remove bvm and every Bun it installed
rm -rf ~/.bvm
# then delete the "# bvm (Bun version manager)" lines from ~/.bashrc,
# ~/.zshrc, ~/.bash_profile or ~/.config/fish/conf.d/bvm.fish`;

export const bvmUseShell = `\
bvm use 1.4.2                       # this shell only (needs the bvm shell function)
bvm exec 1.4.2 -- bun test          # one command
BVM_BUN_VERSION=1.4.2 bun test      # same, by environment variable
bvm current                         # what runs here, and why`;

export const bvmVerifyOutput: TerminalSession = {
	command: 'bvm install 1.4.2',
	output: `\
bvm: verifying Bun 1.4.2 (bun-linux-x64.zip)
bvm: signature and checksum verified
bvm: installed Bun 1.4.2`
};
