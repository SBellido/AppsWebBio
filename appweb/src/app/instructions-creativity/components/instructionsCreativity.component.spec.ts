import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { InstructionCreativity } from '../../instruccionsCreativity.module';
import { InstructionsCreativityComponent } from './instructionsCreativity.component';

describe('InstructionsCreativityComponent', () => {
  let component: InstructionsCreativityComponent;
  let fixture: ComponentFixture<InstructionsCreativityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructionsCreativityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionsCreativityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
