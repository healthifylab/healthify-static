import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-lite.js";

const firebaseConfig = {
  apiKey: "AIzaSyC07SbRJnTzAAyEIQzQhL9gyId6NNfyZCg",
  projectId: "healthify-lab",
authDomain: "healthify-lab.firebaseapp.com",
storageBucket: "healthify-lab.appspot.com",

  messagingSenderId: "403894737424",
  appId: "1:403894737424:web:9ff2c41f9d3c54aef93c61"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };


