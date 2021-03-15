<script>
  //---[ IMPORT DES MODULES ]---
  import Router from "svelte-spa-router";

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
  import InfoImportante from "./components/InfoImportante.svelte";
  import Header from "./components/Header.svelte";
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
  let loadingEnded = true;
  var nbClick = 0; // Gestion des click pour l'apparition disparition du pannel de selection

  const date = new Date();

  import { init } from "emailjs-com";

  const today =
    date.getDate().toString() + " " + (date.getMonth() + 1).toString();

  (function () {
    init("user_wLxdF6iNzWGc5Z43gXKiZ");
  })();

  // Timeout faisant apparaitre la page d'acceuil en fonction du loader
  /*setTimeout(() => {
    loadingEnded = true;
  }, 3500);*/
</script>

<!--<Loader />-->

{#if loadingEnded}
  <Header />

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
    object-fit: cover;
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

  @media only screen and (max-width: 480px) {
    .container {
      max-width: 85%;
    }
  }
</style>
