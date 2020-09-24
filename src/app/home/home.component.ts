import { Component, OnInit } from '@angular/core';

import { AccountService, ItemService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    account = this.accountService.accountValue;

    private data: any = []

    constructor(private accountService: AccountService, private itemService: ItemService) {
    }

    getData() {
        this.itemService.getClient().getItems(undefined, undefined, undefined, undefined, undefined)
            .then((res) => {
                console.log(res)
                this.data = res.value;
            });
    }

    ngOnInit() {
        this.getData()
    }
}