const LoginRadio = document.querySelectorAll(".LoginRadio"),
  BtnRegister = document.getElementById("BtnRegister"),
  posRegister = document.querySelectorAll(".posRegister"),
  buttons = document.querySelectorAll(".btnSwithcMain"),
  sections = document.querySelectorAll(".content-section");
localStorage.getItem("userRegister") ||
  localStorage.setItem("userRegister", JSON.stringify([])),
  localStorage.getItem("userIdLogin") ||
    localStorage.setItem("userIdLogin", null);
let ObjectUserRegisterData =
    JSON.parse(localStorage.getItem("userRegister")) || [],
  valid = 0,
  pass = "",
  userId = +localStorage.getItem("userId") || null;
function validateInput(e, t, i, s = null) {
  const r = document.getElementById(i);
  t.test(e)
    ? (r.classList.remove("is-invalid"),
      r.classList.add("is-valid"),
      valid++,
      s && s())
    : (r.classList.remove("is-valid"), r.classList.add("is-invalid"));
}
function ValidationName(e, t) {
  validateInput(
    e,
    /^[\u0600-\u06FFa-zA-Z]{3,}(\s{0,1}[\u0600-\u06FFa-zA-Z]{3,})*$/,
    t
  );
}
function ValidationEmail(e, t) {
  validateInput(e, /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, t);
}
function ValidationPassword(e, t) {
  (pass = e),
    validateInput(
      e,
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      t,
      () => {
        document.querySelector(`#${t} + .valid-pass`).classList.add("d-none");
      }
    );
}
function ValidationConfirmPassword(e, t) {
  validateInput(e, new RegExp(`^${pass}$`), t);
}
function LoginSubmit() {
  const e = Array.from(LoginRadio).find((e) => e.checked);
  if (!e) return void alert("يرجى اختيار نوع المستخدم (دكتور أو مريض).");
  const t = e.getAttribute("data-position");
  if (!t) return;
  const i = document.querySelector(".LoginEmail").value.trim(),
    s = document.querySelector(".LoginPassword").value;
  if (
    "admin" == Array.from(LoginRadio).find((e) => e.checked).dataset.position &&
    "admin" == i &&
    "admin" == s
  )
    return (
      localStorage.setItem("userIdLogin", "admin"),
      void window.location.assign(`../pages/loginPages/${t}ProfilePage.html`)
    );
  if (0 === ObjectUserRegisterData.length)
    return void alert("لا توجد بيانات مسجلة. يرجى التسجيل أولاً.");
  const r = ObjectUserRegisterData.find(
    (e) =>
      e.emailRegister === i && e.passRegister === s && e.positionsRegister === t
  );
  r
    ? (localStorage.setItem("userIdLogin", r.id),
      window.location.assign(`../pages/loginPages/${t}ProfilePage.html`))
    : alert("بيانات الدخول غير صحيحة. يرجى المحاولة مرة أخرى.");
}
function registerSubmit() {
  if (valid < 4) return void alert("يرجى إدخال جميع البيانات بشكل صحيح.");
  const e = Array.from(posRegister).find((e) => e.checked);
  if (!e) return void alert("يرجى اختيار نوع المستخدم (دكتور أو مريض).");
  const t = e.getAttribute("data-position"),
    i = {
      id: generateUniqueCode(),
      userRegister: document.querySelector(".userRegister").value.trim(),
      emailRegister: document.querySelector(".emailRegister").value.trim(),
      passRegister: document.querySelector(".passRegister").value,
      positionsRegister: t,
    };
  ObjectUserRegisterData.find((e) => e.emailRegister === i.emailRegister)
    ? alert("البريد الإلكتروني مسجل بالفعل. يرجى تسجيل الدخول.")
    : (ObjectUserRegisterData.push(i),
      localStorage.setItem(
        "userRegister",
        JSON.stringify(ObjectUserRegisterData)
      ),
      localStorage.setItem("userIdLogin", i.id),
      alert("تم التسجيل بنجاح!"),
      window.location.assign(`../pages/loginPages/${t}ProfilePage.html`),
      (valid = 0));
}
function updateUser() {
  const e = localStorage.getItem("userIdLogin"),
    t = ObjectUserRegisterData.findIndex((t) => t.id === e);
  -1 !== t
    ? ((ObjectUserRegisterData[t].userRegister = document
        .getElementById("editUsernameProfile")
        .value.trim()),
      (ObjectUserRegisterData[t].emailRegister = document
        .getElementById("editEmailProfile")
        .value.trim()),
      (ObjectUserRegisterData[t].passRegister = document.getElementById(
        "editPasswordProfile"
      ).value),
      localStorage.setItem(
        "userRegister",
        JSON.stringify(ObjectUserRegisterData)
      ),
      alert("تم تحديث بيانات المستخدم بنجاح!"))
    : alert("المستخدم غير موجود.");
}
function deleteUser(e) {
  const t = ObjectUserRegisterData.findIndex((t) => t.id === e);
  -1 !== t
    ? (ObjectUserRegisterData.splice(t, 1),
      localStorage.setItem(
        "userRegister",
        JSON.stringify(ObjectUserRegisterData)
      ),
      alert("تم حذف المستخدم بنجاح!"))
    : alert("المستخدم غير موجود.");
}
function listUsers() {}
function togglePassword(e) {
  const t = document.getElementById(e),
    i = t.nextElementSibling,
    s = "password" === t.type;
  (t.type = s ? "text" : "password"),
    i.classList.toggle("fa-eye", !s),
    i.classList.toggle("fa-eye-slash", s);
}
function displayUserData() {
  const e = localStorage.getItem("userIdLogin");
  if (0 != +e) {
    const t = (JSON.parse(localStorage.getItem("userRegister")) || []).find(
      (t) => t.id === e
    );
    t &&
      ((document.getElementById("useProfileName").innerText =
        t.userRegister || "غير معروف"),
      (document.getElementById("editUsernameProfile").value =
        t.userRegister || ""),
      (document.getElementById("editEmailProfile").value =
        t.emailRegister || ""),
      (document.getElementById("editPasswordProfile").value =
        t.passRegister || ""));
  }
}
buttons.forEach((e) => {
  e.addEventListener("click", () => {
    sections.forEach((e) => e.classList.remove("active"));
    const t = document.getElementById(e.getAttribute("data-btn"));
    t && t.classList.add("active");
  });
}),
  displayUserData();
