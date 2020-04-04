import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStationsComponent } from './manage-stations.component';

describe('ManageStationsComponent', () => {
  let component: ManageStationsComponent;
  let fixture: ComponentFixture<ManageStationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageStationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
