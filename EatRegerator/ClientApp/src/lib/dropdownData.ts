import { BaseResponse } from "../services/BaseResponse";

export class DropdownSearchData {
  public isOpen: boolean = false;
  public minSymbol: number = 3;
  public serviceCallback: any;
  public serviceFieldResult: string;
  public value: string;
  public listSelect: Array<any>;
  public selectedItems: Array<string>= [];

  constructor(serviceCallback?: any, serviceFieldResult?: string) {
    if (serviceCallback) this.serviceCallback = serviceCallback;
    if (serviceFieldResult) this.serviceFieldResult = serviceFieldResult;
  }

  public keyup() {
    if (this.value.length < this.minSymbol) {
      this.listSelect = [];
      this.close();
      return;
    };
    if (this.serviceCallback)
      this.serviceCallback().then(res => {
        if (Validator.checkException(res))
          this.listSelect = res[this.serviceFieldResult];
      });
    this.isOpen = true;
  }

  public focus() {
    if (this.value.length < this.minSymbol) return;
    this.isOpen = true;
  }

  public close() {
    this.isOpen = false;
  }

  public selectValue(selectValue: string) {
    this.selectedItems.push(selectValue);
  }
}

export class DropdownData {
  public isOpen: boolean = false;
  public listSelect: Array<any>;
  public selectedValue: string = "";
  public serviceCallback: any;
  public serviceFieldResult: string;


  constructor(serviceCallback: any, serviceFieldResult: string) {
    this.serviceCallback = serviceCallback;
    this.serviceFieldResult = serviceFieldResult;
      this.serviceCallback().then(res => {
        if (Validator.checkException(res))
          this.listSelect = res[this.serviceFieldResult];
      });
  }

  public selectValue(selectValue: string) {
    this.selectedValue = selectValue;
  }

  public close() {
    this.isOpen = false;
  }

  public click() {
    this.isOpen = !this.isOpen;
  }
}


export class Validator {
  public static checkException(res: BaseResponse): boolean {
    if (res.resultCode != -1) return true;
    //this.isError = true;
    return false;
  }
}
