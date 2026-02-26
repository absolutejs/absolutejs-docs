import { useEffect, useState } from 'react';
import { isValidTelemetryViewId } from '../../types/typeGuards';
import { TelemetryView } from '../data/telemetrySidebarData';

export const useTelemetryNavigation = (initialView: TelemetryView) => {
	const [view, setView] = useState(initialView);

	const navigateToView = (newView: TelemetryView) => {
		const { pathname, search } = window.location;
		const trimmed = pathname.replace(/\/+$/, '');
		const parts = trimmed.split('/').filter(Boolean);

		const last = parts.length > 0 ? parts[parts.length - 1] : undefined;

		if (last && isValidTelemetryViewId(last)) {
			parts[parts.length - 1] = newView;
		} else {
			parts.push(newView);
		}

		const nextPath = `/${parts.join('/')}`;
		if (nextPath !== pathname) {
			window.history.pushState(
				{ view: newView },
				'',
				`${nextPath}${search}`
			);
		}
		setView(newView);
	};

	useEffect(() => {
		const onPop = () => {
			const trimmed = window.location.pathname.replace(/\/+$/, '');
			const parts = trimmed.split('/').filter(Boolean);
			const last = parts.length > 0 ? parts[parts.length - 1] : undefined;
			if (last && isValidTelemetryViewId(last)) setView(last);
		};
		window.addEventListener('popstate', onPop);

		return () => window.removeEventListener('popstate', onPop);
	}, []);

	return [view, navigateToView] as const;
};
