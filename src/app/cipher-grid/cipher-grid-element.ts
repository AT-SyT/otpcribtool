import {Component, OnInit, Input, EventEmitter} from '@angular/core';
import {Output} from '@angular/core/src/metadata/directives';
import {HelperService} from '../helpers.service';

@Component({
  selector: 'cipher-grid-element',
  template: `
    <textarea rows ="1" cols="1" maxlength="1" [style.backgroundColor]="getBackgroundColor()" [(ngModel)]="char" (change)="valueChanged(index, char)"></textarea>
`,
  styles  : [`textarea{ resize: none;}`]
})
export class CipherGridElementComponent implements OnInit {
  @Input() char: string;
  @Input() index: number;
  @Output() onChange: EventEmitter<{index: number; value: string;}> = new EventEmitter();

  constructor(private helperService: HelperService) {
  }

  ngOnInit() {

  }

  getBackgroundColor(): string {
    if (!this.helperService.isreadableChar(this.char)) {
      return 'red';
    } else {
      return '';
    }
  }

  valueChanged(index: number, char: string) {
    this.onChange.emit({index: index, value: char});
  }
}
