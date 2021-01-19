import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { DocumentData, DocumentSnapshot } from "@angular/fire/firestore";
import { BehaviorSubject, Observable } from "rxjs";
import { DataDbService } from "../services/db/data-db.service";
import { CreativeUser } from "./creative-user.interface";

export class CreativityTestsDataSource implements DataSource<CreativeUser> {

    private testsSubject = new BehaviorSubject<CreativeUser[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    private firstUserInPage: firebase.firestore.DocumentSnapshot<DocumentData> = null;
    private lastUserInPage: firebase.firestore.DocumentSnapshot<DocumentData> = null;

    constructor(private dbService: DataDbService) {}

    connect(collectionViewer: CollectionViewer): Observable<CreativeUser[]> {
        return this.testsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.testsSubject.complete();
        this.loadingSubject.complete();
    }
  
    loadTests(pageSize: number) {
        // console.log(this.lastestUser);
        this.loadingSubject.next(true);

        this.dbService.getTestsFirstPage(pageSize).subscribe( async tests => {
            // console.log(tests);
            let arrUsers: CreativeUser[] = [];
            tests.forEach( test => {
                arrUsers.push(test.payload.doc.data());
            });
            this.firstUserInPage = await tests[0].payload.doc.ref.get();
            this.lastUserInPage = await tests[tests.length - 1].payload.doc.ref.get();
            // console.log(this.lastUserInPage);
            this.testsSubject.next(arrUsers);
            this.loadingSubject.next(false);
        });
    }

    loadNextTestsPage(pageSize: number){
        
        this.loadingSubject.next(true);

        this.dbService.getTestsNextPage(this.lastUserInPage, pageSize).subscribe( async tests => {
            // console.log(tests);
            let arrUsers: CreativeUser[] = [];
            tests.forEach( test => {
                arrUsers.push(test.payload.doc.data());
            });
            this.firstUserInPage = await tests[0].payload.doc.ref.get();
            this.lastUserInPage = await tests[tests.length - 1].payload.doc.ref.get();
            this.testsSubject.next(arrUsers);
            this.loadingSubject.next(false);
        });
    }
    
    loadPrevTestsPage(pageSize: number){
        
        this.loadingSubject.next(true);

        this.dbService.getTestsPrevPage(this.firstUserInPage, pageSize).subscribe( async tests => {
            // console.log(tests);
            let arrUsers: CreativeUser[] = [];
            tests.forEach( test => {
                arrUsers.push(test.payload.doc.data());
            });
            this.firstUserInPage = await tests[0].payload.doc.ref.get();
            this.lastUserInPage = await tests[tests.length - 1].payload.doc.ref.get();
            this.testsSubject.next(arrUsers);
            this.loadingSubject.next(false);
        });
    }
}