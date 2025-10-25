import { animated } from "@react-spring/web";
import { PrismPlus } from "../../utils/PrismPlus";
import { ThemeProps } from "../../../../types/springTypes";

export const ServerState = ({ themeSprings }: ThemeProps) => {
    return (
        <animated.div
            style={{
					padding: "2rem 2rem 4rem 2rem",
					maxWidth: "1200px",
					width: "100%",
					margin: "0 auto", 
                    display: 'flex',
					flex: 1,
					flexDirection: 'column'
            }}
        >
            <animated.h1
                style={{
                    color: themeSprings.contrastPrimary, 
                    marginBottom: '2rem',
                    fontSize: '3rem'
                }}
            >
                Server State 
            </animated.h1>
            <animated.p
                style={{
                    	color: themeSprings.contrastSecondary,
						fontSize: "1.2rem",
						lineHeight: "1.5",
						marginBottom: "20px",
						maxWidth: "1200px",
                }}
            >
                Server State refers to the state store that exists on each Elysia instance. 
                Unlike client-side state that lives in the browser, server state lives on the server and can be reused across multiple requests.
            </animated.p>
            <animated.h2
                style={{
                    color: themeSprings.contrastPrimary,
					fontSize: "2rem",
					marginBottom: '1rem'
                }}
            >
                Key Features
            </animated.h2> 
            <animated.ul
                style={{
                    color: themeSprings.contrastSecondary,
					fontSize: "1.2rem",
					lineHeight: "1.6",
					marginLeft: "2rem"
                }}
            >
                <li style={{ marginBottom: "0.5rem" }}>
                    <strong>Elysia Instance State:</strong> Each Elysia server instance maintains its own state store that persists across requests. This state is accessible throughout the server's lifecycle.
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                    <strong>Scoped State: </strong> State that is specific to an individual user session. This ensures that each user has their own isolated state that doesn't interfere with other users' data.
                </li>
            </animated.ul>
            <animated.h2
                style={{
                    color: themeSprings.contrastPrimary,
                    fontSize: "2rem",
                    marginBottom: '1rem'
                }}
            >
                Using Scoped State with HTMX
            </animated.h2>
            <animated.p
                style={{
                    color: themeSprings.contrastSecondary,
					fontSize: "1.2rem",
					lineHeight: "1.5",
					marginBottom: "20px",
					maxWidth: "1200px"
                }}
            >
                When you create an HTMX project in AbsoluteJS, the elysia scoped state plugin is automatically included. 
                This plugin enables you to scope state to user sessions.
            </animated.p>
            <animated.h3
                style={{
                    color: themeSprings.contrastPrimary,
                    fontSize: "1.5rem",
                    marginBottom: '1rem'
                }}
            >
                Configuration
            </animated.h3>
            <animated.p
                style={{
                    color: themeSprings.contrastSecondary,
					fontSize: "1.2rem",
					lineHeight: "1.5",
					marginBottom: "20px",
					maxWidth: "1200px"
                }}
            >
                The scoped state plugin is configured with an initial state structure:
            </animated.p>
            <PrismPlus
                language="typescript"
                codeString={`import { scopedState } from 'elysia-scoped-state';

const server = new Elysia()
  .use(scopedState({ 
    count: { value: 0 } 
  }));`}
                themeSprings={themeSprings}
                showLineNumbers={false}
            />
            <animated.h3
                style={{
                    color: themeSprings.contrastPrimary,
                    fontSize: "1.5rem",
                    marginBottom: '1rem'
                }}
            >
                Accessing Scoped State in Routes
            </animated.h3>
            <animated.p
                style={{
                    color: themeSprings.contrastSecondary,
					fontSize: "1.2rem",
					lineHeight: "1.5",
					marginBottom: "20px",
					maxWidth: "1200px"
                }}
            >
                Once configured, you can access and modify the scoped state in your route handlers using the scopedStore object and resetScopedStore function:
            </animated.p>
            <PrismPlus
                language="typescript"
                codeString={`// Get the current count value
.get('/htmx/count', ({ scopedStore }) => scopedStore.count)

// Increment the count (modifying scoped state)
.post('/htmx/increment', ({ scopedStore }) => ++scopedStore.count)

// Reset the scoped state
.post('/htmx/reset', ({ resetScopedStore }) => resetScopedStore())`}
                themeSprings={themeSprings}
                showLineNumbers={false}
            />
            <animated.h3
                style={{
                    color: themeSprings.contrastPrimary,
                    fontSize: "1.5rem",
                    marginBottom: '1rem'
                }}
            >
                How it Works
            </animated.h3>
            <animated.ul
                style={{
                    color: themeSprings.contrastSecondary,
                    fontSize: "1rem",
                    lineHeight: "1.6",
                    marginLeft: "2rem"
                }}
            >
                <li style={{ marginBottom: "0.5rem" }}>
                    <strong>Per-User Isolation:</strong> Each user gets their own scopedStore tied to their session
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                    <strong>Persistence Across Requests:</strong> The scoped state persists across multiple requests within the same session
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                    <strong>Reset Functionality:</strong> The resetScopedStore function resets the user's state back to initial values.
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                    <strong>State Management:</strong> Changes to scopedStore.count are automatically maintained on the server.
                </li>
            </animated.ul>
        </animated.div>
    );
}