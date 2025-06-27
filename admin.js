import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-lite.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyC07SbRJnTzAAyEIQzQhL9gyId6NNfyZCg",
  authDomain: "healthify-lab.firebaseapp.com",
  projectId: "healthify-lab",
  storageBucket: "healthify-lab.appspot.com",
  messagingSenderId: "403894737424",
  appId: "1:403894737424:web:9ff2c41f9d3c54aef93c61"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

window.loginAdmin = () => {
  const email = document.getElementById("adminEmail").value.trim();
  const pass = document.getElementById("adminPass").value.trim();
  signInWithEmailAndPassword(auth, email, pass)
    .then(() => alert("✅ Login successful"))
    .catch(err => alert("❌ Login error: " + err.message));
};

onAuthStateChanged(auth, async (user) => {
  if (user) {
    document.getElementById("adminDashboard").style.display = "block";
    const snap = await getDocs(collection(db, "bookings"));
    const table = document.getElementById("bookingTable");
    snap.forEach(docSnap => {
      const d = docSnap.data();
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${d.full_name}</td>
        <td>${d.mobile_number}</td>
        <td>${(d.test_list || []).join(", ")}</td>
        <td>${d.appointment_date} ${d.appointment_time}</td>
        <td>
          <button onclick="updateStatus('${docSnap.id}', 'Confirmed')">✔️</button>
          <button onclick="updateStatus('${docSnap.id}', 'Hold')">⏸️</button>
          <button onclick="updateStatus('${docSnap.id}', 'Rejected')">❌</button>
          <button onclick="updateStatus('${docSnap.id}', 'Reschedule')">📅</button>
        </td>
      `;
      table.appendChild(tr);
    });
  }
});

window.updateStatus = async (id, status) => {
  const bookingRef = doc(db, "bookings", id);
  try {
    await updateDoc(bookingRef, { status });
    alert("Status updated to: " + status);
    location.reload();
  } catch (err) {
    alert("Error updating: " + err.message);
  }
};
