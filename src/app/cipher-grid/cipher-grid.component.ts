import {Component, OnInit, Input, SimpleChange, Output, EventEmitter} from '@angular/core';

export interface IonCipherChange {
  index: number;
  value: String;
}

@Component({
  selector: 'cipher-grid',
  templateUrl: './cipher-grid.component.html',
  styleUrls: ['./cipher-grid.component.css']
})
export class CipherGridComponent implements OnInit {

  @Input()
  set cipherText(value: String){
    this.cipherChars= value.split('');
  }
  @Output() onChange : EventEmitter<IonCipherChange> = new EventEmitter();
  cipherChars: String[];
  constructor() { }

  ngOnInit() {
  }

  charChanged(event){
    this.cipherChars[event.index]= event.value;
    this.onChange.emit({index: event.index, value: this.cipherChars.join('')});
  }
}
