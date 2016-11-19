import {Component} from '@angular/core';
import {HelperService} from './helpers.service';

@Component({
  selector   : 'app-root',
  templateUrl: './app.component.html',
  styleUrls  : ['./app.component.css']
})
export class AppComponent {
  title = 'Cribtool';
  ciphers: String[] = [];
  maxlen: number = 0;
  cipherInput: String = '';
  keyInput: String = '4547';
  key: String[] = [];
  keyLock: boolean[] =[];
  originalKey: String[] =[];

  constructor(private helperService: HelperService) {
    console.log(helperService.hex2a(''));
  }




}
