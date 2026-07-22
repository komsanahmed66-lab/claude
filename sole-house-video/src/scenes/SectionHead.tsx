import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {colors, fonts} from '../theme';
import {GridBackground} from '../GridBackground';

export const SectionHead: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const labelP = spring({frame, fps, config: {damping: 200}});
	const headP = spring({frame: frame - 10, fps, config: {damping: 200, mass: 0.7}});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: colors.paper,
				alignItems: 'center',
				justifyContent: 'center',
				padding: '0 90px',
			}}
		>
			<GridBackground color={colors.ink} />
			<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
				<div
					style={{
						fontFamily: fonts.body,
						fontSize: 18,
						letterSpacing: 3,
						textTransform: 'uppercase',
						color: colors.grey,
						opacity: interpolate(labelP, [0, 1], [0, 1]),
						transform: `translateY(${interpolate(labelP, [0, 1], [16, 0])}px)`,
						marginBottom: 26,
					}}
				>
					What the house does
				</div>
				<div
					style={{
						fontFamily: fonts.display,
						fontStyle: 'italic',
						fontWeight: 500,
						fontSize: 84,
						lineHeight: 1.05,
						color: colors.ink,
						opacity: interpolate(headP, [0, 1], [0, 1]),
						transform: `translateY(${interpolate(headP, [0, 1], [26, 0])}px)`,
					}}
				>
					Under one roof
				</div>
			</div>
		</AbsoluteFill>
	);
};
