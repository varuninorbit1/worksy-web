import { environment } from "../environments/environment";

// easy-debug.decorator.ts
export function easyDebug(name?: string): ClassDecorator {
  return function (target: any) {
    const original = target.prototype.ngOnInit;

    target.prototype.ngOnInit = function (...args: any[]) {
      const debugName = name || target.name;
      if (!environment.production) {
        (window as any)[debugName] = this;
      }

      console.log(`[easyDebug] Exposed component as window['${debugName}']`);

      if (original) {
        original.apply(this, args);
      }
    };
  };
}

// -------------Example usage:-----------
//
// import { Component } from '@angular/core';
// import { easyDebug } from './easy-debug.decorator';

// @easyDebug() // or @easyDebug('MyCustomName')
// @Component({
//   selector: 'app-my-component',
//   templateUrl: './my-component.component.html',
// })
// export class MyComponent {
//   public message = 'Hello from MyComponent!';
// }
