import {staticFile} from 'remotion';
import {
	BriefcaseIcon,
	ClapperIcon,
	MegaphoneIcon,
	BoxIcon,
	PenNibIcon,
	RefreshIcon,
	ChatBubbleIcon,
	BrowserIcon,
	FilmIcon,
	StarPersonIcon,
} from './Icons';

export const colors = {
	ink: '#000000',
	paper: '#FFFFFF',
	hair: '#E2E2E2',
	grey: '#6E6E6E',
};

export const fonts = {
	display: 'Bodoni Moda',
	body: 'Inter',
};

export const services = [
	{name: 'Branding & Identity', Icon: PenNibIcon},
	{name: 'Rebrands & Identity Renewal', Icon: RefreshIcon},
	{name: 'Packaging', Icon: BoxIcon},
	{name: 'Social Media Management', Icon: ChatBubbleIcon},
	{name: 'Website & E-commerce', Icon: BrowserIcon},
	{name: 'Content & Production', Icon: FilmIcon},
	{name: 'Media Buying & Ads', Icon: MegaphoneIcon},
	{name: 'Personal Branding', Icon: StarPersonIcon},
];

export const vendorPains = [
	{label: 'A branding agency.', Icon: BriefcaseIcon},
	{label: 'A video editor.', Icon: ClapperIcon},
	{label: 'An ads manager.', Icon: MegaphoneIcon},
	{label: 'A packaging studio.', Icon: BoxIcon},
];

export const fontFaceCss = `
@font-face {
	font-family: 'Bodoni Moda';
	font-style: normal;
	font-weight: 100 900;
	src: url('${staticFile('fonts/BodoniModa-Regular.woff2')}') format('woff2');
}
@font-face {
	font-family: 'Bodoni Moda';
	font-style: italic;
	font-weight: 100 900;
	src: url('${staticFile('fonts/BodoniModa-Italic.woff2')}') format('woff2');
}
@font-face {
	font-family: 'Inter';
	font-style: normal;
	font-weight: 100 900;
	src: url('${staticFile('fonts/Inter-Regular.woff2')}') format('woff2');
}
`;
