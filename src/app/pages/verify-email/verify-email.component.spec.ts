import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEmailComponent } from './verify-email.component';

describe('VerifyEmailComponent', () => {
    let component: VerifyEmailComponent;
    let fixture: ComponentFixture<VerifyEmailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VerifyEmailComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VerifyEmailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
