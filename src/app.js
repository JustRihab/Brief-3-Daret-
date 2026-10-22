// Daret — simulateur. Ton code commence ici.
// Le HTML (index.html) est déjà intégré : lis-le, repère les id et les data-*, puis fais-le vivre.
const form = document.querySelector("#daret-form");
const nomCercle = document.querySelector("#nom-cercle");
const cotisation = document.querySelector("#cotisation");
const periodicite = document.querySelector("#periodicite");
const dateDebut = document.querySelector("#date-debut");
const participantsErreur = document.querySelector("#participants-erreur");

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
        periodicite.setAttribute("aria-describedby", "nom-cercle-erreur");
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
})


