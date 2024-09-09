import { User } from 'firebase/auth';
import { FirebaseProviderState } from './types';

export const setUser = (currentState: FirebaseProviderState, user: User): FirebaseProviderState => {
    return {
        ...currentState,
        metadata: user,
        isAuthenticating: false,
        isAuthenticated: true,
    };
};
