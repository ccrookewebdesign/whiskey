import { WhiskeysGuard } from './whiskeys.guard';
import { ReviewsGuard } from './reviews.guard';
import { WhiskeyExistsGuard } from './whiskey-exists.guard';
import { AuthGuard } from './auth.guard';

export const guards: any[] = [
  WhiskeysGuard,
  ReviewsGuard,
  WhiskeyExistsGuard,
  AuthGuard
];

export * from './whiskeys.guard';
export * from './reviews.guard';
export * from './whiskey-exists.guard';
export * from './auth.guard';
