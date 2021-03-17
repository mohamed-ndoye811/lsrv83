<script>
  import { onMount } from "svelte";
  // Import des éléments + de la db
  import DetailsActivites from "../../components/DetailsActivites.svelte";
  import { gsap, Expo } from "gsap";
  import { db } from "../../utils/firestore";

  let dates = []; //Tableau des dates

  // Remplissage du tableau des dates à partir de la base de données
  db.collection("activites").onSnapshot((data) => {
    dates = data.docs;
  });

  // Fonction pour ajuster l'affichage de la date
  let functionDate = new Date(); //On crée un nouvel Élément Date
  let currentDate = new Date();

  const recupJour = (timestamp) => {
    // Celui-ci va nous permettre de passer la date qui est initialement en millisecondes, en vrai date afin de récupérer le recupJour, le mois etc...
    functionDate.setTime(timestamp * 1000); // javascript timestamps are in milliseconds

    let days = [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ];
    return (
      days[functionDate.getDay()] + " " + functionDate.getDate().toString()
    ); // the Day
  };

  // Fonction affichage des détails d'une activité
  let typeActivite = "";
  let affichageDetails = false;

  function afficherDetails(nom) {
    affichageDetails = true;
    typeActivite = nom;
  }

  function recupDate(timestamp) {
    let activityDate = new Date();
    activityDate.setTime(timestamp * 1000);
    return activityDate;
  }

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

  onMount(() => {
    gsap.from(".monthContainer", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: Expo.easeOut,
      stagger: 0.1,
    });
  });
</script>

<div class="container">
  {#each Array(3) as _, i}
    <div class="monthContainer">
      <h1>{mois[currentDate.getMonth() + i].toUpperCase()}</h1>

      {#each dates as date}
        {#if mois[currentDate.getMonth() + i] == mois[recupDate(date.data().date).getMonth()]}
          <p on:click={() => afficherDetails(date.data().nom)}>
            {recupJour(date.data().date)} - {date.data().nom}
          </p>
        {/if}
      {/each}
    </div>
  {/each}
</div>

{#if affichageDetails == true}
  <DetailsActivites
    {typeActivite}
    on:click={() => (affichageDetails = false)}
  />
{/if}

<style>
  .container {
    margin: 0;
    display: flex;
    justify-content: space-between;
    position: relative;
    top: 50px;
  }
  .monthContainer {
    padding: 5px;
    border-radius: 15px;
    height: 75vh;
    width: 35%;
  }
  .monthContainer h1 {
    margin-bottom: 50px;
    text-align: center;
  }
  .monthContainer p {
    margin-top: 6vh;
    font-weight: 600;
    font-size: 1.3vw;
    text-transform: uppercase;
    text-align: center;
  }
  .monthContainer p:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  .monthContainer:nth-child(even) {
    background-color: #ffd700;
    color: #06c;
  }

  @media (max-width: 460px) {
    .container {
      flex-direction: column;
      height: 80vh;
      overflow: hidden scroll;
    }
    .monthContainer {
      width: 95%;
      height: fit-content;
    }
    .monthContainer p {
      font-size: 1.2em;
    }
  }
</style>
