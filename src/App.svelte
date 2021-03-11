<script>
  import { gsap, Power4 } from "gsap";

  //---[ IMPORT DES PAGES ]---
  import Equipe from "./pages/Equipe.svelte";
  import Accueil from "./pages/Accueil.svelte";
  import Bsv from "./pages/Bsv.svelte";
  import Administration from "./pages/Administration.svelte";
  import Activites from "./pages/Activites.svelte";
  import PlanningAnnuel from "./pages/Plannings/PlanningAnnuel.svelte";
  import PlanningMensuel from "./pages/Plannings/PlanningMensuel.svelte";

  //---[ IMPORT DES COMPONENTS ]---
  import CompteurVisite from "./components/CompteurVisite.svelte";
  import InfoImportante from "./components/InfoImportante.svelte";
  import Loader from "./components/Loader.svelte";

  //---[ IMPORT DE LA BASE DE DONNEES ]---
  import { db } from "./utils/firestore.js";

  //---[ DEFINITION DES VARIABLES ]---
  let pageSelected = ""; // Selecteur de page
  let actualPage; // Variable de la page actuelle affichée
  let loadingEnded = false;
  // Définition des variables pour la recherche des statuts et du réglement
  let PannelVisible = "";
  let adminChoix = "";

  // Fonction de changement de page, qui fait disparaitre celle présente pour laisser apparaitre la nouvelle
  function pageSwitch(nextPage) {
    // Animation de disparition
    gsap.to(actualPage, {
      opacity: 0,
      duration: 0.6,
      ease: Power4.easeOut,
      onComplete: () => {
        pageSelected = nextPage;
      },
    });

    gsap.to(actualPage, {
      opacity: 1,
      duration: 0.6,
      delay: 0.6,
      ease: Power4.easeOut,
    });
  }

  // Gestion du changement de page pour l'administration
  function redirectionAdmin(choix) {
    PannelVisible = "";
    pageSwitch("/Administration");
    setTimeout(function () {
      adminChoix = choix.toLowerCase();
    }, 100);

    adminPannelVisible = false;
  }

  // Gestion des click pour l'apparition disparition du pannel de selection
  var nbClick = 0;

  document.addEventListener("click", (evt) => {
    var pannel;

    // Pannel récupérera le pannel affiché
    if (PannelVisible == "admin") {
      pannel = document.getElementById("adminPannel");
    } else if (PannelVisible == "divers") {
      pannel = document.getElementById("diversPannel");
    } else if (PannelVisible == "planning") {
      pannel = document.getElementById("planningPannel");
    }

    let targetElement = evt.target; // clicked element

    if (PannelVisible != "") {
      do {
        if (targetElement == pannel) {
          // This is a click inside. Do nothing, just return.
          PannelVisible = "";
          nbClick = 0;
          return;
        }
        // Go up the DOM
        targetElement = targetElement.parentNode;
      } while (targetElement);

      // This is a click outside.
      if (nbClick == 1) {
        PannelVisible = "";
        nbClick = 0;
        return;
      }

      nbClick++;
    }
  });

  setTimeout(() => {
    loadingEnded = true;
    pageSelected = "/";
  }, 2500);
</script>

<Loader />

{#if loadingEnded}
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
      <li class="nav__link" on:click={() => (PannelVisible = "planning")}>
        PLANNINGS
      </li>
      <li
        class="nav__link"
        on:click={() => {
          PannelVisible = "admin";
        }}
      >
        ADMINISTRATION
      </li>
      <li
        class="nav__link"
        on:click={() => {
          PannelVisible = "divers";
        }}
      >
        DIVERS
      </li>
    </ul>

    <div
      class={PannelVisible === "admin"
        ? "adminPannel pannelVisible"
        : "adminPannel hidden"}
      id="adminPannel"
    >
      <p on:click={() => redirectionAdmin("Statuts")}>STATUTS</p>
      <p on:click={() => redirectionAdmin("Reglement")}>REGLEMENT</p>
      <p on:click={() => redirectionAdmin("Attestation")}>
        ATTESTATION ASSURANCE
      </p>
    </div>
    <div
      class={PannelVisible === "divers"
        ? "adminPannel pannelVisible "
        : "adminPannel hidden"}
      id="diversPannel"
    >
      <p on:click={() => redirectionAdmin("Statuts")}>PHOTOS</p>
      <p on:click={() => redirectionAdmin("Reglement")}>ANNIVERSAIRES</p>
    </div>
    <div
      class={PannelVisible === "planning"
        ? "adminPannel pannelVisible "
        : "adminPannel hidden"}
      id="planningPannel"
    >
      <p on:click={() => pageSwitch("/PlanningAnnuel")}>ANNUEL</p>
      <p on:click={() => pageSwitch("/PlanningMensuel")}>MENSUEL</p>
    </div>
  </header>

  <InfoImportante />

  <div class="container" bind:this={actualPage}>
    {#if pageSelected === "/"}
      <Accueil />
    {:else if pageSelected === "/Equipe"}
      <Equipe {db} />
    {:else if pageSelected === "/Activites"}
      <Activites {db} />
    {:else if pageSelected === "/BSV"}
      <Bsv />
    {:else if pageSelected === "/PlanningAnnuel"}
      <PlanningAnnuel {db} />
    {:else if pageSelected === "/PlanningMensuel"}
      <PlanningMensuel {db} />
    {:else if pageSelected === "/Administration"}
      <Administration textToShow={adminChoix} {db} />
    {/if}
    <div class:hidden={pageSelected != "/"}>
      <CompteurVisite />
    </div>
  </div>

  <div class="background backgroundColor" />
  <img
    src="./img/Toulon-2.jpg"
    class="background backgroundImage"
    alt="fond de toulon"
  />
{/if}

<style>
  .background {
    position: absolute;
    z-index: -3;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }
  .backgroundImage {
    opacity: 0.2;
    filter: blur(2px);
  }
  .backgroundColor {
    background-color: #0066cc;
  }
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
    font-size: 2vh;
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

    #diversPannel {
      width: 200px;
      height: 100px;
    }

    header .adminPannel p {
      font-size: 1.2em;
    }

    header .pannelVisible {
      visibility: visible;
    }
  }
</style>
