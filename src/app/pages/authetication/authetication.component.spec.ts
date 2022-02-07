import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutheticationComponent } from './authetication.component';

describe('AutheticationComponent', () => {
  let component: AutheticationComponent;
  let fixture: ComponentFixture<AutheticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutheticationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutheticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
