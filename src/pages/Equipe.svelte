<script>
  import { db } from "../utils/firestore";

  let equipe = [
    {
      titre: "Conseil d'administration",
      ouvert: false,
    },
    {
      titre: "Commission de contrôle",
      ouvert: false,
    },
    {
      titre: "Responsables d'Actvité",
      ouvert: false,
    },
    {
      titre: "Les antennes",
      ouvert: false,
    },
  ];

  let sectionAffichee = -1;

  function choixSection(nomSection, index) {
    equipe[index].ouvert = !equipe[index].ouvert;
    if (sectionAffichee == -1) {
      sectionAffichee = nomSection;
    } else {
      sectionAffichee = -1;
    }
  }

  var listeEquipe = [];

  db.collection("equipe").onSnapshot((data) => {
    listeEquipe = data.docs;
  });
</script>

<div class="container">
  <h1 id="titrePage">ÉQUIPE</h1>
  {#each equipe as pannel, i}
    <div
      class={sectionAffichee === pannel.titre || sectionAffichee == -1
        ? "option affichee"
        : "option hidden"}
      on:click={() => choixSection(pannel.titre, i)}
    >
      <p class="option__titre">
        {pannel.titre}
      </p>
      <div class="option__ouverture">{pannel.ouvert ? "-" : "+"}</div>
    </div>
  {/each}

  {#if sectionAffichee != -1}
    <div class="equipeContainer">
      {#each listeEquipe as membreEquipe}
        {#if membreEquipe
          .data()
          .Categorie.toLowerCase() == sectionAffichee.toLowerCase()}
          <div class="membreEquipe">
            <div class="firstSlot">
              <div class="nomPrenom">
                <p class="nom">{membreEquipe.data().Nom}</p>
                <p class="prenom">{membreEquipe.data().Prenom}</p>
              </div>
              {#if membreEquipe.data().Fonction != ""}
                <span class="fonction">{membreEquipe.data().Fonction}</span>
              {/if}
            </div>

            <div class="responsabilite">
              {membreEquipe.data().Responsabilite}
            </div>

            <div class="telephones">
              <div class="fixe">{membreEquipe.data().Fixe}</div>
              <div class="portable">{membreEquipe.data().Portable}</div>
            </div>
            <div class="mail">{membreEquipe.data().Mail}</div>
          </div>
        {/if}
      {/each}
    </div>
  {/if}
</div>

<style>
  #titrePage {
    margin: 1% auto;
    width: fit-content;
    font-size: 30px;
  }
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow-y: hidden;
  }
  .option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 2.5em;
    cursor: pointer;
    margin-bottom: 35px;
    user-select: none;
  }

  .option__titre {
    margin: 0;
  }

  .hidden {
    transition-delay: 5s;
    display: none;
  }

  .membreEquipe {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 1.2em;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .nomPrenom {
    display: flex;
    justify-content: space-between;
  }

  .nomPrenom p {
    margin: 0;
    font-size: 1.5em;
  }

  .nomPrenom .prenom {
    margin-left: 15px;
    text-transform: capitalize;
  }
  .nomPrenom .nom {
    text-transform: uppercase;
  }

  .telephones {
    display: flex;
    flex-direction: column;
    margin: 0;
    font-size: 1em;
  }

  .fonction {
    background-color: #ffd700;
    color: #0066cc;
    font-size: 0.6em;
    font-weight: 700;
    text-transform: uppercase;
    padding: 5px 20px;
    border-radius: 30px;
  }

  .responsabilite {
    line-break: normal;
    width: 300px;
  }

  .equipeContainer {
    overflow-y: scroll;
    width: 100%;
    padding: 0 10px 0 0;
    height: 65%;
  }
</style>
