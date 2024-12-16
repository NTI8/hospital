document.addEventListener("DOMContentLoaded", () => {
    // عداد الزوار
    const visitorCountDisplay = document.getElementById("visitor-count");
    let visitorCount = localStorage.getItem("visitorCount") || 0;
    visitorCount++;
    visitorCountDisplay.textContent = visitorCount;
    localStorage.setItem("visitorCount", visitorCount);

    // التقييمات
    const reviewList = document.getElementById("review-list");
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const updateReviews = () => {
        reviewList.innerHTML = "";
        let totalRating = 0;
        reviews.forEach(review => {
            const reviewItem = document.createElement("div");
            reviewItem.className = "alert alert-secondary";
            reviewItem.textContent = `${review.text} - ⭐ (${review.rating})`;
            reviewList.appendChild(reviewItem);
            totalRating += review.rating;
        });
        document.getElementById("average-rating").textContent =
            (reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : "0");
    };
    updateReviews();

    document.getElementById("submit-review").addEventListener("click", () => {
        const reviewText = document.getElementById("review-text").value;
        const rating = parseInt(document.getElementById("rating-select").value, 10);
        if (reviewText.trim()) {
            reviews.push({ text: reviewText, rating });
            localStorage.setItem("reviews", JSON.stringify(reviews));
            updateReviews();
        }
    });

    // إرسال WhatsApp
    document
        .getElementById("whatsapp-button")
        .addEventListener("click", () => {
            const message = document.getElementById("message").value.trim();
            const phoneNumber = "2001212633678";
            if (message) {
                const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                    message
                )}`;
                window.open(url, "_blank");
            }
        });
});
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
    const filterSelect = document.getElementById("filter");
    const doctorsList = document.getElementById("doctors").children;

    function filterDoctors() {
        const searchValue = searchInput.value.toLowerCase();
        const filterValue = filterSelect.value;

        Array.from(doctorsList).forEach((doctor) => {
            const name = doctor.dataset.name.toLowerCase();
            const specialization = doctor.dataset.specialization;

            const matchesSearch = name.includes(searchValue);
            const matchesFilter = !filterValue || specialization === filterValue;

            if (matchesSearch && matchesFilter) {
                doctor.style.display = "block";
            } else {
                doctor.style.display = "none";
            }
        });
    }

    searchInput.addEventListener("input", filterDoctors);
    filterSelect.addEventListener("change", filterDoctors);
});
document.addEventListener("DOMContentLoaded", () => {
    // تحديث عدد الزوار
    let visitorCount = localStorage.getItem("visitorCount") || 0;
    const visitorDisplay = document.getElementById("visitor-count");
    visitorDisplay.textContent = ++visitorCount;
    localStorage.setItem("visitorCount", visitorCount);

    // إدارة التقييمات
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const reviewList = document.getElementById("review-list");
    const averageRatingDisplay = document.getElementById("average-rating");

    const updateReviews = () => {
        reviewList.innerHTML = ""; // مسح القائمة الحالية
        let totalRating = 0;

        reviews.forEach((review) => {
            const reviewItem = document.createElement("div");
            reviewItem.className = "alert alert-secondary mt-2";
            reviewItem.textContent = `${review.text} - ⭐ (${review.rating})`;
            reviewList.appendChild(reviewItem);
            totalRating += review.rating;
        });

        // حساب التقييم العام
        const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : 0;
        averageRatingDisplay.textContent = averageRating;
    };

    updateReviews();

    // إضافة تقييم جديد
    document.getElementById("submit-review").addEventListener("click", () => {
        const reviewText = document.getElementById("review-text").value;
        const rating = Math.floor(Math.random() * 5) + 1; // تقييم عشوائي بين 1 و 5 (يمكن تعديل هذا ليكون اختيار المستخدم)

        if (reviewText.trim()) {
            reviews.push({ text: reviewText, rating });
            localStorage.setItem("reviews", JSON.stringify(reviews));
            document.getElementById("review-text").value = ""; // مسح النص
            updateReviews();
        } else {
            alert("يرجى إدخال نص التقييم.");
        }
    });

    // إدارة الحجز
    const scheduleButtons = document.querySelectorAll(".slot");
    scheduleButtons.forEach((button) => {
        button.addEventListener((`"click", () => {
            alert(تم حجز الموعد: ${button.textContent}`));
    });
});

// دفع الأموال
document.getElementById("pay-button").addEventListener("click", () => {
    alert("تم الدفع بنجاح!");
});

// إرسال WhatsApe)}`
function sendToWhatsApp() {
    const phoneNumber = "201010557535"; // رقم الهاتف مع كود الدولة
    const message = document.getElementById("message").value;
    const encodedMessage = encodeURIComponent(message); // تشفير النص
    const url = ` https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, "_blank");
}


