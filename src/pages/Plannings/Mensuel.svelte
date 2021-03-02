<script>
	import { onMount } from 'svelte';
  // Import des éléments + de la db
  import DetailsActivites from "./../../components/DetailsActivites.svelte";
  import {gsap, Expo} from "gsap";

  let dates = []; //Tableau des dates
  export let db;

  // Remplissage du tableau des dates à partir de la base de données
  db.collection("activites").onSnapshot((data) => {
    dates = data.docs;
  });

  // Fonction pour ajuster l'affichage de la date
  let xx = new Date(); //On crée un nouvel Élément Date
  const jour = (timestamp) => {
    // Celui-ci va nous permettre de passer la date qui est initialement en millisecondes, en vrai date afin de récupérer le jour, le mois etc...
    xx.setTime(timestamp * 1000); // javascript timestamps are in milliseconds

    let days = [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ];
    return days[xx.getDay()] + " " + xx.getDate().toString(); // the Day
  };

  onMount(() => {
    gsap.from("monthContainer", {
      y: 50,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2
    })
  })

  let showDetails = false;
</script>

<div class="container">
  <div class="monthContainer">
    <h1>FÉVRIER</h1>

    {#each dates as date}
      <p on:click={() => (showDetails = true)}>
        {jour(date.data().date)} - {date.data().nom}
      </p>
    {/each}
  </div>

  <div class="monthContainer">
    <h1>MARS</h1>

    {#each Array(7) as _}
      <p on:click={() => (showDetails = true)}>LUNDI 4 - RANDONÉE</p>
    {/each}
  </div>

  <div class="monthContainer">
    <h1>AVRIL</h1>

    {#each Array(7) as _}
      <p on:click={() => (showDetails = true)}>LUNDI 4 - RANDONÉE</p>
    {/each}
  </div>
</div>

{#if showDetails == true}
  <DetailsActivites
    typeActivite="Randonnée"
    on:click={() => (showDetails = false)}
  />
{/if}

<style>
  .monthContainer {
	 padding: 35px;
	 border-radius: 15px;
	 height: fit-content;
}
 .monthContainer h1 {
	 margin-bottom: 50px;
	 text-align: center;
}
 .monthContainer p {
	 margin-top: 40px;
	 font-weight: 600;
	 font-size: 5vw;
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
 @media (min-width: 1280) {
	 .container {
		 display: flex;
		 justify-content: space-between;
		 margin-top: 15px;
	}
}
</style>
