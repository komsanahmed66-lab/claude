import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {colors, fonts} from '../theme';

export const Quote: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const p = spring({frame, fps, config: {damping: 200, mass: 0.6}});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: colors.ink,
				alignItems: 'center',
				justifyContent: 'center',
				padding: '0 100px',
			}}
		>
			<div
				style={{
					fontFamily: fonts.display,
					fontStyle: 'italic',
					fontWeight: 400,
					fontSize: 40,
					lineHeight: 1.35,
					textAlign: 'center',
					color: 'rgba(255,255,255,0.85)',
					opacity: interpolate(p, [0, 1], [0, 1]),
					transform: `translateY(${interpolate(p, [0, 1], [18, 0])}px)`,
				}}
			>
				"Nothing gets routed to someone you've never met without you knowing."
			</div>
		</AbsoluteFill>
	);
};
