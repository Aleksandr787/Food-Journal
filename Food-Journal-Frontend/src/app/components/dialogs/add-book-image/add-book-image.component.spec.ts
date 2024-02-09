import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookImageComponent } from './add-book-image.component';

describe('AddBookComponent', () => {
  let component: AddBookImageComponent;
  let fixture: ComponentFixture<AddBookImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBookImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBookImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
