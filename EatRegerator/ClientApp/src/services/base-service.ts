import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

export class BaseService {
  protected _headers;
  protected _urlPrefix;
  protected _http: HttpClient;
  protected _router: Router;
  protected host: string = "";

  constructor(http: HttpClient, router: Router) {
    this._http = http;
    this._router = router;
    this._headers = new HttpHeaders({ "Content-Type": "application/json;charset=utf-8" });
    this._urlPrefix = "Api";
  }



  protected setPort(port) {
    if (port) {
      if (port == 443) port = 80;
      this.host = "http://localhost:" + port;
    }
  }

  public getPrefix(): string {
    return this._urlPrefix;
  }

  protected handleError(error: any, method: string): Promise<any> {
    if (error != null && error.error != null && error.error.ErrorCode != null) {
      if (error.error.ErrorCode == 400) {
        this._router.navigate(['/']);
        return Promise.reject(error.error.ErrorMessage);
      }
      if (error.error.ErrorCode == 401) {
        this._router.navigate(['login']);
        return Promise.reject(error.error.ErrorMessage);
      }
      /*if (error.error.ErrorCode == 403) {
        this._router.navigate(['login']);
        return Promise.reject(error.error.ErrorMessage);
      }*/
    }
    console.error('An error occurred @ ' + method + ' service call', error);
    return Promise.reject(error.message || 'An error occurred @ ' + method + ' service call');
  }

  protected handleErrorCasual(error: any, method: string): Promise<any> {
    console.error('An error occurred @ ' + method + ' service call', error);
    return Promise.reject(error.message || 'An error occurred @ ' + method + ' service call');
  }

  /*protected handleSuccess<T>(result: T): Promise<T> {
    var res: any = result;
    if (res && res.errorCode && res.errorCode == 101) {
      this._router.navigate(['/', 'login']);
      return Promise.reject("invalid token");
    }
    return Promise.resolve(result);
  }*/

}
