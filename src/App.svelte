<script>
  //---[ IMPORT DES MODULES ]---
  import { gsap, Power4 } from "gsap";
  import Router from "svelte-spa-router";
  import { link } from "svelte-spa-router";
  import active from "svelte-spa-router/active";
  import { push } from "svelte-spa-router";

  //---[ IMPORT DES PAGES ]---
  import Equipe from "./routes/Equipe.svelte";
  import Accueil from "./routes/Accueil.svelte";
  import Bsv from "./routes/Bsv.svelte";
  import Administration from "./routes/Administration.svelte";
  import Activites from "./routes/Activites.svelte";
  import Planning from "./routes/Planning.svelte";
  import Anniversaire from "./routes/Anniversaire.svelte";
  import Photos from "./routes/Photos.svelte";

  //---[ IMPORT DES COMPONENTS ]---
  import CompteurVisite from "./components/CompteurVisite.svelte";
  import InfoImportante from "./components/InfoImportante.svelte";
  import Loader from "./components/Loader.svelte";

  //---[ DEFINITION DE LA LISTE DES PAGES ]---
  const routes = {
    "/": Accueil, //Page d'accueil

    //"/voyage": Voyage, //Page Voyage

    "/BSV": Bsv, //Page BSV

    "/administration/:rubrique": Administration, //Page Administration + rubrique à afficher

    "/activites/:activiteChoisie": Activites, //Page Activités + Activité à afficher

    "/equipe/:categorie": Equipe, //Page equipe + categories à Afficher (Antennes...)

    "/planning/:espaceTemps": Planning, //Page planning + espace de temps à Afficher (mensuel ou annuel)

    "/anniversaires": Anniversaire, // Page anniversaires

    "/Photos": Photos, //Page photos souvenirs
    "/Photos/*": Photos,
  };

  //---[ DEFINITION DES VARIABLES ]---
  let loadingEnded = false;
  let pannelAffiche = "";
  var nbClick = 0; // Gestion des click pour l'apparition disparition du pannel de selection

  // Foncontion mettant à jour le pannel du menu affiché
  function pannelAffichage(pannelChoisi) {
    pannelAffiche = pannelChoisi;
  }

  document.addEventListener("click", (evt) => {
    var pannel;

    // Pannel récupérera le pannel affiché
    if (pannelAffiche == "admin") {
      pannel = document.getElementById("adminPannel");
    } else if (pannelAffiche == "divers") {
      pannel = document.getElementById("diversPannel");
    } else if (pannelAffiche == "planning") {
      pannel = document.getElementById("planningPannel");
    }

    let targetElement = evt.target; // element Cliqué

    if (pannelAffiche != "") {
      do {
        if (targetElement == pannel) {
          //Si l'élément cliqué est un pannel, nous passon pannelAffiche à "" pour le faire disparaitre.
          pannelAffiche = "";

          // Puis nous remettons le compteur de clicks à 0 pour la prochaine gestion
          nbClick = 0;
          return;
        }
        // Go up the DOM
        targetElement = targetElement.parentNode;
      } while (targetElement);

      // Si le deuxième clic se fait à l'éxterieur du pannel, alors nous le faisons disparaitre en reinitialisant le compteur de clics
      if (nbClick == 1) {
        pannelAffiche = "";
        nbClick = 0;
        return;
      }

      // Lors du premier clic sur l'élément du menu il nous compte un clic. Ici nous incrémentons le compteur pour ne pas prendre compte de ce clic
      nbClick++;
    }
  });

  // Timeout faisant apparaitre la page d'acceuil en fonction du loader
  setTimeout(() => {
    loadingEnded = true;
  }, 2500);
</script>

<Loader />

{#if loadingEnded}
  <header>
    <a href="/" id="logoLink" use:link>
      <img src="./img/LSR_LOGO/LSR83_logo.png" alt="" id="headerLogo" />
    </a>
    <nav>
      <a class="links" href="/equipe/menu" use:link>ÉQUIPE</a>
      <a class="links" href="/activites/menu" use:link> ACTIVITÉS </a>
      <a class="links" href="/BSV" use:link>BSV</a>
      <div class="navSection">
        <p
          class="links"
          id="pannelPlanning"
          on:click={() => pannelAffichage("planning")}
        >
          PLANNINGS
        </p>
        {#if pannelAffiche == "planning"}
          <div class="pannel" id="planningPannel">
            <a class="links" href="/planning/annuel" use:link> ANNUEL </a>
            <a class="links" href="/planning/mensuel" use:link> MENSUEL </a>
          </div>
        {/if}
      </div>
      <div class="navSection">
        <p
          class="links"
          id="pannelAdmin"
          on:click={() => pannelAffichage("admin")}
        >
          ADMINISTRATION
        </p>
        {#if pannelAffiche == "admin"}
          <div class="pannel" id="adminPannel">
            <a class="links" href="/administration/statuts" use:link>
              STATUTS
            </a>
            <a class="links" href="/administration/reglement" use:link>
              RÉGLEMENT
            </a>
            <a class="links" href="/administration/attestation" use:link>
              ATTESTATION
            </a>
          </div>
        {/if}
      </div>
      <div class="navSection">
        <p
          class="links"
          id="pannelDivers"
          on:click={() => pannelAffichage("divers")}
        >
          DIVERS
        </p>
        {#if pannelAffiche == "divers"}
          <div class="pannel" id="diversPannel">
            <a class="links" href="/photos" use:link> PHOTOS </a>
            <a class="links" href="/anniversaires" use:link> ANNIVERSAIRES </a>
          </div>
        {/if}
      </div>
    </nav>
  </header>

  <InfoImportante />

  <div class="container">
    <Router {routes} />
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
    position: relative;
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

  header nav {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0;
    width: 100vw;
  }

  a.links {
    color: #ffd700;
    text-decoration: none;
    font-weight: 600;
    font-size: 2.3vh;
    height: fit-content;
    width: fit-content;
    cursor: pointer;
  }

  .links {
    color: #ffd700;
    text-decoration: none;
    font-weight: 600;
    font-size: 2.3vh;
    padding: 0;
    margin: 0;
    height: fit-content;
    width: fit-content;
    cursor: pointer;
  }

  header #headerLogo {
    height: 4vh;
    cursor: pointer;
  }

  .navSection {
    position: relative;
    height: fit-content;
    width: fit-content;
  }

  .pannel {
    position: absolute;
    transform: translate(-50%, 15%);
    left: 50%;
    height: fit-content;
    padding: 2vh 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 15px;
    background-color: #ffd700;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
    z-index: 5;
  }

  .pannel a {
    color: #0066cc;
  }

  header a {
    height: 8vh;
    width: fit-content;
  }

  @media (min-width: 768px) {
    header #headerLogo {
      height: 8vh;
    }

    header nav {
      width: 70%;
    }

    header .nav a {
      font-size: 1.3vw;
    }

    header a {
      height: 8vh;
      width: fit-content;
    }
  }
</style>
