<script>
  export let activite, activiteImage, db;
  import { onMount } from "svelte";

  activite = activite.toLowerCase();

  let dates = [];

  "./img/activites/" + activite + "";

  onMount(() => {
    db.collection("activites").onSnapshot((data) => {
      dates = data.docs;
    });
  });

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

  // Fonction pour ajuster l'affichage de la date
  const timeToMois = (timestamp) => {
    let dateActivite = new Date(); //On crée un nouvel Élément Date

    // Celui-ci va nous permettre de passer la date qui est initialement en millisecondes, en vrai date afin de récupérer le mois, le mois etc...
    dateActivite.setTime(timestamp * 1000); // javascript timestamps are in milliseconds

    return (
      dateActivite.getDate().toString() + " " + mois[dateActivite.getMonth()]
    ); // Le mois
  };
</script>

<img src={activiteImage} id="background" alt="activité" />
<div class="backgroundColor" />
<h1>{activite}</h1>
<div class="container">
  <div class="pageContent">
    <div class="images">
      <img
        src={"./img/activites/" + activite + "/" + activite + ".gif"}
        alt=""
      />
    </div>
    <div class="rightPane">
      <div class="dates">
        {#each dates.slice(0, 9) as date, index}
          {#if date.data().nom.toLowerCase() == activite}
            <p>{timeToMois(date.data().date)}</p>
            {#if index > 1 && index % 3 == 0}
              <div class="break" />
            {/if}
          {/if}
        {/each}
      </div>
      <div class="contact">
        <div class="contact__texte">texte</div>
      </div>
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
    position: fixed;
    z-index: -2;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  #background {
    position: fixed;
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

  .images img {
    height: 100%;
    width: 100%;
    border-radius: 15px;
    object-fit: cover;
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
    height: 20%;
    background-color: #ffd700;
    color: #0066cc;
    border-radius: 15px;
    display: flex;
  }

  .contact__texte {
    width: auto;
  }

  .dates {
    display: flex;
    height: 80%;
    width: 100%;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .dates p {
    padding: 0;
    font-size: 2.7em;
    font-weight: 600;
    text-transform: uppercase;
    margin: 0;
    width: fit-content;
  }
  .break {
    flex-basis: 100%;
    height: 0px;
  }

  @media (max-width: 460px) {
    h1 {
      font-size: 2em;
    }

    .container {
      height: 70vh;
      overflow: hidden auto;
      padding: 0 5px;
    }

    .pageContent {
      flex-direction: column-reverse;
      height: fit-content;
    }

    .rightPane {
      height: 50vh;
      width: 100%;
    }

    .dates {
      align-items: center;
      justify-content: space-between;
      height: fit-content;
      flex-direction: column;
    }

    .dates p {
      font-size: 1.7em;
      margin: 15px 0;
    }

    .dates p:nth-child(4n) {
      width: fit-content;
    }

    .contact {
      border-radius: 10px;
      height: 20%;
      display: flex;
    }

    .contact__texte {
      width: auto;
    }

    .images {
      width: 100%;
      height: 550px;
      margin-top: 35px;
    }
  }

  @media (min-width: 800px) {
  }
</style>
