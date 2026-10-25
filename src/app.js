// Daret — simulateur. Ton code commence ici.
// Le HTML (index.html) est déjà intégré : lis-le, repère les id et les data-*, puis fais-le vivre.
const form = document.querySelector("#daret-form");
const nomCercle = document.querySelector("#nom-cercle");
const cotisation = document.querySelector("#cotisation");
const periodicite = document.querySelector("#periodicite");
const dateDebut = document.querySelector("#date-debut");
const participantsListe = document.querySelector("#participants-liste");
const participantsCompteur = document.querySelector("#participants-compteur");
const ajouterParticipant = document.querySelector("#ajouter-participant");
const participantsErreur = document.querySelector("#participants-erreur");
let numeroParticipant = 0;
const resumeCagnotte = document.querySelector("#resume-cagnotte");
const resumeTotalCycle = document.querySelector("#resume-total-cycle");
const resumeNbTours = document.querySelector("#resume-nb-tours");
const resumeDates = document.querySelector("#resume-dates");
const contenuResultat = document.querySelector("#contenu-resultat");
const etatVide = document.querySelector("#etat-vide");
const calendrierCorps = document.querySelector("#calendrier-corps");
const tirageAuSort = document.querySelector("#tirage-au-sort");
const ordreSaisie = document.querySelector("#ordre-saisie");
let ordreParticipants = [];
let ordreOriginal = [];
let calendrierGenere = false;
const calendrier = document.querySelector("#calendrier");
const detailTour = document.querySelector("#detail-tour");
const detailTitre = document.querySelector("#detail-titre");
const detailDate = document.querySelector("#detail-date");
const detailBeneficiaire = document.querySelector("#detail-beneficiaire");
const detailMontant = document.querySelector("#detail-montant");
const detailContributeurs = document.querySelector("#detail-contributeurs");
const detailFermer = document.querySelector("#detail-fermer");
let boutonOuvertureDetail = null;

function validerNom() {
    const nomErreur = document.querySelector("#nom-cercle-erreur");
    const nom = nomCercle.value.trim();
    const regex = /^[\p{L}\p{M}\p{N} -]{3,40}$/u;
    if (!regex.test(nom)) {
        nomErreur.textContent = "le nom doit etre entre 3 et 40 caracteres.";
        nomErreur.classList.remove("hidden");
        nomCercle.setAttribute("aria-invalid", true);
        nomCercle.setAttribute("aria-describedby", "nom-cercle-erreur");
        nomCercle.focus();
        return false;
    }
    nomErreur.textContent = "";
    nomErreur.classList.add("hidden");
    nomCercle.removeAttribute("aria-invalid");
    nomCercle.removeAttribute("aria-describedby");
    return true;
}

function validerCotisation() {
    const cotisationErreur = document.querySelector("#cotisation-erreur");
    const valeur = Number(cotisation.value);
    if (!Number.isInteger(valeur) || valeur < 100 || valeur > 50000 || cotisation.value.trim() === "") {
        cotisationErreur.textContent = "la cotisation doit etre un nombre entier entre 100 et 50 000 MAD .";
        cotisationErreur.classList.remove("hidden");
        cotisation.setAttribute("aria-invalid", true);
        cotisation.setAttribute("aria-describedby", "cotisation-erreur");
        cotisation.focus();
        return false;
    }
    cotisationErreur.textContent = "";
    cotisationErreur.classList.add("hidden");
    cotisation.removeAttribute("aria-invalid");
    cotisation.removeAttribute("aria-describedby");
    return true;

}

function validerperiodicite() {
    const periodiciteErreur = document.querySelector("#periodicite-erreur");
    const valeurPeriodicite = periodicite.value;
    const periodiciteContent = ["hebdomadaire", "quinzaine", "mensuelle"];
    if (!periodiciteContent.includes(valeurPeriodicite)) {
        periodiciteErreur.textContent = "Vous devez choisir une periode.";
        periodiciteErreur.classList.remove("hidden");
        periodicite.setAttribute("aria-invalid", true);
        periodicite.setAttribute("aria-describedby", "periodicite-erreur");
        periodicite.focus();
        return false;
    }
    periodiciteErreur.textContent = "";
    periodiciteErreur.classList.add("hidden");
    periodicite.removeAttribute("aria-invalid");
    periodicite.removeAttribute("aria-describedby");
    return true;
}

