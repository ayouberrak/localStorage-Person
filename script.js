// Kanstennaw DOM ykon wajd
document.addEventListener('DOMContentLoaded', function() {

    // Kanjibo éléments dyal HTML
    const profileForm = document.getElementById('profileForm');
    const profileIdInput = document.getElementById('profileId');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const sexInput = document.getElementById('sex');
    const submitButton = document.getElementById('submitButton');
    const profilesTbody = document.getElementById('profilesTbody');

    const STORAGE_KEY = 'userProfiles';

    // --- Fonctions Utilitaires ---

    /**
     * Katjib les profils men localStorage
     * (Hadi hiya li bedelt b IF/ELSE)
     */
    function getProfiles() {
        const profiles = localStorage.getItem(STORAGE_KEY);

        if (profiles) {
            // Ila l9ina data, kanrje3oha JSON
            return JSON.parse(profiles);
        } else {
            // Ila mal9ina walo, kanrje3o array khawi
            return [];
        }
    }

    /**
     * Katsajel les profils f localStorage
     */
    function saveProfiles(profiles) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
    }

    // --- Logique CRUD ---

    /**
     * Kat'afficher ga3 les profils f tableau
     */
    function displayProfiles() {
        // Kankhwiw tableau 9bel ma n3emro
        profilesTbody.innerHTML = '';

        const profiles = getProfiles();

        if (profiles.length === 0) {
            // Ila kan khawi, kan'affichiw message
            const tr = document.createElement('tr');
            tr.innerHTML = '<td colspan="4" style="text-align:center;">Aucune personne enregistrée.</td>';
            profilesTbody.appendChild(tr);
            return;
        }

        // Kandiro loop 3la kol profil o nzidoh f tableau
        profiles.forEach(function(profile) { // Bedelt l function() 3adia
            const tr = document.createElement('tr');

            // Hna khdemt b tariqa l 9dima dyal + bach njme3 string
            tr.innerHTML =
                '<td>' + profile.firstName + '</td>' +
                '<td>' + profile.lastName + '</td>' +
                '<td>' + profile.sex + '</td>' +
                '<td class="actions">' +
                '<button class="edit-btn" data-id="' + profile.id + '">Edit</button>' +
                '<button class="delete-btn" data-id="' + profile.id + '">Delete</button>' +
                '</td>';

            profilesTbody.appendChild(tr);
        });
    }

    /**
     * Katjeri l submit dyal form (Ajouter / Modifier)
     */
    profileForm.addEventListener('submit', function(e) { // Bedelt l function() 3adia
        e.preventDefault(); // Kan7ebso l form maymchich

        // Kanjibo l 9im dyal les inputs
        const id = profileIdInput.value;
        const firstName = firstNameInput.value;
        const lastName = lastNameInput.value;
        const sex = sexInput.value;

        const profiles = getProfiles();

        if (id) {
            // --- Logique dyal MODIFICATION (Update) ---
            // Kanl9aw l index dyal l profil li bghina nbedlo
            const profileIndex = profiles.findIndex(function(p) { return p.id == id; });
            
            if (profileIndex !== -1) {
                // Kanbedlo l profil b data jdida
                profiles[profileIndex] = { id: parseInt(id), firstName, lastName, sex };
            }
            submitButton.textContent = 'Add Person';

        } else {
            // --- Logique dyal AJOUT (Create) ---
            
            // Hna tariqa "basique" bach n'creyiw ID jdid
            let newId = 1;
            if (profiles.length > 0) {
                // Kanl9aw l ID l kbir f ga3 les profils
                let maxId = profiles[0].id;
                for (let i = 1; i < profiles.length; i++) {
                    if (profiles[i].id > maxId) {
                        maxId = profiles[i].id;
                    }
                }
                newId = maxId + 1; // ID jdid = l kbir + 1
            }
            // Hna kancreyiw l objet jdid
            const newProfile = {
                id: newId,
                firstName: firstName,
                lastName: lastName,
                sex: sex
            };
            profiles.push(newProfile); // Kanzidoh f array
        }

        // Kan'enregistriw f localStorage
        saveProfiles(profiles);
        // Kankhwiw l formulaire
        profileForm.reset();
        profileIdInput.value = '';
        // Kan3awdo n'affichiw tableau
        displayProfiles();
    });

    /**
     * Katjeri click 3la "Edit" o "Delete"
     */
    profilesTbody.addEventListener('click', function(e) { // Bedelt l function() 3adia
        const target = e.target; // L element li clickina 3lih
        const id = target.getAttribute('data-id'); // L ID dyalo

        if (!id) return; // Ila clickina f blassa khra (makinch data-id), kan7ebso

        if (target.classList.contains('delete-btn')) {
            // --- Logique dyal SUPPRESSION (Delete) ---
            let profiles = getProfiles();
            // Kanfiltriw array (kan7eydo li 3ndo dak l ID)
            profiles = profiles.filter(function(profile) { return profile.id != id; });
            saveProfiles(profiles);
            displayProfiles();

        } else if (target.classList.contains('edit-btn')) {
            // --- Logique dyal EDIT (kan3emro l form) ---
            const profiles = getProfiles();
            // Kanl9aw l profil li bghina n'editiw
            const profileToEdit = profiles.find(function(profile) { return profile.id == id; });

            if (profileToEdit) {
                // Kan3emro l form b dak data
                profileIdInput.value = profileToEdit.id;
                firstNameInput.value = profileToEdit.firstName;
                lastNameInput.value = profileToEdit.lastName;
                sexInput.value = profileToEdit.sex;

                // Kanbedlo text dyal boutona
                submitButton.textContent = 'Update Person';
                // Kantel3o lfo9 dyal l page bach yban l form
                window.scrollTo(0, 0); 
            }
        }
    });

    // --- Initialisation ---
    // Kan'affichiw tableau mli kat'charger l page
    displayProfiles();
});