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
        '--theme-primary-color': 'white',
        '--theme-secondary-color': '#3a9bcf',

        '--theme-primary-text-color': 'black',
        '--theme-primary-text-color-contrast': 'white',

        '--theme-widget-border': '#cecece',
        '--theme-highlight-color': '#3a9bcf',

        '--theme-chart-palette-1': '#3a9bcf',
        '--theme-chart-palette-2': '#f07839',
        '--theme-chart-palette-3': '#ac5159',
    },
    darkTheme: {
        '--theme-background': '#202124',
        '--theme-primary-color': '#323639',
        '--theme-secondary-color': '#5AA454',

        '--theme-primary-text-color': 'white',
        '--theme-primary-text-color-contrast': 'white',
        
        '--theme-widget-border': 'transparent',
        '--theme-highlight-color': 'yellow',

        '--theme-chart-palette-1': '#5AA454',
        '--theme-chart-palette-2': '#A10A28',
        '--theme-chart-palette-3': '#C7B42C',
    }
};