function validerDateDebut() {
    const dateErreur = document.querySelector("#date-debut-erreur");
    const aujourdHui = new Date();
    const annee = String(aujourdHui.getFullYear());
    const mois = String(aujourdHui.getMonth() + 1).padStart(2, "0");
    const jour = String (aujourdHui.getDate()).padStart(2, "0");
    const dateMin = annee + "-" + mois + "-" + jour;
    dateDebut.min = dateMin;
    const valeur = dateDebut.value;
    if (valeur < dateMin || valeur === "") {
        dateErreur.textContent = "la date de début doit etre la date d'aujourd'hui ou une date de future.";
        dateErreur.classList.remove("hidden");
        dateDebut.setAttribute("aria-describedby", "date-debut-erreur");
        dateDebut.setAttribute("aria-invalid", true);
        dateDebut.focus();
        return false;
    }
    dateErreur.textContent = "";
    dateErreur.classList.add("hidden");
    dateDebut.removeAttribute("aria-invalid");
    dateDebut.removeAttribute("aria-describedby");
    return true;
}

function creerChampParticipant() {
    numeroParticipant ++;
    const li = document.createElement("li");
    const input = document.createElement("input");
    const div = document.createElement("div");
    const erreur = document.createElement("p");
    const retirerBtn = document.createElement("button");
    li.className = "flex items-start gap-3";
    div.className = "flex min-w-0 flex-1 flex-col";
    input.type = "text";
    input.name = "participants";
    input.placeholder = "veuillez entrer votre nom.";
    input.setAttribute("aria-label", "Prénom du participant " + numeroParticipant);
    input.className = "w-full min-w-0 rounded border border-daret-bordure px-3 py-2 focus:outline-2 focus:outline-offset-2 focus:outline-daret-vert";
    erreur.id = "participant-erreur-" + numeroParticipant;
    erreur.className ="mt-1 hidden text-sm font-medium text-daret-erreur";
    retirerBtn.textContent = "Retirer";
    retirerBtn.type = "button";
    retirerBtn.dataset.action = "retirer";
    retirerBtn.className = "rounded border border-daret-vert px-4 py-2 font-medium text-daret-vert hover:bg-daret-vert-clair focus:outline-2 focus:outline-offset-2 focus:outline-daret-vert";
    div.append(input, erreur);
    li.append(div, retirerBtn);
    participantsListe.append(li);
    updateCompteur();    
}
 
function updateCompteur() {
    const nombre = participantsListe.children.length;
    if (nombre === 1) {
        participantsCompteur.textContent = nombre + " participant";
    } else {
        participantsCompteur.textContent = nombre + " participants";
    }
}

function afficherMessErreur(message) {
    participantsErreur.textContent = message;
    participantsErreur.classList.remove("hidden"); 
}

function masquerMessErreur() {
    participantsErreur.textContent = "";
    participantsErreur.classList.add("hidden"); 
}

for (let i=0; i<3; i++) {
        creerChampParticipant();
    }

ajouterParticipant.addEventListener("click", function() {
    const nombre = participantsListe.children.length;
    const maximum = Number(participantsListe.dataset.max);
    if (nombre >= maximum) {
        afficherMessErreur("Vous ne pouvez pas dépasser 20 participants.");
        return;
    }
    masquerMessErreur();
    creerChampParticipant();
});

participantsListe.addEventListener("click", function(event) {
    const bouton = event.target.closest('button[data-action="retirer"]');
    if (!bouton) {
        return;
    }
    const nombre = participantsListe.children.length;
    const minimum = Number(participantsListe.dataset.min);
    if (nombre <= minimum) {
        afficherMessErreur("Vous devez garder au moins 2 participants.");
        return;
    }
    bouton.closest("li").remove();
    masquerMessErreur();
    updateCompteur();
    validerParticipants(false);
});

