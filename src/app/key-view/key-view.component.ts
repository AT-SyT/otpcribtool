import {Component, OnInit, Input, EventEmitter} from '@angular/core';
import {Output} from '@angular/core/src/metadata/directives';
import {IonLockChange, IonChange} from './key-view-element';

export interface IonKeyChange {
  value: String[];
}

@Component({
  selector: 'key-view',
  templateUrl: './key-view.component.html',
  styleUrls: ['./key-view.component.css']
})
export class KeyViewComponent implements OnInit {

  @Input() key: String[];
  @Input() keyLock : boolean[];
  @Output() onKeyChange: EventEmitter<IonKeyChange> = new EventEmitter();
  constructor() { }

  ngOnInit() {
    console.log('Key:',this.key);
    console.log('keyLockLength', this.keyLock.length);
  }

  onChange(event : IonChange){
    console.log('Changed: Index:',event.index,'value: ', event.value);
    this.key[event.index]=event.value;
    this.onKeyChange.emit({value: this.key});
  }


  onLockChange(event: IonLockChange) {
    console.log('Changed: Index:', event.index, 'value: ', event.value);
    this.keyLock[event.index]=event.value;
  }
}
