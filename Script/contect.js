document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    if (name && email && phone && message)
    {
        document.getElementById("responseMessage").textContent = "تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا.";
        document.getElementById("contactForm").reset();
    }
    else
    {
        document.getElementById("responseMessage").textContent = "please fill out of fields ";
    }
});