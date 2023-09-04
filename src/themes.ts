export const bwTheme = {
	primary: '0,0,0',
	secondary: '255,255,255'
};
export const darkmodeTheme = {
	primary: '255,255,255',
	secondary: '0,0,0'
};
export const traditionalTheme = {
	primary: '159, 114, 64',
	secondary: '249, 223, 175'
};

export const findTheme = (themeName: string) => {
	switch (themeName) {
		case 'bw':
			return bwTheme;
		case 'darkmode':
			return darkmodeTheme;
		case 'traditional':
			return traditionalTheme;
	}
};
