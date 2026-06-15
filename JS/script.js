/// DONNÉES
var liste_taches = charger_taches_navigateur() || [];
var champ_nom = document.getElementById("nom_tache");
var champ_date = document.getElementById("date_limite");
var champ_description = document.getElementById("description");
var id_tache_selectionnee = null;

function enregistrer_tache() {
  if (champ_nom.value == "") {
    alert("Le nom de la tâche est obligatoire !");
    return;
  }

  var nouvelle_tache = {
    nom: champ_nom.value,
    date: champ_date.value,
    description: champ_description.value,
    est_terminee: 0,
  };

  if (id_tache_selectionnee === null) {
    liste_taches.push(nouvelle_tache);
  } else {
    nouvelle_tache.est_terminee =
      liste_taches[id_tache_selectionnee].est_terminee;
    liste_taches[id_tache_selectionnee] = nouvelle_tache;
  }

  sauvegarder_taches_navigateur();
  afficher_taches();
  reinitialiser_formulaire();
}

function reinitialiser_formulaire() {
  champ_nom.value = "";
  champ_date.value = "";
  champ_description.value = "";
  id_tache_selectionnee = null;
  document.getElementById("bouton_enregistrer").innerText = "Enregistrer";
}

function modifier_tache(index) {
  var tache = liste_taches[index];
  champ_nom.value = tache.nom;
  champ_date.value = tache.date;
  champ_description.value = tache.description;
  id_tache_selectionnee = index;
  document.getElementById("bouton_enregistrer").innerText = "Mettre à jour";
}

function supprimer_tache(index) {
  if (confirm("Supprimer cette tâche ?")) {
    liste_taches.splice(index, 1);
    sauvegarder_taches_navigateur();
    afficher_taches();
  }
}

function changer_etat(index) {
  liste_taches[index].est_terminee =
    liste_taches[index].est_terminee == 1 ? 0 : 1;
  sauvegarder_taches_navigateur();
  afficher_taches();
}

function charger_taches_navigateur() {
  return JSON.parse(localStorage.getItem("ma_liste_taches"));
}

function sauvegarder_taches_navigateur() {
  localStorage.setItem("ma_liste_taches", JSON.stringify(liste_taches));
}

///// GUI

function afficher_taches() {
  var corps_tableau = document.getElementById("taches_sauvegardees");
  corps_tableau.innerHTML = "";

  liste_taches.forEach((tache, index) => {
    var estChecked = tache.est_terminee == 1;
    var styleTexte = estChecked ? "text-decoration-line-through text-muted" : "fw-semibold";

    corps_tableau.innerHTML += `
            <tr>
                <td>
                    <div class="form-check fs-5">
                        <input class="form-check-input" type="checkbox" onclick="changer_etat(${index})" ${
      estChecked ? "checked" : ""
    }>
                    </div>
                </td>
                <td>
                    <span class="${styleTexte}">${tache.nom}</span>
                </td>
                <td>
                    <span class="badge bg-light text-dark border">${
                      tache.date || "-"
                    }</span>
                </td>
                <td class="text-muted small">
                    ${tache.description}
                </td>
                <td class="text-end">
                    <div class="btn-group shadow-sm">
                        <button type="button" class="btn btn-sm btn-outline-primary" onclick="modifier_tache(${index})">
                            Modifier
                        </button>
                        <button type="button" class="btn btn-sm btn-outline-danger" onclick="supprimer_tache(${index})">
                            Supprimer
                        </button>
                    </div>
                </td>
            </tr> 
        `;
  });
}

function afficher_date_actuelle() {
  var aujourdhui = new Date();
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var date_finale = aujourdhui.toLocaleDateString("fr-FR", options);
  date_finale =
    date_finale.charAt(0).toUpperCase() + date_finale.slice(1);
  document.getElementById("date_du_jour").innerText = date_finale;
}


afficher_date_actuelle();
afficher_taches();
