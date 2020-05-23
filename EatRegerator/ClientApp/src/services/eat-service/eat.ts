import { BaseResponse } from "../BaseResponse";

export class ProductsResult extends BaseResponse {
  public products: Array<Products>
}

export class TypeDishesResult extends BaseResponse {
  public typeDishes: Array<TypeDishes>
}

export class TypesKitchensResult extends BaseResponse {
  public typesKitchen: Array<TypeKitchen>
}

export class TypesMenuResult extends BaseResponse {
  public typesMenu: Array<TypeMenu>
}

export class DishesResult extends BaseResponse {
  public dishes: Array<Dishes>;
}

export class Dishes {
  public dishGuid: string;
  public cookingTime: number;
  public typeGuid: string;
  public title: string;
  public typeKitchenGuid: string;
  public typeMenuGuid: string;
  public pictureUrl: string;
  public description: string;
}

export class Products {
  public productGuid: string;
  public name: string;
}

export class TypeDishes {
  public typeGuid: string;
  public title: string;
  public code: number;
}


export class TypeKitchen {
  public kitchenTypeGuid: string;
  public title: string;
  public code: number;
}

export class TypeMenu {
  public typeMenuGuid: string;
  public title: string;
  public code: number;
}

export class GetDishesInput {
  constructor() {
    this.increaseProductGuids = [];
    this.decreaseProductGuids = [];
  }
  public increaseProductGuids: Array<string>;
  public decreaseProductGuids: Array<string>;
  public typeDishesGuid: string;
  public typeKitchensGuid: string;
  public typeMenuGuid: string;
}

export class Recipes {
  public recipeGuid: string;
  public text: string;
  public order: number;
  public pictureUrl: string;
  public title: string;
}

export class RecipeResult extends BaseResponse
{
  public recipe: DishRecipe;
}

export class DishRecipe extends Dishes
{
  public recipe: Array<Recipes>;
}
