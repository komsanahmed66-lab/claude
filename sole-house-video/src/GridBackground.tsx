import React from 'react';

export const GridBackground: React.FC<{color: string; opacity?: number; cell?: number}> = ({
	color,
	opacity = 0.06,
	cell = 90,
}) => (
	<div
		style={{
			position: 'absolute',
			inset: 0,
			backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
			backgroundSize: `${cell}px ${cell}px`,
			opacity,
		}}
	/>
);
