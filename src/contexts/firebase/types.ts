import { FirebaseOptions } from 'firebase/app';
import { User } from 'firebase/auth';
import FirebaseService from '../../services/firebase';

export enum FirebaseActions {
    setUser = 'SET_USER',
    logout = 'LOGOUT',
}

export interface FirebaseContextState {
    actions: FirebaseService;
    user: FirebaseProviderState;
}

export interface FirebaseProviderState {
    metadata: User | null;
    isAuthenticating: boolean;
    isAuthenticated: boolean;
}

export interface FirebaseProviderProps {
    children: React.ReactNode;
    initialState: FirebaseProviderState;
    config: FirebaseOptions;
}

interface Action {
    type: FirebaseActions;
}

export interface SetUserAction extends Action {
    user: User;
}

export interface LogoutAction extends Action {}

export type Actions = SetUserAction | LogoutAction;
