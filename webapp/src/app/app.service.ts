import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IAccountData } from './app.interface';

//TODO: unit tests for this class
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private $httpService: HttpClient) { }

  public getAccuntsInfo() {
    //TODO:create variable for base domain
    return this.$httpService.get<IAccountData[]>('https://localhost:44389/api/AccountInfo');
  }
}
