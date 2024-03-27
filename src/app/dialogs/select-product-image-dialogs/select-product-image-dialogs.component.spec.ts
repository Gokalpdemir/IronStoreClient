import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProductImageDialogsComponent } from './select-product-image-dialogs.component';

describe('SelectProductImageDialogsComponent', () => {
  let component: SelectProductImageDialogsComponent;
  let fixture: ComponentFixture<SelectProductImageDialogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectProductImageDialogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectProductImageDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
