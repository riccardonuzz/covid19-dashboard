import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';
import { take } from 'rxjs/operators';
import { SupportedThemes } from './themes';

describe('ThemeService', () => {
    let service: ThemeService;

    let store = {};
    const mockedLocalStorage = {
        getItem: (key: string): string => {
            return key in store ? store[key] : null;
        },
        setItem: (key: string, value: string) => {
            store[key] = `${value}`;
        },
        removeItem: (key: string) => {
            delete store[key];
        },
        clear: () => {
            store = {};
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.get(ThemeService);
    });

    it('Should be created', () => {
        expect(service).toBeTruthy();
    });

    it('Should get the theme correctly', () => {
        service.getActiveTheme()
            .pipe(take(1))
            .subscribe(theme => {
                expect(theme).toBe(SupportedThemes.LIGHT_THEME);
            });
    });

    it('Should set the theme correctly', () => {
        service.setActiveTheme(SupportedThemes.DARK_THEME);
        service.getActiveTheme()
            .pipe(take(1))
            .subscribe(theme => {
                expect(theme).toBe(SupportedThemes.DARK_THEME);
            });
    });

    it('Should initialize default theme', () => {
        spyOn(localStorage, 'getItem')
            .and.callFake(mockedLocalStorage.getItem);
            service.getActiveTheme()
                .pipe(take(1))
                .subscribe(theme => {
                    expect(theme).toBe(SupportedThemes.LIGHT_THEME);
                });
        service.initializeTheme();
    });

    it('Should initialize localStorage theme', () => {
        mockedLocalStorage.setItem('currentTheme', SupportedThemes.DARK_THEME); 
        spyOn(localStorage, 'getItem')
            .and.callFake(mockedLocalStorage.getItem);
        service.initializeTheme();
        service.getActiveTheme()
            .pipe(take(1))
            .subscribe(theme => {
                expect(theme).toBe(SupportedThemes.DARK_THEME);
            });
    });
});
