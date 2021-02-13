import { IRulitExercise, IRulitStep } from "./RulitUserService";

interface IRulitTestStep extends IRulitStep {
    initialTime: number
}

export interface IRulitTestExercise extends IRulitExercise {
    currentStep: IRulitTestStep,
    initNewStep(): void,
    completeCurrentStep(): void,
    addIncorrectMove(): void,
    toDataExercise(): IRulitExercise,
    toDataStep(theStep: IRulitTestStep): IRulitStep
}

export class ExerciseService implements IRulitTestExercise {

    totalCorrectMoves: number;
    totalIncorrectMoves: number;
    totalExerciseTime: number;
    steps: Array<IRulitStep>;
    currentStep: IRulitTestStep;

    constructor(){
        this.totalCorrectMoves = 0;
        this.totalIncorrectMoves = 0;
        this.totalExerciseTime = 0;
        this.steps = new Array<IRulitStep>();
        this.currentStep = null;
    }

    initNewStep(): void {
        this.currentStep = this.buildNewStep();
    }

    completeCurrentStep(): void {
        let currentTimeInMilliseconds = new Date().getTime();

        let timeDiff = new Date(currentTimeInMilliseconds - this.currentStep.initialTime);
        this.currentStep.elapsedTime = timeDiff.getMinutes() * 60 * 1000;
        this.currentStep.elapsedTime += timeDiff.getSeconds() * 1000;
        this.currentStep.elapsedTime += timeDiff.getMilliseconds();

        this.currentStep.correctMoves++;
        this.totalCorrectMoves++;
        this.totalExerciseTime += this.currentStep.elapsedTime;
        
        let completeStep = this.toDataStep(this.currentStep);

        this.steps.push(completeStep);
    }

    addIncorrectMove() {
        this.currentStep.incorrectMoves++;
        this.totalIncorrectMoves++;
    }

    toDataExercise(): IRulitExercise {
        
        const dataExercise: IRulitExercise = {
            totalCorrectMoves: this.totalCorrectMoves,
            totalIncorrectMoves: this.totalIncorrectMoves,
            totalExerciseTime: this.totalExerciseTime,
            steps : this.steps
        }

        return dataExercise;
    }

    toDataStep(theStep: IRulitTestStep): IRulitStep {
        return {
            correctMoves: theStep.correctMoves,
            incorrectMoves: theStep.incorrectMoves,
            elapsedTime: theStep.elapsedTime
        } as IRulitStep;
    }

    private buildNewStep = () => {
        
        let currentTimeInMilliseconds = new Date().getTime();
        
        return {
            initialTime: currentTimeInMilliseconds,
            elapsedTime: 0,
            correctMoves: 0,
            incorrectMoves: 0
        } as IRulitTestStep;
    }

}
