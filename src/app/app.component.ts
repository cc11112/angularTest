import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var $: any;  // Declaring $ as a variable so that we can use it to access jQuery

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}