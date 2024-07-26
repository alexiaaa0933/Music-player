import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistTop5Component } from './artist-top-5.component';

describe('ArtistTop5Component', () => {
  let component: ArtistTop5Component;
  let fixture: ComponentFixture<ArtistTop5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtistTop5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistTop5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
