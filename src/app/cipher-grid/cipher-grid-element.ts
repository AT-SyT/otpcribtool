import {Component, OnInit, Input, EventEmitter} from '@angular/core';
import {Output} from '@angular/core/src/metadata/directives';

@Component({
  selector: 'cipher-grid-element',
  template: `
    <textarea rows ="1" cols="1" maxlength="1" [(ngModel)]="char" (change)="valueChanged(index, char)"></textarea>
`,
  styles  : [`textarea{ resize: none;}`]
})
export class CipherGridElementComponent implements OnInit {
  @Input() char: String;
  @Input() index: number;
  @Output() onChange: EventEmitter<{index: number; value: String;}> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  valueChanged(index, char) {
    this.onChange.emit({index: index, value: char});
  }
}
