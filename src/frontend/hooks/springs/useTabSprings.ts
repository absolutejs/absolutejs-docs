import { useSpring } from '@react-spring/web';
import { useState } from 'react';
import { PERCENT_SCALE } from '../../../constants';

export const useTabSprings = (numTabs: number) => {
	const [currentTab, setCurrentTab] = useState(0);
	const [sliderSprings, sliderApi] = useSpring(() => ({
		config: {
			duration: 200
		},
		left: `${(PERCENT_SCALE / numTabs) * currentTab}%`
	}));

	const handleTabClick = (index: number) => {
		sliderApi.start({
			left: `${(PERCENT_SCALE / numTabs) * index}%`
		});
		setCurrentTab(index);
	};

	return { currentTab, handleTabClick, sliderSprings };
};
