export enum SupportedThemes {
    LIGHT_THEME = 'lightTheme',
    DARK_THEME = 'darkTheme'
}

export interface ThemeProperties {
    [themeProperty: string]: string;
}

export type ThemesCollection = {
    [key in SupportedThemes]: ThemeProperties;
}

export const themes: ThemesCollection = {
    lightTheme: {
        '--theme-background': 'white',
        '--theme-primary-text-color': 'black',
        '--theme-primary-color': 'white'
    },
    darkTheme: {
        '--theme-background': '#202124',
        '--theme-primary-text-color': 'white',
        '--theme-primary-color': '#323639'
    }
};
