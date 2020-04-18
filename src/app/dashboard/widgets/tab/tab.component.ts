import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Tab } from './tab';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  @Input() tabs: Tab[] = [];
  @Output() tabChange: EventEmitter<number> = new EventEmitter();
  selected: number;
  tabMode: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.breakpointObserver
      .observe(['(min-width: 640px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.tabMode = true;
        } else {
          this.tabMode = false;
        }
      });

    if (this.tabs.length > 0) {
      this.selected = this.tabs[0].id;
    }
  }

  onTabChange(tabId: number) {
    this.selected = +tabId;
    this.tabChange.emit(+tabId);
  }
}
