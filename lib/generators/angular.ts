const generator = {
  staticFiles() {
    return [
      {
        path: "src/app/app.component.ts",
        content: `
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<h1>Hello Angular Scaffold</h1>',
})
export class AppComponent {}
`,
      },
      {
        path: "src/app/app.module.ts",
        content: `
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
`,
      },
    ];
  },
};

export default generator;
