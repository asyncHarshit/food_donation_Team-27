
import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: process.env.Firebase_API_Key,
    authDomain: process.env.Firebase_Auth_Domain,
    projectId: process.env.Firebase_Project_Id,
    storageBucket: process.env.Firebase_Storage_Bucket,
    messagingSenderId: process.env.Firebase_Messaging_Sender_Id,
    appId: process.env.Firebase_App_Id
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);