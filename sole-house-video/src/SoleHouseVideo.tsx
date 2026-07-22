import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {Problem, PROBLEM_ITEM_DURATION} from './scenes/Problem';
import {ProblemPunch} from './scenes/ProblemPunch';
import {Intro} from './scenes/Intro';
import {SectionHead} from './scenes/SectionHead';
import {Services, SERVICE_ITEM_DURATION} from './scenes/Services';
import {Statement} from './scenes/Statement';
import {Quote} from './scenes/Quote';
import {Closing} from './scenes/Closing';
import {fontFaceCss, vendorPains, services} from './theme';
import {SfxTrack, SfxEvent} from './Sfx';

export const DURATIONS = {
	problem: PROBLEM_ITEM_DURATION * vendorPains.length,
	problemPunch: 85,
	intro: 80,
	sectionHead: 90,
	services: SERVICE_ITEM_DURATION * services.length,
	statement: 105,
	quote: 120,
	closing: 130,
};

export const TOTAL_DURATION = Object.values(DURATIONS).reduce((a, b) => a + b, 0);

const buildSfxEvents = (): SfxEvent[] => {
	const events: SfxEvent[] = [];
	let t = 0;

	vendorPains.forEach((_, i) => events.push({frame: t + i * PROBLEM_ITEM_DURATION, type: 'tick'}));
	t += DURATIONS.problem;

	events.push({frame: t, type: 'whoosh'});
	events.push({frame: t + 32, type: 'thud'});
	t += DURATIONS.problemPunch;

	events.push({frame: t, type: 'whoosh'});
	t += DURATIONS.intro;

	events.push({frame: t, type: 'whoosh'});
	t += DURATIONS.sectionHead;

	services.forEach((_, i) => events.push({frame: t + i * SERVICE_ITEM_DURATION, type: 'tick'}));
	t += DURATIONS.services;

	events.push({frame: t, type: 'whoosh'});
	t += DURATIONS.statement;

	events.push({frame: t, type: 'whoosh'});
	t += DURATIONS.quote;

	events.push({frame: t, type: 'whoosh'});

	return events;
};

export const SoleHouseVideo: React.FC = () => {
	return (
		<AbsoluteFill>
			<style>{fontFaceCss}</style>
			<SfxTrack events={buildSfxEvents()} />
			<Series>
				<Series.Sequence durationInFrames={DURATIONS.problem}>
					<Problem />
				</Series.Sequence>
				<Series.Sequence durationInFrames={DURATIONS.problemPunch}>
					<ProblemPunch />
				</Series.Sequence>
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
