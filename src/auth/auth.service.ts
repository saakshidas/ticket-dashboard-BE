import { Injectable, UnauthorizedException } from '@nestjs/common';
import { randomBytes, createHmac, scryptSync } from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  private tokenSecret = process.env.AUTH_TOKEN_SECRET ?? 'dev-secret-token-key';

  async register(username: string, password: string) {
    const existing = await this.userModel.findOne({ username }).exec();
    if (existing) {
      throw new UnauthorizedException('Username already exists');
    }
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(password, salt, 64).toString('hex');
    const passwordHash = `${salt}:${hash}`;
    const created = await this.userModel.create({ username, passwordHash });
    return { id: created._id.toString(), username: created.username };
  }

  async login(username: string, password: string) {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const [salt, stored] = user.passwordHash.split(':');
    const hash = scryptSync(password, salt, 64).toString('hex');
    if (hash !== stored) throw new UnauthorizedException('Invalid credentials');
    const payload = `${user._id.toString()}:${Date.now()}`;
    const sig = createHmac('sha256', this.tokenSecret).update(payload).digest('hex');
    const token = Buffer.from(`${payload}:${sig}`).toString('base64');
    return { token, user: { id: user._id.toString(), username: user.username } };
  }

  async validateToken(token: string) {
    try {
      const raw = Buffer.from(token, 'base64').toString('utf8');
      const [userId, ts, sig] = raw.split(':');
      const payload = `${userId}:${ts}`;
      const expected = createHmac('sha256', this.tokenSecret).update(payload).digest('hex');
      if (expected !== sig) return null;
      return await this.userModel.findById(userId).select('-passwordHash').lean().exec();
    } catch (e) {
      return null;
    }
  }
}
