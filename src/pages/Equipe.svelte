<script>
  import { db } from "../utils/firestore";
  import { gsap, Expo } from "gsap";
  import { onMount } from "svelte";

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
      titre: "Responsables d'Activité",
      ouvert: false,
    },
    {
      titre: "Les antennes",
      ouvert: false,
    },
  ];

  let sectionAffichee;

  function choixSection(nomSection, index) {
    equipe[index].ouvert = !equipe[index].ouvert;
    if (sectionAffichee == -1) {
      sectionAffichee = nomSection;
      setTimeout(() => {
        gsap.fromTo(
          ".membreEquipe",
          {
            opacity: 0,
            y: "100px",
          },
          {
            duration: 0.8,
            opacity: 1,
            ease: Expo.easeOut,
            y: 0,
            stagger: 0.05,
          }
        );
      }, 0);
    } else {
      sectionAffichee = -1;
    }
  }

  var listeEquipe = [];

  onMount(() => {
    db.collection("equipe").onSnapshot((data) => {
      listeEquipe = data.docs;
    });
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
      <table align="center">
        {#each listeEquipe as membreEquipe}
          {#if membreEquipe
            .data()
            .Categorie.toLowerCase() == sectionAffichee.toLowerCase()}
            <tr class="membreEquipe">
              <td class="firstSlot">
                <div class="nomPrenom">
                  <p class="nom">{membreEquipe.data().Nom}</p>
                  <p class="prenom">{membreEquipe.data().Prenom}</p>
                </div>
                {#if !!membreEquipe.data().Fonction || !!membreEquipe.data().Ville}
                  <span class="fonction"
                    >{sectionAffichee == "Conseil d'administration"
                      ? membreEquipe.data().Fonction
                      : membreEquipe.data().Ville}</span
                  >
                {/if}
              </td>

              {#if // On vérifie si on a sélectionné le conseil d'administration ou les responsables d'activité
              sectionAffichee == "Conseil d'administration" || sectionAffichee == "Responsables d'Activité"}
                <td class="responsabilite">
                  {membreEquipe.data().Responsabilite}
                </td>
              {/if}

              <td class="telephones">
                <div class="fixe">{membreEquipe.Fixe}</div>
                <div class="portable">{membreEquipe.data().Portable}</div>
              </td>

              <td class="mail">{membreEquipe.data().Mail}</td>

              {#if // On vérifie si on a sélectionné le conseil d'administration ou les responsables d'activité
              sectionAffichee == "Les antennes"}
                <td class="lieuAntenne">
                  {membreEquipe.data().Lieu}
                </td>
                <td class="dateAntenne">
                  {membreEquipe.data().Dates}
                </td>
              {/if}
            </tr>
          {/if}
        {/each}
      </table>
    </div>
  {/if}
</div>

<style>
  .lieuAntenne {
    width: 300px;
    font-size: 0.8em;
  }

  .dateAntenne {
    width: 300px;

    line-break: normal;
    font-size: 0.8em;
  }

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
    opacity: 0;
    width: 100%;
    font-size: 1em;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .nomPrenom {
    display: flex;
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
    margin: 0;
    text-align: center;
    width: 500px;
  }

  .fonction {
    background-color: #ffd700;
    color: #0066cc;
    font-size: 0.7em;
    font-weight: 700;
    text-transform: uppercase;
    padding: 5px 20px;
    border-radius: 30px;
  }

  .responsabilite {
    line-break: normal;
    width: 450px;
  }

  .mail {
    text-align: center;
  }

  .equipeContainer {
    overflow-y: auto;
    width: 100%;
    height: 65%;
  }

  table {
    height: fit-content;
    width: 100%;
    vertical-align: middle;
    border-collapse: collapse;
  }

  td {
    padding: 0.5em;
    text-align: left;
  }

  tr {
    margin-bottom: 100px;
  }

  @media (min-width: 1750px) {
    .membreEquipe {
      font-size: 1.4em;
    }

    .responsabilite {
      width: 450px;
    }
  }
</style>
