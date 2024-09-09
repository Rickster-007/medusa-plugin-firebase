import { createContext, useContext, useEffect, useReducer, FC, useMemo } from 'react';
import FirebaseService from '../../services/firebase';
import { User } from 'firebase/auth';
import { defaultState, reducer } from './reducer';
import { FirebaseActions, FirebaseContextState, FirebaseProviderProps } from './types';

const FirebaseContext = createContext<FirebaseContextState | null>(null);

export const FirebaseAuthProvider: FC<FirebaseProviderProps> = ({
    children,
    config,
    initialState = defaultState,
}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const client: FirebaseService = useMemo(() => new FirebaseService({}, config), [config]);

    useEffect(() => {
        if (client) {
            const unsubscribe = client
                .auth()
                .onAuthStateChanged(client.auth(), (user: User) =>
                    dispatch({ type: FirebaseActions.setUser, user })
                );
            return () => unsubscribe();
        }
    }, [client]);

    const valueProvider = {
        actions: client,
        user: {
            isAuthenticating: state.isAuthenticating,
            isAuthenticated: state.metadata !== null,
            metadata: state.metadata,
        },
    } as FirebaseContextState;

    return <FirebaseContext.Provider value={valueProvider}>{children}</FirebaseContext.Provider>;
};

export const useFirebase = () => {
    const context = useContext(FirebaseContext);
    if (!context) {
        throw new Error('useFirebase must be used within a FirebaseAuthProvider');
    }
    return context;
};
