import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericWidgetComponent } from './generic-widget.component';
import { WidgetRegistry } from '../models/widget-registry';
import { GenericWidgetDirective } from './generic-widget-directive/generic-widget.directive';

describe('GenericWidgetComponent', () => {
    let component: GenericWidgetComponent;
    let fixture: ComponentFixture<GenericWidgetComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                GenericWidgetComponent,
                GenericWidgetDirective
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GenericWidgetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should load a widget correctly', () => {
        const widgets = WidgetRegistry.getWidgetList();
        component.name = widgets[0].name;
        component.loadComponent();
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement
        expect(compiled.querySelector('app-card')).toBeTruthy();
    });

    it('Should load a widget correctly onInit', () => {
        const widgets = WidgetRegistry.getWidgetList();
        component.name = widgets[0].name;
        component.ngOnInit();
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement
        expect(compiled.querySelector('app-card')).toBeTruthy();
    });
});
