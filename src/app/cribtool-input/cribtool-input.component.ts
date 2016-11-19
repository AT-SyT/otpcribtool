import {Component, OnInit} from '@angular/core';
import {HelperService} from '../helpers.service';
import * as _ from 'lodash';
import {DataService} from '../data.service';
@Component({
  selector   : 'app-cribtool-input',
  templateUrl: './cribtool-input.component.html',
  styleUrls  : ['./cribtool-input.component.css']
})
export class CribtoolInputComponent implements OnInit {

  title = 'Cribtool';
  ciphers: String[] = ['E', 'F'];
  cipherInput: String = '';
  keyInput: String = '45475349';
  key: String = '';

  constructor(private helperService: HelperService, private dataService: DataService) {
  }

  ngOnInit() {
  }

  addCipher(value: String) {
    console.log(value);
    let cipherText = this.helperService.hex2a(value);
    this.ciphers.push(cipherText);
    this.dataService.addCipherText(cipherText);
    this.cipherInput = '';

  }

  removeCipher(index: number) {
    console.log('REmove: ',index);
    this.ciphers.splice(index, 1);
  }

  setKey(value: String) {

    this.key = this.helperService.hex2a(value);
    this.dataService.setKey(this.key);
  }

}
