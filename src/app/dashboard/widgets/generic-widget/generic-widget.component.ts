import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { WidgetRegistry, DynamicWidget } from '../models/widget-registry';
import { GenericWidgetDirective } from './generic-widget-directive/generic-widget.directive';

@Component({
  selector: 'app-generic-widget',
  templateUrl: './generic-widget.component.html',
  styleUrls: ['./generic-widget.component.scss']
})
export class GenericWidgetComponent implements OnInit {
  @Input() name: string;
  @ViewChild(GenericWidgetDirective, { static: true }) widgetHost: GenericWidgetDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadComponent();
  }

  loadComponent() {
    const registry = WidgetRegistry.getWidgetList();
    const widgetToBeLoaded = registry.find((widget: DynamicWidget) => widget.name === this.name);
    if (widgetToBeLoaded) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(widgetToBeLoaded.component);
      const viewContainerRef = this.widgetHost.viewContainerRef;
      viewContainerRef.clear();
      const componentRef = viewContainerRef.createComponent(componentFactory);
      // (<AdComponent>componentRef.instance).data = adItem.data;
    }
  }
}
