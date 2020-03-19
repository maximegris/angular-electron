import { Component, OnInit } from '@angular/core';
import { DiaryService } from '../../core/services/diary.service';

@Component({
    selector: 'app-diary',
    templateUrl: './diary.component.html',
    styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {

    constructor(private diaryService: DiaryService) { }

    ngOnInit(): void {
        // this.diaryService.start();
    }

}
