import {Injectable} from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class HelperService {

  hex2a(hexx: String): String {
    let hex = hexx.toString();//force conversion
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
  }

  sXor(s1: String, s2: String): String {
    let buf: string[] = [];
    let ret: String;
    if (s1.length > s2.length) {
      for (let i = 0; i < s2.length; i++) { //XOR over all characterCodes
        buf[i] = this.cXor(s1.charAt(i), s2.charAt(i));
      }
      //Add remaining characters
      ret = buf.join('') + s1.substr(s2.length, s1.length);
    } else {
      for (let i = 0; i < s1.length; i++) {
        buf[i] = this.cXor(s1.charAt(i), s2.charAt(i));
      }
      //Add remaining characters
      ret = buf.join('') + s2.substr(s1.length, s2.length);
    }
    return ret;
  }

  private cXor(c1: String, c2: String): String {
    return String.fromCharCode(c1.charCodeAt(0) ^ c2.charCodeAt(0));
  }

  isXorSpace(c: String): boolean {
    if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '\0') {
      return true;
    }
    return false;
  }

  readable(s: String): String {
    if (!s || s.length === 0) {
      return '_';
    }
    let out: String = '';
    _.forEach(s, (c: String)=> {
      if (c >= ' ' && c <= '~') {
        out += c
      } else {
        out += '~';
      }
    });

    return out;
  }

  whiteSpaceAttack(ciphers: String[], key: String[], keyLock: boolean[]): String[] {
    let nKey: String[] = _.clone(key);
    let mastermask: String[] = [];
    _.fill(mastermask, ' ', ciphers.length);
    for (let i = 0; i < ciphers.length; i++) {
      let masterCipher = ciphers[i];
      for (let j = (i + 1) % ciphers.length; j < i; i = (i + 1) % ciphers.length) { //Wrap the index around so that every cipher gets to be master
        let other = ciphers[j];
        if (masterCipher.length > other.length) {
          _.padEnd(other, masterCipher.length, String.fromCharCode(0));
        } else {
          _.padEnd(masterCipher, masterCipher.length, String.fromCharCode(0));
        }
        let xorCipher = this.sXor(masterCipher, other);
        let mask: String[] = [];
        _.forEach(xorCipher, (c: String)=> {
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
