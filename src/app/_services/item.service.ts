import { Injectable } from '@angular/core';

import { environment } from '@environments/environment';
import { ItemDirectoryApiClient } from './itemdirapi.client';

const baseUrl = `${environment.apiUrl}`;

@Injectable({ providedIn: 'root' })
export class ItemService {
    private client;

    constructor(
    ) {
        this.client = new ItemDirectoryApiClient(baseUrl);
    }

    getClient() {
        return this.client;
    }

}