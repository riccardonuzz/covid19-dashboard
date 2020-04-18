import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabComponent } from './tab.component';

const mockedTabs = [{
  id: 1,
  name: 'Example1'
}, {
  id: 2,
  name: 'Example2'
}];

describe('TabComponent', () => {
  let component: TabComponent;
  let fixture: ComponentFixture<TabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should init correctly', () => {
    component.tabs = mockedTabs;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.selected).toEqual(mockedTabs[0].id);
  });

  it('Should change tab', () => {
    spyOn(component.tabChange, 'emit');
    component.onTabChange(mockedTabs[1].id);
    fixture.detectChanges();
    expect(component.tabChange.emit).toHaveBeenCalledWith(mockedTabs[1].id);
    expect(component.selected).toEqual(mockedTabs[1].id);
  });
});
