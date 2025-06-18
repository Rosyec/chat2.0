import { app } from "@/lib/firebase.config";
import { doc, getFirestore } from "firebase/firestore";
import { GithubAuthProvider, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";
import { collection, addDoc, getDoc, getDocs } from "firebase/firestore";

const db = getFirestore(app)

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export async function loginWithGoogle() {
    const auth = getAuth()
    signInWithPopup(auth, googleProvider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
            const accessToken = credential.accessToken;
            const user = result.user;
            console.log('GOOGLE: ', user)
            // The signed-in user info.
            // IdP data available using getAdditionalUserInfo(result)
        }

    }).catch((error) => {

    })
}

export async function loginWithGithub() {
    const auth = getAuth()
    signInWithPopup(auth, githubProvider).then((result) => {
        // The signed-in user info.
        const user = result.user;
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        if (credential) {
            const accessToken = credential.accessToken;
            const user = result.user;
            console.log('GITHUB: ', user)
            // IdP data available using getAdditionalUserInfo(result)
        }


    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('ERROR GITHUB: ', errorMessage)
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
    })

}

export async function logOut() {
    const auth = getAuth()
    signOut(auth).then(() => { console.log('Logout success') }).catch((error) => { })
}

export async function saveMessage() {
    try {
        const docRef = await addDoc(collection(db, "chat"), {
            first: "Ada",
            last: "Lovelace",
            born: 1815
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function readOneMessage() {
    const docRef = doc(db, "chat", "Ada");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
        console.log("No such document!");
    }
}

export async function readMessages() {
    const querySnapshot = await getDocs(collection(db, "chat"));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
}