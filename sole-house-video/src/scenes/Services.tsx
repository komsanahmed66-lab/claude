import React from 'react';
import {AbsoluteFill, Series, spring, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {colors, fonts, services} from '../theme';
import {GridBackground} from '../GridBackground';

const ITEM_DURATION = 50;

const ServiceItem: React.FC<{index: number; name: string; Icon: React.FC<{size?: number; color?: string}>}> = ({
	index,
	name,
	Icon,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const enter = spring({frame, fps, config: {damping: 200, mass: 0.6}});
	const iconEnter = spring({frame: frame - 4, fps, config: {damping: 14, mass: 0.5, stiffness: 140}});
	const exitStart = ITEM_DURATION - 13;
	const exitP = interpolate(frame, [exitStart, ITEM_DURATION], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const y = interpolate(enter, [0, 1], [50, 0]) + interpolate(exitP, [0, 1], [0, -50]);
	const opacity = interpolate(enter, [0, 1], [0, 1]) * (1 - exitP);
	const iconScale = interpolate(iconEnter, [0, 1], [0.4, 1]);
	const iconRotate = interpolate(iconEnter, [0, 1], [-25, 0]);

	return (
		<AbsoluteFill style={{backgroundColor: colors.paper, alignItems: 'center', justifyContent: 'center'}}>
			<GridBackground color={colors.ink} />
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
						transform: `scale(${iconScale}) rotate(${iconRotate}deg)`,
						marginBottom: 20,
					}}
				>
					<Icon size={60} color={colors.ink} />
				</div>
				<div
					style={{
						fontFamily: fonts.display,
						fontStyle: 'italic',
						color: colors.grey,
						fontSize: 24,
						marginBottom: 18,
					}}
				>
					{String(index + 1).padStart(2, '0')}
				</div>
				<div
					style={{
						fontFamily: fonts.display,
						fontWeight: 500,
						color: colors.ink,
						fontSize: 58,
						lineHeight: 1.08,
					}}
				>
					{name}
				</div>
				<div style={{width: 64, height: 1, backgroundColor: colors.hair, marginTop: 26}} />
			</div>
		</AbsoluteFill>
	);
};

export const Services: React.FC = () => {
	return (
		<Series>
			{services.map((service, i) => (
				<Series.Sequence key={service.name} durationInFrames={ITEM_DURATION}>
					<ServiceItem index={i} name={service.name} Icon={service.Icon} />
				</Series.Sequence>
			))}
		</Series>
	);
};

export {ITEM_DURATION as SERVICE_ITEM_DURATION};
