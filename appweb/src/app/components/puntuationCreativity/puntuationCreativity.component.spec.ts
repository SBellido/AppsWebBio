import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntuationCreativityComponent } from './puntuationCreativity.component';

describe('PuntuationCreativityComponent', () => {
  let component: PuntuationCreativityComponent;
  let fixture: ComponentFixture<PuntuationCreativityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntuationCreativityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntuationCreativityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
