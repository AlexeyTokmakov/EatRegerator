import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EatService } from '../../services/eat-service/eat-service';
import { BaseResponse } from '../../services/BaseResponse';
import { Products, GetDishesInput, TypeDishes, TypeKitchen, TypeMenu } from '../../services/eat-service/eat';
import { DropdownSearchData, DropdownData } from '../../lib/dropdownData';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss']
})
export class FindComponent implements OnInit {
  constructor(public _router: Router,
    private _route: ActivatedRoute,
    private eatService: EatService) {
  }
  public isError: boolean = false;

  public data: GetDishesInput = new GetDishesInput();

  public increaseProduct: DropdownSearchData;
  public decreaseProduct: DropdownSearchData;

  public typeDishes: DropdownData;
  public typesKitchens: DropdownData;
  public typesMenu: DropdownData;


  public selectedtype: string = "";

  ngOnInit(): void {
    this.initField();
  }

  public initField() {
    this.increaseProduct = new DropdownSearchData(() => this.eatService.getProducts(), "products");
    this.decreaseProduct = new DropdownSearchData(() => this.eatService.getProducts(), "products");
    this.typeDishes = new DropdownData(() => this.eatService.getTypeDishes(), "typeDishes");
    this.typesKitchens = new DropdownData(() => this.eatService.getTypesKitchens(), "typesKitchen");
    this.typesMenu = new DropdownData(() => this.eatService.getTypesMenu(), "typesMenu");
  }


  public addIncreaseProduct(product: Products) {
    if (this.data.increaseProductGuids.length > 5) return;
    this.increaseProduct.selectValue(product.name)
    this.data.increaseProductGuids.push(product.productGuid);
  }

  public addDecreaseProduct(product: Products) {
    if (this.data.decreaseProductGuids.length > 5) return;
    this.decreaseProduct.selectValue(product.name)
    this.data.decreaseProductGuids.push(product.productGuid);
  }

  public selectTypeDishes(type: TypeDishes) {
    this.data.typeDishesGuid = type.typeGuid;
    this.typeDishes.selectValue(type.title);
  }

  public selectTypesKitchens(type: TypeKitchen) {
    this.data.typeKitchensGuid = type.kitchenTypeGuid;
    this.typesKitchens.selectValue(type.title);
  }

  public selectTypesMenu(type: TypeMenu) {
    this.data.typeMenuGuid = type.typeMenuGuid;
    this.typesMenu.selectValue(type.title);
  }


  public addType(s: string) {
    this.selectedtype = s;
  }

  public navigateId(page: string, id: string | number) {
    this._router.navigate(['/' + page, id]);
  }

}
