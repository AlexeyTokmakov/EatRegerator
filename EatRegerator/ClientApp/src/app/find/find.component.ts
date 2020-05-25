import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EatService } from '../../services/eat-service/eat-service';
import { BaseResponse } from '../../services/BaseResponse';
import { Products, GetDishesInput, TypeDishes, TypeKitchen, TypeMenu, Dishes } from '../../services/eat-service/eat';
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

  public dishes: Array<Dishes> = [];
  public grid: any = [];
  public countPages: number;
  public activePage: number;

  ngOnInit(): void {
    this.initField();
  }

  public initField() {
    this.increaseProduct = new DropdownSearchData((val) => this.eatService.getProducts(val), "products");
    this.decreaseProduct = new DropdownSearchData((val) => this.eatService.getProducts(val), "products");
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

  public search() {
    this.loadDishes();
  }

  public loadDishes() {
    this.eatService.getDishes(this.data).then(res => {
      this.dishes = res.dishes;
      this.BuildGrid();
    }).catch(res => {
      this.isError = true;
    })
  }

  public BuildGrid() {
    this.grid = this.dishes.slice(0, 6);
    this.countPages = Math.ceil(this.dishes.length / 6);
    this.activePage = 1;
  }

  public Next() {
    if (this.activePage == this.countPages) return;
    this.activePage++;
    let start = (this.activePage - 1) * 5;
    this.grid = this.dishes.slice(start, start + 6);
  }

  public Previous() {
    if (this.activePage == 1) return;
    this.activePage--;
    let start = (this.activePage - 1) * 5;
    this.grid = this.dishes.slice(start, start + 6);
  }

  public last() {
    if (this.activePage == this.countPages) return;
    this.activePage = this.countPages;
    this.grid = this.dishes.slice(this.dishes.length - 6, this.dishes.length);
  }

  public goToView(dishGuid) {
    this._router.navigate(['/view', dishGuid]);
  }
}
