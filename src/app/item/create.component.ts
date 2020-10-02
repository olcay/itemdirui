import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AccountService, AlertService } from '@app/_services';
import { ItemDirApiClient, ItemForCreationDto, TagForCreationDto } from '@app/_services/itemdirapi.client';
export interface Tag {
    value: string;
    name: string;
}
@Component({ templateUrl: 'create.component.html' })
export class CreateComponent implements OnInit {
    account = this.accountService.accountValue;
    form: FormGroup;
    loading = false;
    submitted = false;
    tagsData: Tag[] = [
        { value: 'isPlayed', name: 'Is Played?' },
        { value: 'isFinished', name: 'Is Finished?' }
    ];

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private client: ItemDirApiClient
    ) { }

    onChange(name: string, isChecked: boolean) {
        const tags = (this.form.controls.tags as FormArray);

        if (isChecked) {
            tags.push(new FormControl(name));
        } else {
            const index = tags.controls.findIndex(x => x.value === name);
            tags.removeAt(index);
        }
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            title: ['', Validators.required],
            description: [''],
            itemType: ['Game', Validators.required],
            tags: this.formBuilder.array([])
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
        item.description = this.f.description.value;
        item.itemType = this.f.itemType.value;
        item.tags = new Array();

        this.f.tags.value.forEach(element => {
            var tag = new TagForCreationDto();
            tag.name = element
            item.tags.push(tag);
        });  

        this.client.createItem(item).subscribe(res => {
            this.alertService.success('New item is created!', { keepAfterRouteChange: true });
            this.router.navigate(['/']);
        }, error => {
            this.alertService.error(error);
            this.loading = false;
        });
    }
}