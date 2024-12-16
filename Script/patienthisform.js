var patientname= document.getElementById('patientname');
var patientbirthdate= document.getElementById('patientbirthdate');
var patientphone= document.getElementById('patientphone');
var patientdisease= document.getElementById('patientdisease');
var patientmedicines= document.getElementById('patientmedicines');
var patientallergymed= document.getElementById('patientallergymed');
var patientallergyfood= document.getElementById('patientallergyfood');
var patientothers= document.getElementById('patientothers');
var anyimages= document.getElementById('anyimages');
var patientrelatives= document.getElementById('patientrelatives');

var btnadd= document.getElementById('btnaddupdate');
let btnstatus = "create";
let proid;


var patientdatacontainer;

if (localStorage.getItem("patientdatabase") == null)
{
     patientdatacontainer= [];

}
else
{
    patientdatacontainer = JSON.parse (localStorage.getItem("patientdatabase"));
    displaypatientdata();

}

var patientdatacontainer= [];

function addpatientdata()
{
    if(checkinput()==true)
    {
     var product = {
         name: patientname.value,
         birthdate: patientbirthdate.value,
         phone: patientphone.value,
         disease: patientdisease.value,
         medicines: patientmedicines.value,
         allergymed: patientallergymed.value,
         allergyfood: patientallergyfood.value,
         others: patientothers.value,
         relatives: patientrelatives.value,
         image: `../aboutusimages/${anyimages.files[0].name}`,
     };
     if (btnstatus === "create")
     {
         
         patientdatacontainer.push(product);
    }
    else
    {
        patientdatacontainer[proid] = product;
        // localStorage.setItem("productdatabase", JSON.stringify(productcontainer));

        btnadd.innerHTML= "إدخال البيانات";
        btnstatus = "create";
 
    }
    // patientdatacontainer.push(product);
     console.log(patientdatacontainer);
   localStorage.setItem("patientdatabase", JSON.stringify(patientdatacontainer));
     cleardata()
     displaypatientdata()
    }
    else
    {
        alert("برجاء إدخال كل البيانات المطلوبة!");
    }

}

function cleardata()
{
     patientname.value = "";
     patientbirthdate.value = "";
     patientphone.value = "";
     patientdisease.value = "";
     patientmedicines.value = "";
     patientallergymed.value = "";
     patientallergyfood.value = "";
     patientothers.value = "";
     patientrelatives.value = "";
    //  anyimages.value = "";
}



function deleteproduct(index) 
{
    var confirmdelete = confirm('هل أنت متأكد من أنك تريد حذف جميع بياناتك؟ ');
    if(confirmdelete)
    {
        productcontainer.splice(index, 1);

        // localStorage.setItem("productdatabase", JSON.stringify(productcontainer));
        displayProducts();
    }
    else
    {
        alert('تم إلغاء حذف البيانات');
    }
}






function displaypatientdata()
{
    var datadisplay = ``;
    for(var i=0; i<patientdatacontainer.length; i++)
    {
        datadisplay += `
        <p>نموذج البيانات رقم :</p>
        <p>${i}</p>
        <p>الاسم بالكامل (رباعى) :</p>
        <p>${patientdatacontainer[i].name}</p>
        <p>تاريخ الميلاد :</p>
        <p>${patientdatacontainer[i].birthdate}</p>
        <p>رقم الهاتف :</p>
        <p>${patientdatacontainer[i].phone}</p>
        <p>هل تعاني من أي أمراض مزمنة؟ </p>
        <p>${patientdatacontainer[i].disease}</p>
        <p>برجاء توضيح أسماء أي أدوية يتم تناولها وعدد الجرعات اليومية :</p>
        <p>${patientdatacontainer[i].medicines}</p>
        <p>هل تعاني من أي حساسية تجاه أدوية معينة؟ </p>
        <p>${patientdatacontainer[i].allergymed}</p>
        <p>هل تعاني من أي حساسية تجاه أطعمة معينة؟ </p>
        <p>${patientdatacontainer[i].allergyfood}</p>
        <p>مشكلات صحية أخري أو أى تفاصيل أخري :</p>
        <p>${patientdatacontainer[i].others}</p>
        <p>برجاء رفع أي صور توضيحية (أشعة - تحاليل - وصفات طبية - إلخ...) :</p>
        <p><img src="${patientdatacontainer[i].image}" alt="" width="100px" height="100px"></p>
        <p>بيانات أحد الأقارب ورقم هاتفه وصلة قرابته :</p>
        <p>${patientdatacontainer[i].relatives}</p>
        <a href="patienthisform.html"><button class="btn btn-outline-warning" onclick="edit(${i})">تعديل البيانات</button></a>
        <button class="btn btn-outline-danger" onclick="deleteproduct(${i});">حذف البيانات</button>



        
        
        
        `;
    }
    document.getElementById('datcontain').innerHTML = datadisplay;
}

function checkinput() {

    if(
        patientname.value!=""
        && patientbirthdate.value!=""
        && patientphone.value!=""
        && patientdisease.value!=""
        && patientmedicines.value!=""
        && patientallergymed.value!=""
        && patientallergyfood.value!=""
        && patientothers.value!=""
        && patientrelatives.value!=""
        && anyimages.files[0]!= null

    )
    {   
        return true;
    }
    else
    {
        return false;
    }

}




function edit(id)
{
    patientname.value = patientdatacontainer[id].name;                                    
    patientbirthdate.value = patientdatacontainer[id].birthdate;                                    
    patientphone.value = patientdatacontainer[id].phone;                                    
    patientdisease.value = patientdatacontainer[id].disease;
    patientmedicines.value = patientdatacontainer[id].medicines;
    patientallergymed.value = patientdatacontainer[id].allergymed;
    patientallergyfood.value = patientdatacontainer[id].allergyfood;
    patientothers.value = patientdatacontainer[id].others;
    patientrelatives.value = patientdatacontainer[id].relatives;
    
    btnstatus = "Edit";
    proid = id;

    btnadd.innerHTML = "حفظ التعديلات";
}