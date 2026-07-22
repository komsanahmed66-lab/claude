import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {colors, fonts} from '../theme';

const words = ['One', 'point', 'of', 'contact.', 'Everything', 'covered.'];

export const Statement: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	return (
		<AbsoluteFill
			style={{
				backgroundColor: colors.ink,
				alignItems: 'center',
				justifyContent: 'center',
				padding: '0 90px',
			}}
		>
			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'center',
					gap: '0 20px',
					fontFamily: fonts.display,
					fontWeight: 500,
					fontSize: 66,
					lineHeight: 1.25,
					textAlign: 'center',
					color: colors.paper,
				}}
			>
				{words.map((word, i) => {
					const p = spring({frame: frame - i * 6, fps, config: {damping: 200, mass: 0.6}});
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
		</AbsoluteFill>
	);
};
