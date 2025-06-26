import { db } from './firebase.js';
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-lite.js';

const testOptions = ["CBC", "ECG", "Blood Sugar (F/PP)", "Thyroid", "Vitamin D", "LFT", "KFT", "CRP", "Widal"];
const profileOptions = ["Full Body Checkup – Basic", "Thyroid Profile", "Diabetes Panel", "Fever Profile", "Senior Citizen Profile"];

window.updateOptions = function () {
  const type = document.getElementById("categorySelect").value;
  const list = type === "test" ? testOptions : profileOptions;
  const select = document.getElementById("testSelect");
  select.innerHTML = '<option value="">Select Test or Profile</option>';
  list.forEach(opt => {
    const o = document.createElement("option");
    o.textContent = o.value = opt;
    select.appendChild(o);
  });
};

document.getElementById("bookingForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const inputs = document.querySelectorAll("#bookingForm input, #bookingForm select, #bookingForm textarea");
  const data = {};
  inputs.forEach(el => {
    if (el.name || el.placeholder) {
      data[(el.name || el.placeholder).toLowerCase().replace(/ /g, "_")] = el.value;
    }
  });
  try {
    await addDoc(collection(db, "bookings"), data);
    alert("✅ Booking submitted!");
    e.target.reset();
  } catch (err) {
    alert("❌ Error saving booking");
    console.error(err);
  }
});