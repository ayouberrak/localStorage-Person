let Firstname = document.querySelector("#firstName");
let Lastname = document.querySelector("#lastName");
let sexeInput = document.getElementById('sex');
let submitButton = document.querySelector("#submitButton");
let profileForm = document.querySelector("#profileForm");
let profilesTbody = document.querySelector("#profilesTbody");

//tableau des profiles
let arrayProfils = [];


if (localStorage.getItem("Profils")) {
    arrayProfils = JSON.parse(localStorage.getItem("Profils"));
}
getDataFromLocalStorage();


profileForm.addEventListener('submit',function(e){
    e.preventDefault();
    if (Firstname.value !== "" && Lastname.value !== "" && sexeInput.value !== "") {
        addProfilToArray(Firstname.value, Lastname.value, sexeInput.value);//cette fonction permet d'ajouter un profil
        Firstname.value = "";
        Lastname.value = "";
        sexeInput.value = "";
    }
    
})

function addProfilToArray(Firstname, Lastname, sexe) {
    // let lastId=arrayProfils.length>0 ? (arrayProfils.length-1) : 0;
    // console.log(lastId);

    // objet contient les info du profil
    const profil = {
        id: Date.now(),
        Firstname: Firstname,
        Lastname: Lastname,
        sexe: sexe,
    }
    //push profil to array of profils
    arrayProfils.push(profil);
    //add to page
    addElementToPage(arrayProfils);
    //add localdtorage
    addtoLocalStorage();//array en parametre

}


//ajouter tr au table
function addElementToPage(arrayProfils) {
    //empty the profils div
    profilesTbody.innerHTML = "";//vider le tbody pour eviter le reafichage des element de array (+ avec les new profil)
    console.log(arrayProfils);
    
    if (arrayProfils.length === 0) {
        const tr = document.createElement('tr');
        // affichage de message 
        tr.innerHTML = '<td colspan="4" style="text-align:center;">Aucune personne enregistrée.</td>';
        profilesTbody.appendChild(tr);
        return;
    }

    arrayProfils.forEach((profil) => {
        const tr = document.createElement('tr');
        //add tr contient un profil
        tr.innerHTML =
            '<td>' + profil.Firstname + '</td>' +
            '<td>' + profil.Lastname + '</td>' +
            '<td>' + profil.sexe + '</td>' +
            '<td class="actions">' +
            '<button class="edit-btn" data-id="' + profil.id + '">Edit</button>' +
            '<button class="delete-btn" data-id="' + profil.id + '">Delete</button>' +
            '</td>';
        profilesTbody.appendChild(tr);


    })
}
function addtoLocalStorage(){
    //tringify= convert array/object  to string
    window.localStorage.setItem("Profils",JSON.stringify(arrayProfils));//localStorage accepte un valeur string non objet/array : that's why stringify?
}

function getDataFromLocalStorage(){
    let Data=window.localStorage.getItem("Profils");
    if (Data) {
         let profils=JSON.parse(Data);
        addElementToPage(profils);
        
    }
}