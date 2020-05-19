import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss']
})
export class FindComponent {
  constructor(public _router: Router,
    private _route: ActivatedRoute) {

  }
  public productValue: string = '';
  public isOpen: boolean = false;
  public products: Array<string> = ["молоко", "мука", "специи"];
  public selectedProducts: Array<string> = [];

  public isOpenType: boolean = false;
  public type: Array<string> = ["завтрак", "обед", "ужин"];
  public selectedtype: string = "";

  public keyup() {
    if (this.productValue.length > 2)
      this.isOpen = true;
  }

  public focus() {
    if (this.productValue.length > 2)
      this.isOpen = true;
  }

  public close() {
    this.isOpen = false;
  }

  public add(s: string) {
    this.selectedProducts.push(s);
  }

  public addType(s: string) {
    this.selectedtype = s;
  }

  public navigateId(page: string, id: string | number) {
    this._router.navigate(['/' + page, id]);
  }
}
