import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryComponent } from './diary.component';

describe('DiaryComponent', () => {
    let component: DiaryComponent;
    let fixture: ComponentFixture<DiaryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DiaryComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DiaryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
