import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GriddataComponent } from './griddata.component';

describe('GriddataComponent', () => {
  let component: GriddataComponent;
  let fixture: ComponentFixture<GriddataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GriddataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GriddataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
