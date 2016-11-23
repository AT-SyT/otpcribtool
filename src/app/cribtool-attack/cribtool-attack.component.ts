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


  ciphers: string[] = [];
  plains: string[] = [];
  key: string[] = [];
  keyLock: boolean[] = [];
  maxlen: number = 0;

  constructor(private dataService: DataService, private helperService: HelperService) {
    this.ciphers = this.dataService.getCiphers();
    //Determine longest cipher sequence
    _.forEach(this.ciphers, (cipherText: String)=> {
      if (cipherText.length > this.maxlen) {
        this.maxlen = cipherText.length;
      }
    });
    //Initialize key and keyLock
    if (this.dataService.getKey() !== '') {
      this.key = this.dataService.getKey().split('');
      this.applyKey();
    } else {
      this.key.length = this.maxlen;
      this.plains =_.clone(this.ciphers);
      _.fill(this.key, String.fromCharCode(0), 0, this.maxlen);
    }
    for (let i = 0; i < this.key.length; i++) {
      this.keyLock[i] = false;
    }
  }

  applyKey() {
    for (let i = 0; i < this.ciphers.length; i++) {
      let tmp = this.helperService.sXor(this.ciphers[i], this.key.join(''));
      this.plains[i] = this.helperService.readable(tmp);
      console.log('Plain: ', this.plains[i]);
    }
  }


  replaceAt(str, index, character) {
    return str.substr(0, index) + character + str.substr(index + character.length);
  };

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

  attack() {
    this.key = this.helperService.whiteSpaceAttack(this.ciphers, this.key, this.keyLock);
    console.log('new Key: ', this.key);
    this.applyKey();
  }

  onKeyChange(event: IonKeyChange) {
    this.key[event.index] = event.value;
    console.log('KEyChanged: ',this.key);
    let pos = event.index;
    for (let i = 0; i < this.ciphers.length; i++) {
      if (this.ciphers[i].length > pos) {
        let tmp = this.helperService.cXor(this.ciphers[i].charAt(pos), this.key[pos]);
        this.plains[i] = this.replaceAt(this.plains[i], pos, tmp);
      }
    }
    console.log('KEyChangedApplied: ', this.key);
  }

  onCipherChange(event: IonCipherChange) {
    if (!this.keyLock[event.index]) {
      //compute key Value
      let pos = event.index;
      let row = event.row;
      let value = event.value;
      let tmpKey = this.helperService.cXor(this.ciphers[row].charAt(pos), value.charAt(pos));
      this.key[event.index] = tmpKey;
      for (let i = 0; i < this.ciphers.length; i++) {
        if (this.ciphers[i].length > pos) {
          let tmp = this.helperService.cXor(this.ciphers[i].charAt(pos), this.key[pos]);
          this.plains[i] = this.replaceAt(this.plains[i], pos, tmp);
        }
      }
    } else {
      //TODO revert change or prevent invalid changes beforehand (pass the keyLock to the ciphergrid)
      //this.plains[event.row] = this.replaceAt(this.plains[event.row], event.index, this.ciphers[event.row].charAt(event.index));
    }

  }

}
