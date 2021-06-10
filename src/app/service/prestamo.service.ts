import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { BaseApiClass } from '../core';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService extends BaseApiClass {
  baseUrl = environment.serverBaseUrl;

  constructor(protected httpClient: HttpClient, handler: HttpBackend) {
    super(httpClient);
    this.httpClient = new HttpClient(handler);
    this.baseUrl = this.baseUrl + '/prestamos';
  }

  getPrestamos() {
    return this.httpClient.get<any>(
      `${this.baseUrl}/prestamos`
    );
  }

  prestar(id: any) {
    return this.httpClient
      .get(`${this.baseUrl}/autorizar/${id}`)
      .pipe(
        map((body: any) => {
          return body;
        })
      );
  }

  getDevoluciones() {
    return this.httpClient.get<any>(
      `${this.baseUrl}/devoluciones`
    );
  }

  devolber(id: any) {
    return this.httpClient
      .get(`${this.baseUrl}/devolber/${id}`)
      .pipe(
        map((body: any) => {
          return body;
        })
      );
  }
}
