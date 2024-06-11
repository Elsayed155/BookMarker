var siteName=document.getElementById("bookmarkName")
var siteUrl=document.getElementById("bookmarkUrl");
var modal=document.querySelector(".modal");
var closeBtn = document.getElementById("closeBtn");
var boxModal = document.querySelector(".box-info");
var submitButton=document.querySelector("submitButton");
var siteList=[]
if(localStorage.getItem("siteList")==null){
    siteList=[];
}else
{
    siteList=JSON.parse(localStorage.getItem("siteList"));
    displaySite(siteList);
}


function capitalize(str) {
    let strArr = str.split("");
    strArr[0] = strArr[0].toUpperCase();
    return strArr.join("");
  }
function addSite(){
    if (
        siteName.classList.contains("is-valid") &&
        siteUrl.classList.contains("is-valid")
      ){
        modal.classList.add("d-none")
    var site={
        name:capitalize(siteName.value),
        Url:siteUrl.value
    };
    siteList.push(site);
    displaySite(siteList);
    localStorage.setItem("siteList",JSON.stringify(siteList));
    clearForm();
    siteName.classList.remove("is-valid");
      siteUrl.classList.remove("is-valid");}
    else{
        boxModal.classList.replace("d-none","d-flex");
    }
}


function displaySite(sites){
    var cartona="";
    for(var i=0;i<sites.length;i++){
        cartona+=`<tr>
        <td>${i+1}</td>
        <td>${sites[i].name}</td>
        <td><button class="btn " id ="delete-btn" onClick="visitSite(${i})"><i class="fa-solid fa-eye  mx-2"></i>Visit</button></td>
        <td><button class="btn btn-danger" onClick="deleteSite(${i})"><i class="fa-solid fa-trash-can mx-1"></i>Delete</button></td>
        </tr>`
    }
    document.getElementById("myData").innerHTML=cartona;
}
function clearForm(){
    siteName.value="";
    siteUrl.value="";
}

function deleteSite(index){
siteList.splice(index,1);
localStorage.setItem("siteList",JSON.stringify(siteList));

displaySite(siteList);
}

function visitSite(index){
   window.open(siteList[index].Url,"_blank")
}




var nameRegex = /^[A-Za-z_]/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

siteName.addEventListener("input", function () {
  validate(siteName, nameRegex);
});

siteUrl.addEventListener("input", function () {
  validate(siteUrl, urlRegex);
});

function validate(element, regex) {
  var testRegex = regex;
  if (testRegex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}


function closeModal() {
    boxModal.classList.add("d-none");
  }


  closeBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    closeModal();
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("box-info")) {
    closeModal();
  }
});


