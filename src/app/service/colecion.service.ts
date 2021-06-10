import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { BaseApiClass } from '../core';

@Injectable({
  providedIn: 'root'
})
export class ColecionService extends BaseApiClass {
  baseUrl = environment.serverBaseUrl;

  constructor(protected httpClient: HttpClient, handler: HttpBackend) {
    super(httpClient);
    this.httpClient = new HttpClient(handler);
    this.baseUrl = this.baseUrl + '/colecions';
  }
}
