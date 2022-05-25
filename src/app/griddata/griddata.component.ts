import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import {
  CellClickedEvent,
  ColDef,
  GridReadyEvent,
  CheckboxSelectionCallbackParams,
  ICellRendererParams
} from 'ag-grid-community';

import { Observable } from 'rxjs';

import { DateEditor } from '../gridCellEditors/date-editor.component';
import { NumericEditor } from '../gridCellEditors/numbericEditor';
import { DoublingEditor } from '../gridCellEditors/doubling-editor.comonpent'
import { DropDownEditor } from '../gridCellEditors/dropdown-editor.component';
import { CustomDateComponent } from './custom-date-component.component';

import * as moment from 'moment';

@Component({
  selector: 'app-griddata',
  templateUrl: './griddata.component.html',
  styleUrls: ['./griddata.component.css']
})
export class GriddataComponent implements OnInit {

  // Data that gets displayed in the grid
  public rowData$!: Observable<any[]>;

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  public frameworkComponents: any;

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    filter: true,
    floatingFilter: true,
    minWidth: 80,
    //flex: 1,
  };

  public components: { [p: string]: any; } = {
    agDateInput: CustomDateComponent,
  };

  private countries: string[] = [];

  public columnDefs: ColDef[] = [
    {
      headerName: "NAME",
      field: "athlete",
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      width: 150,
      editable: true
    },
    {
      field: "age", width: 90, editable: true,
      valueParser: params => Number(params.newValue),
      cellEditor: DoublingEditor
    },
    {
      field: "country", width: 250, editable: true,
      singleClickEdit: true,
      cellEditor: DropDownEditor,
      cellEditorParams: {
        getOptions: () => {
          return this.countries;
        }
      }
    },
    {
      field: "year", width: 90, editable: true,
      cellRendererParams: (p: any) => {
        return { inputType: 'number' };
      },
      cellEditor: NumericEditor
    },
    {
      field: "date", width: 180, editable: true,
      singleClickEdit: true,
      filter: 'agDateColumnFilter',
      filterParams: filterParams,
      cellRenderer: (c: any) => {
        let regEx = /^\d{4}-\d{2}-\d{2}$/;
        if (c.value.match(regEx))
          return c.value;
        else
          return moment(c.value, "DD/MM/YYYY").format("YYYY-MM-DD");
      },
      cellEditor: "datePicker",
      cellEditorParams: {
        input: "DD/MM/YYYY",
        output: "YYYY-MM-DD"
      }
    },
    { field: "sport", width: 150, editable: true },
    { field: "gold", width: 100, editable: true },
    { field: "silver", width: 100, editable: true },
    { field: "bronze", width: 100, editable: true },
    { field: "total", width: 100, editable: true },
  ];

  private url: string = 'https://www.ag-grid.com/example-assets/olympic-winners.json';

  public loading: boolean = true;

  public initDate: Date = new Date();

  constructor(private http: HttpClient) {
    this.frameworkComponents = {
      datePicker: DateEditor,
    };
  }

  ngOnInit() {
  }

  // load data from sever
  onGridReady(params: GridReadyEvent) {

    this.rowData$ = this.http.get<any[]>(this.url);

    this.rowData$.subscribe(res => {
      let list: Set<string> = new Set<string>();
      res.forEach(x => {
        if (!list.has(x.country))
          list.add(x.country);
      });

      this.countries = Array.from(list.values()).sort();

      this.loading = false;

      console.log('GridReadyEvent, data is loaded');

    });

  }

  // Grid Event, on cell clicked 
  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
}

const filterParams = {
  comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
    const dateAsString = cellValue;
    const dateParts = dateAsString.split('/');
    const cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }

    return 0;
  },
};