import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetAndamentoNazionaleComponent } from './widget-andamento-nazionale.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Subject } from 'rxjs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CardComponent } from '../card/card.component';

describe('WidgetAndamentoNazionaleComponent', () => {
    let component: WidgetAndamentoNazionaleComponent;
    let fixture: ComponentFixture<WidgetAndamentoNazionaleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, HttpClientTestingModule, NgxChartsModule],
            declarations: [CardComponent, WidgetAndamentoNazionaleComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WidgetAndamentoNazionaleComponent);
        component = fixture.componentInstance;
        component.dashboardUpdate$ = new Subject();
        fixture.detectChanges();
    });

    it('Should create', () => {
        expect(component).toBeTruthy();
    });
});
