import { Injectable } from '@angular/core';
import * as _ from 'lodash';
@Injectable()
export class DataService {
  key: String ='EEFFGG';
  cipherTexts : String[] =['EEG','SAGR','FFHTG'];

  constructor() { }

  setKey(key: String){
    this.key=key;
  }
  getKey() :String{
    return _.clone(this.key);
  }
  setCipherTexts(ciphers: String[]){
    this.cipherTexts=ciphers;
  }
  addCipherText(cipher: String){
    this.cipherTexts.push(cipher);
  }
  removeCipherText(index:number){
    this.cipherTexts.splice(index, 1);
  }
  getCiphers() :String[]{
    return this.cipherTexts;
  }

}
