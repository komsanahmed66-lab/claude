import {staticFile} from 'remotion';

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
	'Branding & Identity',
	'Rebrands & Identity Renewal',
	'Packaging',
	'Social Media Management',
	'Website & E-commerce',
	'Content & Production',
	'Media Buying & Ads',
	'Personal Branding',
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