const id_Login = parseInt(localStorage.getItem("userIdLogin"));
function generateUniqueCode() {
  return Date.now().toString(36);
}
function registerSubmit() {
  if (valid < 4) return void alert("يرجى إدخال بيانات صحيحة.");
  const e = Array.from(posRegister).find((e) => e.checked);
  if (!e) return void alert("يرجى اختيار نوع المستخدم (دكتور أو مريض).");
  const t = e.getAttribute("data-position"),
    i = {
      id: generateUniqueCode(),
      userRegister: document.querySelector(".userRegister").value,
      emailRegister: document.querySelector(".emailRegister").value,
      passRegister: document.querySelector(".passRegister").value,
      confPassRegister: document.querySelector(".confPassRegister").value,
      positionsRegister: t,
    };
  ObjectUserRegisterData.push(i),
    localStorage.setItem(
      "userRegister",
      JSON.stringify(ObjectUserRegisterData)
    ),
    localStorage.setItem("userIdLogin", i.id),
    window.location.assign(`../pages/loginPages/${t}ProfilePage.html`),
    (valid = 0);
}
!isNaN(id_Login) &&
  ObjectUserRegisterData.length > 0 &&
  ((document.getElementById("editUsernameProfile").value =
    ObjectUserRegisterData[id_Login]?.userRegister || ""),
  (document.getElementById("editEmailProfile").value =
    ObjectUserRegisterData[id_Login]?.emailRegister || ""),
  (document.getElementById("editPasswordProfile").value =
    ObjectUserRegisterData[id_Login]?.passRegister || ""),
  document
    .getElementById("btnEditPrfole")
    .addEventListener("click", function () {
      (ObjectUserRegisterData[id_Login].userRegister = document.getElementById(
        "editUsernameProfile"
      ).value),
        (ObjectUserRegisterData[id_Login].emailRegister =
          document.getElementById("editEmailProfile").value),
        (ObjectUserRegisterData[id_Login].passRegister =
          document.getElementById("editPasswordProfile").value),
        localStorage.setItem(
          "userRegister",
          JSON.stringify(ObjectUserRegisterData)
        ),
        alert("تم تحديث البيانات بنجاح!");
    }),
  document
    .getElementById("DelteUserProfile")
    .addEventListener("click", function () {
      ObjectUserRegisterData.splice(id_Login, 1),
        localStorage.setItem(
          "userRegister",
          JSON.stringify(ObjectUserRegisterData)
        ),
        localStorage.setItem("userIdLogin", null),
        window.location.assign("./LoginPage.html");
    })),
  document
    .getElementById("DelteUserProfile")
    .addEventListener("click", function () {
      ObjectUserRegisterData.splice(id_Login, 1),
        localStorage.setItem(
          "userRegister",
          JSON.stringify(ObjectUserRegisterData)
        ),
        localStorage.setItem("userIdLogin", null),
        window.location.assign("./../LoginPage.html"),
        localStorage.setItem("userIdLogin", 0);
    }),
  document
    .getElementById("LogoutProfile")
    .addEventListener("click", function () {
      localStorage.setItem("userIdLogin", null),
        window.location.assign("./../LoginPage.html"),
        localStorage.setItem("userIdLogin", 0);
    });
