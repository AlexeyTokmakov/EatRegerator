import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '../base-service';
import { ProductsResult, TypeDishesResult, TypesKitchensResult, TypesMenuResult } from './eat';

@Injectable()
export class EatService extends BaseService {

  constructor(http: HttpClient, router: Router) {
    super(http, router);
    this._urlPrefix = "/Eat/";
  }

  public getProducts(): Promise<ProductsResult> {
    return this._http
      .get(this._urlPrefix + "GetProducts", { headers: this._headers })
      .toPromise()
      .then(res => res as ProductsResult)
      .catch(reason => this.handleError(reason, "GetProducts"));
  }

  public getTypeDishes(): Promise<TypeDishesResult> {
    return this._http
      .get(this._urlPrefix + "GetTypeDishes", { headers: this._headers })
      .toPromise()
      .then(res => res as TypeDishesResult)
      .catch(reason => this.handleError(reason, "GetTypeDishes"));
  }

  public getTypesKitchens(): Promise<TypesKitchensResult> {
    return this._http
      .get(this._urlPrefix + "GetTypesKitchens", { headers: this._headers })
      .toPromise()
      .then(res => res as TypesKitchensResult)
      .catch(reason => this.handleError(reason, "GetTypesKitchens"));
  }

  public getTypesMenu(): Promise<TypesMenuResult> {
    return this._http
      .get(this._urlPrefix + "GetTypesMenu", { headers: this._headers })
      .toPromise()
      .then(res => res as TypesMenuResult)
      .catch(reason => this.handleError(reason, "GetTypesMenu"));
  }



  //public getContract(contractGuid: string): Promise<ContractResult> {
  //  return this._http
  //    .post(this._urlPrefix + "GetContract", JSON.stringify(contractGuid), { headers: this._headers })
  //    .toPromise()
  //    .then(res => res as ContractResult)
  //    .catch(reason => this.handleError(reason, "getContract"));
  //}


  
}
