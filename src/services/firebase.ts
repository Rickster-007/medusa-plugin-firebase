import { BaseService } from 'medusa-interfaces';
import { FirebaseOptions, initializeApp } from 'firebase/app';
import { User, UserCredential } from 'firebase/auth';

class FirebaseService extends BaseService {
    options_: FirebaseOptions;
    firebase_: any;

    constructor({}, options: FirebaseOptions) {
        super();

        this.options_ = options;
        this.firebase_ = initializeApp(this.options_);
    }

    async signin(email: string, password: string): Promise<UserCredential> {
        return await this.firebase_.auth().signInWithEmailAndPassword(email, password);
    }

    async logout(callback?: () => void): Promise<void> {
        return await this.firebase_
            .auth()
            .signOut()
            .then(() => {
                if (callback) {
                    callback();
                }
            });
    }

    async createAccount(email: string, password: string): Promise<UserCredential> {
        return await this.firebase_
            .auth()
            .createUserWithEmailAndPassword(this.firebase_.auth(), email, password);
    }

    getCurrentUser(): User {
        return this.firebase_.auth().currentUser;
    }

    auth() {
        return this.firebase_.auth();
    }
}

export default FirebaseService;
