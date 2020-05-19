export enum TypeField {
  number,
  numberAboveZero,
  string,
  //money
}

export class paField {
  protected required: boolean; // Обязательное ли поля
  public static callbackTrigger: Function;
  public isTriggerChange: boolean;
  public value: any; // Выбранное значение
  public isValid: boolean; // Валидно ли значение
  public type: TypeField;

  constructor(required: boolean = false, type: TypeField = TypeField.string, isTriggerChange: boolean = false) {
    this.value = null;
    this.isValid = true;
    this.required = required;
    this.type = type;
    this.isTriggerChange = isTriggerChange;
  }

  // Валидация всех полей причастных к paField в некотором обьекте
  public static allValidate(obj: any): boolean {
    let v: boolean = true;
    for (let key in obj) {
      if (obj[key] instanceof paField)
        v = obj[key].validate() && v;
    }
    return v;
  }

  public trigger() {
    if (this.isTriggerChange && paField.callbackTrigger)
      paField.callbackTrigger();
  }

  public clear(): void {
    this.value = null;
    this.trigger();
  }

  public keyup() {
    this.isValid = true;
  }

  public validate(): boolean {
    if (this.required)
      this.validateLength();
    if (this.type == TypeField.numberAboveZero)
      this.validateNumberAboveZero();
    return this.isValid;
  }

  private validateLength() {
    if (this.value)
      this.isValid = this.value.toString().length > 0;
    else
      this.isValid = false;
  }

  private validateNumberAboveZero() {
    if (this.value)
      this.isValid = this.value > 0;
  }
}

export class paDateField extends paField {
  private requiredStart: boolean;
  private requiredEnd: boolean;
  public startValue: Date;
  public endValue: Date;

  constructor(requiredStart: boolean = false, requiredEnd: boolean = false, isTriggerChange: boolean = false) {
    super(false, null, isTriggerChange);
    this.requiredStart = requiredStart;
    this.requiredEnd = requiredEnd;
  }

  public clear(): void {
    this.startValue = null;
    this.endValue = null;
    super.trigger();
  }


  public validate(): boolean {
    if (this.requiredStart)
      this.isValid = this.isValid && !!this.startValue;
    if (this.requiredEnd)
      this.isValid = this.isValid && !!this.endValue;
    return this.isValid;
  }
}


class paDropdownFieldBase extends paField {
  protected funcRef: Function; // Поля по которым идет поиск
  public reference: Array<any>; // Справочник

  constructor(funcRef: Function, required: boolean = false, isTriggerChange: boolean = false) {
    super(required, null, isTriggerChange);
    this.reference = [];
    this.funcRef = funcRef;
  }
}

export class paDropdownFieldInput extends paDropdownFieldBase {
  public timeOutId: number;
  private minSymbol: number = 3; // Минимальное колличество символ с которого начинается поиск
  public visibleValue: string; // Выбранное или введенное значение
  public fieldSearch: Array<string>;

  public isOpenRefList: boolean = false;
  public loading: boolean = false;
  private bsControle: any = null;

  constructor(funcRef: Function, required: boolean = false, isTriggerChange: boolean = false, fieldSearch: Array<string> = []) {
    super(funcRef, required, isTriggerChange);
    this.visibleValue = '';
    this.fieldSearch = fieldSearch;
  }

  public clear(): void {
    super.clear();
    this.visibleValue = '';
    this.closeRefList();
    super.trigger();
  }

  public keyup() {
    if (this.timeOutId) window.clearTimeout(this.timeOutId);
      this.timeOutId =  window.setTimeout(() => this.search(), 500);
  }

  //Функция фильтрация
  public search() {
    window.clearTimeout(this.timeOutId);
    if (!this.visibleValue) {
      this.reference = [];
      this.closeRefList();
      return;
    }
    if (this.visibleValue.length < this.minSymbol) {
      this.closeRefList();
      return;
    }
    this.loading = true;
    this.funcRef(this.visibleValue).then(res => {
      this.openRefList();
      if (res.items) {
        this.reference = res.items;
        if (this.fieldSearch.length && this.reference.length) this.searchString();
      }
      else
        this.reference = [];

      this.loading = false;
    });
  }

  public focus(bsControle: any, isOverride: boolean = false) {
    if (!this.bsControle || isOverride)
      this.bsControle = bsControle;
    this.keyup();
  }

  private searchString() {
    this.reference.forEach(r => {
      this.fieldSearch.forEach(f => {
        let inputValue = this.visibleValue.toLowerCase().trim();
        let refValue = '';
        if (~f.indexOf('.')) refValue = r[f.split('.')[0]][f.split('.')[1]];
        else refValue = r[f];
        let fieldName = ~f.indexOf('.') ? f.split('.')[0] : f;

        let pos = refValue.toLowerCase().indexOf(inputValue.toLowerCase());
        if (~pos) {
          r[fieldName + 'Begin'] = refValue.slice(0, pos);
          r[fieldName + 'Middle'] = refValue.slice(pos, pos + inputValue.length);
          r[fieldName + 'End'] = refValue.slice(pos + inputValue.length);
        }
        else r[fieldName + 'Begin'] = refValue;
      });
    });
  }

  public canOpenList() {
    if (this.visibleValue.length >= this.minSymbol) this.openRefList();
  }

  //Выбор значения из списка
  // visibleValue - значение, которое будет показано
  public selectItem(visibleValue: string, value: any) {
    if (!value.guid) return;
    this.visibleValue = visibleValue;
    this.value = value;
    this.isValid = true;
    super.trigger();
  }

  private openRefList() {
    this.isOpenRefList = true;
    this.bsControle.open();
  }

  public closeRefList() {
    this.bsControle.close();
    this.isOpenRefList = false;
  }
}

export class paDropdownField extends paDropdownFieldBase {
  private isDefaultValue: boolean;

  constructor(funcRef: Function, required: boolean = false, isDefaultValue: boolean = true, isTriggerChange: boolean = false) {
    super(funcRef, required, isTriggerChange);
    this.isDefaultValue = isDefaultValue;
    this.init();
  }

  public init() {
    this.funcRef().then(res => {
        this.reference = res.items;
        if (this.isDefaultValue && this.reference)
          this.selectItem(this.reference[0]);
    });
  }

  public selectItem(item: any) {
    this.value = item;
    this.isValid = true;
    super.trigger();
  }

}
