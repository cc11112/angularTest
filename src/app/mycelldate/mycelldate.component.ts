import {
  Component,
  QueryList,
  ViewChildren,
  ViewContainerRef
} from "@angular/core";
import { MatInput } from '@angular/material/input';
//import {  ICellEditorComp, ICellEditorParams } from "ag-grid-community";
import { ICellEditorAngularComp } from "@ag-grid-community/angular"

import * as moment from 'moment';


@Component({
  selector: 'input-cell',
  template: `
    <mat-form-field appearance="fill">
      <input #ref [(ngModel)]="inputDate" matInput [matDatepicker]="cellDatePicker" (focus)="cellDatePicker.open()" 
      (dateChange)="orgValueChange(ref)"/>
      <mat-datepicker-toggle matSuffix [for]="cellDatePicker"></mat-datepicker-toggle>
      <mat-datepicker #cellDatePicker></mat-datepicker>
    </mat-form-field>
  `
})

export class MycelldateComponent implements ICellEditorAngularComp {
  private params: any;
  private format: string;
  private sourceFormat: string;

  public inputDate: Date;

  @ViewChildren(MatInput, { read: ViewContainerRef }) inputs!: QueryList<any>;

  private focusedInput: number = 0;

  agInit(params: any) {

    this.params = params;

    this.sourceFormat = params.input;

    this.format = params.output;

    this.inputDate = moment(this.params.value, this.sourceFormat).toDate();
  }

  // dont use afterGuiAttached for post gui events - hook into ngAfterViewInit instead for this
  ngAfterViewInit() {
    this.focusOnInputNextTick(this.inputs.first);
  }

  private focusOnInputNextTick(input: ViewContainerRef) {
    if (input && input.element) {
      window.setTimeout(() => {
        input.element.nativeElement.focus();
        input.element.nativeElement.value = "";
        window.setTimeout(() => {
          this.orgValueChange(input.element.nativeElement);
        }, 100);
      }, 0);
    }
  }


  // focus and select can be done after the gui is attached
  afterGuiAttached() {

  }

  getValue() {
    return moment(this.inputDate).format(this.sourceFormat);
  }

  isPopup(): boolean {
    return true;
  }

  orgValueChange(obj: any) {
    obj.value = moment(this.inputDate).format(this.format);
  }

  /*
   * A little over complicated for what it is, but the idea is to illustrate how you might tab between multiple inputs
   * say for example in full row editing
   */
  onKeyDown(event: any): void {
    let key = event.which || event.keyCode;
    if (key == 9) {
      // tab
      this.preventDefaultAndPropagation(event);

      // either move one input along, or cycle back to 0
      this.focusedInput =
        this.focusedInput === this.inputs.length - 1
          ? 0
          : this.focusedInput + 1;

      let focusedInput = this.focusedInput;
      let inputToFocusOn = this.inputs.find((item: any, index: number) => {
        return index === focusedInput;
      });

      this.focusOnInputNextTick(inputToFocusOn);
    } else if (key == 13) {
      // enter
      // perform some validation on enter - in this example we assume all inputs are mandatory
      // in a proper application you'd probably want to inform the user that an input is blank
      this.inputs.forEach(input => {
        if (!input.element.nativeElement.value) {
          this.preventDefaultAndPropagation(event);
          this.focusOnInputNextTick(input);
        }
      });
    }
  }

  private preventDefaultAndPropagation(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

}

