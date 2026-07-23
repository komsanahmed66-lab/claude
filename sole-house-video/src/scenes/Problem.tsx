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

const PainItem: React.FC<{index: number; label: string; Icon: React.FC<{size?: number; color?: string; draw?: number}>}> = ({
	index,
	label,
	Icon,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const enter = spring({frame, fps, config: {damping: 200, mass: 0.6}});
	const iconDraw = spring({frame: frame - 4, fps, config: {damping: 30, mass: 0.8}});
	const exitStart = ITEM_DURATION - 13;
	// crossed off the list just before it leaves
	const strikeP = interpolate(frame, [exitStart - 8, exitStart + 2], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const exitP = interpolate(frame, [exitStart, ITEM_DURATION], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const y = interpolate(enter, [0, 1], [46, 0]) + interpolate(exitP, [0, 1], [0, -46]);
	const opacity = interpolate(enter, [0, 1], [0, 1]) * (1 - exitP);

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
				<div style={{marginBottom: 22}}>
					<Icon size={58} color={colors.paper} draw={iconDraw} />
				</div>
				<div style={{position: 'relative'}}>
					<div
						style={{
							fontFamily: fonts.display,
							fontWeight: 500,
							color: colors.paper,
							fontSize: 46,
							opacity: 1 - strikeP * 0.45,
						}}
					>
						{label}
					</div>
					<div
						style={{
							position: 'absolute',
							left: '-4%',
							top: '52%',
							width: '108%',
							height: 3,
							backgroundColor: colors.paper,
							transform: `scaleX(${strikeP})`,
							transformOrigin: 'left center',
						}}
					/>
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
