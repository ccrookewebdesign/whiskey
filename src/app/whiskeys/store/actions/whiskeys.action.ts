import { Action } from '@ngrx/store';

import { Whiskey } from '../../models/whiskey.model';

export const LOAD_WHISKEYS = '[Whiskeys] Load Whiskeys';
export const LOAD_WHISKEYS_FAIL = '[Whiskeys] Load Whiskeys Fail';
export const LOAD_WHISKEYS_SUCCESS = '[Whiskeys] Load Whiskeys Success';

export class LoadWhiskeys implements Action {
  readonly type = LOAD_WHISKEYS;
}

export class LoadWhiskeysFail implements Action {
  readonly type = LOAD_WHISKEYS_FAIL;
  constructor(public payload: any) {}
}

export class LoadWhiskeysSuccess implements Action {
  readonly type = LOAD_WHISKEYS_SUCCESS;
  constructor(public payload: Whiskey[]) {}
}

export const CREATE_WHISKEY = '[Whiskeys] Create Whiskey';
export const CREATE_WHISKEY_FAIL = '[Whiskeys] Create Whiskey Fail';
export const CREATE_WHISKEY_SUCCESS = '[Whiskeys] Create Whiskey Success';

export class CreateWhiskey implements Action {
  readonly type = CREATE_WHISKEY;
  constructor(public payload: Whiskey) {}
}

export class CreateWhiskeyFail implements Action {
  readonly type = CREATE_WHISKEY_FAIL;
  constructor(public payload: any) {}
}

export class CreateWhiskeySuccess implements Action {
  readonly type = CREATE_WHISKEY_SUCCESS;
  constructor(public payload: Whiskey) {}
}

export const UPDATE_WHISKEY = '[Whiskeys] Update Whiskey';
export const UPDATE_WHISKEY_FAIL = '[Whiskeys] Update Whiskey Fail';
export const UPDATE_WHISKEY_SUCCESS = '[Whiskeys] Update Whiskey Success';

export class UpdateWhiskey implements Action {
  readonly type = UPDATE_WHISKEY;
  constructor(public payload: Whiskey) {}
}

export class UpdateWhiskeyFail implements Action {
  readonly type = UPDATE_WHISKEY_FAIL;
  constructor(public payload: any) {}
}

export class UpdateWhiskeySuccess implements Action {
  readonly type = UPDATE_WHISKEY_SUCCESS;
  constructor(public payload: Whiskey) {}
}

export const REMOVE_WHISKEY = '[Whiskeys] Remove Whiskey';
export const REMOVE_WHISKEY_FAIL = '[Whiskeys] Remove Whiskey Fail';
export const REMOVE_WHISKEY_SUCCESS = '[Whiskeys] Remove Whiskey Success';

export class RemoveWhiskey implements Action {
  readonly type = REMOVE_WHISKEY;
  constructor(public payload: Whiskey) {}
}

export class RemoveWhiskeyFail implements Action {
  readonly type = REMOVE_WHISKEY_FAIL;
  constructor(public payload: any) {}
}

export class RemoveWhiskeySuccess implements Action {
  readonly type = REMOVE_WHISKEY_SUCCESS;
  constructor(public payload: Whiskey) {}
}

export type WhiskeysAction =
  | LoadWhiskeys
  | LoadWhiskeysFail
  | LoadWhiskeysSuccess
  | CreateWhiskey
  | CreateWhiskeyFail
  | CreateWhiskeySuccess
  | UpdateWhiskey
  | UpdateWhiskeyFail
  | UpdateWhiskeySuccess
  | RemoveWhiskey
  | RemoveWhiskeyFail
  | RemoveWhiskeySuccess;
