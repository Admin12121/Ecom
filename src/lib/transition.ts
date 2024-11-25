import { createCipheriv, createDecipheriv, randomBytes, pbkdf2 as pbkdf2Callback } from 'crypto';
import { promisify } from 'util';

const pbkdf2 = promisify(pbkdf2Callback);
const algorithm = 'aes-256-ctr';
const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET as string;
const iv = randomBytes(16);

export async function encryptproduct(data: object, router: any): Promise<string> {
    const text = JSON.stringify(data);
    const salt = 'salt';
    const key = await pbkdf2(secretKey, salt, 100000, 32, 'sha256');
    const cipher = createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    const encryptedText = `${iv.toString('hex')}:${encrypted.toString('hex')}`;
    router.push(`/checkout/${encryptedText}`);
    return encryptedText;
}

export async function decrypt(encryptedText: string, router: any): Promise<string> {
    const decodedText = decodeURIComponent(encryptedText);
    if (!decodedText.includes(':')) {
        console.error('Invalid encryptedText format: missing colon');
        router.push('/collections/');
        return '';
    }

    const [ivHex, encryptedHex] = decodedText.split(':');
    if (!ivHex || !encryptedHex) {
        console.error('Invalid encryptedText format: missing parts');
        router.push('/collections/');
        return '';
    }

    try {
        const ivBuffer = Buffer.from(ivHex, 'hex');
        const encryptedBuffer = Buffer.from(encryptedHex, 'hex');
        const salt = 'salt';
        const key = await pbkdf2(secretKey, salt, 100000, 32, 'sha256');
        const decipher = createDecipheriv(algorithm, key, ivBuffer);
        const decrypted = Buffer.concat([decipher.update(encryptedBuffer), decipher.final()]);
        return decrypted.toString();
    } catch (error) {
        console.error('Decryption failed:', error);
        // router.push('/collections/');
        return '';
    }
}