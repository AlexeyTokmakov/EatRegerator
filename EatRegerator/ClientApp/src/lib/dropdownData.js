"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DropdownSearchData = /** @class */ (function () {
    function DropdownSearchData(serviceCallback, serviceFieldResult) {
        this.isOpen = false;
        this.minSymbol = 3;
        this.selectedItems = [];
        if (serviceCallback)
            this.serviceCallback = serviceCallback;
        if (serviceFieldResult)
            this.serviceFieldResult = serviceFieldResult;
    }
    DropdownSearchData.prototype.keyup = function () {
        var _this = this;
        if (this.value.length < this.minSymbol) {
            this.listSelect = [];
            this.close();
            return;
        }
        ;
        if (this.serviceCallback)
            this.serviceCallback(this.value).then(function (res) {
                if (Validator.checkException(res))
                    _this.listSelect = res[_this.serviceFieldResult];
                if (_this.listSelect && _this.listSelect.length > 0)
                    _this.isOpen = true;
            });
    };
    DropdownSearchData.prototype.focus = function () {
        if (this.value.length < this.minSymbol)
            return;
        this.isOpen = true;
    };
    DropdownSearchData.prototype.close = function () {
        this.isOpen = false;
    };
    DropdownSearchData.prototype.selectValue = function (selectValue) {
        this.selectedItems.push(selectValue);
    };
    return DropdownSearchData;
}());
exports.DropdownSearchData = DropdownSearchData;
var DropdownData = /** @class */ (function () {
    function DropdownData(serviceCallback, serviceFieldResult) {
        var _this = this;
        this.isOpen = false;
        this.selectedValue = "";
        this.serviceCallback = serviceCallback;
        this.serviceFieldResult = serviceFieldResult;
        this.serviceCallback().then(function (res) {
            if (Validator.checkException(res))
                _this.listSelect = res[_this.serviceFieldResult];
        });
    }
    DropdownData.prototype.selectValue = function (selectValue) {
        this.selectedValue = selectValue;
    };
    DropdownData.prototype.close = function () {
        this.isOpen = false;
    };
    DropdownData.prototype.click = function () {
        this.isOpen = !this.isOpen;
    };
    return DropdownData;
}());
exports.DropdownData = DropdownData;
var Validator = /** @class */ (function () {
    function Validator() {
    }
    Validator.checkException = function (res) {
        if (res.resultCode != -1)
            return true;
        //this.isError = true;
        return false;
    };
    return Validator;
}());
exports.Validator = Validator;
//# sourceMappingURL=dropdownData.js.map