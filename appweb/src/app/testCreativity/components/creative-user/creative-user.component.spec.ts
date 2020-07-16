import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreativeUserComponent } from './creative-user.component';

describe('CreativeUserComponent', () => {
  let component: CreativeUserComponent;
  let fixture: ComponentFixture<CreativeUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreativeUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreativeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
