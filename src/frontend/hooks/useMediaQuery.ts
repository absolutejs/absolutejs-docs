import {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState
} from 'react';

type Breakpoints = {
	xs: number;
	sm: number;
	md: number;
	lg: number;
	xl: number;
	'2xl': number;
};

const defaultBreakpoints: Breakpoints = {
	'2xl': 1536,
	lg: 1024,
	md: 768,
	sm: 640,
	xl: 1280,
	xs: 0
};

export type Breakpoint = keyof Breakpoints;

// Server-known viewport hint (breakpoint cookie, falling back to a
// user-agent sniff) provided by the page root. Without it every hook
// instance hydrates as 'xs', so desktop visitors got the mobile layout
// server-rendered and a full-tree re-render after mount to correct it.
export const InitialBreakpointContext = createContext<Breakpoint | undefined>(
	undefined
);

export const isBreakpoint = (value: string): value is Breakpoint =>
	value in defaultBreakpoints;

const measureBreakpoint = (width: number, breakpoints: Breakpoints) => {
	if (width < breakpoints.sm) return 'xs';
	if (width < breakpoints.md) return 'sm';
	if (width < breakpoints.lg) return 'md';
	if (width < breakpoints.xl) return 'lg';
	if (width < breakpoints['2xl']) return 'xl';

	return '2xl';
};

export const useMediaQuery = (customBreakpoints = defaultBreakpoints) => {
	const initialBreakpoint = useContext(InitialBreakpointContext);
	const [breakpoint, setBreakpoint] = useState<Breakpoint>(
		initialBreakpoint ?? 'xs'
	);
	const measuredRef = useRef<Breakpoint | null>(null);

	useEffect(() => {
		const applyMeasurement = () => {
			const next = measureBreakpoint(
				window.innerWidth,
				customBreakpoints
			);
			if (measuredRef.current === next) return;
			measuredRef.current = next;
			document.cookie = `breakpoint=${next}; Max-Age=31536000; Path=/`;
			setBreakpoint(next);
		};

		applyMeasurement();
		window.addEventListener('resize', applyMeasurement);

		return () => {
			window.removeEventListener('resize', applyMeasurement);
		};
	}, [customBreakpoints]);

	const isSizeOrGreater = (target: Breakpoint) =>
		customBreakpoints[breakpoint] >= customBreakpoints[target];

	const isSizeOrLess = (target: Breakpoint) =>
		customBreakpoints[breakpoint] <= customBreakpoints[target];

	return {
		breakpoint,
		isSizeOrGreater,
		isSizeOrLess
	};
};
