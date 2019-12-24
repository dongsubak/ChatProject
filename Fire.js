import firebase from 'firebase'

class Fire {
    constructor() {
        this.init()
        this.checkAuth()
    }

    init = () => {
        if(!firebase.apps.length) {
            firebase.initializeApp({

            })
        }
    }

    checkAuth = () =>{
        firebase.auth().onAuthStateChanged(user => {
            if(!suer) {
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
        const {Key: _id} = message
        const createdAt = new Date(timestamp)

        return {
            _id,
            createdAt,
            text,
            user
        }
    }
    get db() {
        return firebase.database().ref("messages")
    }
}