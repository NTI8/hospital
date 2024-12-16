const doctors = {
  Internal: [{ name: "Dr. Mario Gad", location: "القاهرة", rating: 4.8 }],
  neurology: [{ name: "Dr. Mahmoud Aldoumyati", location: "الإسكندرية", rating: 4.9 }],
  obstetrics: [{ name: "Dr. Khaled Al-Qandilids", location: "القاهرة", rating: 4.7 }],
  orthopedic: [{ name: "Dr. Ahmed Salahs", location: "طنطا", rating: 4.6 }],
  cardiology: [{ name: "Dr. Samir", location: "القاهرة", rating: 4.7 }],
  dentistry: [{ name: "Dr. Ahmed", location: "طنطا", rating: 4.5 }],
  pediatrics: [{ name: "Dr. Huda", location: "القاهرة", rating: 4.9 }],
  urology: [{ name: "Dr. Sami", location: "المنصورة", rating: 4.7 }],
  ophthalmology: [{ name: "Dr. Noha", location: "القاهرة", rating: 4.9 }],
  ENT: [{ name: "Dr. Khalid", location: "الجيزة", rating: 4.7 }],
}

let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

const specialtyTranslations = {
  Internal: "الباطنة",
  neurology: "طب الأعصاب",
  obstetrics: "طب النساء والتوليد",
  orthopedic: "جراحة العظام",
  cardiology: "طب القلب",
  dentistry: "طب الأسنان",
  pediatrics: "طب الأطفال",
  urology: "طب المسالك البولية",
  ophthalmology: "طب العيون",
  ENT: "طب الأنف والأذن والحنجرة",
};

document.getElementById("specialty").addEventListener("change", function () {
  const specialty = this.value;
  const doctorSelect = document.getElementById("doctor");

  doctorSelect.innerHTML = '<option value="" disabled selected>اختر الطبيب</option>';

  if (specialty && doctors[specialty]) {
    doctors[specialty].forEach((doctor) => {
      const option = document.createElement("option");
      option.value = doctor.name;
      option.textContent = `${doctor.name} - ${doctor.location} (${doctor.rating}★)`;
      doctorSelect.appendChild(option);
    });
  }
});


function updateTimes() {
  const doctor = document.getElementById("doctor").value;
  const date = document.getElementById("date").value;
  const timeSelect = document.getElementById("time");

  timeSelect.innerHTML = '<option value="" disabled selected>اختر الوقت</option>';

  const today = new Date();
  const selectedDate = new Date(date);
  today.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    alert("لا يمكنك اختيار تاريخ سابق.");
    return;
  }

  const allTimes = [
    { value: "10:00", label: "10:00 صباحاً" },
    { value: "11:00", label: "11:00 ظهراً" },
    { value: "12:00", label: "12:00 ظهراً" },
    { value: "13:00", label: "1:00 مساءً" },
    { value: "14:00", label: "2:00 مساءً" },
    { value: "15:00", label: "3:00 مساءً" },
    { value: "16:00", label: "4:00 مساءً" },
    { value: "17:00", label: "5:00 مساءً" },
  ];

  const bookedTimes = appointments.filter(
    (appointment) =>
      appointment.doctor === doctor && appointment.date === date
  ).map((appointment) => appointment.time);

  allTimes.forEach((time) => {
    if (!bookedTimes.includes(time.value)) {
      const option = document.createElement("option");
      option.value = time.value;
      option.textContent = time.label;
      timeSelect.appendChild(option);
    }
  });
}

document.getElementById("doctor").addEventListener("change", updateTimes);
document.getElementById("date").addEventListener("change", updateTimes);

// document.getElementById("booking-form").addEventListener("submit", function (e) {
//   e.preventDefault();
 
 
//   const name = document.getElementById("patient-name").value;
//   const phone = document.getElementById("phone").value;
  
  
//   const email = document.getElementById("email").value;
//   const specialty = document.getElementById("specialty").value;
//   const doctor = document.getElementById("doctor").value;
//   const date = document.getElementById("date").value;
//   const time = document.getElementById("time").value;
//   const phoneError = document.getElementById("phone-error");

//   phoneError.style.display = "none";

//   const phoneRegex = /^(010|011|012|015)\d{8}$/;
//   if (!phoneRegex.test(phone)) {
//     phoneError.textContent = "يرجى إدخال رقم هاتف صالح (11 رقمًا يبدأ بـ 010، 011، 012، أو 015).";
//     phoneError.style.display = "block";
//     return;
//   }

//   const isDuplicate = appointments.some(
//     (appointment) =>
//       appointment.doctor === doctor &&
//       appointment.date === date &&
//       appointment.time === time
//   );

//   if (isDuplicate) {
//     alert("الوقت الذي اخترته محجوز مسبقًا. يرجى اختيار وقت آخر.");
//     return;
//   }

