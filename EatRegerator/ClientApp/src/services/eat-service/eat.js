"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseResponse_1 = require("../BaseResponse");
var ProductsResult = /** @class */ (function (_super) {
    __extends(ProductsResult, _super);
    function ProductsResult() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ProductsResult;
}(BaseResponse_1.BaseResponse));
exports.ProductsResult = ProductsResult;
var TypeDishesResult = /** @class */ (function (_super) {
    __extends(TypeDishesResult, _super);
    function TypeDishesResult() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TypeDishesResult;
}(BaseResponse_1.BaseResponse));
exports.TypeDishesResult = TypeDishesResult;
var TypesKitchensResult = /** @class */ (function (_super) {
    __extends(TypesKitchensResult, _super);
    function TypesKitchensResult() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TypesKitchensResult;
}(BaseResponse_1.BaseResponse));
exports.TypesKitchensResult = TypesKitchensResult;
var TypesMenuResult = /** @class */ (function (_super) {
    __extends(TypesMenuResult, _super);
    function TypesMenuResult() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TypesMenuResult;
}(BaseResponse_1.BaseResponse));
exports.TypesMenuResult = TypesMenuResult;
var Products = /** @class */ (function () {
    function Products() {
    }
    return Products;
}());
exports.Products = Products;
var TypeDishes = /** @class */ (function () {
    function TypeDishes() {
    }
    return TypeDishes;
}());
exports.TypeDishes = TypeDishes;
var TypeKitchen = /** @class */ (function () {
    function TypeKitchen() {
    }
    return TypeKitchen;
}());
exports.TypeKitchen = TypeKitchen;
var TypeMenu = /** @class */ (function () {
    function TypeMenu() {
    }
    return TypeMenu;
}());
exports.TypeMenu = TypeMenu;
var GetDishesInput = /** @class */ (function () {
    function GetDishesInput() {
        this.increaseProductGuids = [];
        this.decreaseProductGuids = [];
    }
    return GetDishesInput;
}());
exports.GetDishesInput = GetDishesInput;
//# sourceMappingURL=eat.js.map