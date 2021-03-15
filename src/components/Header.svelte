<script>
  import { link } from "svelte-spa-router";
  import MenuPannel from "./MenuPannel.svelte";

  // your script goes here
  let pannelAffiche = "";
  let menuShown = false;
  function menuPannelToggle(toggled) {
    menuShown = toggled;
  }

  // Foncontion mettant à jour le pannel du menu affiché
  function pannelAffichage(pannelChoisi) {
    pannelAffiche = pannelChoisi;
  }

  let nbClick = 0;
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
</script>

<header>
  <a href="/" id="logoLink" on:click={() => menuPannelToggle(false)} use:link>
    <img src="./img/LSR_LOGO/LSR83_logo.png" alt="" id="headerLogo" />
  </a>
  <nav class="nav_pc">
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
          <a class="links" href="/administration/statuts" use:link> STATUTS </a>
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
  <div class="nav_smartphone">
    <div class="menuBouton" on:click={() => (menuShown = !menuShown)}>menu</div>
  </div>
</header>

<MenuPannel {menuPannelToggle} {menuShown} {pannelAffiche} />

<style>
  header {
    display: flex;
    justify-content: space-between;
    position: relative;
    align-items: center;
    max-width: 75%;
    margin: 0 auto;
    z-index: 2;
    font-weight: 600;
  }

  .nav_pc {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0;
    width: 80%;
  }

  nav {
    position: absolute;
    right: 0;
  }

  a.links {
    color: #ffd700;
    text-decoration: none;
    font-size: 2.3vh;
    height: fit-content;
    width: fit-content;
    cursor: pointer;
  }

  .links {
    color: #ffd700;
    text-decoration: none;
    font-size: 2.3vh;
    padding: 0;
    margin: 0;
    height: fit-content;
    width: fit-content;
    cursor: pointer;
  }

  header #headerLogo {
    height: 8vh;
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

  #logoLink {
    height: fit-content;
    height: 8vh;
  }

  .nav_smartphone {
    position: absolute;
    right: 0;
  }

  .menuBouton {
    visibility: hidden;
  }

  @media (max-width: 460px) {
    header {
      max-width: 85%;
    }

    header #headerLogo {
      height: 6vh;
      cursor: pointer;
    }

    #logoLink {
      height: fit-content;
      height: 6vh;
    }

    .nav_pc {
      visibility: hidden;
      position: absolute;
    }

    .menuBouton {
      visibility: visible;
      padding: 0;
      margin: 0;
      text-transform: uppercase;
    }
  }
</style>
