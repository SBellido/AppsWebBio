import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { DocumentData, DocumentSnapshot } from "@angular/fire/firestore";
import { BehaviorSubject, Observable } from "rxjs";
import { DataDbService } from "../services/db/data-db.service";
import { CreativeUser } from "./creative-user.interface";

export class CreativityTestsDataSource implements DataSource<CreativeUser> {

    private testsSubject = new BehaviorSubject<CreativeUser[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    private actualFirstInPage: firebase.firestore.DocumentSnapshot<DocumentData> = null;
    private actualLastInPage: firebase.firestore.DocumentSnapshot<DocumentData> = null;
    private prevFirstQueue: Array<firebase.firestore.DocumentSnapshot<DocumentData>> = [];

    constructor(private dbService: DataDbService) {}

    connect(collectionViewer: CollectionViewer): Observable<CreativeUser[]> {
        return this.testsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.testsSubject.complete();
        this.loadingSubject.complete();
    }
  
    loadTests(pageSize: number) {
        
        this.loadingSubject.next(true);

        this.dbService.getTestsFirstPage(pageSize).subscribe( async tests => {
            
            let arrUsers: CreativeUser[] = [];
            
            tests.docs.forEach( test => {
                arrUsers.push(test.data());
            });

            this.actualFirstInPage = await tests.docs[0].ref.get();
            this.actualLastInPage = await tests.docs[tests.size - 1].ref.get();
            
            this.testsSubject.next(arrUsers);
            this.loadingSubject.next(false);
        });
    }

    loadNextTestsPage(pageSize: number){
        
        this.loadingSubject.next(true);

        this.prevFirstQueue.push(this.actualFirstInPage);

        this.dbService.getTestsNextPage(this.actualLastInPage, pageSize).subscribe( async tests => {
            
            let arrUsers: CreativeUser[] = [];
            
            tests.docs.forEach( test => {
                arrUsers.push(test.data());
            });
            
            this.actualFirstInPage = await tests.docs[0].ref.get();
            this.actualLastInPage = await tests.docs[tests.size - 1].ref.get();
            
            this.testsSubject.next(arrUsers);
            this.loadingSubject.next(false);
        });
    }
    
    loadPrevTestsPage(pageSize: number){
        
        this.loadingSubject.next(true);

        let prevFirst = this.prevFirstQueue.pop();

        this.dbService.getTestsPrevPage( prevFirst,this.actualFirstInPage, pageSize).subscribe( async tests => {

            let arrUsers: CreativeUser[] = [];
            tests.docs.forEach( test => {
                arrUsers.push(test.data());
            });
            
            this.actualFirstInPage = await tests.docs[0].ref.get();
            this.actualLastInPage = await tests.docs[tests.size - 1].ref.get();


            this.testsSubject.next(arrUsers);
            this.loadingSubject.next(false);
        });
    }
}