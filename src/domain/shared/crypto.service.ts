export const CRYPTO_SERVICE = 'CRYPTO_SERVICE';

export interface CryptoService {
    encrypt(value: string): Promise<string>;
    decrypt(value: string): Promise<string>;
}
