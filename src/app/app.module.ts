import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialExampleModule } from './material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';


import { AppComponent } from './app.component';
import { GriddataComponent } from './griddata/griddata.component';
import { DateEditor } from './gridCellEditors/date-editor.component';
import { DoublingEditor } from './gridCellEditors/doubling-editor.comonpent'

@NgModule({
  declarations: [
    AppComponent,
    GriddataComponent,
    DateEditor,
    DoublingEditor
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AgGridModule,
    HttpClientModule,
    MaterialExampleModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
