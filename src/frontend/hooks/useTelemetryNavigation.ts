import { useEffect, useState } from 'react';
import { isValidTelemetryViewId } from '../../types/typeGuards';
import { TelemetryView } from '../data/telemetrySidebarData';

export const useTelemetryNavigation = (initialView: TelemetryView) => {
	const [view, setView] = useState(initialView);

	const navigateToView = (newView: TelemetryView) => {
		const url = new URL(window.location.href);
		url.searchParams.set('view', newView);
		window.history.pushState({ view: newView }, '', url.toString());
		setView(newView);
	};

	useEffect(() => {
		const onPop = () => {
			const url = new URL(window.location.href);
			const v = url.searchParams.get('view');
			if (v && isValidTelemetryViewId(v)) setView(v);
		};
		window.addEventListener('popstate', onPop);

		return () => window.removeEventListener('popstate', onPop);
	}, []);

	return [view, navigateToView] as const;
};
