import {Injectable} from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class HelperService {

  hex2a(hexx: string): string {
    let hex = hexx.toString();//force conversion
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
  }

  sXor(s1: string, s2: string, fullLength: boolean = false): string {
    let buf: string[] = [];
    let ret: string;

    if (s1.length > s2.length) {
      for (let i = 0; i < s2.length; i++) { //XOR over all characterCodes
        buf[i] = this.cXor(s1.charAt(i), s2.charAt(i));
      }
      ret = buf.join('');
      if (fullLength) {//Add remaining characters
        ret = ret + s1.substr(s2.length, s1.length);
      }
    } else {
      for (let i = 0; i < s1.length; i++) {
        buf[i] = this.cXor(s1.charAt(i), s2.charAt(i));
      }
      ret = buf.join('');
      if (fullLength) {//Add remaining characters
        ret = ret + s2.substr(s1.length, s2.length);
      }
    }
    return ret;
  }

  cXor(c1: string, c2: string): string {
    return String.fromCharCode(c1.charCodeAt(0) ^ c2.charCodeAt(0));
  }

  isXorSpace(c: string): boolean {
    if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '\0') {
      return true;
    }
    return false;
  }

  isreadableChar(c: string): boolean {
    if (!c || c.length === 0) {
      return false;
    }
    if (c >= ' ' && c <= '~') {
      return true;
    } else {
      return false;
    }

  }

  readable(s: string): string {
    if (!s || s.length === 0) {
      return '_';
    }
    let out: string = '';
    _.forEach(s, (c: string)=> {
      if (c >= ' ' && c <= '~') {
        out += c;
      } else {
        out += '~';
      }
    });
    return out;
  }

  whiteSpaceAttack(ciphers: string[], key: string[], keyLock: boolean[]): string[] {
    let nKey: string[] = _.clone(key);
    let mastermask: string[] = [];

    for (let i = 0; i < ciphers.length; i++) {
      mastermask = [];
      for (let pos = 0; pos < ciphers[i].length; pos++) {
        mastermask.push(' ');
      }
      let masterCipher = ciphers[i];
      for (let j = (i + 1) % ciphers.length; j != i; j = (j + 1) % ciphers.length) { //Wrap the index around so that every cipher gets to be master
        let other = ciphers[j];
        if (masterCipher.length > other.length) {
          other = _.padEnd(other, masterCipher.length, String.fromCharCode(0));
        } else {
          masterCipher = _.padEnd(masterCipher, masterCipher.length, String.fromCharCode(0));
        }
        let xorCipher = this.sXor(masterCipher, other);
        let mask: string[] = [];
        _.forEach(xorCipher, (c: string)=> {
          if (this.isXorSpace(c)) {
            mask.push(' ');
          } else {
            mask.push('\0');
          }
        });

        for (let pos = 0; pos < mask.length; pos++) {
          if (mastermask[pos] !== mask[pos]) {
            mastermask[pos] = '\0';
          }
        }
      }
      for (let pos = 0; pos < masterCipher.length; pos++) {
        if (mastermask[pos] === ' ') {
          if (!keyLock[pos]) {
            nKey[pos] = this.cXor(masterCipher[pos], ' ');
          }
        }
      }
    }
    return nKey;
  }

  constructor() {
  }
}
