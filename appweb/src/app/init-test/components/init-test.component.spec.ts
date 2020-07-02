import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitTestComponent } from './init-test.component';

describe('InitTestComponent', () => {
  let component: InitTestComponent;
  let fixture: ComponentFixture<InitTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
