<script>
  //---[ IMPORT MODULES ]---
  import { fade } from "svelte/transition";
  import { link } from "svelte-spa-router";
  import { listeActus } from "../utils/firestore";

  //---[ IMPOR COMPOSANTS ]--
  import CompteurVisite from "../components/CompteurVisite.svelte";
  import DetailsActivites from "./../components/DetailsActivites.svelte";

  let actuSelected = 0;
  let affichageDetails = false;
</script>

<div class="wrapper" in:fade={{ duration: 200 }}>
  <div class="accueilContainer">
    <div class="homeInfo">
      <h3 class="titre">QUI SOMMES NOUS?</h3>
      <span class="homeInfo__separateur" />
      <p class="homeInfo__texte">
        <b><i>Loisir et Solidarité des Retraités de TOULON et du VAR</i></b>
        est une association loi 1901 dont le but est de permettre aux personnes en
        pré-retraite ou en retraite de réaliser leurs aspirations de loisirs culturels,
        sportifs. Pour cela nous vous proposons des activités très diversifiées afin
        d'intéresser le plus grand nombre de nos adhérents. Nous nous promettons,
        également, d'agir, aussi souvent que cela se peut, par solidarité dans le
        cadre de la cité et de la nation et de nous opposer à tout ce qui induit
        inégalités et exclusion, il ne faut pas oublier que notre LSR, toutes les
        LSR, sont une émanation de la CGT . Pour ces raisons nous soutenons toutes
        les actions qui contribuent à améliorer le pouvoir d'achat, la santé, et
        la protection sociale.
      </p>
      <a href="/equipe/antennes" class="homeInfo__bouton bouton" use:link>
        NOUS REJOINDRE
      </a>
    </div>

    <div class="collegues">
      <h3 class="titre">VISITEZ NOS COLLÈGUES</h3>
      <span class="collegues__separateur" />

      <table class="collegues__liste">
        <tr>
          <td class="collegues__liste__item">
            <a target="_blank" href="http://www.lsrfede.fr">LA FÉDÉRATION</a>
          </td>

          <td class="collegues__liste__item">
            <a target="_blank" href="http://lsrmarseille.fr/">LSR MARSEILLE</a>
          </td>

          <td class="collegues__liste__item">
            <a target="_blank" href="http://lsrdelaciotat.over-blog.com/"
              >LSR LA CIOTAT</a
            >
          </td>
        </tr>

        <tr>
          <td class="collegues__liste__item">
            <a target="_blank" href="http://www.cda-blog-asso.com/lsr"
              >LSR DU MORBIHAN</a
            >
          </td>

          <td class="collegues__liste__item">
            <a
              target="_blank"
              href="https://www.facebook.com/loisirssolidaritecheminots/"
            >
              LSR NICE</a
            >
          </td>

          <td class="collegues__liste__item">
            <a target="_blank" href="http://www.lsr05.fr/">LSR 05 SUD</a>
          </td>
        </tr>
        <tr>
          <td class="collegues__liste__item">
            <p>LSR AUBAGNE</p>
          </td>
          <td class="collegues__liste__item">
            <a target="_blank" href="https://lsrpttvar.jimdofree.com/"
              >LSR PTT VAR</a
            >
          </td>

          <td class="collegues__liste__item">
            <a target="_blank" href="http://www.lsrgrandavignon.fr/">
              LSR GRAND AVIGNON</a
            >
          </td>
        </tr>
        <tr>
          <td class="collegues__liste__item">
            <a target="_blank" href="http://www.lsr-ratp.org">LSR RATP</a>
          </td>
        </tr>
      </table>
    </div>

    <ul class="partenaires">
      <li class="partenaires__image">
        <img
          src="./img/Partenaires/var.png"
          alt="blabla"
          id="logoVar"
          srcset=""
        />
      </li>
      <li class="partenaires__image">
        <img src="./img/Partenaires/PACA.png" alt="blabla" srcset="" />
      </li>
      <li class="partenaires__image">
        <img
          src="./img/Partenaires/Cadierenne.png"
          alt="logo La Cadierrenne"
          id="logoLaCadierenne"
          srcset=""
        />
      </li>
      <li class="partenaires__image">
        <img src="./img/Partenaires/Seyne-sur-mer.png" alt="blabla" srcset="" />
      </li>
      <li class="partenaires__image">
        <img src="./img/Partenaires/Solies.png" alt="blabla" srcset="" />
      </li>

      <li class="partenaires__image">
        <img src="./img/Partenaires/la-valette.png" alt="blabla" srcset="" />
      </li>
    </ul>
  </div>

  <div class="actu">
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img
      class="actu__image"
      src="./img/actu/images/image_1.jpg"
      alt="image Manifestation LSR"
    />
    <div class="actu__articleContainer">
      <h3 class="actu__titre">{listeActus[actuSelected].titre}</h3>
      <span class="actu__separateur" />
      <p class="actu__texte">
        {listeActus[actuSelected].article}
      </p>
      <p class="actu__boutonPlus" on:click={() => (affichageDetails = true)}>
        EN SAVOIR +
      </p>
      <div class="actu__selector">
        {#each listeActus as actu, index}
          <span
            class="actu__selector__circle"
            class:actu__selector__circle--active={actuSelected === index}
            on:click={() => (actuSelected = index)}
          />
        {/each}
      </div>
    </div>
  </div>
</div>
{#if affichageDetails == true}
  <DetailsActivites
    actuTitre={listeActus[actuSelected].titre}
    actu={listeActus[actuSelected].article}
    on:click={() => (affichageDetails = false)}
  />
{/if}
<CompteurVisite />

<style>
  .accueilContainer {
    position: relative;
    height: fit-content;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .homeInfo {
    display: flex;
    flex-direction: column;
    text-shadow: 0px 0px 6px rgba(0, 0, 0, 0.15);
  }
  .titre {
    font-size: 3.1vw;
    padding: 0;
    margin: 0;
  }
  .homeInfo__separateur::before {
    content: "";
    display: inline-block;
    background-color: #ffd700;
    width: 25vw;
    height: 0.75vw;
    position: relative;
    top: -5px;
    padding-bottom: -5px;
  }
  .homeInfo__texte {
    position: relative;
    font-size: 5vw;
    font-weight: 600;
    text-align: justify;
    text-overflow: ellipsis;
    line-height: 1.25em;
  }
  .homeInfo__bouton {
    width: fit-content;
    align-self: flex-end;
    cursor: pointer;
    position: relative;
    text-decoration: none;
    top: -20px;
  }

  .collegues {
    position: relative;
    width: 100%;
    text-shadow: 0px 0px 6px rgba(0, 0, 0, 0.15);
  }
  .collegues__separateur::before {
    content: "";
    display: inline-block;
    background-color: #ffd700;
    width: 25%;
    height: 5px;
    position: relative;
    top: 5px;
  }
  .collegues__liste {
    position: relative;
    bottom: 25px;
    width: 90%;
  }
  .collegues__liste__item a {
    font-size: 1.2vw;
    text-decoration: none;
    font-style: italic;
    font-weight: 600;
    color: #ffd700;
  }
  .collegues__liste__item a:hover {
    text-decoration: underline;
  }
  .collegues__liste__item p {
    margin: 0;
    padding: 0;
    font-size: 1.2vw;
    text-decoration: none;
    font-style: italic;
    font-weight: 600;
    color: #ffd700;
  }

  .actu {
    background-color: #ffd700;
    color: #06c;
    width: 80%;
    height: 100%;
  }
  .actu__image {
    border-radius: 10px 10px 0 0;
    width: 100%;
    height: 45%;
    overflow: hidden;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .actu__selector {
    position: absolute;
    width: 30%;
    height: 30px;
    left: 50%;
    bottom: 25px;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-evenly;
  }
  .actu__selector__circle::before {
    content: "";
    display: inline-block;
    background-color: #9da895;
    width: 1vw;
    height: 1vw;
    border-radius: 50%;
    position: relative;
    top: -20px;
  }
  .actu__selector__circle:hover {
    cursor: pointer;
  }
  .actu__selector__circle--active::before {
    background-color: #06c;
    content: "";
    display: inline-block;
    width: 1vw;
    height: 1vw;
    border-radius: 50%;
    position: relative;
    top: -20px;
  }
  .actu__separateur::before {
    content: "";
    display: inline-block;
    background-color: #06c;
    width: 25%;
    height: 5px;
    position: relative;
    top: -25px;
  }
  .actu__titre {
    font-size: 2.5vw;
  }
  .actu__texte {
    font-size: 1.2vw;
    font-weight: 600;
    text-align: justify;
    position: relative;
    top: -25px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .actu__boutonPlus {
    font-size: 1.5vw;
    margin-top: -20px;
    font-style: italic;
    align-self: flex-end;
    cursor: pointer;
  }
  .actu__articleContainer {
    transform: translateX(-50%);
    height: 45vh;
    display: flex;
    flex-direction: column;
  }

  @media only screen and (min-width: 768px) {
    .wrapper {
      position: relative;
      display: flex;
      width: 100%;
      height: 80%;
      margin-top: 1%;
      justify-content: space-between;
    }

    .accueilContainer {
      width: 60%;
      height: 45vh;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .homeInfo {
      width: 100%;
    }
    .titre {
      font-size: 2vw;
    }
    .homeInfo__separateur::before {
      width: 25%;
      height: 5px;
    }
    .homeInfo__texte {
      position: relative;
      top: -20px;
      font-size: 1.2vw;
      font-weight: 500;
    }
    .homeInfo__bouton {
      font-size: 1vw;
      margin-top: -20px;
    }

    .collegues {
      text-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
      position: relative;
      top: -2.5%;
    }
    .collegues__separateur::before {
      content: "";
      display: inline-block;
      background-color: #ffd700;
      width: 25%;
      height: 5px;
      position: relative;
      top: -10px;
    }
    .collegues__liste {
      width: 100%;
      position: relative;
      top: -10px;
    }
    .collegues__liste__item a {
      font-size: 1.3vw;
    }
    .collegues__liste__item p {
      font-size: 1.3vw;
    }

    .partenaires {
      list-style: none;
      width: 100%;
      padding: 0;
      margin: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .partenaires__image img {
      max-width: 7vw;
      max-height: 7vh;
    }
    #logoLaCadierenne {
      max-width: 30vh;
    }

    .actu {
      background-color: #ffd700;
      color: #06c;
      border-radius: 2%;
      max-width: 35%;
      height: 100%;
    }
    .actu__image {
      border-radius: 10px 10px 0 0;
      width: 100%;
      height: 45%;
      overflow: hidden;

      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .actu__selector {
      width: 30%;
      height: 30px;
      position: fixed;
      left: 50%;
      bottom: 10%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      justify-content: space-evenly;
    }
    .actu__selector__circle::before {
      width: 15px;
      height: 15px;
      top: 0px;
    }
    .actu__selector__circle:hover {
      cursor: pointer;
    }
    .actu__selector__circle--active::before {
      width: 15px;
      height: 15px;
      top: 0px;
    }
    .actu__separateur::before {
      top: -5px;
    }
    .actu__titre {
      font-size: 3.5vh;
      margin: 0;
    }
    .actu__texte {
      font-size: 1.2vw;
      font-weight: 600;
      height: 25vh;
      text-align: justify;
      position: relative;
      top: -5px;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .actu__boutonPlus {
      font-size: 1.3vw;
      margin: 0;
      font-style: italic;
      position: relative;
      align-self: flex-end;
      cursor: pointer;
    }
    .actu__articleContainer {
      width: 85%;
      height: 45vh;
      position: relative;
      left: 50%;
      top: 3%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }
  }

  @media (max-width: 460px) {
    .wrapper {
      display: flex;
      flex-direction: column;
      margin-top: 15px;
      padding: 0 10px;
      height: 80vh;
      overflow-y: auto;
    }

    .homeInfo {
      width: 100%;
    }
    .titre {
      font-size: 1.5em;
    }
    .homeInfo__separateur::before {
      width: 25%;
      height: 3px;
      position: relative;
      top: -10px;
    }
    .homeInfo__texte {
      position: relative;
      top: -20px;
      font-size: 1em;
      font-weight: 500;
    }
    .homeInfo__bouton {
      font-size: 0.7em;
      margin-top: -20px;
    }

    .collegues__separateur::before {
      content: "";
      display: inline-block;
      background-color: #ffd700;
      width: 25%;
      height: 3px;
      position: relative;
      top: -10px;
    }
    .collegues__liste {
      width: 100%;
      position: relative;
      top: -10px;
    }
    .collegues__liste__item a {
      font-size: 0.8em;
      padding: 5px;
    }
    .collegues__liste__item p {
      font-size: 0.8em;
    }

    .partenaires {
      list-style: none;
      width: 100%;
      align-items: center;
      padding: 0;
    }
    .partenaires__image {
      width: fit-content;
      margin: 0 auto;
    }
    .partenaires__image img {
      max-width: 100px;
      max-height: 100px;
    }

    .partenaires__image:not(:nth-child(1)) {
      margin-top: 25px;
    }

    #logoLaCadierenne {
      max-width: 250px;
    }

    .actu {
      width: 100%;
      position: relative;
      top: 85%;
      margin-top: 70px;
      border-radius: 10px;
    }

    .actu__image {
      border-radius: 10px 10px 0 0;
      width: 100%;
      height: 45%;
      overflow: hidden;

      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .actu__selector {
      width: 30%;
      height: 30px;
      position: fixed;
      left: 50%;
      bottom: 15%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      justify-content: space-evenly;
    }
    .actu__selector__circle::before {
      width: 12px;
      height: 12px;
      top: 0px;
    }
    .actu__selector__circle--active::before {
      width: 12px;
      height: 12px;
      top: 0px;
    }
    .actu__separateur::before {
      top: -12px;
      height: 3px;
    }
    .actu__titre {
      font-size: 3.5vh;
      margin: 0;
    }
    .actu__texte {
      font-size: 1em;
      height: 22vh;
    }
    .actu__boutonPlus {
      font-size: 1.2em;
      margin-top: -25px;
    }
    .actu__articleContainer {
      width: 85%;
      height: 45vh;
      position: relative;
      left: 50%;
      top: 3%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }
  }
</style>
