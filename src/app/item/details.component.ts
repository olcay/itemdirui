import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AccountService, AlertService } from '@app/_services';
import { ItemDirApiClient } from '@app/_services/itemdirapi.client';

@Component({ templateUrl: 'details.component.html' })
export class DetailsComponent implements OnInit {
    account = this.accountService.accountValue;
    itemid = this.activatedRoute.snapshot.params.itemid;
    deleting = false;

    data: any = []
    tags: any = []

    constructor(
        private accountService: AccountService,
        private client: ItemDirApiClient,
        private activatedRoute: ActivatedRoute,
        private alertService: AlertService,
        private router: Router) { }

    getData() {
        this.client.getItem(this.itemid, undefined, 'application/json')
            .subscribe(res => {
                this.data = res;
            }, error => console.error(error));

        this.client.getTagsForItem(this.itemid)
            .subscribe(res => {
                res.forEach(tag => {  
                    this.tags.push(tag.name);
                }); 
            }, error => console.error(error));
    }

    onDelete() {
        if (confirm('Are you sure to delete this item?')) {
            this.deleting = true;

            this.client.deleteItem(this.itemid)
                .subscribe(() => {
                    this.alertService.success('Item deleted successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['/']);
                });
        }
    }

    ngOnInit() {
        this.getData()
    }
}