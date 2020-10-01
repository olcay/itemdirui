import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { MustMatch } from '@app/_helpers';
import { ItemDirApiClient, ItemForCreationDto } from '@app/_services/itemdirapi.client';

@Component({ templateUrl: 'create.component.html' })
export class CreateComponent implements OnInit {
    account = this.accountService.accountValue;
    form: FormGroup;
    loading = false;
    submitted = false;
    deleting = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService, 
        private client: ItemDirApiClient
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            itemType: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;


        var item = new ItemForCreationDto();
        item.title = this.f.title.value;
        item.description = this.form.get('description').value;
        item.itemType = this.f.itemType.value;

        console.log(item)

        /* var tag = new TagForCreationDto();
        tag.name = 'geh'
        item.tags = [tag]; */
        this.client.createItem(item).subscribe(res => {
            console.log(res)
            this.alertService.success('New item is created!', { keepAfterRouteChange: true });
            this.router.navigate(['/']);
        }, error => {
            console.log(error)
            this.alertService.error(error);
            this.loading = false;
        });
    }
}