import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveUserComponent } from './save-user.component';

describe('InitTestComponent', () => {
  let component: SaveUserComponent;
  let fixture: ComponentFixture<SaveUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
