import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { ToggleButtonComponent } from './header/toggle-button/toggle-button.component';
import { GridsterModule } from 'angular-gridster2';
import { ThemeService } from './theme/theme.service';
import { DashboardService } from './dashboard/dashboard.service';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let app: AppComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                GridsterModule
            ],
            declarations: [
                AppComponent,
                HeaderComponent,
                ToggleButtonComponent,
                DashboardComponent
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        app = fixture.debugElement.componentInstance;
    }));

    it('Should create the app', () => {
        expect(app).toBeTruthy();
    });

    it(`Should render inner components`, () => {
        expect(fixture.debugElement.nativeElement.querySelector('.app-wrapper'))
            .toBeTruthy();
        expect(fixture.debugElement.nativeElement.querySelector('app-header'))
            .toBeTruthy();
        expect(fixture.debugElement.nativeElement.querySelector('app-dashboard'))
            .toBeTruthy();
    });
});
