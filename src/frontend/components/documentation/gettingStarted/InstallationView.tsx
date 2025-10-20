import { animated } from "@react-spring/web";
import React from "react";
import { PrismPlus } from "../../utils/PrismPlus";
import type { ThemeSprings } from "../../../../types/springTypes";
import { useTheme } from "../../../hooks/useTheme";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { headingStyle, h2Style, sectionStyle, introStyle, tableOfContentsStyle } from "../../../styles/styles";

export const InstallationView = ({ themeSprings }: { themeSprings?: ThemeSprings }) => {
	// Use the passed themeSprings if available, otherwise fallback to current theme
	const [fallbackTS] = useTheme(undefined);
	const ts = themeSprings ?? fallbackTS;
	const { isSizeOrLess, isSizeOrGreater } = useMediaQuery();

	// Responsive breakpoints
	const isMobile = isSizeOrLess('sm'); // 640px and below
	const isTablet = isSizeOrLess('md'); // 768px and below
	const isDesktop = isSizeOrGreater('lg'); // 1024px and above
	const isLargeDesktop = isSizeOrGreater('xl'); // 1280px and above

	return (
		<>
			<style>
				{`.installation-scroll-container::-webkit-scrollbar {
					display: none;
				}`}
			</style>
			<div
				className="installation-scroll-container"
				style={{
					display: 'flex',
					flex: 1,
					flexDirection: 'column',
					padding: isMobile ? '0.5rem 0.75rem' : isTablet ? '1rem 1.25rem' : isDesktop ? '1rem 2rem' : '1.5rem 3rem',
					overflow: 'auto',
					minHeight: 0,
					minWidth: 0,
					width: '100%',
					maxWidth: '100%',
					scrollbarWidth: 'none', // Firefox
					msOverflowStyle: 'none', // IE/Edge
					zIndex: 0, // Ensure it stays below the theme button dropdown
					boxSizing: 'border-box',
				}}
			>
				<animated.h1 style={{ 
					...headingStyle(ts), 
					textAlign: 'center', 
					marginBottom: isMobile ? 24 : 32, 
					color: ts.contrastPrimary,
					fontSize: isMobile ? '2rem' : isTablet ? '2.25rem' : '2.5rem'
				}}>
					Installation Guide
				</animated.h1>
				<animated.p style={{ 
					...introStyle(ts), 
					color: ts.contrastSecondary,
					fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem',
					padding: isMobile ? '0 0.5rem' : '0'
				}}>
					Before getting started with AbsoluteJS, you'll need to install the required tools and dependencies. 
					This guide will walk you through installing all the necessary components to begin development.
				</animated.p>

				{/* Table of Contents */}
				<animated.div style={{
					...tableOfContentsStyle(ts),
					position: 'relative',
					top: 'auto',
					backgroundColor: ts.themeTertiary,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					textAlign: 'center',
					padding: isMobile ? '1.5rem 1rem' : isTablet ? '2rem 1.5rem' : '2rem',
					marginBottom: isMobile ? '1.5rem' : '2.5rem'
				}}>
					<animated.h2 style={{ 
						...h2Style(ts), 
						marginTop: 0, 
						marginBottom: isMobile ? '16px' : '24px', 
						color: ts.contrastPrimary,
						fontSize: isMobile ? '1.4rem' : isTablet ? '1.6rem' : '1.8rem'
					}}>
						Table of Contents
					</animated.h2>
					<animated.div style={{ 
						display: 'flex', 
						flexDirection: isMobile ? 'column' : isTablet ? 'column' : 'row',
						gap: isMobile ? '12px' : isTablet ? '12px' : '24px',
						flexWrap: 'wrap',
						justifyContent: 'center',
						alignItems: 'flex-start'
					}}>
						<animated.div style={{ 
							display: 'flex', 
							flexDirection: 'column', 
							gap: '12px',
							flex: isMobile || isTablet ? 'none' : '1',
							alignItems: 'center'
						}}>
							<animated.a href="#bun" style={{ 
								color: ts.contrastSecondary, 
								textDecoration: 'none', 
								fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
								textAlign: 'center',
								lineHeight: '1.4'
							}}>
								Installing Bun
							</animated.a>
							<animated.a href="#git" style={{ 
								color: ts.contrastSecondary, 
								textDecoration: 'none', 
								fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
								textAlign: 'center',
								lineHeight: '1.4'
							}}>
								Installing Git
							</animated.a>
						</animated.div>
						<animated.div style={{ 
							display: 'flex', 
							flexDirection: 'column', 
							gap: '12px',
							flex: isMobile || isTablet ? 'none' : '1',
							alignItems: 'center'
						}}>
							<animated.a href="#nodejs" style={{ 
								color: ts.contrastSecondary, 
								textDecoration: 'none', 
								fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
								textAlign: 'center',
								lineHeight: '1.4'
							}}>
								Node.js (Optional)
							</animated.a>
							<animated.a href="#typescript" style={{ 
								color: ts.contrastSecondary, 
								textDecoration: 'none', 
								fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
								textAlign: 'center',
								lineHeight: '1.4'
							}}>
								TypeScript
							</animated.a>
						</animated.div>
					</animated.div>
				</animated.div>

				{/* Installing Bun */}
				<animated.section id="bun" style={{
					...sectionStyle(ts),
					overflow: 'visible',
					backgroundColor: ts.themeTertiary,
					padding: isMobile ? '1.5rem 1rem' : isTablet ? '2rem 1.5rem' : '2.5rem',
					marginBottom: isMobile ? '1.5rem' : '2.5rem'
				}}>
					<animated.h2 style={{ 
						...h2Style(ts), 
						color: ts.contrastPrimary,
						fontSize: isMobile ? '1.4rem' : isTablet ? '1.6rem' : '1.8rem'
					}}>
						Installing Bun
					</animated.h2>
					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginBottom: isMobile ? '16px' : '24px'
					}}>
						Bun is a fast all-in-one JavaScript runtime, bundler, test runner, and package manager for JavaScript and TypeScript. 
						It's the primary runtime used by AbsoluteJS and should be installed first.
					</animated.p>
					
					<animated.h3 style={{ 
						color: ts.contrastPrimary, 
						fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
						fontWeight: '600', 
						marginBottom: isMobile ? '12px' : '16px', 
						marginTop: isMobile ? '16px' : '24px' 
					}}>
						macOS and Linux
					</animated.h3>
					<PrismPlus
						language="bash"
						codeString={`curl -fsSL https://bun.sh/install | bash`}
						themeSprings={ts}
						showLineNumbers={false}
					/>

					<animated.h3 style={{ 
						color: ts.contrastPrimary, 
						fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
						fontWeight: '600', 
						marginBottom: isMobile ? '12px' : '16px', 
						marginTop: isMobile ? '16px' : '24px' 
					}}>
						Windows
					</animated.h3>
					<PrismPlus
						language="powershell"
						codeString={`powershell -c "irm bun.sh/install.ps1 | iex"`}
						themeSprings={ts}
						showLineNumbers={false}
					/>

					<animated.h3 style={{ 
						color: ts.contrastPrimary, 
						fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
						fontWeight: '600', 
						marginBottom: isMobile ? '12px' : '16px', 
						marginTop: isMobile ? '16px' : '24px' 
					}}>
						Verify Installation
					</animated.h3>
					<PrismPlus
						language="bash"
						codeString={`bun --version`}
						themeSprings={ts}
						showLineNumbers={false}
					/>
				</animated.section>

				{/* Installing Git */}
				<animated.section id="git" style={{
					...sectionStyle(ts),
					overflow: 'visible',
					backgroundColor: ts.themeTertiary,
					padding: isMobile ? '1.5rem 1rem' : isTablet ? '2rem 1.5rem' : '2.5rem',
					marginBottom: isMobile ? '1.5rem' : '2.5rem'
				}}>
					<animated.h2 style={{ 
						...h2Style(ts), 
						color: ts.contrastPrimary,
						fontSize: isMobile ? '1.4rem' : isTablet ? '1.6rem' : '1.8rem'
					}}>
						Installing Git
					</animated.h2>
					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginBottom: isMobile ? '16px' : '24px' 
					}}>
						Git is a distributed version control system that's essential for managing your code and collaborating with others. 
						AbsoluteJS projects use Git for version control and package management.
					</animated.p>

					<animated.h3 style={{ 
						color: ts.contrastPrimary, 
						fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
						fontWeight: '600', 
						marginBottom: isMobile ? '12px' : '16px', 
						marginTop: isMobile ? '16px' : '24px' 
					}}>
						macOS
					</animated.h3>
					<PrismPlus
						language="bash"
						codeString={`# Using Homebrew (recommended)
brew install git

# Or download from https://git-scm.com/download/mac`}
						themeSprings={ts}
						showLineNumbers={false}
					/>

					<animated.h3 style={{ 
						color: ts.contrastPrimary, 
						fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
						fontWeight: '600', 
						marginBottom: isMobile ? '12px' : '16px', 
						marginTop: isMobile ? '16px' : '24px' 
					}}>
						Windows
					</animated.h3>
					<PrismPlus
						language="bash"
						codeString={`# Download Git for Windows from:
# https://git-scm.com/download/win

# Or using winget
winget install --id Git.Git -e --source winget`}
						themeSprings={ts}
						showLineNumbers={false}
					/>

					<animated.h3 style={{ 
						color: ts.contrastPrimary, 
						fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
						fontWeight: '600', 
						marginBottom: isMobile ? '12px' : '16px', 
						marginTop: isMobile ? '16px' : '24px' 
					}}>
						Linux
					</animated.h3>
					<PrismPlus
						language="bash"
						codeString={`# Ubuntu/Debian
sudo apt update && sudo apt install git

# Fedora/CentOS/RHEL
sudo dnf install git

# Arch Linux
sudo pacman -S git`}
						themeSprings={ts}
						showLineNumbers={false}
					/>

					<animated.h3 style={{ 
						color: ts.contrastPrimary, 
						fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
						fontWeight: '600', 
						marginBottom: isMobile ? '12px' : '16px', 
						marginTop: isMobile ? '16px' : '24px' 
					}}>
						Verify Installation
					</animated.h3>
					<PrismPlus
						language="bash"
						codeString={`git --version`}
						themeSprings={ts}
						showLineNumbers={false}
					/>
				</animated.section>

				{/* Node.js (Optional) */}
				<animated.section id="nodejs" style={{
					...sectionStyle(ts),
					overflow: 'visible',
					backgroundColor: ts.themeTertiary,
					padding: isMobile ? '1.5rem 1rem' : isTablet ? '2rem 1.5rem' : '2.5rem',
					marginBottom: isMobile ? '1.5rem' : '2.5rem'
				}}>
					<animated.h2 style={{ 
						...h2Style(ts), 
						color: ts.contrastPrimary,
						fontSize: isMobile ? '1.4rem' : isTablet ? '1.6rem' : '1.8rem'
					}}>
						Node.js (Optional)
					</animated.h2>
					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginBottom: isMobile ? '16px' : '24px' 
					}}>
						While Bun can run most Node.js applications, some tooling and development servers may still require Node.js for compatibility. 
						Install the latest LTS version for best tooling support.
					</animated.p>

					<animated.h3 style={{ 
						color: ts.contrastPrimary, 
						fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
						fontWeight: '600', 
						marginBottom: isMobile ? '12px' : '16px', 
						marginTop: isMobile ? '16px' : '24px' 
					}}>
						Using Node Version Manager (Recommended)
					</animated.h3>
					<PrismPlus
						language="bash"
						codeString={`# Install nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart your terminal or run:
source ~/.bashrc

# Install the latest LTS version
nvm install --lts
nvm use --lts`}
						themeSprings={ts}
						showLineNumbers={false}
					/>

					<animated.h3 style={{ 
						color: ts.contrastPrimary, 
						fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
						fontWeight: '600', 
						marginBottom: isMobile ? '12px' : '16px', 
						marginTop: isMobile ? '16px' : '24px' 
					}}>
						Direct Download
					</animated.h3>
					<PrismPlus
						language="bash"
						codeString={`# Visit https://nodejs.org and download the LTS version
# Or use your system package manager:

# macOS with Homebrew
brew install node

# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs`}
						themeSprings={ts}
						showLineNumbers={false}
					/>

					<animated.h3 style={{ 
						color: ts.contrastPrimary, 
						fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
						fontWeight: '600', 
						marginBottom: isMobile ? '12px' : '16px', 
						marginTop: isMobile ? '16px' : '24px' 
					}}>
						Verify Installation
					</animated.h3>
					<PrismPlus
						language="bash"
						codeString={`node --version
npm --version`}
						themeSprings={ts}
						showLineNumbers={false}
					/>
				</animated.section>

				{/* TypeScript */}
				<animated.section id="typescript" style={{
					...sectionStyle(ts),
					overflow: 'visible',
					backgroundColor: ts.themeTertiary,
					padding: isMobile ? '1.5rem 1rem' : isTablet ? '2rem 1.5rem' : '2.5rem',
					marginBottom: isMobile ? '1.5rem' : '2.5rem'
				}}>
					<animated.h2 style={{ 
						...h2Style(ts), 
						color: ts.contrastPrimary,
						fontSize: isMobile ? '1.4rem' : isTablet ? '1.6rem' : '1.8rem'
					}}>
						TypeScript
					</animated.h2>
					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginBottom: isMobile ? '16px' : '24px' 
					}}>
						TypeScript is a strongly typed programming language that builds on JavaScript. 
						It comes bundled with Bun, but you can also install it globally or per-project as needed.
					</animated.p>

					<animated.h3 style={{ 
						color: ts.contrastPrimary, 
						fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
						fontWeight: '600', 
						marginBottom: isMobile ? '12px' : '16px', 
						marginTop: isMobile ? '16px' : '24px' 
					}}>
						Using Bun (Recommended)
					</animated.h3>
					<PrismPlus
						language="bash"
						codeString={`# TypeScript is included with Bun by default
bun --version

# To install TypeScript in a project:
bun add typescript
bun add -D @types/node`}
						themeSprings={ts}
						showLineNumbers={false}
					/>

					<animated.h3 style={{ 
						color: ts.contrastPrimary, 
						fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
						fontWeight: '600', 
						marginBottom: isMobile ? '12px' : '16px', 
						marginTop: isMobile ? '16px' : '24px' 
					}}>
						Global Installation (Alternative)
					</animated.h3>
					<PrismPlus
						language="bash"
						codeString={`# Using npm
npm install -g typescript

# Or using Bun
bun install -g typescript`}
						themeSprings={ts}
						showLineNumbers={false}
					/>

					<animated.h3 style={{ 
						color: ts.contrastPrimary, 
						fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
						fontWeight: '600', 
						marginBottom: isMobile ? '12px' : '16px', 
						marginTop: isMobile ? '16px' : '24px' 
					}}>
						Verify Installation
					</animated.h3>
					<PrismPlus
						language="bash"
						codeString={`# Check TypeScript version with Bun
bun tsc --version

# Or check if TypeScript compiler is available
tsc --version`}
						themeSprings={ts}
						showLineNumbers={false}
					/>
				</animated.section>

				{/* Next Steps */}
				<animated.section style={{
					...sectionStyle(ts),
					overflow: 'visible',
					backgroundColor: ts.themeTertiary,
					padding: isMobile ? '1.5rem 1rem' : isTablet ? '2rem 1.5rem' : '2.5rem',
					marginBottom: isMobile ? '1.5rem' : '2.5rem'
				}}>
					<animated.h2 style={{ 
						...h2Style(ts), 
						color: ts.contrastPrimary,
						fontSize: isMobile ? '1.4rem' : isTablet ? '1.6rem' : '1.8rem'
					}}>
						Next Steps
					</animated.h2>
					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginBottom: isMobile ? '16px' : '24px' 
					}}>
						Once you have all the required tools installed, you're ready to start your first AbsoluteJS project! 
						Make sure all installations are verified and up to date before proceeding.
					</animated.p>

					<animated.h3 style={{ 
						color: ts.contrastPrimary, 
						fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
						fontWeight: '600', 
						marginBottom: isMobile ? '12px' : '16px', 
						marginTop: isMobile ? '16px' : '24px' 
					}}>
						Quick Verification
					</animated.h3>
					<PrismPlus
						language="bash"
						codeString={`# Verify all tools are installed and working
bun --version
git --version
node --version  # if you installed Node.js
bun tsc --version`}
						themeSprings={ts}
						showLineNumbers={false}
					/>

					<animated.p style={{ color: ts.contrastSecondary, fontSize: '1rem', lineHeight: '1.6', marginTop: '24px' }}>
						Great! You're all set to begin developing with AbsoluteJS. Check out the other documentation sections to learn about creating your first project.
					</animated.p>
				</animated.section>
			</div>
		</>
	);
};
