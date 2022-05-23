import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';

import { MycelldateComponent } from '../mycelldate/mycelldate.component';
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
    sortable: true,
    filter: true,
  };

  public columnDefs: ColDef[] = [
    { field: "athlete", width: 150, editable: true },
    { field: "age", width: 90, editable: true },
    { field: "country", width: 150, editable: true },
    { field: "year", width: 90, editable: true },
    {
      field: "date", width: 150, editable: true,
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
    this.frameworkComponents = { datePicker: MycelldateComponent };
  }

  ngOnInit() {
  }

  // Example load data from sever
  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.http.get<any[]>(this.url);
    console.log('GridReadyEvent, data is loaded');
    //can't as function(){ } format    
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  // Example of consuming Grid Event
  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
}

