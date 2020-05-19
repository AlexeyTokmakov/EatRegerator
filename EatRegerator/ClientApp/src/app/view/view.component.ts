import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {
  public subscribe_params_route: any;
  public eatGuid: string;
  constructor(public _router: Router,
              private _route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.subscribe_params_route = this._route.params.subscribe(params => {
      this.eatGuid = params['id'];
    });
  }
}
