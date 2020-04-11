import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent {
  @Input() enabled: boolean;
  @Input() className: string;
  @Output() onToggle: EventEmitter<boolean> = new EventEmitter();

  onClick() {
    this.enabled = !this.enabled;
    this.onToggle.emit(this.enabled);
  }
}
