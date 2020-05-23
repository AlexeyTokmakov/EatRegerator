import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DishRecipe } from '../../services/eat-service/eat';
import { EatService } from '../../services/eat-service/eat-service';
import { BaseResponse } from '../../services/BaseResponse';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  public subscribe_params_route: any;
  public eatGuid: string;
  public dishRecipe: DishRecipe;
  public isError: boolean = false;
  constructor(public _router: Router,
    private _route: ActivatedRoute,
    private eatService: EatService  ) {

  }

  ngOnInit(): void {
    this.subscribe_params_route = this._route.params.subscribe(params => {
      this.eatGuid = params['id'];
      this.loadRecipe();
    });
  }

  public loadRecipe() {
    this.eatService.getRecipe(this.eatGuid).then(res => {
      if (this.checkException(res))
        this.dishRecipe = res.recipe;
    }).catch(reason => {
      this.isError = true;
    })
  }

  public checkException(res: BaseResponse): boolean {
    if (res.resultCode != -1) return true;
    this.isError = true;
    return false;
  }

}
