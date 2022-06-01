import { Injectable } from "@angular/core";
import { IEncodeUser } from "../models/IEncodeUser";
import { HttpClient } from "@angular/common/http";
import { IEncodeGoogleFormsSettings } from "../models/IEncodeGoogleFormsSettings";
import { IEncodeGoogleFormResponse } from "../models/IEncodeGoogleFormResponse";
import { lastValueFrom, Observable } from "rxjs";
import { IEncodeSessionOne } from "../models/IEncodeSessionOne";
import { IEncodeSessionTwo } from "../models/IEncodeSessionTwo";
import { IEncodeUserConsent } from "../models/IEncodeUserConsent";
import { SessionsEnum } from "../constants";
import { FirestoreService } from "src/app/core/firestore.service";
import { serverTimestamp } from "@angular/fire/firestore";

@Injectable({
    providedIn: 'root'
})
export class EncodeUserService {
    
    private _user: IEncodeUser = null;
    
    constructor(private _firestoreService: FirestoreService, private _http: HttpClient)
    {
    }    
    
    // creates and stores a new user
    // returns the created user
    public async createNewUser(userData: {name: string, email: string}): Promise<IEncodeUser> | null
    {
        const newUserRef = this._firestoreService.getEncodeNewUserDocumentRef();
        const googleFormsResponses: IEncodeGoogleFormResponse[] = await this._getGoogleFormsPreFilledURLs(newUserRef.id);

        const newSessionOne: IEncodeSessionOne = { 
            completed: false, 
            somnolenceDegree: null, 
            audios: null 
        };

        const newSessionTwo: IEncodeSessionTwo = { 
            completed: false, 
            perpetratorCondition: null, 
            somnolenceDegree: null, 
            identificationResponse: null, 
            audios: null, 
            imageSelectionResponse: null,
            imageSortingResponse: null
        };
        
        const userConsent: IEncodeUserConsent = { hasAccepted: false, date: null };

        const newUserData: IEncodeUser = {
            uid: newUserRef.id, 
            name: userData.name, 
            email: userData.email, 
            googleFormsResponses: googleFormsResponses,
            creationDate: serverTimestamp(),
            personalInfo: null,
            sessionOne: newSessionOne,
            sessionTwo: newSessionTwo,
            healthInfo: null,
            abandonedByUser: false,
            consent: userConsent
        };
        
        await this._firestoreService.createNewEncodeUser(newUserData, newUserRef);
        return newUserData;
    }

    get user(): IEncodeUser 
    {
        return this._user;
    }

    set user(user: IEncodeUser) {
        this._user = user;
    }

    get googleForms$(): Observable<IEncodeGoogleFormResponse[]> | null{
        // return (this._user == null) ? null : this._dbService.getEncodeUserForms$(this._user.uid);
        return null;
    }

    get session(): SessionsEnum
    {
        if (this._user.sessionOne.completed == true && this._user.sessionTwo.perpetratorCondition) 
        {
            return SessionsEnum.SessionTwo;
        } else 
        {
            return SessionsEnum.SessionOne;
        }
    }

    public async updateUserInDB() {
        // if (this._user == null) return ;
        // await this._dbService.updateEncodeUser(this._user);
    }

    public abandonTest(): Promise<void> {
        this._user.abandonedByUser = true;
        return this.updateUserInDB();
    }
    
    private async _getGoogleFormsPreFilledURLs(newUserId: string): Promise<IEncodeGoogleFormResponse[]> | null {
        const googleFormsSettings: IEncodeGoogleFormsSettings = await this._firestoreService.getEncodeGoogleFormsSettings();
        const options = {
            params: {
                userId: newUserId,
                formsURLs: googleFormsSettings.googleFormsURLs
            }
        }

        const request$ = this._http.get<IEncodeGoogleFormResponse[]>(googleFormsSettings.generatePreFilledResponsesScriptURL, options);
        return lastValueFrom(request$);
    }
}