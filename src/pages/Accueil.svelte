<script>
  import { onMount } from "svelte";
  import { gsap, Expo } from "gsap";
  // Définition des variables pour la récupération des éléments
  let homeInfo, collegue, partenaires, actu;

  onMount(() => {
    gsap.from([homeInfo, collegue, partenaires], {
      x: -200,
      opacity: 0,
      duration: 0.8,
      ease: Expo.easeOut,
    });

    gsap.from(actu, {
      x: 200,
      opacity: 0,
      duration: 0.8,
      ease: Expo.easeOut,
    });
  });

  let actuSelected = 1;
</script>

<div class="accueilContainer">
  <div class="homeInfo" bind:this={homeInfo}>
    <h3 class="homeInfo__titre">QUI SOMMES NOUS?</h3>
    <span class="homeInfo__separateur" />
    <p class="homeInfo__texte">
      <b><i>Loisir et Solidarité des Retraités de TOULON et du VAR</i></b>
      est une association loi 1901 dont le but est de permettre aux personnes en
      pré-retraite ou en retraite de réaliser leurs aspirations de loisirs culturels,
      sportifs. Pour cela nous vous proposons des activités très diversifiées afin
      d'intéresser le plus grand nombre de nos adhérents. Nous nous promettons, également,
      d'agir, aussi souvent que cela se peut, par solidarité dans le cadre de la
      cité et de la nation et de nous opposer à tout ce qui induit inégalités et
      exclusion, il ne faut pas oublier que notre LSR, toutes les LSR, sont une émanation
      de la CGT . Pour ces raisons nous soutenons toutes les actions qui contribuent
      à améliorer le pouvoir d'achat, la santé, et la protection sociale.
    </p>
    <div class="homeInfo__bouton bouton">NOUS REJOINDRE</div>
  </div>

  <div class="collegues" bind:this={collegue}>
    <h3 class="collegues__titre">VISITEZ NOS COLLÈGUES</h3>
    <span class="collegues__separateur" />

    <table class="collegues__liste">
      <tr>
        <td class="collegues__liste__item">
          <a target="_blank" href="http://www.lsrfede.fr">LA FÉDÉRATION</a>
        </td>
        <td class="collegues__liste__item">
          <a target="_blank" href="http://www.cda-blog-asso.com/lsr"
            >LSR DU MORBIHAN</a
          >
        </td>
        <td class="collegues__liste__item">
          <a target="_blank" href="http://ambro649.free.fr">LSR AIR FRANCE</a>
        </td>
      </tr>

      <tr>
        <td class="collegues__liste__item">
          <a target="_blank" href="http://lsr21dijon.org">LSR DIJON</a>
        </td>
        <td class="collegues__liste__item">
          <a target="_blank" href="http://www.lsr-ratp.org">LSR RATP</a>
        </td>
        <td class="collegues__liste__item">
          <a
            target="_blank"
            href="http://lsrmarseille.fr/spip.php/accueil/index.html"
            >LSR MARSEILLE</a
          >
        </td>
      </tr>
      <tr>
        <td class="collegues__liste__item">
          <p>LSR AUBAGNE</p>
        </td>
        <td class="collegues__liste__item">
          <p>LSR LA CIOTAT</p>
        </td>
        <td class="collegues__liste__item">
          <p>LSR PTT VAR</p>
        </td>
      </tr>
    </table>
  </div>

  <ul class="partenaires" bind:this={partenaires}>
    <li class="partenaires__image">
      <img src="./img/Partenaires/PACA.png" alt="blabla" srcset="" />
    </li>
    <li class="partenaires__image">
      <img src="./img/Partenaires/Cadierenne.png" alt="blabla" srcset="" />
    </li>
    <li class="partenaires__image">
      <img src="./img/Partenaires/Seyne-sur-mer.png" alt="blabla" srcset="" />
    </li>
    <li class="partenaires__image">
      <img src="./img/Partenaires/Solies.png" alt="blabla" srcset="" />
    </li>
  </ul>

  <div class="actu" bind:this={actu}>
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img class="actu__image" src="./img/actu/images/image_1.jpg" alt="image Manifestation LSR">
    <div class="actu__selector">
      <span
        class="actu__selector__circle"
        class:actu__selector__circle--active={actuSelected === 1}
        on:click={() => (actuSelected = 1)}
      />
      <span
        class="actu__selector__circle"
        class:actu__selector__circle--active={actuSelected === 2}
        on:click={() => (actuSelected = 2)}
      />
      <span
        class="actu__selector__circle"
        class:actu__selector__circle--active={actuSelected === 3}
        on:click={() => (actuSelected = 3)}
      />
    </div>
    <div class="actu__articleContainer">
      <h3 class="actu__titre">TITRE ACTUALITÉ</h3>
      <span class="actu__separateur" />
      <p class="actu__texte">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum
        tincidunt tortor quis lobortis. Nam gravida aliquet diam id ultricies.
        Nulla gravida metus eget nunc placerat sollicitudin.Maecenas nibh
        lectus, efficitur a tempor in, porttitor at lacus….
      </p>
      <p class="actu__boutonPlus">EN SAVOIR +</p>
    </div>
  </div>
</div>

<style>
  .accueilContainer {
    height: fit-content;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .homeInfo {
    display: flex;
    flex-direction: column;
    text-shadow: 0px 0px 6px rgba(0, 0, 0, 0.15);
  }
  .homeInfo__titre {
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
    top: -20px;
  }

  .collegues {
    position: relative;
    width: 100%;
    text-shadow: 0px 0px 6px rgba(0, 0, 0, 0.15);
  }
  .collegues__titre {
    font-size: 3.2vw;
    margin: 0;
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

  .partenaires {
    display: flex;
    list-style: none;
    position: absolute;
    top: 73%;
  }
  .partenaires__image {
    margin-right: 45px;
  }
  .partenaires__image img {
    max-width: 400px;
    max-height: 3.7vw;
  }

  .actu {
    background-color: #ffd700;
    color: #06c;
    width: 80%;
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
    left: 50%;
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
    display: flex;
    flex-direction: column;
  }

  @media only screen and (min-width: 768px) {
    .accueilContainer {
      position: relative;
      top: 15px;
      height: 80%;
      margin: auto 0;
      display: flex;
      flex-wrap: wrap;
    }

    .homeInfo {
      width: 55%;
    }
    .homeInfo__titre {
      font-size: 2.5vw;
    }
    .homeInfo__separateur::before {
      width: 25%;
      height: 5px;
    }
    .homeInfo__texte {
      position: relative;
      top: -15px;
      font-size: 1.3vw;
      font-weight: 500;
    }

    .collegues {
      width: 55%;
      text-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
      position: relative;
      top: 5%;
    }
    .collegues__titre {
      font-size: 2.5vw;
      margin: 0;
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
      display: flex;
      list-style: none;
      align-items: center;
      justify-content: space-between;
      padding: 0;
      width: 55%;
      position: relative;
      top: 9%;
    }
    .partenaires__image img {
      max-width: 150px;
      max-height: 4vw;
    }

    .actu {
      background-color: #ffd700;
      color: #06c;
      right: 0;
      top: 0px;
      border-radius: 2%;
      max-width: 42.5%;
      height: 100%;
      align-self: flex-end;
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
      position: absolute;
      bottom: 10px;
      left: 50%;
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
      position: relative;
      align-self: flex-end;
      cursor: pointer;
    }
    .actu__articleContainer {
      width: 85%;
      position: relative;
      left: 50%;
      top: 3%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
    }
  }
</style>
