import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';

export const GridBackground: React.FC<{color: string; opacity?: number; cell?: number}> = ({
	color,
	opacity = 0.06,
	cell = 90,
}) => {
	const frame = useCurrentFrame();
	// slow drift keeps held frames from feeling frozen
	const scale = interpolate(frame, [0, 300], [1, 1.07], {extrapolateRight: 'clamp'});

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
				backgroundSize: `${cell}px ${cell}px`,
				opacity,
				transform: `scale(${scale})`,
			}}
		/>
	);
};
