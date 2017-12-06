import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { urlDic } from '../environments/environment';

@Injectable()
export class WebService {

  constructor(private http: HttpClient) { }

  getData(data: any, apiAction: string) {
    const url = urlDic.get('baseUrl') + urlDic.get(apiAction);
    const params = new HttpParams().set('parameter', data);
    return this.http.get(url, { params });
  }


  getError(data: string) {
    const url = urlDic.get('baseUrl') + urlDic.get('getError');
    const params = new HttpParams().set('str', data);
    return this.http.get(url, { params });
  }
}
