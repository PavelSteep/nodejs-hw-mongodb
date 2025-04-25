import mongoose from 'mongoose';
import { model, Schema } from 'mongoose';

const sessionsSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    accessTokenValidUntil: { type: Date, required: true },
    refreshTokenValidUntil: { type: Date, required: true },
  },
  { timestamps: true, versionKey: false },
);

// Метод для проверки актуальности accessToken
sessionsSchema.methods.isAccessTokenValid = function () {
  return this.accessTokenValidUntil > new Date();
};

// Метод для проверки актуальности refreshToken
sessionsSchema.methods.isRefreshTokenValid = function () {
  return this.refreshTokenValidUntil > new Date();
};

export const SessionsCollection = model('Session', sessionsSchema);
export default SessionsCollection;
