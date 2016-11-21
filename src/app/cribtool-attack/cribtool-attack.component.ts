import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import * as _ from 'lodash';
import {HelperService} from '../helpers.service';
import {IonKeyChange} from '../key-view/key-view.component';
import {IonCipherChange} from '../cipher-grid/cipher-grid.component';

@Component({
  selector   : 'app-cribtool-attack',
  templateUrl: './cribtool-attack.component.html',
  styleUrls  : ['./cribtool-attack.component.css']
})
export class CribtoolAttackComponent implements OnInit {

  ciphers: String[] = [];
  key: String[] = [];
  keyLock: boolean[] = [];
  maxlen: number = 0;

  constructor(private dataService: DataService, private helperService: HelperService) {
    this.ciphers = this.dataService.getCiphers();
    //Determine longest cipher sequence
    _.forEach(this.ciphers, (cipherText:String)=> {
      if (cipherText.length > this.maxlen) {
        this.maxlen = cipherText.length;
      }
    });
    //Initialize key and keyLock
    if (this.dataService.getKey() !== '') {
      this.key = this.dataService.getKey().split('');
      for (let i = 0; i < this.ciphers.length; i++) { //Apply given key //TODO Move to function?
        let tmp = helperService.sXor(this.ciphers[i], this.dataService.getKey());
        console.log(tmp);
        this.ciphers[i] = this.helperService.readable(tmp);
      }
      console.log('My Key', this.key);
    } else {
      this.key.length=this.maxlen;
      _.fill(this.key, String.fromCharCode(0), 0, this.maxlen);
    }
    console.log(this.maxlen);
    console.log('KeyLength', this.key.length);
    for (let i = 0; i < this.key.length; i++) {
      this.keyLock[i] = false;
    }
    console.log(this.keyLock);
  }

  ngOnInit() {

  }

  resetKey() {
    let original = this.dataService.getKey();
    for (let i = 0; i < this.key.length; i++) {
      if (!this.keyLock[i]) {
        this.key[i] = original[i];
      }
    }
  }

  onKeyChange(event: IonKeyChange) {
    this.key = event.value;
  }

  onCipherChange(event: IonCipherChange) {
    this.ciphers[event.index] = event.value;
  }

}
