<script>
  export let activite, activiteImage, db;
  import { onMount } from "svelte";

  let dates = [];

  onMount(() => {
    db.collection("activites").onSnapshot((data) => {
      dates = data.docs;
    });
  });

  // Fonction pour ajuster l'affichage de la date
  const mois = (timestamp) => {
    let dateActivite = new Date(); //On crée un nouvel Élément Date

    // Celui-ci va nous permettre de passer la date qui est initialement en millisecondes, en vrai date afin de récupérer le mois, le mois etc...
    dateActivite.setTime(timestamp * 1000); // javascript timestamps are in milliseconds

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

    return (
      dateActivite.getDate().toString() + " " + mois[dateActivite.getMonth()]
    ); // the Day
  };
</script>

<img src={activiteImage} id="background" alt="activité" />
<div class="backgroundColor" />
<h1>{activite}</h1>
<div class="container">
  <div class="pageContent">
    <div class="images">blabla</div>
    <div class="rightPane">
      <div class="dates">
        {#each dates.slice(0, 9) as date}
          {#if date.data().nom.toLowerCase() == activite.toLowerCase()}
            <p>{mois(date.data().date)}</p>
          {/if}
        {/each}
      </div>
      <div class="contact">test</div>
    </div>
  </div>
</div>

<style>
  .container {
    width: 100%;
    height: 65%;
    overflow: hidden;
  }

  .backgroundColor {
    background-color: #0066cc;
    position: absolute;
    z-index: -2;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  #background {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.2;
  }

  h1 {
    position: relative;
    width: fit-content;
    margin: 10px auto;
    font-size: 3em;
    text-transform: uppercase;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }

  .images {
    background-color: #ffd700;
    color: #0066cc;
    width: 22.5vw;
    height: 100%;
    border-radius: 15px;
  }

  .pageContent {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .rightPane {
    width: 66%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .contact {
    height: 15%;
    background-color: #ffd700;
    color: #0066cc;
    border-radius: 15px;
  }

  .dates {
    display: flex;
    height: 80%;
    width: 100%;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .dates p:nth-child(4n) {
    flex-basis: 100%;
  }

  .dates p {
    padding: 0;
    font-size: 2.7em;
    font-weight: 600;
    text-transform: uppercase;
    margin: 0;
    width: fit-content;
  }
</style>
