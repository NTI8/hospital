document.querySelector(".LogoutProfile").addEventListener("click",(function(){localStorage.setItem("userIdLogin",null),window.location.assign("./../LoginPage.html"),localStorage.setItem("userIdLogin",0)}));const appointments=[{id:1,name:"أحمد علي",date:"2024-12-15",time:"10:30 صباحًا",status:"مؤكد"}],appointmentsTable=document.getElementById("appointmentsTable");function renderAppointments(){appointmentsTable.innerHTML="",appointments.forEach((e=>{const t=document.createElement("tr");t.innerHTML=`\n          <td>${e.id}</td>\n          <td>${e.name}</td>\n          <td>${e.date}</td>\n          <td>${e.time}</td>\n          <td>${e.status}</td>\n          <td>\n            <button class="btn btn-warning btn-sm" onclick="editAppointment(${e.id})">تعديل</button>\n            <button class="btn btn-danger btn-sm" onclick="deleteAppointment(${e.id})">حذف</button>\n          </td>\n        `,appointmentsTable.appendChild(t)}))}function deleteAppointment(e){const t=appointments.findIndex((t=>t.id===e));-1!==t&&(appointments.splice(t,1),renderAppointments())}function editAppointment(e){const t=appointments.find((t=>t.id===e));if(t){const e=prompt("أدخل اسم المريض الجديد:",t.name),n=prompt("أدخل تاريخ الموعد الجديد:",t.date),i=prompt("أدخل وقت الموعد الجديد:",t.time),o=prompt("أدخل حالة الموعد الجديدة:",t.status);e&&n&&i&&o&&(t.name=e,t.date=n,t.time=i,t.status=o,renderAppointments())}}const addAppointmentForm=document.getElementById("addAppointmentForm");addAppointmentForm.addEventListener("submit",(e=>{e.preventDefault();const t=document.getElementById("newPatientName").value,n=document.getElementById("newAppointmentDate").value,i=document.getElementById("newAppointmentTime").value,o=document.getElementById("newAppointmentStatus").value;if(t&&n&&i&&o){const e={id:appointments.length+1,name:t,date:n,time:i,status:o};appointments.push(e),renderAppointments(),addAppointmentForm.reset()}})),renderAppointments();let id_LoginD=localStorage.getItem("userIdLogin");id_LoginD=ObjectUserRegisterData.findIndex((e=>e.id==id_LoginD)),ObjectUserRegisterData.length>0&&(document.getElementById("editUsernameProfileD").value=ObjectUserRegisterData[id_LoginD].userRegister||"",document.getElementById("editEmailProfileD").value=ObjectUserRegisterData[id_LoginD].emailRegister||"",document.getElementById("editPasswordProfileD").value=ObjectUserRegisterData[id_LoginD].passRegister||"",document.getElementById("DoctorProfileNameDisplay").innerText="د/  "+ObjectUserRegisterData[id_LoginD].userRegister||"doctor name",document.getElementById("btnEditPrfoleD").addEventListener("click",(function(){ObjectUserRegisterData[id_LoginD].userRegister=document.getElementById("editUsernameProfileD").value,ObjectUserRegisterData[id_LoginD].emailRegister=document.getElementById("editEmailProfileD").value,ObjectUserRegisterData[id_LoginD].passRegister=document.getElementById("editPasswordProfileD").value,localStorage.setItem("userRegister",JSON.stringify(ObjectUserRegisterData)),alert("تم تحديث البيانات بنجاح!")})),document.getElementById("DelteUserProfileD").addEventListener("click",(function(){ObjectUserRegisterData.splice(id_LoginD,1),localStorage.setItem("userRegister",JSON.stringify(ObjectUserRegisterData)),localStorage.setItem("userIdLogin",null),window.location.assign("./LoginPage.html")})));