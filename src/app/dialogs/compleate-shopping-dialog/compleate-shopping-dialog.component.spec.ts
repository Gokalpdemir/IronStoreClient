import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleateShoppingDialogComponent } from './compleate-shopping-dialog.component';

describe('CompleateShoppingDialogComponent', () => {
  let component: CompleateShoppingDialogComponent;
  let fixture: ComponentFixture<CompleateShoppingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompleateShoppingDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompleateShoppingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
