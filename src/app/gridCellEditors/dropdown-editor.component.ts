import { ICellEditorAngularComp } from '@ag-grid-community/angular';
import { ICellEditorParams } from '@ag-grid-community/core';
import {
    AfterViewInit,
    Component,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { MatSelect } from '@angular/material/select';

@Component({
    selector: 'editor-cell',
    template: `
    <mat-select [(ngModel)]="selectedValue" style="width:90%; width:90%">
      <option value="" selected></option>
      <mat-option *ngFor="let item of list" [value]="item">
          {{ item }}
      </mat-option>
    </mat-select>`,
})

export class DropDownEditor implements ICellEditorAngularComp, AfterViewInit {
    public selectedValue: any;

    public list: any[];

    @ViewChild(MatSelect, { read: ViewContainerRef })
    public input!: ViewContainerRef;

    ngAfterViewInit() {
        // focus on the input
        setTimeout(() => this.input.element.nativeElement.focus());
    }

    agInit(params: ICellEditorParams | any): void {
        this.list = params.getOptions();
        this.selectedValue = params.value;

    }

    /* Component Editor Lifecycle methods */
    // the final value to send to the grid, on completion of editing
    getValue() {
        return this.selectedValue;
    }

    // Gets called once before editing starts, to give editor a chance to
    // cancel the editing before it even starts.
    isCancelBeforeStart() {
        return false;
    }

    // Gets called once when editing is finished (eg if Enter is pressed).
    // If you return true, then the result of the edit will be ignored.
    isCancelAfterEnd() {
        return false;
    }

    // any cleanup we need to be done here
    destroy() {

    }
    
    // if true, then this editor will appear in a popup
    isPopup() {
        // and we could leave this method out also, false is the default
        return false;
    }
}