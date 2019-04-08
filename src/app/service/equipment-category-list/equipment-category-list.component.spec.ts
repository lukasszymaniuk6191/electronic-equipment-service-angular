import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentCategoryListComponent } from './equipment-category-list.component';

describe('EquipmentCategoryListComponent', () => {
  let component: EquipmentCategoryListComponent;
  let fixture: ComponentFixture<EquipmentCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
