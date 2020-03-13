import firebase from 'firebase'

class Fire {
    constructor() {
        this.init()
        this.checkAuth()
    }

    init = () => {
        if(!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyCJOPk-wEZdouB9D3pnm-akrkCpAYJrcHk",
                authDomain: "chatapp-ac82b.firebaseapp.com",
                databaseURL: "https://chatapp-ac82b.firebaseio.com",
                projectId: "chatapp-ac82b",
                storageBucket: "chatapp-ac82b.appspot.com",
                messagingSenderId: "477616937459",
                appId: "1:477616937459:web:57cf2b7e3a88ca76f79a86",
                measurementId: "G-BNHSRH503Y"
            })
        }
    }

    checkAuth = () =>{
        firebase.auth().onAuthStateChanged(user => {
            if(!user) {
                firebase.auth().signInAnonymously();
            }
        });
    };

    send = messages => {
        messages.forEach(item => {
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            };

            this.db.push(message);
        });
    };

    parse = message => {
        const {user, text, timestamp} = message.val()
        const {key: _id} = message
        const createdAt = new Date(timestamp)

        return {
            _id,
            createdAt,
            text,
            user
        };
    };

    get = callback => {
        this.db.on('child_added', snapshot => callback(this.parse(snapshot)));
    };

    off() {
        this.db.off()


    }
    get db() {
        return firebase.database().ref("messages")
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }
}

export default new Fire();