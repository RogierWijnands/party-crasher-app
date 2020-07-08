import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LoggerService {
    constructor(
        private toastr: ToastrService,
    ) {}

    public success(message: any): void {
        this.toastr.success(JSON.stringify(message));
    }

    public error(error: any): void {
        this.toastr.error(JSON.stringify(error));
        console.log(error);
    }
}