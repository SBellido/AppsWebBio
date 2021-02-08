import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable()
export class RulitUserService {

    getUser(userId: string): Observable<any>{
        console.log("Getting user " + userId);
        return of({email: "user@test.com"})
    }

}