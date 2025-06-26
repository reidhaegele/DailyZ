import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebhookPage } from './webhook-page';

describe('WebhookPage', () => {
  let component: WebhookPage;
  let fixture: ComponentFixture<WebhookPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebhookPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebhookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
