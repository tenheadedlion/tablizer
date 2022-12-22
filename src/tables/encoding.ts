import { stringToHex } from '@polkadot/util';

// we convert string to hex string due to the fact that
// ink has special treatment for strings.
// any string that starts with 0x is considered as a hex string, others strings remain as
// character strings(utf-8 by default).
//
// to get around with such weird conversion, we have to make a special encoding
// scheme for our data, that is to convert some fields to hex string.
// in js programming, we must remove the 0x prefix, otherwise ink! again will parse it as a
// hex string
//
// https://github.com/polkadot-js/common/tree/master/packages/util/src
export function indexHexFunc(input: string): string {
  return stringToHex(input).slice(2);
}
