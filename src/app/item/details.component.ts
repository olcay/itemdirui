import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AccountService } from '@app/_services';
import { ItemDirApiClient } from '@app/_services/itemdirapi.client';

@Component({ templateUrl: 'details.component.html' })
export class DetailsComponent implements OnInit {
    account = this.accountService.accountValue;

    data: any = []

    constructor(private accountService: AccountService, private client: ItemDirApiClient, private activatedRoute: ActivatedRoute) { }

    getData() {
        let itemid = this.activatedRoute.snapshot.params.itemid;
        
        this.client.getItem(itemid, undefined, 'application/json')
            .subscribe(res => {
                console.log(res)
                this.data = res;
            }, error => console.error(error));
    }

    ngOnInit() {
        this.getData()
    }
}