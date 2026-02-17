# Liste de Tâches 
> Une application web minimaliste pour organiser vos activités.

Ce projet permet de gérer efficacement des tâches en enregistrant un **nom**, une **date limite** et une **description**. Le style de l'interface est fait avec **Bootstrap 5**.


## Fonctionnalités principales
L'application propose les fonctionnalités suivantes
- **Ajout de tâches** avec validation du nom obligatoire
- **Modification** des tâches existantes.
- **Suppression** des tâches.
- **État de la tâche** (terminé/en cours) avec retour visuel ~~barré~~.
- **Stockage** des données dans le `localStorage` du navigateur.

## Structure des données
| Nom           | Type          | Description  |
| -----------   | -----------   | -----------  |
| nom           | string        | Nom de la tâche (champ obligatoire pour l'enregistrement)    |
| date          | date          | Date limite choisie via le sélecteur `date` |
| description   | string        | Informations complémentaires facultatives. |
| est_terminée  | int           | État binaire : `1` pour terminée, `0` pour en cours |


## Aperçu du code
### Logique d'enregistrement
La fonction `enregistrer_tache()` gère à la fois la création et la mise à jour selon qu'un index est sélectionné ou non

```javascript
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
```

### Rendu dynamique du tableau
Le tableau HTML est reconstruit à chaque modification pour refléter l'état actuel de la liste

```javascript
liste_taches.forEach((tache, index) => {
    var estChecked = tache.est_terminee == 1;
    var styleTexte = estChecked ? "text-decoration-line-through text-muted" : "fw-semibold";

    corps_tableau.innerHTML += `
        <tr>
            <td><input class="form-check-input" type="checkbox" onclick="changer_etat(${index})" ${estChecked ? "checked" : ""}></td>
            <td><span class="${styleTexte}">${tache.nom}</span></td>
            </tr>`;
});
```

## Installation et utilisation
**1. Installation :**
- *Téléchargez le fichier <u>index.html</u>*
- *Téléchargez le fichier <u>script.js</u> (à placer dans un dossier nommé <u>JS</u>)*

**Structure finale**
```
/Projet
 ├── index.html
 └── JS/
     └── script.js
```

**2. Lancement :** Ouvrez simplement `index.html`dans votre navigateur

## Aperçu de la page
**1. Page iniciale**

![Page iniciale](images/page_iniciale.png)

**2. Tâche ajoutée**
![Tâche ajoutée](images/page_avec_une_tache.png)

**3. Tâche finie et barrée**
![Tâche finie](images/tache_barree.png)


## Références
- Framework CSS : [Bootstrap 5](https://getbootstrap.com/)
- Documentation JavaScript : [JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript)
- Guide de syntaxe : [GitHub](https://docs.github.com/fr/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
