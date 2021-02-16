import { Injectable } from "@angular/core";
import { TestName } from "./TestService";


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
interface IRulitUser {
    userId: number,
    email: string,
    name: string,
    test1: Array<IRulitExercise>,
    test2: Array<IRulitExercise>
    stepErrors: Array<number>,
    nextTest: TestName
    // add stepErrorsTest2
}

@Injectable({
    providedIn: 'root'
})
export class RulitUserService {

    private _user: IRulitUser;

    get user(){
        return this._user;
    }

    // TODO: Store in DB
    storeNewUser(newUserData: {name: string, email: string}){
        this._user = {
            userId: 1,
            email: newUserData.email,
            name: newUserData.name,
            test1: new Array<IRulitExercise>(),
            test2: new Array<IRulitExercise>(),
            stepErrors: new Array<number>(),
            nextTest: "learning"
        };
    }

    // Refactor to load user from db
    loadUserFromDB(userId: number): void {
        console.log("Getting user " + userId);
        if (userId == 1) {
            this._user = {
                userId: 1,
                email: "testuser1@email.com",
                name: "test user 1",
                test1: new Array<IRulitExercise>(),
                test2: new Array<IRulitExercise>(),
                stepErrors: new Array<number>(),
                nextTest: "learning"
            };
        }
        if (userId == 2) {
            this._user = {
                userId: 2,
                email: "testuser2@email.com",
                name: "test user 2",
                test1: new Array<IRulitExercise>(),
                test2: new Array<IRulitExercise>(),
                stepErrors: new Array<number>(),
                nextTest: "long_memory_test"
            };
        }

    }

    haveFinishedTheTest( exercisesArray: Array<IRulitExercise>, MAX_EXERCISES: number ) {
        let exercisesWithoutMistakes = 0;
        exercisesArray.forEach( (exercise) => {
            if ( exercise.totalIncorrectMoves == 0 ) exercisesWithoutMistakes++; 
        });
        return exercisesArray.length == MAX_EXERCISES || exercisesWithoutMistakes >= 2 ;
    }

}