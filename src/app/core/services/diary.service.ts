import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { DiaryEntry } from '../models/diaryEntry';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})

export class DiaryService {

    private diaryEntryCollection: AngularFirestoreCollection<DiaryEntry>;
    diaryEntries: Observable<DiaryEntry[]>;

    constructor(
        public afs: AngularFirestore,   // Inject Firestore service
        public router: Router,
        public ngZone: NgZone, // NgZone service to remove outside scope warning
        private authService: AuthService
    ) {
    }

    public start() {
        this.diaryEntryCollection = this.afs.collection<DiaryEntry>('diaryEntries', ref => ref.orderBy('createdTime', 'asc'));
        this.diaryEntries = this.diaryEntryCollection.valueChanges();
    }

    getTodaysDiaryEntry(): Observable<DiaryEntry[]> {
        return this.diaryEntries
    }

    createDiaryEntry(comment: string) {
        // Persist a document id
        const uid = this.afs.createId();
        const diaryEntry: DiaryEntry = {
            uid,
            comment,
            userFullName: this.authService.getUserFullName(),
            createdTime: this.afs.firestore['_firebaseApp'].firebase_.firestore.FieldValue.serverTimestamp(),
            updatedTime: ''
        };
        this.diaryEntryCollection.doc(uid).set(diaryEntry);
    }

    deleteDiaryEntry() {

    }

    updateDiaryEntry() {

    }
}
