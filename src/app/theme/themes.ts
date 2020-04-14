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
        '--theme-background': '#cce7e8',
        '--theme-primary-text-color': 'black',
        '--theme-primary-color': 'white',
        '--theme-widget-border': '#cecece',
        '--theme-highlight-color': 'blue'
    },
    darkTheme: {
        '--theme-background': '#202124',
        '--theme-primary-text-color': 'white',
        '--theme-primary-color': '#323639',
        '--theme-widget-border': 'transparent',
        '--theme-highlight-color': 'yellow'
    }
};
