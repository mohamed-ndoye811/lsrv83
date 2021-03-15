<script>
  import { onMount } from "svelte";
  import { anniversaires } from "../utils/firestore";

  let mois = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  let dateActuelle = new Date();
  let moisActuel = dateActuelle.getMonth() + 1;
  let moisTexte = mois[dateActuelle.getMonth()];

  onMount(() => {});

  // Cette fonction sert à classer les dates dans l'ordre croissant
  function compare(a, b) {
    a.data().dateNaissance.slice(0, 2);
    if (a.data().dateNaissance.slice(0, 2) > b.data().dateNaissance.slice(0, 2))
      return 1;
    if (b.data().dateNaissance.slice(0, 2) > a.data().dateNaissance.slice(0, 2))
      return -1;

    return 0;
  }
</script>

<div class="anniversaireContainer">
  <h1>ANNIVERSAIRES DU MOIS DE {moisTexte}</h1>
  <div class="listContainer">
    {#each anniversaires as date}
      <div class="dateAnniversaire">
        <!--Nous n'affichons que les dates anniversaire du mois en cours-->
        {#if date.dateNaissance.slice(3, 5) == moisActuel}
          <p>
            {date.nomPrenom.trim(" ").split(" ").slice(-1) +
              " " +
              date.nomPrenom.trim(" ").split(" ")[0][1] +
              "."}
          </p>
          <p>{date.dateNaissance.slice(0, 2) + " " + moisTexte}</p>
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  h1 {
    position: relative;
    margin: 0 auto 15px auto;
    width: fit-content;
    font-size: 3em;
    text-transform: uppercase;
    text-align: center;
  }

  .anniversaireContainer {
    width: 100%;
    height: 80%;
    margin-top: 20px;
    overflow: hidden;
  }

  .listContainer {
    overflow-y: auto;
    height: 90%;
  }

  .dateAnniversaire {
    font-size: 1.5em;
    font-weight: 600;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  .dateAnniversaire:hover {
    text-decoration: underline;
  }

  .dateAnniversaire p {
    margin: 5px 25px 25px 25px;
  }

  @media only screen and (max-width: 400px) {
    h1 {
      font-size: 1.2em;
    }

    .dateAnniversaire {
      font-size: 1em;
    }
  }
</style>
