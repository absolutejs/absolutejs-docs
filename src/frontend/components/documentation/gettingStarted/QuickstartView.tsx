import { animated } from "@react-spring/web";
import React from "react";
import { PrismPlus } from "../../utils/PrismPlus";
import type { ThemeSprings } from "../../../../types/springTypes";
import { useTheme } from "../../../hooks/useTheme";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { headingStyle, h2Style, sectionStyle, introStyle, tableOfContentsStyle } from "../../../styles/styles";

export const QuickstartView = ({ themeSprings }: { themeSprings?: ThemeSprings }) => {
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
				{`.quickstart-scroll-container::-webkit-scrollbar {
					display: none;
				}`}
			</style>
			<div
				className="quickstart-scroll-container"
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
					Quickstart Guide
				</animated.h1>
				<animated.p style={{ 
					...introStyle(ts), 
					color: ts.contrastSecondary,
					fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem',
					padding: isMobile ? '0 0.5rem' : '0'
				}}>
					Get started with AbsoluteJS by creating a new project using the interactive setup wizard. 
					This guide will walk you through all the configuration options available during project creation.
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
							<animated.a href="#getting-started" style={{ 
								color: ts.contrastSecondary, 
								textDecoration: 'none', 
								fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
								textAlign: 'center',
								lineHeight: '1.4'
							}}>
								Getting Started
							</animated.a>
							<animated.a href="#linting-formatting" style={{ 
								color: ts.contrastSecondary, 
								textDecoration: 'none', 
								fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
								textAlign: 'center',
								lineHeight: '1.4'
							}}>
								Linting & Formatting
							</animated.a>
							<animated.a href="#tailwind-support" style={{ 
								color: ts.contrastSecondary, 
								textDecoration: 'none', 
								fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
								textAlign: 'center',
								lineHeight: '1.4'
							}}>
								Tailwind Support
							</animated.a>
							<animated.a href="#frontend-frameworks" style={{ 
								color: ts.contrastSecondary, 
								textDecoration: 'none', 
								fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
								textAlign: 'center',
								lineHeight: '1.4'
							}}>
								Frontend Frameworks
							</animated.a>
							<animated.a href="#database-engine" style={{ 
								color: ts.contrastSecondary, 
								textDecoration: 'none', 
								fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
								textAlign: 'center',
								lineHeight: '1.4'
							}}>
								Database Engine
							</animated.a>
							<animated.a href="#orm" style={{ 
								color: ts.contrastSecondary, 
								textDecoration: 'none', 
								fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
								textAlign: 'center',
								lineHeight: '1.4'
							}}>
								ORM
							</animated.a>
						</animated.div>
						<animated.div style={{ 
							display: 'flex', 
							flexDirection: 'column', 
							gap: '12px',
							flex: isMobile || isTablet ? 'none' : '1',
							alignItems: 'center'
						}}>
							<animated.a href="#folder-naming" style={{ 
								color: ts.contrastSecondary, 
								textDecoration: 'none', 
								fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
								textAlign: 'center',
								lineHeight: '1.4'
							}}>
								Folder Naming
							</animated.a>
							<animated.a href="#auth-provider" style={{ 
								color: ts.contrastSecondary, 
								textDecoration: 'none', 
								fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
								textAlign: 'center',
								lineHeight: '1.4'
							}}>
								Auth Provider
							</animated.a>
							<animated.a href="#elysia-plugins" style={{ 
								color: ts.contrastSecondary, 
								textDecoration: 'none', 
								fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
								textAlign: 'center',
								lineHeight: '1.4'
							}}>
								Elysia Plugins
							</animated.a>
							<animated.a href="#git-repository" style={{ 
								color: ts.contrastSecondary, 
								textDecoration: 'none', 
								fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
								textAlign: 'center',
								lineHeight: '1.4'
							}}>
								Git Repository
							</animated.a>
							<animated.a href="#install-dependencies" style={{ 
								color: ts.contrastSecondary, 
								textDecoration: 'none', 
								fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
								textAlign: 'center',
								lineHeight: '1.4'
							}}>
								Install Dependencies
							</animated.a>
						</animated.div>
					</animated.div>
				</animated.div>

				{/* Getting Started */}
				<animated.section id="getting-started" style={{
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
						Getting Started
					</animated.h2>
					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginBottom: isMobile ? '16px' : '24px' 
					}}>
						To create a new AbsoluteJS project, run the following command in your terminal:
					</animated.p>
					
					<PrismPlus
						language="bash"
						codeString={`bun create absolutejs`}
						themeSprings={ts}
						showLineNumbers={false}
					/>

					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginBottom: isMobile ? '16px' : '24px',
						marginTop: isMobile ? '16px' : '24px'
					}}>
						This will start an interactive setup wizard that will guide you through configuring your project. 
						You'll be prompted to select various options for your project setup.
					</animated.p>
				</animated.section>

				{/* Linting and Formatting */}
				<animated.section id="linting-formatting" style={{
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
						Linting and Formatting Tool
					</animated.h2>
					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginBottom: isMobile ? '16px' : '24px' 
					}}>
						Choose your preferred linting and formatting tool for code quality and consistency:
					</animated.p>

					<animated.h3 style={{ 
						color: ts.contrastPrimary, 
						fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
						fontWeight: '600', 
						marginBottom: isMobile ? '12px' : '16px', 
						marginTop: isMobile ? '16px' : '24px' 
					}}>
						ESLint + Prettier (Recommended)
					</animated.h3>
					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginBottom: isMobile ? '12px' : '16px' 
					}}>
						The traditional combination of ESLint for code linting and Prettier for code formatting. 
						Provides comprehensive rule sets and excellent IDE integration.
					</animated.p>

					<animated.h3 style={{ 
						color: ts.contrastPrimary, 
						fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
						fontWeight: '600', 
						marginBottom: isMobile ? '12px' : '16px', 
						marginTop: isMobile ? '16px' : '24px' 
					}}>
						Biome
					</animated.h3>
					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginBottom: isMobile ? '12px' : '16px' 
					}}>
						A modern, fast linter and formatter written in Rust. Replaces both ESLint and Prettier with a single, 
						high-performance tool that's significantly faster.
					</animated.p>
				</animated.section>

				{/* Tailwind Support */}
				<animated.section id="tailwind-support" style={{
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
						Tailwind CSS Support
					</animated.h2>
					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginBottom: isMobile ? '16px' : '24px' 
					}}>
						Choose whether to include Tailwind CSS in your project for utility-first styling:
					</animated.p>

					<animated.h3 style={{ 
						color: ts.contrastPrimary, 
						fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
						fontWeight: '600', 
						marginBottom: isMobile ? '12px' : '16px', 
						marginTop: isMobile ? '16px' : '24px' 
					}}>
						Yes
					</animated.h3>
					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginBottom: isMobile ? '12px' : '16px' 
					}}>
						Includes Tailwind CSS with proper configuration for your chosen frontend framework. 
						Enables utility-first CSS classes for rapid UI development.
					</animated.p>

					<animated.h3 style={{ 
						color: ts.contrastPrimary, 
						fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
						fontWeight: '600', 
						marginBottom: isMobile ? '12px' : '16px', 
						marginTop: isMobile ? '16px' : '24px' 
					}}>
						No
					</animated.h3>
					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginBottom: isMobile ? '12px' : '16px' 
					}}>
						Skip Tailwind CSS setup. You can always add it later using your preferred CSS framework or vanilla CSS.
					</animated.p>
				</animated.section>

				{/* Frontend Frameworks */}
				<animated.section id="frontend-frameworks" style={{
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
						Frontend Frameworks
					</animated.h2>
					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginBottom: isMobile ? '16px' : '24px' 
					}}>
						Choose which frontend frameworks to include (space to select, enter to finish):
					</animated.p>

					<div style={{ marginLeft: isMobile ? '0' : '1rem' }}>
						<animated.h3 style={{ 
							color: ts.contrastPrimary, 
							fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
							fontWeight: '600', 
							marginBottom: isMobile ? '12px' : '16px', 
							marginTop: isMobile ? '16px' : '24px' 
						}}>
							React
						</animated.h3>
						<animated.p style={{ 
							color: ts.contrastSecondary, 
							fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
							lineHeight: '1.6', 
							marginBottom: isMobile ? '8px' : '12px' 
						}}>
							Component-based UI library with hooks, virtual DOM, and extensive ecosystem.
						</animated.p>

						<animated.h3 style={{ 
							color: ts.contrastPrimary, 
							fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
							fontWeight: '600', 
							marginBottom: isMobile ? '12px' : '16px', 
							marginTop: isMobile ? '16px' : '24px' 
						}}>
							HTML
						</animated.h3>
						<animated.p style={{ 
							color: ts.contrastSecondary, 
							fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
							lineHeight: '1.6', 
							marginBottom: isMobile ? '8px' : '12px' 
						}}>
							Plain HTML pages with server-side rendering capabilities.
						</animated.p>

						<animated.h3 style={{ 
							color: ts.contrastPrimary, 
							fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
							fontWeight: '600', 
							marginBottom: isMobile ? '12px' : '16px', 
							marginTop: isMobile ? '16px' : '24px' 
						}}>
							HTMX
						</animated.h3>
						<animated.p style={{ 
							color: ts.contrastSecondary, 
							fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
							lineHeight: '1.6', 
							marginBottom: isMobile ? '8px' : '12px' 
						}}>
							Enhances HTML with dynamic behaviors using attributes, no JavaScript framework required.
						</animated.p>

						<animated.h3 style={{ 
							color: ts.contrastPrimary, 
							fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
							fontWeight: '600', 
							marginBottom: isMobile ? '12px' : '16px', 
							marginTop: isMobile ? '16px' : '24px' 
						}}>
							Svelte
						</animated.h3>
						<animated.p style={{ 
							color: ts.contrastSecondary, 
							fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
							lineHeight: '1.6', 
							marginBottom: isMobile ? '8px' : '12px' 
						}}>
							Compile-time optimized framework that writes reactive code at build time.
						</animated.p>

						<animated.h3 style={{ 
							color: ts.contrastPrimary, 
							fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
							fontWeight: '600', 
							marginBottom: isMobile ? '12px' : '16px', 
							marginTop: isMobile ? '16px' : '24px' 
						}}>
							Vue
						</animated.h3>
						<animated.p style={{ 
							color: ts.contrastSecondary, 
							fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
							lineHeight: '1.6', 
							marginBottom: isMobile ? '8px' : '12px' 
						}}>
							Progressive framework with template syntax, reactivity, and component composition.
						</animated.p>
					</div>
				</animated.section>

				{/* Database Engine */}
				<animated.section id="database-engine" style={{
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
						Database Engine
					</animated.h2>
					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginBottom: isMobile ? '16px' : '24px' 
					}}>
						Choose your preferred database engine:
					</animated.p>

					<animated.h3 style={{ 
						color: ts.contrastPrimary, 
						fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
						fontWeight: '600', 
						marginBottom: isMobile ? '12px' : '16px', 
						marginTop: isMobile ? '16px' : '24px' 
					}}>
						None
					</animated.h3>
					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginBottom: isMobile ? '8px' : '12px' 
					}}>
						No database setup. You can add database support later.
					</animated.p>

					<animated.h3 style={{ 
						color: ts.contrastPrimary, 
						fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
						fontWeight: '600', 
						marginBottom: isMobile ? '12px' : '16px', 
						marginTop: isMobile ? '16px' : '24px' 
					}}>
						Available Options
					</animated.h3>

					<div style={{ marginLeft: isMobile ? '0' : '1rem' }}>
						<animated.p style={{ 
							color: ts.contrastSecondary, 
							fontSize: isMobile ? '0.9rem' : isTablet ? '0.95rem' : '1rem', 
							lineHeight: '1.5', 
							marginBottom: isMobile ? '6px' : '8px' 
						}}>
							• <strong>PostgreSQL</strong> - Advanced open-source relational database
						</animated.p>
						<animated.p style={{ 
							color: ts.contrastSecondary, 
							fontSize: isMobile ? '0.9rem' : isTablet ? '0.95rem' : '1rem', 
							lineHeight: '1.5', 
							marginBottom: isMobile ? '6px' : '8px' 
						}}>
							• <strong>SQLite</strong> - Lightweight, serverless SQL database
						</animated.p>
						<animated.p style={{ 
							color: ts.contrastSecondary, 
							fontSize: isMobile ? '0.9rem' : isTablet ? '0.95rem' : '1rem', 
							lineHeight: '1.5', 
							marginBottom: isMobile ? '6px' : '8px' 
						}}>
							• <strong>MySQL</strong> - Popular relational database management system
						</animated.p>
						<animated.p style={{ 
							color: ts.contrastSecondary, 
							fontSize: isMobile ? '0.9rem' : isTablet ? '0.95rem' : '1rem', 
							lineHeight: '1.5', 
							marginBottom: isMobile ? '6px' : '8px' 
						}}>
							• <strong>MariaDB</strong> - MySQL-compatible database server
						</animated.p>
						<animated.p style={{ 
							color: ts.contrastSecondary, 
							fontSize: isMobile ? '0.9rem' : isTablet ? '0.95rem' : '1rem', 
							lineHeight: '1.5', 
							marginBottom: isMobile ? '6px' : '8px' 
						}}>
							• <strong>MongoDB</strong> - NoSQL document database
						</animated.p>
						<animated.p style={{ 
							color: ts.contrastSecondary, 
							fontSize: isMobile ? '0.9rem' : isTablet ? '0.95rem' : '1rem', 
							lineHeight: '1.5', 
							marginBottom: isMobile ? '6px' : '8px' 
						}}>
							• <strong>SingleStore</strong> - Real-time analytics database
						</animated.p>
						<animated.p style={{ 
							color: ts.contrastSecondary, 
							fontSize: isMobile ? '0.9rem' : isTablet ? '0.95rem' : '1rem', 
							lineHeight: '1.5', 
							marginBottom: isMobile ? '6px' : '8px' 
						}}>
							• <strong>SQL Server</strong> - Microsoft's relational database system
						</animated.p>
						<animated.p style={{ 
							color: ts.contrastSecondary, 
							fontSize: isMobile ? '0.9rem' : isTablet ? '0.95rem' : '1rem', 
							lineHeight: '1.5', 
							marginBottom: isMobile ? '6px' : '8px' 
						}}>
							• <strong>CockroachDB</strong> - Distributed SQL database
						</animated.p>
					</div>
				</animated.section>

				{/* ORM */}
				<animated.section id="orm" style={{
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
						ORM for Database
					</animated.h2>
					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginBottom: isMobile ? '16px' : '24px' 
					}}>
						Select an Object-Relational Mapping (ORM) tool for your database:
					</animated.p>

					<animated.h3 style={{ 
						color: ts.contrastPrimary, 
						fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
						fontWeight: '600', 
						marginBottom: isMobile ? '12px' : '16px', 
						marginTop: isMobile ? '16px' : '24px' 
					}}>
						None
					</animated.h3>
					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginBottom: isMobile ? '12px' : '16px' 
					}}>
						Skip ORM setup. Use raw database queries or add an ORM later.
					</animated.p>

					<animated.h3 style={{ 
						color: ts.contrastPrimary, 
						fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
						fontWeight: '600', 
						marginBottom: isMobile ? '12px' : '16px', 
						marginTop: isMobile ? '16px' : '24px' 
					}}>
						Drizzle
					</animated.h3>
					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginBottom: isMobile ? '12px' : '16px' 
					}}>
						Lightweight TypeScript ORM with excellent performance and type safety. 
						Great for complex queries and schema management.
					</animated.p>

					<animated.h3 style={{ 
						color: ts.contrastPrimary, 
						fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
						fontWeight: '600', 
						marginBottom: isMobile ? '12px' : '16px', 
						marginTop: isMobile ? '16px' : '24px' 
					}}>
						Prisma
					</animated.h3>
					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginBottom: isMobile ? '12px' : '16px' 
					}}>
						Modern database toolkit with type-safe database access, migrations, and an intuitive schema language.
					</animated.p>
				</animated.section>

				{/* Folder Naming Configuration */}
				<animated.section id="folder-naming" style={{
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
						Folder Naming Configuration
					</animated.h2>
					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginBottom: isMobile ? '16px' : '24px' 
					}}>
						Choose how your project folders should be named:
					</animated.p>

					<animated.h3 style={{ 
						color: ts.contrastPrimary, 
						fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
						fontWeight: '600', 
						marginBottom: isMobile ? '12px' : '16px', 
						marginTop: isMobile ? '16px' : '24px' 
					}}>
						Default
					</animated.h3>
					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginBottom: isMobile ? '12px' : '16px' 
					}}>
						Uses conventional folder naming conventions (kebab-case for most folders, 
						camelCase for components, etc.).
					</animated.p>

					<animated.h3 style={{ 
						color: ts.contrastPrimary, 
						fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
						fontWeight: '600', 
						marginBottom: isMobile ? '12px' : '16px', 
						marginTop: isMobile ? '16px' : '24px' 
					}}>
						Custom
					</animated.h3>
					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginBottom: isMobile ? '12px' : '16px' 
					}}>
						Allows you to specify custom naming conventions for your project folders. 
						You'll be prompted to enter your preferred naming patterns.
					</animated.p>
				</animated.section>

				{/* Auth Provider */}
				<animated.section id="auth-provider" style={{
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
						Authentication Provider
					</animated.h2>
					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginBottom: isMobile ? '16px' : '24px' 
					}}>
						Select your authentication solution:
					</animated.p>

					<animated.h3 style={{ 
						color: ts.contrastPrimary, 
						fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
						fontWeight: '600', 
						marginBottom: isMobile ? '12px' : '16px', 
						marginTop: isMobile ? '16px' : '24px' 
					}}>
						None
					</animated.h3>
					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginBottom: isMobile ? '12px' : '16px' 
					}}>
						Skip authentication setup. You can add authentication later using any provider or custom solution.
					</animated.p>

					<animated.h3 style={{ 
						color: ts.contrastPrimary, 
						fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
						fontWeight: '600', 
						marginBottom: isMobile ? '12px' : '16px', 
						marginTop: isMobile ? '16px' : '24px' 
					}}>
						Absolute Auth
					</animated.h3>
					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginBottom: isMobile ? '12px' : '16px' 
					}}>
						Includes Absolute Auth plugin with support for 50+ OAuth providers. 
						Provides a complete authentication solution with user management, sessions, and more.
					</animated.p>
				</animated.section>

				{/* Elysia Plugins */}
				<animated.section id="elysia-plugins" style={{
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
						Additional Elysia Plugins
					</animated.h2>
					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginBottom: isMobile ? '16px' : '24px' 
					}}>
						Select additional Elysia plugins to include in your project (space to select, enter to submit):
					</animated.p>

					<animated.h3 style={{ 
						color: ts.contrastPrimary, 
						fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
						fontWeight: '600', 
						marginBottom: isMobile ? '12px' : '16px', 
						marginTop: isMobile ? '16px' : '24px' 
					}}>
						@elysiajs/cors
					</animated.h3>
					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginBottom: isMobile ? '12px' : '16px' 
					}}>
						Enables Cross-Origin Resource Sharing (CORS) support for your Elysia server, 
						allowing web applications to make requests to your API from different domains.
					</animated.p>

					<animated.h3 style={{ 
						color: ts.contrastPrimary, 
						fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
						fontWeight: '600', 
						marginBottom: isMobile ? '12px' : '16px', 
						marginTop: isMobile ? '16px' : '24px' 
					}}>
						@elysiajs/swagger
					</animated.h3>
					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginBottom: isMobile ? '12px' : '16px' 
					}}>
						Generates interactive API documentation using Swagger/OpenAPI specifications. 
						Automatically documents your routes and provides a web interface for testing your API.
					</animated.p>

					<animated.h3 style={{ 
						color: ts.contrastPrimary, 
						fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
						fontWeight: '600', 
						marginBottom: isMobile ? '12px' : '16px', 
						marginTop: isMobile ? '16px' : '24px' 
					}}>
						elysia-rate-limit
					</animated.h3>
					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginBottom: isMobile ? '12px' : '16px' 
					}}>
						Adds rate limiting functionality to protect your API from abuse and ensure fair usage. 
						Configurable limits per IP address or user.
					</animated.p>
				</animated.section>

				{/* Git Repository */}
				<animated.section id="git-repository" style={{
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
						Git Repository Initialization
					</animated.h2>
					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginBottom: isMobile ? '16px' : '24px' 
					}}>
						Decide whether to initialize a Git repository for version control:
					</animated.p>

					<animated.h3 style={{ 
						color: ts.contrastPrimary, 
						fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
						fontWeight: '600', 
						marginBottom: isMobile ? '12px' : '16px', 
						marginTop: isMobile ? '16px' : '24px' 
					}}>
						Yes (Recommended)
					</animated.h3>
					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginBottom: isMobile ? '12px' : '16px' 
					}}>
						Automatically initializes a Git repository with an initial commit. 
						Essential for version control and collaboration.
					</animated.p>

					<animated.h3 style={{ 
						color: ts.contrastPrimary, 
						fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
						fontWeight: '600', 
						marginBottom: isMobile ? '12px' : '16px', 
						marginTop: isMobile ? '16px' : '24px' 
					}}>
						No
					</animated.h3>
					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginBottom: isMobile ? '12px' : '16px' 
					}}>
						Skip Git repository initialization. You can initialize it manually later with `git init`.
					</animated.p>
				</animated.section>

				{/* Install Dependencies */}
				<animated.section id="install-dependencies" style={{
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
						Install Dependencies
					</animated.h2>
					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginBottom: isMobile ? '16px' : '24px' 
					}}>
						Choose whether to automatically install project dependencies:
					</animated.p>

					<animated.h3 style={{ 
						color: ts.contrastPrimary, 
						fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
						fontWeight: '600', 
						marginBottom: isMobile ? '12px' : '16px', 
						marginTop: isMobile ? '16px' : '24px' 
					}}>
						Yes (Recommended)
					</animated.h3>
					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginBottom: isMobile ? '12px' : '16px' 
					}}>
						Automatically runs `bun install` to install all project dependencies after setup completes. 
						This ensures your project is ready to run immediately.
					</animated.p>

					<animated.h3 style={{ 
						color: ts.contrastPrimary, 
						fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem', 
						fontWeight: '600', 
						marginBottom: isMobile ? '12px' : '16px', 
						marginTop: isMobile ? '16px' : '24px' 
					}}>
						No
					</animated.h3>
					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginBottom: isMobile ? '16px' : '24px' 
					}}>
						Skip dependency installation. You'll need to run `bun install` manually after the setup completes.
					</animated.p>

					<animated.p style={{ 
						color: ts.contrastSecondary, 
						fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem', 
						lineHeight: '1.6', 
						marginTop: isMobile ? '16px' : '24px' 
					}}>
						Once setup is complete, you can start developing by running the development server with `bun run dev`.
					</animated.p>
				</animated.section>
			</div>
		</>
	);
};
