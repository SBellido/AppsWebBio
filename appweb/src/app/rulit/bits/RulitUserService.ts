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
        for (var i = 0; i < 15; i++) this._user.stepErrors.push(0);
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
            for (var i = 0; i < 15; i++) this._user.stepErrors.push(0);
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

}