import React from 'react';
import {AbsoluteFill, Series, spring, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {colors, fonts, services} from '../theme';
import {GridBackground} from '../GridBackground';

const ITEM_DURATION = 50;

const ServiceItem: React.FC<{index: number; name: string; Icon: React.FC<{size?: number; color?: string; draw?: number}>}> = ({
	index,
	name,
	Icon,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const enter = spring({frame, fps, config: {damping: 200, mass: 0.6}});
	const iconDraw = spring({frame: frame - 3, fps, config: {damping: 30, mass: 0.9}});
	const iconPop = spring({frame: frame - 3, fps, config: {damping: 15, mass: 0.5, stiffness: 130}});
	const exitStart = ITEM_DURATION - 13;
	const exitP = interpolate(frame, [exitStart, ITEM_DURATION], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// alternate entrance side so back-to-back items don't feel repetitive
	const dir = index % 2 === 0 ? 1 : -1;
	const x = interpolate(enter, [0, 1], [dir * 60, 0]) + interpolate(exitP, [0, 1], [0, -dir * 60]);
	const opacity = interpolate(enter, [0, 1], [0, 1]) * (1 - exitP);
	const iconScale = interpolate(iconPop, [0, 1], [0.7, 1]);

	return (
		<AbsoluteFill style={{backgroundColor: colors.paper, alignItems: 'center', justifyContent: 'center'}}>
			<GridBackground color={colors.ink} />
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					transform: `translateX(${x}px)`,
					opacity,
					padding: '0 80px',
					textAlign: 'center',
				}}
			>
				<div
					style={{
						transform: `scale(${iconScale})`,
						marginBottom: 20,
					}}
				>
					<Icon size={60} color={colors.ink} draw={iconDraw} />
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
