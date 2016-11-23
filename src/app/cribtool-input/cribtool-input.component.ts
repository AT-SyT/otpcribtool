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
  ciphers: string[] = ['E', 'F'];
  cipherInput: string = '';
  keyInput: string = '45475349';
  key: string = '';

  constructor(private helperService: HelperService, private dataService: DataService) {
  }

  ngOnInit() {
  }

  addCipher(value: string) {
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

  setKey(value: string) {

    this.key = this.helperService.hex2a(value);
    this.dataService.setKey(this.key);
  }

}
