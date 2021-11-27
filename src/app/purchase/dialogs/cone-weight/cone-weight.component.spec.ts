import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConeWeightComponent } from './cone-weight.component';

describe('ConeWeightComponent', () => {
  let component: ConeWeightComponent;
  let fixture: ComponentFixture<ConeWeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConeWeightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConeWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
