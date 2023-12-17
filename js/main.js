var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var site ;
if(localStorage.getItem("site") != null) {
    site = JSON.parse(localStorage.getItem("site"));
    displaySite()
}else{
    site = []
}

function getSite(){
    objSite = {
        name: siteName.value,
        url: siteUrl.value
    }
    if(validName() && validUrl()){
        site.push(objSite);
        displaySite()
        document.getElementById("siteName").classList.remove("is-valid")
        document.getElementById("siteUrl").classList.remove("is-valid")
        localStorage.setItem("site", JSON.stringify(site))
        clearInputs()
        console.log(site);
    }else{
        Swal.fire({
            icon: "error",
            title: "Site Name or Url is not valid, Please follow the rules below :",
            text: `Site name must contain at least 3 characters
            Site URL must be a valid one`,
        });
    }

}

function displaySite(){
    row = ""
    for(var i = 0; i < site.length; i++){
        row += `<tr>
                    <td>${i+1}</td>
                    <td>${site[i].name}</td>
                    <td><button onclick="visitUrl(${i})" class="btn btn-success"><i class="fa-solid fa-eye me-2"></i>Visit</button></td>
                    <td><button onclick="deleteSite(${i})" class="btn btn-danger"><i class="fa-solid fa-trash me-2"></i>Delete</button></td>
                </tr>`
    }
    document.getElementById("tbody").innerHTML = row;
}

function visitUrl(index){
    open(site[index].url);
}

function deleteSite(index){
    site.splice(index, 1);
    displaySite();
    localStorage.setItem("site", JSON.stringify(site))
}





function validUrl(){
    var validUrl = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))$/;
    return validUrl.test(siteUrl.value)
}

function getValidUrl(){
    if(validUrl() == false){
        document.getElementById("siteUrl").classList.add("is-invalid")
    }else{
        document.getElementById("siteUrl").classList.replace("is-invalid" , "is-valid")
    }
}

function validName(){
    var validName = /^[a-zA-Z ]{3,}$/ 
    return validName.test(siteName.value)
}
function getValidName(){
    if(validName() == false){
        document.getElementById("siteName").classList.add("is-invalid")
    }else{
        document.getElementById("siteName").classList.replace("is-invalid" , "is-valid")
    }
}




function clearInputs(){
    siteName.value = "";
    siteUrl.value = "";
}