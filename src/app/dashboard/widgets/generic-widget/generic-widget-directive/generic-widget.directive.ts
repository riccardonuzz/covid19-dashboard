import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[genericWidgetHost]'
})
export class GenericWidgetDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
