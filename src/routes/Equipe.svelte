<script>
  import { gsap, Expo } from "gsap";
  import { onMount } from "svelte";
  import { link } from "svelte-spa-router";
  import { fade } from "svelte/transition";
  import { listeEquipe } from "../utils/firestore";

  // Récupère les paramètres passées dans le lien
  export let params = {};

  let equipe = [
    {
      titre: "Conseil d'administration",
      lien: "conseil_administration",
      ouvert: false,
    },
    {
      titre: "Commission de contrôle",
      lien: "commission_controle",
      ouvert: false,
    },
    {
      titre: "Responsables d'Activité",
      lien: "responsables_activite",
      ouvert: false,
    },
    {
      titre: "Les antennes",
      lien: "antennes",
      ouvert: false,
    },
  ];

  var sectionAffichee = "";

  $: if (params.categorie != "menu") {
    sectionAffichee = equipe.find(
      (categorie) => categorie.lien == params.categorie
    ).titre;

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
  }

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

  onMount(() => {});
</script>

<div class="container" in:fade={{ duration: 200 }}>
  <h1 id="titrePage">ÉQUIPE</h1>
  {#each equipe as pannel, i}
    {#if params.categorie != pannel.lien}
      <a
        href={"/equipe/" + pannel.lien}
        class={params.categorie === pannel.lien || params.categorie == "menu"
          ? "categorie affichee"
          : "categorie hidden"}
        use:link
      >
        <p class="categorie__titre">
          {pannel.titre}
        </p>
        <div class="categorie__ouverture">+</div>
      </a>
    {:else}
      <a
        href={"/equipe/menu"}
        class={params.categorie === pannel.lien || params.categorie == "menu"
          ? "categorie affichee"
          : "categorie hidden"}
        use:link
      >
        <p class="categorie__titre">
          {pannel.titre}
        </p>
        <div class="categorie__ouverture">-</div>
      </a>
    {/if}
  {/each}

  {#if params.categorie != "menu"}
    <div class="equipeContainer">
      <table align="center">
        {#each listeEquipe as membreEquipe, i}
          {#if membreEquipe.Categorie.toLowerCase() == sectionAffichee.toLowerCase()}
            <tr class="membreEquipe" bind:this={membreEquipe[i]}>
              <td class="firstSlot">
                <div class="nomPrenom">
                  <p class="nom">{membreEquipe.Nom}</p>
                  <p class="prenom">{membreEquipe.Prenom}</p>
                </div>
                {#if !!membreEquipe.Fonction || !!membreEquipe.Ville}
                  <span class="fonction"
                    >{sectionAffichee == "Conseil d'administration"
                      ? membreEquipe.Fonction
                      : membreEquipe.Ville}</span
                  >
                {/if}
              </td>

              {#if // On vérifie si on a sélectionné le conseil d'administration ou les responsables d'activité
              sectionAffichee == "Conseil d'administration" || sectionAffichee == "Responsables d'Activité"}
                <td class="responsabilite">
                  {membreEquipe.Responsabilite}
                </td>
              {/if}

              <td class="telephones">
                <div class="fixe">{membreEquipe.Fixe}</div>
                <div class="portable">{membreEquipe.Portable}</div>
              </td>

              <td class="mail">{membreEquipe.Mail}</td>

              {#if // On vérifie si on a sélectionné le conseil d'administration ou les responsables d'activité
              sectionAffichee == "Les antennes"}
                <td class="lieuAntenne">
                  {membreEquipe.Lieu}
                </td>
                <td class="dateAntenne">
                  {membreEquipe.Dates}
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
  .categorie {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 2.5em;
    cursor: pointer;
    margin-bottom: 20px;
    user-select: none;
    text-decoration: none;
    color: #ffd700;
  }

  .categorie__titre {
    margin: 0;
  }

  .hidden {
    transition-delay: 5s;
    display: none;
  }

  .membreEquipe {
    opacity: 1;
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
    white-space: nowrap;
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
    width: fit-content;
    overflow-x: auto;
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

  @media (max-width: 460px) {
    #titrePage {
      margin: 20px auto;
      font-size: 1.5em;
    }

    .categorie {
      font-size: 1.2em;
    }

    td {
      padding: 3.5em 0.7em;
    }

    .membreEquipe {
      font-size: 0.5em;
    }

    .nomPrenom .prenom {
      margin-left: 5px;
    }

    .fonction {
      font-size: 5px;
      padding: 3px 10px;
      position: relative;
      top: 5px;
    }

    .responsabilite {
      visibility: hidden;
      position: absolute;
    }

    .telephones {
      width: fit-content;
      padding: 0;
      font-size: 0.4em;
    }

    .equipeContainer {
      overflow-x: auto;
    }

    .lieuAntenne {
      width: 500px;
      font-size: 0.8em;
    }

    .dateAntenne {
      width: 500px;

      line-break: normal;
      font-size: 0.8em;
    }
  }
</style>
