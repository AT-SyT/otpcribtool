import {Component, OnInit, Input, SimpleChange, Output, EventEmitter} from '@angular/core';
import {HelperService} from '../helpers.service';

export interface IonCipherChange {
  row: number;
  index: number;
  value: string;
}

@Component({
  selector   : 'cipher-grid',
  templateUrl: './cipher-grid.component.html',
  styleUrls  : ['./cipher-grid.component.css']
})
export class CipherGridComponent implements OnInit {

  @Input()
  set cipherText(value: String) {
    this.cipherChars = value.split('');
  }
  @Input() index:number;

  @Output() onChange: EventEmitter<IonCipherChange> = new EventEmitter();
  cipherChars: String[];

  constructor(private helperService: HelperService) {
  }

  ngOnInit() {
  }

  charChanged(event) {
    this.cipherChars[event.index] = event.value;
    this.onChange.emit({row: this.index, index: event.index, value: this.cipherChars.join('')});
  }
}
