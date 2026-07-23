import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {colors, fonts} from '../theme';

const line1 = ['You', "don't", 'need', '5', 'vendors.'];
const line2 = ['You', 'need', 'one', 'house.'];

const LINE2_START = 32; // matches the thud SFX in SoleHouseVideo

export const ProblemPunch: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// the moment line 2 lands, line 1 is crossed out and recedes
	const strikeP = interpolate(frame, [LINE2_START + 4, LINE2_START + 14], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// slight overshoot gives the reveal physical weight
	const line2Scale = spring({frame: frame - LINE2_START, fps, config: {damping: 12, mass: 0.6, stiffness: 120}});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: colors.ink,
				alignItems: 'center',
				justifyContent: 'center',
				padding: '0 90px',
			}}
		>
			<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26}}>
				<div style={{position: 'relative', opacity: 1 - strikeP * 0.55}}>
					<div
						style={{
							display: 'flex',
							flexWrap: 'wrap',
							justifyContent: 'center',
							gap: '0 16px',
							fontFamily: fonts.display,
							fontWeight: 500,
							fontSize: 54,
							lineHeight: 1.25,
							textAlign: 'center',
							color: colors.paper,
						}}
					>
						{line1.map((word, i) => {
							const p = spring({frame: frame - i * 5, fps, config: {damping: 200, mass: 0.6}});
							return (
								<span
									key={word + i}
									style={{
										opacity: interpolate(p, [0, 1], [0, 1]),
										transform: `translateY(${interpolate(p, [0, 1], [22, 0])}px)`,
										display: 'inline-block',
									}}
								>
									{word}
								</span>
							);
						})}
					</div>
					<div
						style={{
							position: 'absolute',
							left: 0,
							top: '52%',
							width: '100%',
							height: 3,
							backgroundColor: colors.paper,
							transform: `scaleX(${strikeP})`,
							transformOrigin: 'left center',
						}}
					/>
				</div>

				<div
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						justifyContent: 'center',
						gap: '0 20px',
						fontFamily: fonts.display,
						fontStyle: 'italic',
						fontWeight: 500,
						fontSize: 68,
						lineHeight: 1.25,
						textAlign: 'center',
						color: colors.paper,
						transform: `scale(${interpolate(line2Scale, [0, 1], [0.85, 1])})`,
					}}
				>
					{line2.map((word, i) => {
						const p = spring({frame: frame - LINE2_START - i * 5, fps, config: {damping: 200, mass: 0.6}});
						return (
							<span
								key={word + i}
								style={{
									opacity: interpolate(p, [0, 1], [0, 1]),
									transform: `translateY(${interpolate(p, [0, 1], [24, 0])}px)`,
									display: 'inline-block',
								}}
							>
								{word}
							</span>
						);
					})}
				</div>
			</div>
		</AbsoluteFill>
	);
};
