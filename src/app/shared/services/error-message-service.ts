import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

import {TranslateService} from '@ngx-translate/core';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';

//import { Subsidiary } from './shared/subsidiary';

@Injectable()
export class ErrorMessageService {

    constructor(private toastr: ToastrService) {
    }

    Success(message: any) {
        //console.log("Success");
        this.toastr.success(message);

    }

    Error(message) {
        //console.log("Error");
        this.toastr.error(message);
    }
}
