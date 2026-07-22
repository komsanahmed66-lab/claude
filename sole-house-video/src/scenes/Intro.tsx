import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {colors, fonts} from '../theme';

const Word: React.FC<{text: string; delay: number}> = ({text, delay}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const progress = spring({
		frame: frame - delay,
		fps,
		config: {damping: 200, mass: 0.6},
	});
	const y = interpolate(progress, [0, 1], [40, 0]);
	const opacity = interpolate(progress, [0, 1], [0, 1]);

	return (
		<div
			style={{
				fontFamily: fonts.display,
				fontWeight: 500,
				fontSize: 150,
				letterSpacing: -2,
				color: colors.paper,
				lineHeight: 0.95,
				transform: `translateY(${y}px)`,
				opacity,
			}}
		>
			{text}
		</div>
	);
};

export const Intro: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const labelProgress = spring({frame: frame - 55, fps, config: {damping: 200}});
	const labelOpacity = interpolate(labelProgress, [0, 1], [0, 1]);

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
				<Word text="HOUSE" delay={12} />
				<div
					style={{
						marginTop: 36,
						fontFamily: fonts.body,
						fontSize: 20,
						letterSpacing: 4,
						textTransform: 'uppercase',
						color: 'rgba(255,255,255,0.55)',
						opacity: labelOpacity,
					}}
				>
					Cairo — Founded 2026
				</div>
			</div>
		</AbsoluteFill>
	);
};
