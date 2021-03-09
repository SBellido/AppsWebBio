import { Injectable } from "@angular/core";
import { DocumentReference } from "@angular/fire/firestore";
import { DataDbService } from "src/app/core/services/db/data-db.service";
import { TestName } from "./RulitTestService";


// Step stored in DB
export interface IRulitStep {
    elapsedTime: number,
    correctMoves: number,
    incorrectMoves: number
}

// Exercise stored in DB
export interface IRulitExercise {
    totalCorrectMoves: number,
    totalIncorrectMoves: number,
    totalExerciseTime: number,
    steps: Array<IRulitStep>
}

// RulitUser stored in DB
export interface IRulitUser {
    userId: string,
    email: string,
    name: string,
    shortMemoryTest: Array<IRulitExercise>,
    longMemoryTest: Array<IRulitExercise>,
    stepErrors: Array<number>,
    nextTest: TestName,
    timestamp?: any
}

@Injectable({
    providedIn: 'root'
})
export class RulitUserService {

    private _user: IRulitUser;
    private _userDbRef: DocumentReference;

    constructor(private _dbService: DataDbService){}

    get user(){
        return this._user;
    }

    setNewUser(newUserData: {name: string, email: string}): void{
        this._user = {
            userId: "",
            email: newUserData.email,
            name: newUserData.name,
            shortMemoryTest: new Array<IRulitExercise>(),
            longMemoryTest: new Array<IRulitExercise>(),
            stepErrors: new Array<number>(),
            nextTest: "learning"
        };
        
        for (var i = 0; i < 15; i++) this._user.stepErrors.push(0);

        this._userDbRef = this._dbService.getNewRulitDocumentRef();
        this._user.userId = this._userDbRef.id;

    }

    // Load user from db
    async loadUserFromDB(userId: string): Promise<boolean> {
        this._user = await this._dbService.getRulitUserData(userId);
        return true;
    }

    getTotalCorrectExercises(exercisesArray: Array<IRulitExercise>, testName: TestName): number {
        
        // In this context _user.nextTest has the name of the current test

        if ( testName == "learning" ) return -1;

        let exercises: Array<IRulitExercise>;
        
        if ( testName == "short_memory_test" ) {
            // Exclude the "learning" exercise from the count.
            exercises = Object.assign([],exercisesArray.slice(1,exercisesArray.length));
        } 
        else if ( testName == "long_memory_test" )
            exercises = exercisesArray;

        let exercisesWithoutMistakes = 0;
        exercises.forEach( (exercise) => {
            if ( exercise.totalIncorrectMoves == 0 ) exercisesWithoutMistakes++; 
        });
        return exercisesWithoutMistakes;

    }

    saveTestData() {
        this._dbService.saveRulitUserData(this._user);
    }

}