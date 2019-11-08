

import {Injectable} from "@angular/core";

@Injectable()

export class GlobalVariables{
public isDevelopingMode=true;
    setPageData(data,pageNo,pageSize){
        let counter=0;
        let dataTemp=[];
        for(let i=0;i<data.length;i++){
            if(counter<pageSize && i< pageNo*pageSize && i>=(pageNo-1)*pageSize){
                dataTemp.push(data[i]);
                counter=counter+1;
            }
        }
        return dataTemp;
    }
}
