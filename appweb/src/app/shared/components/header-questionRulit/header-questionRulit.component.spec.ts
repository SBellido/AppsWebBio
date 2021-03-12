import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderQuestionRulitComponent } from './header-questionRulit.component';

describe('HeaderQuestionRulitComponent', () => {
  let component: HeaderQuestionRulitComponent;
  let fixture: ComponentFixture<HeaderQuestionRulitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderQuestionRulitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderQuestionRulitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
