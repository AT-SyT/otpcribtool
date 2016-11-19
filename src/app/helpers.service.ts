import {Injectable} from '@angular/core';

@Injectable()
export class HelperService {

  hex2a(hexx:String) : String{
    let hex = hexx.toString();//force conversion
    let str = '';
    for (let i = 0; i < hex.length; i += 2)
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
  }
  constructor() {
  }
}
