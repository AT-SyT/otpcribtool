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
    _.forEach(this.ciphers, (cipherText)=> {
      if (cipherText.length > this.maxlen) {
        this.maxlen = cipherText.length;
      }
    });
    if (this.dataService.getKey() !== '') {
      this.key = this.dataService.getKey().split('');
      console.log('My Key', this.key);
    } else {
      _.fill(this.key, null, 0, this.key.length);
    }
    console.log('KeyLength', this.key.length);
    for (let i = 0; i < this.key.length; i++) {
      this.keyLock[i] = false;
    }
    console.log(this.keyLock);
  }

  ngOnInit() {

  }

  onKeyChange(event: IonKeyChange) {
    this.key = event.value;
  }
  onCipherChange(event: IonCipherChange){
    this.ciphers[event.index]=event.value;
  }

}
