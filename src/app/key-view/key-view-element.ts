import {Component, OnInit, Input, EventEmitter} from '@angular/core';
import {Output} from '@angular/core/src/metadata/directives';


export interface IonChange{
  index: number;
  value: string;
}
export interface IonLockChange {
  index: number;
  value: boolean;
}

@Component({
  selector   : 'key-view-element',
  templateUrl: './key-view-element.html',
  styles     : [
    `textarea{ resize: none; display: block;}`,
    `input{
        display: block;
    }`
  ]
})
export class KeyViewElementComponent implements OnInit {
  @Input() char: string;
  @Input() lock: boolean;
  @Input() index: number;
  @Output() onChange: EventEmitter<IonChange> = new EventEmitter();
  @Output() onLockChange: EventEmitter<IonLockChange> = new EventEmitter();


  constructor() {
  }

  ngOnInit() {
  }

  getBackgroundColor(){
    if(this.char === ''){
      return 'red';
    }else{
      return '';
    }
  }

  valueChanged(index: number, char: string) {
    this.onChange.emit({index: index, value: char});
  }

  lockChanged(index: number, value: boolean) {
    this.onLockChange.emit({index: index, value: value});
  }
}
