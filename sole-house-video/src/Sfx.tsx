import React from 'react';
import {Audio, Sequence, staticFile} from 'remotion';

export type SfxEvent = {frame: number; type: 'tick' | 'whoosh' | 'thud'};

const sources: Record<SfxEvent['type'], string> = {
	tick: staticFile('sfx/tick.wav'),
	whoosh: staticFile('sfx/whoosh.wav'),
	thud: staticFile('sfx/thud.wav'),
};

export const SfxTrack: React.FC<{events: SfxEvent[]}> = ({events}) => (
	<>
		{events.map((event, i) => (
			<Sequence key={i} from={event.frame} durationInFrames={30}>
				<Audio src={sources[event.type]} />
			</Sequence>
		))}
	</>
);
