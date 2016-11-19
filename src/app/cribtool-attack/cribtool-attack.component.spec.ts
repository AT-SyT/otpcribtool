/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CribtoolAttackComponent } from './cribtool-attack.component';

describe('CribtoolAttackComponent', () => {
  let component: CribtoolAttackComponent;
  let fixture: ComponentFixture<CribtoolAttackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CribtoolAttackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CribtoolAttackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