//   const newAppointment = {
//     name,
//     phone,
//     email,
//     specialty,
//     doctor,
//     date,
//     time,
//   };

//   appointments.push(newAppointment);
//   localStorage.setItem("appointments", JSON.stringify(appointments));

//   document.getElementById("receipt-name").textContent = name;
//   document.getElementById("receipt-phone").textContent = phone;
//   document.getElementById("receipt-email").textContent = email;
//   document.getElementById("receipt-specialty").textContent =
//     specialtyTranslations[specialty] || specialty;
//   document.getElementById("receipt-doctor").textContent = doctor;
//   document.getElementById("receipt-date").textContent = date;
//   document.getElementById("receipt-time").textContent = time;
//   document.getElementById("receipt").style.display = "block";

//   this.reset();
// });
document.getElementById("booking-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("patient-name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const specialty = document.getElementById("specialty").value;
  const doctor = document.getElementById("doctor").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const phoneError = document.getElementById("phone-error");

  phoneError.style.display = "none";
  emailjs.send("1cSz30xRR6jPdmPvk"); // مفتاح عام
  emailjs
    .send("service_ivkbubv", "template_5el9dyg", {
      patient_name: name,
      patient_phone: phone,
      patient_email: email,
      specialty: specialtyTranslations?.[specialty] || specialty,
      doctor_name: doctor,
      appointment_date: date,
      appointment_time: time,
    })
    .then(() => {
      alert("تم إرسال التأكيد إلى البريد الإلكتروني بنجاح.");
    })
    .catch((error) => {
      console.error("خطأ أثناء إرسال البريد الإلكتروني:", error);
      alert("حدث خطأ أثناء إرسال البريد الإلكتروني. يرجى المحاولة لاحقًا.");
    });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("يرجى إدخال بريد إلكتروني صالح.");
      return;
    }
    
  const phoneRegex = /^(010|011|012|015)\d{8}$/;
  if (!phoneRegex.test(phone)) {
    phoneError.textContent = "يرجى إدخال رقم هاتف صالح (11 رقمًا يبدأ بـ 010، 011، 012، أو 015).";
    phoneError.style.display = "block";
    return;
  }

  const isDuplicate = appointments.some(
    (appointment) =>
      appointment.doctor === doctor &&
      appointment.date === date &&
      appointment.time === time
  );

  if (isDuplicate) {
    alert("الوقت الذي اخترته محجوز مسبقًا. يرجى اختيار وقت آخر.");
    return;
  }

  const newAppointment = {
    name,
    phone,
    email,
    specialty,
    doctor,
    date,
    time,
  };

  appointments.push(newAppointment);
  localStorage.setItem("appointments", JSON.stringify(appointments));

  document.getElementById("receipt-name").textContent = name;
  document.getElementById("receipt-phone").textContent = phone;
  document.getElementById("receipt-email").textContent = email;
  document.getElementById("receipt-specialty").textContent =
    specialtyTranslations[specialty] || specialty;
  document.getElementById("receipt-doctor").textContent = doctor;
  document.getElementById("receipt-date").textContent = date;
  document.getElementById("receipt-time").textContent = time;
  document.getElementById("receipt").style.display = "block";
  emailjs.init("1cSz30xRR6jPdmPvk"); // استبدل YOUR_PUBLIC_KEY بالمفتاح العام الخاص بك

});


document.getElementById("edit-appointment").addEventListener("click", function () {
  const name = document.getElementById("receipt-name").textContent;
  const phone = document.getElementById("receipt-phone").textContent;
  const email = document.getElementById("receipt-email").textContent;
  const specialty = Object.keys(specialtyTranslations).find(
    (key) =>
      specialtyTranslations[key] ===
      document.getElementById("receipt-specialty").textContent
  );
  const doctor = document.getElementById("receipt-doctor").textContent;
  const date = document.getElementById("receipt-date").textContent;
  const time = document.getElementById("receipt-time").textContent;

  document.getElementById("patient-name").value = name;
  document.getElementById("phone").value = phone;
  document.getElementById("email").value = email;
  document.getElementById("specialty").value = specialty;
  document.getElementById("specialty").dispatchEvent(new Event("change"));

  setTimeout(() => {
    document.getElementById("doctor").value = doctor;
    document.getElementById("doctor").dispatchEvent(new Event("change"));
    setTimeout(() => {
      document.getElementById("date").value = date;
      document.getElementById("date").dispatchEvent(new Event("change"));
      setTimeout(() => {
        document.getElementById("time").value = time;
      }, 100);
    }, 100);
  }, 100);

  document.getElementById("receipt").style.display = "none";
});

document.getElementById("print-receipt").addEventListener("click", function () {
  const receiptContent = document.getElementById("receipt").innerHTML;
  const originalContent = document.body.innerHTML;

  document.body.innerHTML = receiptContent;
  window.print();

  document.body.innerHTML = originalContent;
  location.reload();
});






