<script>
  import { onMount } from "svelte";
  import { link } from "svelte-spa-router";
  import { gsap, Expo } from "gsap";
  export let menuShown;
  export let menuPannelToggle;

  // your script goes here
  let pannelAffiche = "";

  // Foncontion mettant à jour le pannel du menu affiché
  function pannelAffichage(pannelChoisi) {
    pannelAffiche = pannelChoisi;
  }

  // Fonction qui cache le pannel menu lors d'une redirection
  function redirection() {
    menuShown = false;
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
      if (nbClick >= 1) {
        pannelAffiche = "";
        nbClick = 0;
        return;
      }

      // Lors du premier clic sur l'élément du menu il nous compte un clic. Ici nous incrémentons le compteur pour ne pas prendre compte de ce clic
      nbClick++;
    }
  });

  $: if (menuShown == true) {
    gsap.to(".menuPannelContainer", {
      x: "-100%",
      duration: 0.8,
      ease: Expo.easeOut,
      onStart: () => {
        gsap.from(".links", {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: Expo.easeOut,
        });
      },
    });
  } else {
    gsap.to(".menuPannelContainer", {
      x: 0,
      duration: 0.8,
      ease: Expo.easeOut,
    });
  }
</script>

<div class="menuPannelContainer">
  <nav>
    <a
      class="links"
      href="/equipe/menu"
      on:click={() => menuPannelToggle(false)}
      use:link
    >
      ÉQUIPE
    </a>
    <a
      class="links"
      href="/activites/menu"
      on:click={() => menuPannelToggle(false)}
      use:link
    >
      ACTIVITÉS
    </a>
    <a
      class="links"
      href="/BSV"
      on:click={() => menuPannelToggle(false)}
      use:link
    >
      BSV
    </a>
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
          <a
            class="links"
            href="/planning/annuel"
            on:click={() => menuPannelToggle(false)}
            use:link
          >
            ANNUEL
          </a>
          <a
            class="links"
            href="/planning/mensuel"
            on:click={() => menuPannelToggle(false)}
            use:link
          >
            MENSUEL
          </a>
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
          <a
            class="links"
            href="/administration/statuts"
            on:click={() => menuPannelToggle(false)}
            use:link
          >
            STATUTS
          </a>
          <a
            class="links"
            href="/administration/reglement"
            on:click={() => menuPannelToggle(false)}
            use:link
          >
            RÉGLEMENT
          </a>
          <a
            class="links"
            href="/administration/attestation"
            on:click={() => menuPannelToggle(false)}
            use:link
          >
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
          <a
            class="links"
            href="/photos"
            on:click={() => menuPannelToggle(false)}
            use:link
          >
            PHOTOS
          </a>
          <a
            class="links"
            href="/anniversaires"
            on:click={() => menuPannelToggle(false)}
            use:link
          >
            ANNIVERSAIRES
          </a>
        </div>
      {/if}
    </div>
  </nav>
</div>

<style>
  .links {
    font-weight: 600;
    font-size: 1.7em;
    color: #0066cc;
    text-align: center;
  }

  .menuPannelContainer {
    width: 100%;
    height: 100%;
    left: 100%;
    position: fixed;
    background-color: #ffd700;
    z-index: 5;
  }

  nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 40%;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    justify-content: space-between;
    z-index: 5;
  }

  p {
    margin: 0;
    padding: 0;
  }

  .pannel {
    display: flex;
    flex-direction: column;
    margin: 15px 0;
  }

  .pannel a {
    font-size: 1.3;
    font-style: italic;
  }
</style>
