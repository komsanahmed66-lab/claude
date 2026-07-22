import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {colors, fonts} from '../theme';
import {GridBackground} from '../GridBackground';

export const Closing: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const markP = spring({frame, fps, config: {damping: 200}});
	const ctaP = spring({frame: frame - 16, fps, config: {damping: 200}});
	const footP = spring({frame: frame - 30, fps, config: {damping: 200}});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: colors.paper,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<GridBackground color={colors.ink} />
			<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
				<div
					style={{
						fontFamily: fonts.display,
						fontWeight: 500,
						fontSize: 56,
						letterSpacing: 3,
						color: colors.ink,
						opacity: interpolate(markP, [0, 1], [0, 1]),
						transform: `translateY(${interpolate(markP, [0, 1], [20, 0])}px)`,
					}}
				>
					SOLE HOUSE
				</div>

				<div
					style={{
						marginTop: 44,
						padding: '18px 44px',
						backgroundColor: colors.ink,
						color: colors.paper,
						fontFamily: fonts.body,
						fontSize: 15,
						letterSpacing: 2,
						textTransform: 'uppercase',
						borderRadius: 999,
						opacity: interpolate(ctaP, [0, 1], [0, 1]),
						transform: `translateY(${interpolate(ctaP, [0, 1], [16, 0])}px)`,
					}}
				>
					Start a project
				</div>

				<div
					style={{
						marginTop: 40,
						fontFamily: fonts.body,
						fontSize: 14,
						color: colors.grey,
						letterSpacing: 0.5,
						textAlign: 'center',
						opacity: interpolate(footP, [0, 1], [0, 1]),
					}}
				>
					solehouseagency@gmail.com
					<br />
					instagram.com/solehouseagency
				</div>
			</div>
		</AbsoluteFill>
	);
};
