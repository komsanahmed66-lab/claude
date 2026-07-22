import React from 'react';

type IconProps = {
	size?: number;
	color?: string;
	strokeWidth?: number;
};

const base = (strokeWidth: number) => ({
	fill: 'none',
	stroke: 'currentColor',
	strokeWidth,
	strokeLinecap: 'round' as const,
	strokeLinejoin: 'round' as const,
});

// --- Vendor / pain-point icons ---

export const BriefcaseIcon: React.FC<IconProps> = ({size = 56, color = '#000', strokeWidth = 1.6}) => (
	<svg width={size} height={size} viewBox="0 0 24 24" style={{color}} {...base(strokeWidth)}>
		<rect x="3" y="7" width="18" height="12" rx="1.5" />
		<path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
		<path d="M3 12h18" />
	</svg>
);

export const ClapperIcon: React.FC<IconProps> = ({size = 56, color = '#000', strokeWidth = 1.6}) => (
	<svg width={size} height={size} viewBox="0 0 24 24" style={{color}} {...base(strokeWidth)}>
		<path d="M3 10.5 20 7l.6 3-17 3.5z" />
		<rect x="3" y="10.5" width="18" height="9" rx="1.2" />
		<path d="M7.5 7.5 10 11M12.5 6.7 15 10.2" />
	</svg>
);

export const MegaphoneIcon: React.FC<IconProps> = ({size = 56, color = '#000', strokeWidth = 1.6}) => (
	<svg width={size} height={size} viewBox="0 0 24 24" style={{color}} {...base(strokeWidth)}>
		<path d="M3 10v4a1 1 0 0 0 1 1h2l1 5h2l-1-5h1l9 4V6l-9 4H4a1 1 0 0 0-1 1z" />
		<path d="M19 9.5a3 3 0 0 1 0 5" />
	</svg>
);

export const BoxIcon: React.FC<IconProps> = ({size = 56, color = '#000', strokeWidth = 1.6}) => (
	<svg width={size} height={size} viewBox="0 0 24 24" style={{color}} {...base(strokeWidth)}>
		<path d="M3 8 12 4l9 4-9 4-9-4z" />
		<path d="M3 8v9l9 4 9-4V8" />
		<path d="M12 12v9" />
	</svg>
);

// --- Service icons ---

export const PenNibIcon: React.FC<IconProps> = ({size = 56, color = '#000', strokeWidth = 1.6}) => (
	<svg width={size} height={size} viewBox="0 0 24 24" style={{color}} {...base(strokeWidth)}>
		<path d="M12 3 20 11 12 21 4 11z" />
		<path d="M12 3v18" />
	</svg>
);

export const RefreshIcon: React.FC<IconProps> = ({size = 56, color = '#000', strokeWidth = 1.6}) => (
	<svg width={size} height={size} viewBox="0 0 24 24" style={{color}} {...base(strokeWidth)}>
		<path d="M4 12a8 8 0 0 1 13.9-5.4M20 12a8 8 0 0 1-13.9 5.4" />
		<path d="M18 3v4h-4M6 21v-4h4" />
	</svg>
);

export const ChatBubbleIcon: React.FC<IconProps> = ({size = 56, color = '#000', strokeWidth = 1.6}) => (
	<svg width={size} height={size} viewBox="0 0 24 24" style={{color}} {...base(strokeWidth)}>
		<path d="M4 5h16v11H9l-5 4z" />
		<path d="M8 9h8M8 12.5h5" />
	</svg>
);

export const BrowserIcon: React.FC<IconProps> = ({size = 56, color = '#000', strokeWidth = 1.6}) => (
	<svg width={size} height={size} viewBox="0 0 24 24" style={{color}} {...base(strokeWidth)}>
		<rect x="3" y="4.5" width="18" height="15" rx="1.5" />
		<path d="M3 8.5h18" />
		<path d="M6 6.5h.01M9 6.5h.01" />
	</svg>
);

export const FilmIcon: React.FC<IconProps> = ({size = 56, color = '#000', strokeWidth = 1.6}) => (
	<svg width={size} height={size} viewBox="0 0 24 24" style={{color}} {...base(strokeWidth)}>
		<rect x="3" y="4" width="18" height="16" rx="1.5" />
		<path d="M9.5 4v16M3 9h6.5M3 15h6.5" />
		<path d="M13 10.3v3.4l3-1.7z" />
	</svg>
);

export const StarPersonIcon: React.FC<IconProps> = ({size = 56, color = '#000', strokeWidth = 1.6}) => (
	<svg width={size} height={size} viewBox="0 0 24 24" style={{color}} {...base(strokeWidth)}>
		<circle cx="12" cy="8" r="3.2" />
		<path d="M5 20c1-3.5 4-5.5 7-5.5s6 2 7 5.5" />
		<path d="M19 4.5l.6 1.3 1.4.2-1 1 .2 1.4-1.2-.7-1.2.7.2-1.4-1-1 1.4-.2z" />
	</svg>
);
