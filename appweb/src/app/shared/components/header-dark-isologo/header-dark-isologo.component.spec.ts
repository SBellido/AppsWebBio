import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDarkIsologoComponent } from './header-dark-isologo.component';

describe('HeaderDarkIsologoComponent', () => {
  let component: HeaderDarkIsologoComponent;
  let fixture: ComponentFixture<HeaderDarkIsologoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderDarkIsologoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderDarkIsologoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
