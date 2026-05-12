import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'crypto';
import { CryptoService } from '../../domain/shared/crypto.service';

const VERSION = 'v1';

@Injectable()
export class AesCryptoService implements CryptoService {
    constructor(private readonly config: ConfigService) { }

    async encrypt(value: string): Promise<string> {
        const key = this.getKey();
        const iv = randomBytes(12);
        const cipher = createCipheriv('aes-256-gcm', key, iv);
        const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
        const tag = cipher.getAuthTag();

        return `${VERSION}:${iv.toString('base64')}:${tag.toString(
            'base64',
        )}:${encrypted.toString('base64')}`;
    }

    async decrypt(value: string): Promise<string> {
        const [version, ivB64, tagB64, dataB64] = value.split(':');
        if (version !== VERSION || !ivB64 || !tagB64 || !dataB64) {
            throw new Error('Invalid encrypted value');
        }

        const key = this.getKey();
        const iv = Buffer.from(ivB64, 'base64');
        const tag = Buffer.from(tagB64, 'base64');
        const data = Buffer.from(dataB64, 'base64');
        const decipher = createDecipheriv('aes-256-gcm', key, iv);
        decipher.setAuthTag(tag);

        const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
        return decrypted.toString('utf8');
    }

    private getKey(): Buffer {
        const secret = this.config.get<string>('CREDENTIALS_MASTER_KEY');
        if (!secret) {
            throw new Error('CREDENTIALS_MASTER_KEY is required');
        }
        return createHash('sha256').update(secret).digest();
    }
}
