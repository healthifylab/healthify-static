const testOptions = [
  "CBC", "Blood Sugar (F/PP)", "Thyroid (T3, T4, TSH)", "LFT", "KFT", "Lipid Profile",
  "Vitamin D", "Vitamin B12", "HbA1c", "CRP", "Dengue", "Malaria", "Widal",
  "Urine Routine", "ESR", "HIV", "HCV", "HBsAg", "PT/INR", "Blood Group", "ECG"
];

const profileOptions = [
  "Full Body Checkup – Basic", "Full Body Checkup – Advanced", "Thyroid Profile",
  "Diabetes Profile", "Fever Profile", "Senior Citizen Profile",
  "Women’s Health Panel", "Men’s Wellness Panel", "Pregnancy Profile", "Immunity Booster Panel"
];

function updateOptions() {
  const category = document.getElementById("categorySelect").value;
  const select = document.getElementById("testSelect");
  select.innerHTML = '<option value="">Select Test or Profile</option>';
  const options = category === "test" ? testOptions : profileOptions;
  options.forEach(opt => {
    const o = document.createElement("option");
    o.value = o.textContent = opt;
    select.appendChild(o);
  });
}
