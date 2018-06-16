import { WhiskeysGuard } from './whiskeys.guard';
import { WhiskeyExistsGuard } from './whiskey-exists.guard';
import { AuthGuard } from './auth.guard';

export const guards: any[] = [WhiskeysGuard, WhiskeyExistsGuard, AuthGuard];

export * from './whiskeys.guard';
export * from './whiskey-exists.guard';
export * from './auth.guard';
