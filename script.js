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
  const data = {
  full_name: document.querySelector('input[placeholder="Full Name"]').value.trim(),
  age: document.querySelector('input[placeholder="Age"]').value.trim(),
  sex: document.querySelector('select').value.trim(),
  mobile_number: document.querySelector('input[placeholder="Mobile Number"]').value.trim(),
  full_address: document.querySelector('textarea[placeholder="Full Address"]').value.trim(),
  pincode: document.querySelector('input[placeholder="Pincode"]').value.trim(),
  category: document.getElementById("categorySelect").value.trim(),
  test_or_profile: document.getElementById("testSelect").value.trim(),
  appointment_date: document.querySelector('input[type="date"]').value.trim(),
  appointment_time: document.querySelector('input[type="time"]').value.trim()
};

if (Object.values(data).some(v => v === "")) {
  alert("❗Please fill all fields before submitting.");
  return;
}


  try {
    const docRef = await addDoc(collection(db, "bookings"), data);
    alert("✅ Booking submitted!\nRef ID: " + docRef.id);
    this.reset();
  } catch (err) {
    alert("❌ Error saving booking:\n" + err.message); // This shows exact error on mobile
  }
});


const profiles = [
  {
    title: "Full Body Checkup",
    desc: "Includes CBC, LFT, KFT, Thyroid, Sugar. Ideal for complete body health.",
    price: "₹999"
  },
  {
    title: "Thyroid Profile",
    desc: "Includes T3, T4, TSH. Recommended for thyroid monitoring.",
    price: "₹499"
  },
  {
    title: "Diabetes Panel",
    desc: "Includes FBS, PPBS, HbA1c. Perfect for managing diabetes.",
    price: "₹599"
  }
];

window.openProfile = function (i) {
  const p = profiles[i];
  document.getElementById("mdlTitle").textContent = p.title;
  document.getElementById("mdlDesc").textContent = p.desc;
  document.getElementById("mdlPrice").textContent = p.price;
  document.getElementById("profileDetail").style.display = "block";
};

window.closeModal = function () {
  document.getElementById("profileDetail").style.display = "none";
};

window.bookFromModal = function () {
  document.getElementById("profileDetail").style.display = "none";
  document.getElementById("booking").style.display = "block";
  window.scrollTo({ top: document.getElementById("booking").offsetTop - 50, behavior: 'smooth' });
};


