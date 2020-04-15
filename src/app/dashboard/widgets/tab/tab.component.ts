import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  constructor() { }

  ngOnInit() {
    if (this.tabs.length > 0) {
      this.selected = this.tabs[0].id;
    }
  }

  onTabChange(tabId: number) {
    this.selected = tabId;
    this.tabChange.emit(tabId);
  }
}
