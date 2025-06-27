import { db } from './firebase.js';
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-lite.js';

const testOptions = ["CBC", "ECG", "Blood Sugar", "Vitamin D", "Thyroid", "LFT", "KFT"];
const profileOptions = ["Full Body Checkup", "Thyroid Profile", "Diabetes Panel"];

window.updateOptions = function () {
  const type = document.getElementById("categorySelect").value;
  const select = document.getElementById("testSelect");
  select.innerHTML = '<option value="">Select Test or Profile</option>';
  (type === "test" ? testOptions : profileOptions).forEach(opt => {
    const o = document.createElement("option");
    o.textContent = o.value = opt;
    select.appendChild(o);
  });
};

document.getElementById("bookBtn").onclick = () => {
  document.getElementById("booking").style.display = "block";
  window.scrollTo({ top: document.getElementById("booking").offsetTop - 50, behavior: 'smooth' });
};

document.getElementById("bookingForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const data = {};
  document.querySelectorAll("#bookingForm input, select, textarea").forEach(el => {
    data[el.placeholder?.toLowerCase().replace(/ /g, "_") || el.name || el.id] = el.value;
  });
  try {
    await addDoc(collection(db, "bookings"), data);
    alert("✅ Booking submitted!");
    this.reset();
  } catch (err) {
    alert("❌ Error saving booking"); console.error(err);
  }
});
