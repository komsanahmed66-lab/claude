import React from 'react';
import {AbsoluteFill, Series, spring, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {colors, fonts, services} from '../theme';

const ITEM_DURATION = 60;

const ServiceItem: React.FC<{index: number; name: string}> = ({index, name}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const enter = spring({frame, fps, config: {damping: 200, mass: 0.6}});
	const exitStart = ITEM_DURATION - 14;
	const exitP = interpolate(frame, [exitStart, ITEM_DURATION], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const y = interpolate(enter, [0, 1], [50, 0]) + interpolate(exitP, [0, 1], [0, -50]);
	const opacity = interpolate(enter, [0, 1], [0, 1]) * (1 - exitP);

	return (
		<AbsoluteFill style={{backgroundColor: colors.paper, alignItems: 'center', justifyContent: 'center'}}>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					transform: `translateY(${y}px)`,
					opacity,
					padding: '0 80px',
					textAlign: 'center',
				}}
			>
				<div
					style={{
						fontFamily: fonts.display,
						fontStyle: 'italic',
						color: colors.grey,
						fontSize: 26,
						marginBottom: 22,
					}}
				>
					{String(index + 1).padStart(2, '0')}
				</div>
				<div
					style={{
						fontFamily: fonts.display,
						fontWeight: 500,
						color: colors.ink,
						fontSize: 62,
						lineHeight: 1.08,
					}}
				>
					{name}
				</div>
				<div style={{width: 64, height: 1, backgroundColor: colors.hair, marginTop: 28}} />
			</div>
		</AbsoluteFill>
	);
};

export const Services: React.FC = () => {
	return (
		<Series>
			{services.map((name, i) => (
				<Series.Sequence key={name} durationInFrames={ITEM_DURATION}>
					<ServiceItem index={i} name={name} />
				</Series.Sequence>
			))}
		</Series>
	);
};
