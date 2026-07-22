import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {Intro} from './scenes/Intro';
import {SectionHead} from './scenes/SectionHead';
import {Services} from './scenes/Services';
import {Statement} from './scenes/Statement';
import {Quote} from './scenes/Quote';
import {Closing} from './scenes/Closing';
import {fontFaceCss} from './theme';

export const DURATIONS = {
	intro: 95,
	sectionHead: 90,
	services: 8 * 60,
	statement: 105,
	quote: 120,
	closing: 130,
};

export const TOTAL_DURATION = Object.values(DURATIONS).reduce((a, b) => a + b, 0);

export const SoleHouseVideo: React.FC = () => {
	return (
		<AbsoluteFill>
			<style>{fontFaceCss}</style>
			<Series>
				<Series.Sequence durationInFrames={DURATIONS.intro}>
					<Intro />
				</Series.Sequence>
				<Series.Sequence durationInFrames={DURATIONS.sectionHead}>
					<SectionHead />
				</Series.Sequence>
				<Series.Sequence durationInFrames={DURATIONS.services}>
					<Services />
				</Series.Sequence>
				<Series.Sequence durationInFrames={DURATIONS.statement}>
					<Statement />
				</Series.Sequence>
				<Series.Sequence durationInFrames={DURATIONS.quote}>
					<Quote />
				</Series.Sequence>
				<Series.Sequence durationInFrames={DURATIONS.closing}>
					<Closing />
				</Series.Sequence>
			</Series>
		</AbsoluteFill>
	);
};
