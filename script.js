const firstNameInput = document.querySelector("#firstName");
const lastNameInput = document.querySelector("#lastName");
const sexeInput = document.getElementById("sexe");
const profileForm = document.querySelector("#profileForm");
const profilesTbody = document.querySelector("#profilesTbody");

// let profiles = JSON.parse(localStorage.getItem("Profils")) || [];

let profiles = [];

if (localStorage.getItem("Profils")) {
    profiles = JSON.parse(localStorage.getItem("Profils"));
} else {
    profiles = [];
}
//fonction affiche profil
AffichierProfiles(profiles);

// submit form
profileForm.addEventListener("submit", e => {
    e.preventDefault();
    const firstName = firstNameInput.value.trim();//assurer bli user ghaydakhel value machi " "
    const lastName = lastNameInput.value.trim();
    const sexe = sexeInput.value.trim();

    if(firstName!== ""  &&lastName!== ""  && sexe !== "" ){
        profiles.push( { id: Date.now(), firstName, lastName, sexe } );
    }
    addProfilesToLocalStorage();
    AffichierProfiles(profiles);
    profileForm.reset();//permet de vider le formulaire 
});

// Affichage des profils
function AffichierProfiles(profiles) {
    profilesTbody.innerHTML = "";

    if (!profiles.length) {
        profilesTbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Aucune personne enregistrée.</td></tr>';
        return;
    }

    profiles.forEach(profil => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${profil.firstName}</td>
            <td>${profil.lastName}</td>
            <td>${profil.sexe}</td>
            <td class="actions">
                <button class="edit-btn" data-id="${profil.id}">Edit</button>
                <button class="delete-btn" data-id="${profil.id}">Delete</button>
            </td>
        `;
        profilesTbody.appendChild(tr);
    });
}

// Sauvegarde les profil dans localStorage
function addProfilesToLocalStorage() {
    localStorage.setItem("Profils", JSON.stringify(profiles));
}



