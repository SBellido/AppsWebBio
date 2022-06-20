import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { RulitFirestoreService } from "../core/rulitFirestore.service";
import { IRulitSettings } from "../rulit/bits/IRulitSettings";

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    private _rulitConfig: IRulitSettings;
    private _rulitConfig$ = new Subject<IRulitSettings>();
    private _rulitSolutionCodeUrl: string = null;

    public isRulitOpen: boolean = false;

    constructor(private _rulitFirestoreServise: RulitFirestoreService)
    {
        this.rulitConfigChanged$.subscribe(
            {
                next: (config) => this.isRulitOpen = config.IS_TEST_OPEN  
            });

        this.loadRulitConfig();
    }

    get rulitConfig(): IRulitSettings 
    {
        return this._rulitConfig;
    }

    get rulitConfigChanged$(): Observable<IRulitSettings> 
    {
        return this._rulitConfig$.asObservable();
    }

    get rulitSolutionCodeUrl(): string 
    {
        return this._rulitSolutionCodeUrl;
    }

    set rulitSolutionCodeUrl(urlCode: string) 
    {
        this._rulitSolutionCodeUrl = urlCode;
    }

    // Load config from db
    async loadRulitConfig(): Promise<void> 
    {
        this._rulitConfig = (await this._rulitFirestoreServise.getRulitSettings()).data();
        this._rulitConfig$.next(this._rulitConfig);
    }
}
