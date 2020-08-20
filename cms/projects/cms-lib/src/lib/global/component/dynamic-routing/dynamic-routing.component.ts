import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FarmInfoGetResponseModel } from '../../api/data-model/models/farm-info-get-response.model';

@Component({
  selector: 'cms-dynamic-routing',
  templateUrl: './dynamic-routing.component.html',
  styleUrls: ['./dynamic-routing.component.scss']
})
export class DynamicRoutingComponent implements OnInit, OnDestroy {

  componentId: string;
  funcId: string;

  farm: FarmInfoGetResponseModel;

  subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.data.subscribe(data => {
      this.farm = data?.farm;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
