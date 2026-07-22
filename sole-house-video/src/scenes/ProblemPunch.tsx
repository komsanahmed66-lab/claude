import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {colors, fonts} from '../theme';

const line1 = ['You', "don't", 'need', '5', 'vendors.'];
const line2 = ['You', 'need', 'one', 'house.'];

const Line: React.FC<{words: string[]; startFrame: number; emphasize?: boolean}> = ({
	words,
	startFrame,
	emphasize,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	return (
		<div
			style={{
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'center',
				gap: '0 16px',
				fontFamily: fonts.display,
				fontWeight: 500,
				fontStyle: emphasize ? 'italic' : 'normal',
				fontSize: emphasize ? 68 : 54,
				lineHeight: 1.25,
				textAlign: 'center',
				color: colors.paper,
			}}
		>
			{words.map((word, i) => {
				const p = spring({frame: frame - startFrame - i * 5, fps, config: {damping: 200, mass: 0.6}});
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
	);
};

export const ProblemPunch: React.FC = () => {
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
				<Line words={line1} startFrame={0} />
				<Line words={line2} startFrame={32} emphasize />
			</div>
		</AbsoluteFill>
	);
};
