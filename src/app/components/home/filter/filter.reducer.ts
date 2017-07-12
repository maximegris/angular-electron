import { Action } from '@ngrx/store';

export interface AppState {
    filter : Array<IFilter>
}

export interface IFilter {
    name: string,
    email: string,
    thumbnail: string
}

export const ACTIONS = {
    UPDATE_FITLER: 'UPDATE_FITLER',
    CLEAR_FITLER: 'CLEAR_FITLER',
}

const initialState = { name: '', email: '', thumbnail: '' };

export function filterReducer(
    state: IFilter = initialState,
    action: Action): IFilter {
    switch (action.type) {
        case ACTIONS.UPDATE_FITLER:
            // Create a new state from payload
            return Object.assign({}, action.payload);
        case ACTIONS.CLEAR_FITLER:
            // Create a new state from initial state
            return Object.assign({}, initialState);
        default:
            return state;
    }
}