function validerParticipants(tous) {
    const inputs = participantsListe.querySelectorAll('input[name="participants"]');
    const minimum = Number(participantsListe.dataset.min);
    const maximum = Number(participantsListe.dataset.max);
    const regexPrenom = /^[\p{L}\p{M}]+(?:['’-][\p{L}\p{M}]+)*$/u;
    let valide = true;
    inputs.forEach(function (input) {
        const erreur = input.nextElementSibling;
        const nom = input.value.trim();
        let message = "";
        if (nom === "") {
            message = "Veuillez saisir un prénom.";
        } 
        else if (nom.length < 2 || nom.length > 30) {
            message = "Le prénom doit contenir entre 2 et 30 caractères.";
        } 
        else if (!regexPrenom.test(nom)) {
            message = "Utilisez uniquement des lettres, apostrophes ou traits d'union.";
        } 
        else {
            inputs.forEach(function (autreInput) {
                if (input !== autreInput) {
                    if (nom.toLowerCase() === autreInput.value.trim().toLowerCase()) {
                        message = "Ce prénom est déjà utilisé.";
                    }
                }
            });
        }
        const afficher = tous || input.dataset.touche === "oui" || nom !== "";
        if (message !== "" && afficher) {
            erreur.textContent = message;
            erreur.classList.remove("hidden");
            input.setAttribute("aria-invalid", "true");
            input.setAttribute("aria-describedby", erreur.id);
            valide = false;
        } 
        else {
            erreur.textContent = "";
            erreur.classList.add("hidden");
            input.removeAttribute("aria-invalid");
            input.removeAttribute("aria-describedby");
        }
    });
    if (inputs.length < minimum) {
        afficherMessErreur("Il faut au moins 2 participants.");
        return false;
    }
    if (inputs.length > maximum) {
        afficherMessErreur("Vous ne pouvez pas dépasser 20 participants.");
        return false;
    }
    if (!valide && tous) {
        const premierInvalide = participantsListe.querySelector('[aria-invalid="true"]');
        if (premierInvalide) {
            premierInvalide.focus();
        }
        return false;
    }
    masquerMessErreur();
    return valide;
}

function calculerMontantBeneficiaire(cotisation, nombreParticipants) {
    return cotisation * nombreParticipants;
}

function calculerTotalCycle(cotisation, nombreTours) {
    return cotisation * nombreTours;
}

function calculerNombreTours(nombreParticipants) {
    return nombreParticipants;
}

function calculerDateTour(dateDebut, periodicite, numeroTour) {
    const morceauxDate = dateDebut.split("-");
    const annee = Number(morceauxDate[0]);
    const mois = Number(morceauxDate[1]);
    const jour = Number(morceauxDate[2]);
    let dateTour = new Date(annee, mois - 1, jour);
    for (let i=1; i<numeroTour; i++) {
        if (periodicite === "hebdomadaire") {
            dateTour.setDate(dateTour.getDate() + 7);
        } 
        else if (periodicite === "quinzaine") {
            dateTour.setDate(dateTour.getDate() + 14);
        } 
        else if (periodicite === "mensuelle") {
            const anneeDebut = annee;
            const moisDebut = mois - 1;
            const nouveauMois = moisDebut + i;
            const dernierJour = new Date(anneeDebut, nouveauMois + 1, 0).getDate();
            if (jour > dernierJour) {
                dateTour = new Date(anneeDebut, nouveauMois, dernierJour);
            } 
            else {
                dateTour = new Date(anneeDebut, nouveauMois, jour);
            }
        }
    }
    return dateTour;
}

function genererCalendrier(inputsParticipants, montantBeneficiaire, nombreTours) {
    while (calendrierCorps.firstChild) {
        calendrierCorps.removeChild(calendrierCorps.firstChild);
    }
    for (let i=0; i<nombreTours; i++) {
        const ligne = document.createElement("tr");
        const celluleNumero = document.createElement("td");
        const celluleDate = document.createElement("td");
        const celluleBeneficiaire = document.createElement("td");
        const celluleMontant = document.createElement("td");
        const celluleStatut = document.createElement("td");
        const celluleAction = document.createElement("td");
        const boutonStatut = document.createElement("button");
        boutonStatut.type = "button";
        boutonStatut.textContent = "Marquer comme terminé";
        boutonStatut.dataset.action = "terminer";
        boutonStatut.className = "rounded border px-3 py-2";
        celluleAction.append(boutonStatut);
        const numeroTour = i + 1;
        const dateTour = calculerDateTour(dateDebut.value, periodicite.value, numeroTour);
        const beneficiaire = inputsParticipants[i];
        celluleNumero.textContent = numeroTour;
        celluleDate.textContent = dateTour.toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
        const boutonBeneficiaire = document.createElement("button");
        boutonBeneficiaire.type = "button";
        boutonBeneficiaire.textContent = beneficiaire;
        boutonBeneficiaire.dataset.action = "ouvrir-detail";
        boutonBeneficiaire.className = "font-medium text-daret-vert underline focus:outline-2 focus:outline-offset-2 focus:outline-daret-vert";
        celluleBeneficiaire.append(boutonBeneficiaire);
        celluleMontant.textContent = montantBeneficiaire + " MAD";
        celluleStatut.textContent = "En attente";
        ligne.dataset.tour = numeroTour;
        ligne.className = "align-top";
        celluleNumero.className = "px-4 py-3";
        celluleDate.className = "px-4 py-3";
        celluleBeneficiaire.className = "px-4 py-3";
        celluleMontant.className = "px-4 py-3";
        celluleStatut.className = "px-4 py-3";
        celluleAction.className = "px-4 py-3";
        ligne.dataset.tour = i + 1;
        ligne.append(celluleNumero, celluleDate, celluleBeneficiaire, celluleMontant, celluleStatut, celluleAction);
        calendrierCorps.append(ligne);
    }
}

participantsListe.addEventListener("input", function (event) {
    if (event.target.matches('input[name="participants"]')) {
        event.target.dataset.touche = "oui";
        validerParticipants(false);
    }
});


form.addEventListener("submit", function(event) {
    event.preventDefault();
    const nomValide = validerNom();
    if (!nomValide) {
        return;
    }
    const cotisationValide = validerCotisation();
    if (!cotisationValide) {
        return;
    }
    const periodiciteValide = validerperiodicite();
    if (!periodiciteValide) {
        return;
    }
    const dateValide = validerDateDebut();
    if (!dateValide) {
        return;
    }
    const participantsValides = validerParticipants(true);
    if (!participantsValides) {
        return;
    }
    const inputsParticipants = participantsListe.querySelectorAll('input[name="participants"]');
    ordreOriginal = [];
    for (let i = 0; i < inputsParticipants.length; i++) {
        ordreOriginal.push(inputsParticipants[i].value.trim());
    }
    ordreParticipants = [...ordreOriginal];
    const nombreParticipants = ordreParticipants.length;
    const nombreTours = calculerNombreTours(nombreParticipants);
    const montantCotisation = Number(cotisation.value);
    const montantBeneficiaire = calculerMontantBeneficiaire(montantCotisation, nombreParticipants);
    const totalCycle = calculerTotalCycle(montantCotisation, nombreTours);
    genererCalendrier(ordreParticipants, montantBeneficiaire, nombreTours);
    calendrierGenere = true;
    const premiereDate = calculerDateTour(dateDebut.value, periodicite.value, 1);
    const derniereDate = calculerDateTour(dateDebut.value, periodicite.value, nombreTours);
    resumeCagnotte.textContent = montantBeneficiaire + " DH";
    resumeTotalCycle.textContent = totalCycle + " DH";
    resumeNbTours.textContent = nombreTours;
    resumeDates.textContent = premiereDate.toLocaleDateString("fr-FR") + " au " + derniereDate.toLocaleDateString("fr-FR");
    contenuResultat.classList.remove("hidden");
    etatVide.classList.add("hidden");
});

tirageAuSort.addEventListener("click", function() {
    if (!calendrierGenere) {
        return;
    }
    ordreParticipants = [...ordreOriginal];
    for (let i = ordreParticipants.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = ordreParticipants[i];
        ordreParticipants[i] = ordreParticipants[j];
        ordreParticipants[j] = temp;
    }
    const nombreTours = ordreParticipants.length;
    const montantBeneficiaire = Number(cotisation.value) * nombreTours;
    genererCalendrier(ordreParticipants, montantBeneficiaire, nombreTours);
});

ordreSaisie.addEventListener("click", function() {
    if (!calendrierGenere) {
        return;
    }
    ordreParticipants = [...ordreOriginal];
    const nombreTours = ordreParticipants.length;
    const montantBeneficiaire = Number(cotisation.value) * nombreTours;
    genererCalendrier(ordreParticipants, montantBeneficiaire, nombreTours);
});

calendrier.addEventListener("click", function(event) {
    const bouton = event.target.closest('button[data-action="terminer"], button[data-action="annuler"]');
    if (!bouton) {
        return;
    }
    const ligne = bouton.closest("tr");
    const celluleStatut = ligne.children[4];
    if (bouton.dataset.action === "terminer") {
        celluleStatut.textContent = "Terminé";
        bouton.textContent = "Annuler";
        bouton.dataset.action = "annuler";
    } 
    else {
        celluleStatut.textContent = "En attente";
        bouton.textContent = "Marquer comme terminé";
        bouton.dataset.action = "terminer";
    }
});

calendrier.addEventListener("click", function(event) {
    const bouton = event.target.closest('button[data-action="ouvrir-detail"]');
    if (!bouton) {
        return;
    }
    const ligne = bouton.closest("tr");
    const cellules = ligne.children;
    detailTitre.textContent = "Détail du tour n° " + ligne.dataset.tour;
    detailDate.textContent = cellules[1].textContent;
    detailBeneficiaire.textContent = cellules[2].textContent;
    detailMontant.textContent = cellules[3].textContent;
    detailContributeurs.replaceChildren();
    const inputsParticipants = participantsListe.querySelectorAll('input[name="participants"]');
    for (let i=0; i<inputsParticipants.length; i++) {
        const nom = inputsParticipants[i].value.trim();
        if (nom.toLowerCase() !== cellules[2].textContent.trim().toLowerCase()) {
            const element = document.createElement("li");
            element.textContent = nom;
            detailContributeurs.append(element);
        }
    }
    boutonOuvertureDetail = bouton;
    detailTour.showModal();
});

detailFermer.addEventListener("click", function() {
    detailTour.close();
});

detailTour.addEventListener("click", function(event) {
    if (event.target === detailTour) {
        detailTour.close();
    }
});

detailTour.addEventListener("close", function() {
    if (boutonOuvertureDetail) {
        boutonOuvertureDetail.focus();
    }
});