import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-lite.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
const app = initializeApp({apiKey:'AIzaSyC07SbRJnTzAAyEIQzQhL9gyId6NNfyZCg',authDomain:'healthify-lab.firebaseapp.com',projectId:'healthify-lab'});
const db = getFirestore(app);const auth = getAuth(app);
window.login=()=>{signInWithEmailAndPassword(auth,document.getElementById('email').value,document.getElementById('password').value).catch(e=>alert(e.message))};
onAuthStateChanged(auth,async user=>{if(user){document.getElementById('dashboard').style.display='block';const q=await getDocs(collection(db,'bookings'));let html='';q.forEach(docSnap=>{const d=docSnap.data();html+=`<tr><td>${d.name}</td><td>${d.status||'pending'}</td><td><button onclick="confirm('${docSnap.id}')">Confirm</button><button onclick="reject('${docSnap.id}')">Reject</button></td></tr>`});document.querySelector('#bookingsTable tbody').innerHTML=html}});
window.confirm=async(id)=>{await updateDoc(doc(db,'bookings',id),{status:'confirmed'})};
window.reject=async(id)=>{await updateDoc(doc(db,'bookings',id),{status:'rejected'})};