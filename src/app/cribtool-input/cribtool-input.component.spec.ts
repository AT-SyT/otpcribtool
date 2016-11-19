/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CribtoolInputComponent } from './cribtool-input.component';

describe('CribtoolInputComponent', () => {
  let component: CribtoolInputComponent;
  let fixture: ComponentFixture<CribtoolInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CribtoolInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CribtoolInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
