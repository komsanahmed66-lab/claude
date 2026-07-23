import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {colors, fonts} from '../theme';

const Word: React.FC<{text: string; delay: number}> = ({text, delay}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	return (
		<div
			style={{
				fontFamily: fonts.display,
				fontWeight: 500,
				fontSize: 150,
				letterSpacing: -2,
				color: colors.paper,
				lineHeight: 0.95,
				display: 'flex',
			}}
		>
			{text.split('').map((letter, i) => {
				const p = spring({
					frame: frame - delay - i * 3,
					fps,
					config: {damping: 200, mass: 0.55},
				});
				return (
					<span
						key={i}
						style={{
							display: 'inline-block',
							transform: `translateY(${interpolate(p, [0, 1], [46, 0])}px)`,
							opacity: interpolate(p, [0, 1], [0, 1]),
							filter: `blur(${interpolate(p, [0, 1], [10, 0])}px)`,
						}}
					>
						{letter}
					</span>
				);
			})}
		</div>
	);
};

export const Intro: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const ruleP = spring({frame: frame - 40, fps, config: {damping: 200}});
	const labelP = spring({frame: frame - 48, fps, config: {damping: 200}});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: colors.ink,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
				<Word text="SOLE" delay={0} />
				<Word text="HOUSE" delay={10} />
				<div
					style={{
						marginTop: 36,
						width: 120,
						height: 1,
						backgroundColor: 'rgba(255,255,255,0.4)',
						transform: `scaleX(${ruleP})`,
					}}
				/>
				<div
					style={{
						marginTop: 24,
						fontFamily: fonts.body,
						fontSize: 20,
						letterSpacing: 4,
						textTransform: 'uppercase',
						color: 'rgba(255,255,255,0.55)',
						opacity: interpolate(labelP, [0, 1], [0, 1]),
					}}
				>
					Cairo — Founded 2026
				</div>
			</div>
		</AbsoluteFill>
	);
};
