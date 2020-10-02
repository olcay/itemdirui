import { Component, OnInit } from '@angular/core';

import { AccountService } from '@app/_services';
import { ItemDirApiClient } from '@app/_services/itemdirapi.client';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    account = this.accountService.accountValue;

    data: any = []

    constructor(private accountService: AccountService, private client: ItemDirApiClient) { }

    getData() {
        this.client.getItems(undefined, undefined, 1, 10, undefined, undefined)
            .subscribe(res => {
                this.data = res.value;
            }, error => console.error(error));
    }

    ngOnInit() {
        this.getData()
    }
}