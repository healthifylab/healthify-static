// script.js

import { db } from './firebase.js';
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-lite.js';

// Define available options
const testOptions = ["CBC", "ECG", "Blood Sugar", "Vitamin D", "Thyroid", "LFT", "KFT"];
const profileOptions = ["Full Body Checkup", "Thyroid Profile", "Diabetes Panel"];

// Update the test/profile dropdown when category changes
window.updateOptions = function () {
  const type = document.getElementById("categorySelect").value;
  const select = document.getElementById("testSelect");
  select.innerHTML = '';
  const list = type === "test" ? testOptions : profileOptions;
  list.forEach(opt => {
    const o = document.createElement("option");
    o.textContent = o.value = opt;
    select.appendChild(o);
  });
};

// Show booking form when Book Now is clicked
document.getElementById("bookBtn").onclick = () => {
  document.getElementById("booking").style.display = "block";
  window.scrollTo({ top: document.getElementById("booking").offsetTop - 50, behavior: 'smooth' });
};

// Handle form submission
document.getElementById("bookingForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const selected = Array.from(document.getElementById("testSelect").selectedOptions).map(o => o.value);

  const data = {
    full_name: document.querySelector('input[placeholder="Full Name"]').value.trim(),
    age: document.querySelector('input[placeholder="Age"]').value.trim(),
    sex: document.querySelector('select').value.trim(),
    mobile_number: document.querySelector('input[placeholder="Mobile Number"]').value.trim(),
    full_address: document.querySelector('textarea[placeholder="Full Address"]').value.trim(),
    pincode: document.querySelector('input[placeholder="Pincode"]').value.trim(),
    category: document.getElementById("categorySelect").value.trim(),
    test_list: selected,
    appointment_date: document.querySelector('input[type="date"]').value.trim(),
    appointment_time: document.querySelector('input[type="time"]').value.trim()
  };

  // Check for any empty fields or no test selected
  if (Object.values(data).some(v => v === "" || (Array.isArray(v) && v.length === 0))) {
    alert("❗ Please fill all fields and select at least one test.");
    return;
  }

  try {
    await addDoc(collection(db, "bookings"), data);
    alert("✅ Booking submitted!");
    this.reset();
  } catch (err) {
    alert("❌ Error saving booking: " + err.message);
  }
});
