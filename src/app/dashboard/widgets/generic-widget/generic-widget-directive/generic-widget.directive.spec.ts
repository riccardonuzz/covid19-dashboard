import { GenericWidgetDirective } from './generic-widget.directive';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';


@Component({
    selector: 'my-test-component',
    template: ''
})
class TestComponent { }

describe('GenericWidgetDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let directiveEl: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent,
                GenericWidgetDirective
            ]
        });
    });

    beforeEach(async () => {
        TestBed.overrideComponent(TestComponent, {
            set: {
                template: '<div genericWidgetHost></div>'
            }
        });
        await TestBed.compileComponents()
        fixture = TestBed.createComponent(TestComponent);
        directiveEl = fixture.debugElement.query(By.directive(GenericWidgetDirective));
    });

    it('Should create an instance', () => {
      expect(directiveEl).not.toBeNull();
    });
});
