import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesManagement } from './movies-management';

describe('MoviesManagement', () => {
  let component: MoviesManagement;
  let fixture: ComponentFixture<MoviesManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
