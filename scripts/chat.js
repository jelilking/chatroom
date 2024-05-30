// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  serverTimestamp,
  addDoc,
  onSnapshot,
  query,
  where,
  orderBy,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdVetLvM-ROxL2MW_dwZ2aQjrBJxeNXvo",
  authDomain: "udemy-modern-javascript-a97d3.firebaseapp.com",
  projectId: "udemy-modern-javascript-a97d3",
  storageBucket: "udemy-modern-javascript-a97d3.appspot.com",
  messagingSenderId: "315127677335",
  appId: "1:315127677335:web:e6d1d49d360b59e42b44d2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

const colRef = collection(db, "chat");

//step / algorithm
//1. adding new chat documents
//2. setting up a real time listener to get new chats
//3. updating the username
//4. updating the room

export class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = colRef;
    this.unsub;
  }

  async addChat(message) {
    //format a chat object
    const now = serverTimestamp();
    const chat = {
      message: message,
      username: this.username,
      room: this.room,
      created_at: now,
    };

    //save the chat document
    const response = await addDoc(this.chats, chat);
    return response;
  }

  // getting chats with using realtime listner
  getChats(callback) {
    const q = query(
      this.chats,
      where("room", "==", this.room),
      orderBy("created_at")
    );
    this.unsub = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          //update the ui
          callback(change.doc.data());
        }
      });
    });
  }

  updateName(username) {
    this.username = username;
    localStorage.setItem("username", username);
  }

  updateRoom(room) {
    this.room = room;
    console.log("room updated");
    if (this.unsub) {
      this.unsub();
    }
  }
}
