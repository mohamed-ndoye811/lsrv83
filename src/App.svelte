<script>
  import { gsap, Power4 } from "gsap";

  //---[ IMPORT DES PAGES ]---
  import Equipe from "./pages/Equipe.svelte";
  import Accueil from "./pages/Accueil.svelte";
  import PlanningsSelection from "./pages/PlanningsSelection.svelte";
  import Bsv from "./pages/Bsv.svelte";
  import Administration from "./pages/Administration.svelte";
  import Activites from "./pages/Activites.svelte";

  //---[ IMPORT DES COMPONENTS ]---
  import CompteurVisite from "./components/CompteurVisite.svelte";
  import InfoImportante from "./components/InfoImportante.svelte";
  import Loader from "./components/Loader.svelte";

  //---[ DEFINITION DES VARIABLES ]---
  let pageSelected = "/Planning"; // Selecteur de page
  let actualPage; // Variable de la page actuelle affichée
  let loadingEnded = false;

  // Fonction de changement de page, qui fait disparaitre celle présente pour laisser apparaitre la nouvelle
  function pageSwitch(nextPage) {
    // Animation de disparition
    gsap.to(actualPage, {
      autoAlpha: 0,
      duration: 0.6,
      ease: Power4.easeOut,
    });

    // Réapparition après un délai
    setTimeout(function () {
      gsap.to(actualPage, {
        autoAlpha: 1,
        duration: 0.6,
        ease: Power4.easeOut,
      });
      pageSelected = nextPage;
    }, 200);
  }

  // Définition des variables pour la recherche des statuts et du réglement
  let pannelVisible = false;
  let adminChoix = "";

  // Gestion du changement de page pour l'administration
  function redirectionAdmin(choix) {
    pageSwitch("/Administration");
    setTimeout(function () {
      adminChoix = choix.toLowerCase();
    }, 200);

    pannelVisible = false;
  }

  setTimeout(() => {
    loadingEnded = true;
    //pageSelected = "/";
  }, 1500);
</script>

<!-- <Loader /> -->

<!--{#if loadingEnded}-->
<header>
  <img
    src="./img/LSR_LOGO/LSR83_logo.png"
    alt=""
    id="headerLogo"
    on:click={() => pageSwitch("/")}
  />
  <ul class="nav">
    <li class="nav__link" on:click={() => pageSwitch("/Voyage")}>VOYAGE</li>
    <li class="nav__link" on:click={() => pageSwitch("/Equipe")}>ÉQUIPE</li>
    <li class="nav__link" on:click={() => pageSwitch("/Activites")}>
      ACTIVITÉS
    </li>
    <li class="nav__link" on:click={() => pageSwitch("/BSV")}>BSV</li>
    <li class="nav__link" on:click={() => pageSwitch("/Planning")}>
      PLANNINGS
    </li>
    <li
      class="nav__link"
      on:click={() => {
        pannelVisible = !pannelVisible;
      }}
    >
      ADMINISTRATION
    </li>
    <li
      class="nav__link"
      on:click={() => {
        pannelVisible = !pannelVisible;
      }}
    >
      DIVERS
    </li>
  </ul>

  <div class="adminPannel" class:pannelVisible>
    <p on:click={() => redirectionAdmin("Statuts")}>STATUTS</p>
    <p on:click={() => redirectionAdmin("Reglement")}>REGLEMENT</p>
    <p on:click={() => redirectionAdmin("Reglement")}>ATTESTATION ASSURANCE</p>
  </div>
</header>

<InfoImportante />

<div class="container" bind:this={actualPage}>
  {#if pageSelected === "/"}
    <Accueil />
  {:else if pageSelected === "/Equipe"}
    <Equipe />
  {:else if pageSelected === "/Activites"}
    <Activites />
  {:else if pageSelected === "/BSV"}
    <Bsv />
  {:else if pageSelected === "/Planning"}
    <PlanningsSelection />
  {:else if pageSelected === "/Administration"}
    <Administration textToShow={adminChoix} />
  {/if}
  <div class:hidden={pageSelected != "/"}>
    <CompteurVisite />
  </div>
</div>

<!--{/if}-->
<style>
  .container {
    max-width: 75%;
    height: 100%;
    margin: 0 auto;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 75%;
    margin: 0 auto;
    z-index: 2;
  }

  header .nav {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0;
    width: 100vw;
  }

  header .nav .nav__link {
    color: #ffd700;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.9vw;
    cursor: pointer;
  }

  header .adminPannel p {
    margin: 7px 0;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
  }

  header #headerLogo {
    height: 4vh;
    cursor: pointer;
  }

  header .pannelVisible {
    visibility: visible;
  }

  .hidden {
    visibility: hidden;
  }

  @media (min-width: 768px) {
    header #headerLogo {
      height: 8vh;
    }

    header .nav {
      width: 70%;
    }

    header .nav .nav__link {
      font-size: 1.3vw;
    }

    header .adminPannel {
      visibility: hidden;
      background-color: #ffd700;
      color: #0066cc;
      position: absolute;
      right: 10%;
      top: 8vh;
      z-index: 10;
      width: 300px;
      height: 150px;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    header .adminPannel p {
      font-size: 1.2em;
    }

    header .pannelVisible {
      visibility: visible;
    }
  }
</style>
