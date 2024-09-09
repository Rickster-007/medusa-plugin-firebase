import { setUser } from './actions';
import { FirebaseActions, FirebaseProviderState, Actions, SetUserAction } from './types';

export const defaultState = {
    metadata: null,
    isAuthenticating: false,
    isAuthenticated: false,
};

export const reducer = (
    currentState: FirebaseProviderState,
    payload: Actions
): FirebaseProviderState => {
    switch (payload.type) {
        case FirebaseActions.setUser:
            return setUser(currentState, (payload as SetUserAction).user);
        case FirebaseActions.logout:
            return defaultState;
        default:
            return currentState;
    }
};
