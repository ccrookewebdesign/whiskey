import * as fromWhiskeys from '../actions/whiskeys.action';
import { Whiskey } from '../../models/whiskey.model';

export interface WhiskeyState {
  entities: { [id: string]: Whiskey };
  loaded: boolean;
  loading: boolean;
}

export const initialState: WhiskeyState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromWhiskeys.WhiskeysAction
): WhiskeyState {
  switch (action.type) {
    case fromWhiskeys.LOAD_WHISKEYS: {
      return {
        ...state,
        loading: true
      };
    }
    case fromWhiskeys.LOAD_WHISKEYS_SUCCESS: {
      const whiskeys = action.payload;

      const entities = whiskeys.reduce(
        (entities: { [id: string]: Whiskey }, whiskey: Whiskey) => {
          return {
            ...entities,
            [whiskey.id]: whiskey
          };
        },
        {
          ...state.entities
        }
      );

      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }
    case fromWhiskeys.LOAD_WHISKEYS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case fromWhiskeys.REMOVE_WHISKEY_SUCCESS: {
      const whiskey = action.payload;
      const { [whiskey.id]: removed, ...entities } = state.entities;
      return {
        ...state,
        entities
      };
    }
  }

  return state;
}

export const getWhiskeysEntities = (state: WhiskeyState) => state.entities;
export const getWhiskeysLoading = (state: WhiskeyState) => state.loading;
export const getWhiskeysLoaded = (state: WhiskeyState) => state.loaded;
