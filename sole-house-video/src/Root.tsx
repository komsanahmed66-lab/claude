import React from 'react';
import {Composition} from 'remotion';
import {SoleHouseVideo, TOTAL_DURATION} from './SoleHouseVideo';

export const RemotionRoot: React.FC = () => {
	return (
		<Composition
			id="SoleHouseVertical"
			component={SoleHouseVideo}
			durationInFrames={TOTAL_DURATION}
			fps={30}
			width={1080}
			height={1920}
		/>
	);
};
