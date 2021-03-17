<script>
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
</script>

<div class="planningAnnuelWrapper">
  <div class="container">
    <div class="infoPlanningAnnuel">
      Pour toutes sorties en car les participants doivent verser un acompte,
      pour frais de dossier, de 20€ à l'inscription.<br /><br />

      Cet acompte, qui correspond au coût du transport, ainsi que les 10€
      d’assurance ne seront pas remboursés si l’annulation se fait moins de 45
      jours avant le départ.<br /><br />

      Les personnes participant aux voyages et non adhérents (famille, amis)
      doivent signer une décharge<br /><br />

      Pour des raisons de commodités il n'est plus possible d'attendre les
      participants au-delà de 5 minutes.<br /><br />

      Notre association reçoit, de la mairie de Toulon, quelques invitations
      pour des spectacles à l'opéra vu le nombre restreint de places (5 !)
      attribuées il sera établi un roulement.<br /><br />

      <b><u>UNIQUEMENT POUR LES TOULONNAIS :</u></b><br />
      Il est possible d'obtenir des places individuellement en se présentant 15 jours
      avant la date au Service Animation Séniors, 10 place louis Blanc
    </div>

    <div class="activitesAnnee">
      <ul class="activites">
        {#each Array(20) as _}
          <li>
            <p>10-17 OCTOBRE</p>
            <p>SORTIE À EVIAN</p>
            <p>ANTENNE</p>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</div>

<style>
  .planningAnnuelWrapper {
    height: 80%;
    overflow: hidden;
    margin-top: 15px;
  }
  .activites {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0;
  }
  li {
    height: fit-content;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .container {
    display: flex;
    justify-content: space-between;
    height: 100%;
  }
  .activitesAnnee {
    overflow-y: scroll;
    overflow-x: hidden;
    width: 55%;
    height: 100%;
    font-size: 1.5vw;
    font-weight: 600;
    padding-right: 20px;
    text-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);
  }
  .infoPlanningAnnuel {
    background-color: #ffd700;
    width: 35%;
    height: 93%;
    border-radius: 20px;
    color: #06c;
    padding: 20px 30px 30px 30px;
    font-size: 1.12em;
    font-weight: 600;
    text-align: justify;
  }

  @media (min-width: 1645px) {
    .infoPlanningAnnuel {
      font-size: 1.3em;
    }
  }

  @media (max-width: 460px) {
    .planningAnnuelWrapper {
      height: 80vh;
      padding: 10px;
      overflow: hidden auto;
    }
    .container {
      flex-direction: column-reverse;
      height: fit-content;
    }
    .activitesAnnee {
      font-size: 0.8em;
      width: 100%;
      height: fit-content;
    }
    .infoPlanningAnnuel {
      width: 80%;
      height: fit-content;
    }
  }
</style>
