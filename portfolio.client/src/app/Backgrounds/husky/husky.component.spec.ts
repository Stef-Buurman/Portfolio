import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuskyComponent } from './husky.component';

describe('HuskyComponent', () => {
  let component: HuskyComponent;
  let fixture: ComponentFixture<HuskyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HuskyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuskyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
