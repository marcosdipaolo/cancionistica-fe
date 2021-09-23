import CryptoJS from "crypto-js";
import * as bcrypt from "bcryptjs";
import { injectable } from "inversify";

export interface Cyphered {
  ciphertext: string, 
  iv: string, 
  salt: string
};

export interface IEncryptionService {
  decrypt(encrypted_json_string: Cyphered): string;
  isPasswordCorrect(password: string, hash: string): boolean;
}

@injectable()
export class EncryptionService implements IEncryptionService {
  constructor(private passphrase: string = process.env.REACT_APP_ENCRYPTION_PASSPHRASE){}
  decrypt(encrypted_json_string: Cyphered): string {
    const encrypted = encrypted_json_string.ciphertext;
    const salt = CryptoJS.enc.Hex.parse(encrypted_json_string.salt);
    const iv = CryptoJS.enc.Hex.parse(encrypted_json_string.iv);
    const key = CryptoJS.PBKDF2(this.passphrase, salt, { hasher: CryptoJS.algo.SHA512, keySize: 64 / 8, iterations: 999 });
    const decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv });    
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
  isPasswordCorrect(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}