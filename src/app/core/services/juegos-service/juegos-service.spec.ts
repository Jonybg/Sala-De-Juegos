import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegosService } from './juegos-service';

describe('JuegosService', () => {
  let component: JuegosService;
  let fixture: ComponentFixture<JuegosService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuegosService],
    }).compileComponents();

    fixture = TestBed.createComponent(JuegosService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
