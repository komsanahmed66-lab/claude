import React from 'react';
import {AbsoluteFill, Series, spring, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {colors, fonts, vendorPains} from '../theme';

const ITEM_DURATION = 55;

const Tally: React.FC<{count: number; total: number}> = ({count, total}) => (
	<div style={{display: 'flex', gap: 10}}>
		{Array.from({length: total}).map((_, i) => (
			<div
				key={i}
				style={{
					width: 10,
					height: 10,
					borderRadius: '50%',
					backgroundColor: i < count ? colors.paper : 'rgba(255,255,255,0.2)',
				}}
			/>
		))}
	</div>
);

const PainItem: React.FC<{index: number; label: string; Icon: React.FC<{size?: number; color?: string}>}> = ({
	index,
	label,
	Icon,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const enter = spring({frame, fps, config: {damping: 200, mass: 0.6}});
	const iconEnter = spring({frame: frame - 3, fps, config: {damping: 13, mass: 0.5, stiffness: 150}});
	const exitStart = ITEM_DURATION - 13;
	const exitP = interpolate(frame, [exitStart, ITEM_DURATION], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const y = interpolate(enter, [0, 1], [46, 0]) + interpolate(exitP, [0, 1], [0, -46]);
	const opacity = interpolate(enter, [0, 1], [0, 1]) * (1 - exitP);
	const iconScale = interpolate(iconEnter, [0, 1], [0.5, 1]);

	return (
		<AbsoluteFill style={{backgroundColor: colors.ink, alignItems: 'center', justifyContent: 'center'}}>
			<div style={{position: 'absolute', top: 130}}>
				<Tally count={index + 1} total={vendorPains.length} />
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					transform: `translateY(${y}px)`,
					opacity,
					textAlign: 'center',
				}}
			>
				<div style={{transform: `scale(${iconScale})`, marginBottom: 22}}>
					<Icon size={58} color={colors.paper} />
				</div>
				<div
					style={{
						fontFamily: fonts.display,
						fontWeight: 500,
						color: colors.paper,
						fontSize: 46,
					}}
				>
					{label}
				</div>
			</div>
		</AbsoluteFill>
	);
};

export const Problem: React.FC = () => {
	return (
		<Series>
			{vendorPains.map((pain, i) => (
				<Series.Sequence key={pain.label} durationInFrames={ITEM_DURATION}>
					<PainItem index={i} label={pain.label} Icon={pain.Icon} />
				</Series.Sequence>
			))}
		</Series>
	);
};

export {ITEM_DURATION as PROBLEM_ITEM_DURATION};
