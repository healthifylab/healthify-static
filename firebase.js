// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-lite.js";

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC07SbRJnTzAAyEIQzQhL9gyId6NNfyZCg",
  authDomain: "healthify-lab.firebaseapp.com",
  projectId: "healthify-lab",
  storageBucket: "healthify-lab.appspot.com",
  messagingSenderId: "403894737424",
  appId: "1:403894737424:web:9ff2c41f9d3c54aef93c61"
};

// 🔌 Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
