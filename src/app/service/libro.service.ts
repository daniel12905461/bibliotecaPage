import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BaseApiClass } from '../core';
import { environment } from 'src/environments/environment.prod';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService extends BaseApiClass {
  baseUrl = environment.serverBaseUrl;

  constructor(protected httpClient: HttpClient, handler: HttpBackend) {
    super(httpClient);
    this.httpClient = new HttpClient(handler);
    this.baseUrl = this.baseUrl + '/libros';
  }

  findLibros(data: any) {
    return this.httpClient.post<any[]>(this.baseUrl + `/reporte/find`, data);
  }

  generarPdf(data: any) {
    return this.httpClient.post(this.baseUrl + `/pdf`, data, {
      responseType: 'blob'
    });
  }
}
