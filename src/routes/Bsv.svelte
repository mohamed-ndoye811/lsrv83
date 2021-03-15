<script>
  import { onMount } from "svelte";
  import { gsap, Expo } from "gsap";

  onMount(() => {
    gsap.from([".bsvInfo", ".inscriptionInfo"], {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: Expo.easeOut,
      stagger: 0.1,
    });
  });
</script>

<h1 id="titrePage">BSV (Bourse Solidarité Vacances)</h1>
<div class="bsvContainer">
  <div class="bsvTexte">
    <div class="bsvInfo">
      Droit aux vacances pour tous avec LSR et BSV et SENIORS EN VACANCES c'est
      une réalité Désormais s'y ajoute SENIORS EN VACANCES (SEV)<br /><br />
      Grâce au partenariat entre LSR et BSV (Bourse Solidarité Vacances), une semaine
      en pension complète, dans un superbe centre de vacances, n'est plus un rêve
      même pour les adhérents LSR qui ont de faibles ressources.<br /><br />
      Depuis plusieurs années des centaines de personnes ont ainsi pu s'offrir des
      vacances à la mer, à la montagne ou la campagne. Beaucoup d'entre elles n'auraient
      jamais pu partir sans BSV. Ces séjours s'adressent à tous les adhérents LSR
      à faible revenus. Organisés par la Fédération LSR, ils regroupent, chaque sortie,
      une cinquantaine d'adhérents LSR de diverses associations de toute la France
      et sont toujours accompagnés de deux animateurs responsables.<br /><br />
      Un tel prix pour des prestations de très grande qualité repose sur une véritable
      chaine de solidarité. Des propriétaires et gestionnaires de centre de vacances,
      l'Avenir Social et LSR par leurs efforts, mis en convergence par BSV, permettent
      de rendre des vacances de qualité accessibles à tous<br /><br />

      Les adhérents susceptibles de bénéficier de séjours BSV et Seniors en
      vacances sont priés de bien vouloir faire parvenir au plus tôt la
      photocopie recto-verso de leur dernière feuille d’imposition ou
      non-imposition.

      <br /><br />
      Le règlement se fera de la façon suivante :<br /><br />1 : un chèque de
      80€ au moment de l’inscription au nom de LSR83 <br />2 : Pour ceux qui
      utiliseront le train un chèque de 180€ 1 mois avant la date de départ.<br
      />3 : Pour ceux qui utiliseront leur voiture un chèque de 150€ 1 mois
      avant la date de départ.<br /><br /> Les règlements (par chèque) seront à adresser
      à la Trésorière LSR 83 ou à remettre à le ou la responsable d’antenne.
    </div>

    <div class="inscriptionInfo">
      Voici la grille à partir de laquelle nous vérifions l’éligibilité des
      bénéficiaires :<br /><br /> BSV (regarder la ligne 25 de la feuille)<br
      />Plafond pour 1 part fiscale : 21600€<br /> Plafond pour 1,5 part fiscale
      : 27000€<br />
      Plafond pour 2 parts fiscales : 32400€<br /> Plafond pour 2,5 parts
      fiscales : 37800€<br /><br />
      SENIORS EN VACANCES<br /> Ne pas être imposable (ligne 14 de la feuille)
      Adresser la photocopie de la feuille d’imposition à la TRESORIERE LSR 83.<br
      /><br />
      La destination du séjour 2021 BSV attribué à LSR 83 est :<br /> BISCAROSSE
      (40) Village VTF <i>du 05 au 12 juin 2021</i><br /><br /> Le séjour est fixé
      à 260€ tout compris. Pour les adhérents qui souhaitent se rendre dans le séjour
      en voiture le prix du séjour sera ramené à 230€ par personne.
    </div>
  </div>
</div>

<style>
  #titrePage {
    margin: 1% auto;
    font-size: 4vh;
  }
  .bsvContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
  }
  .bsvTexte {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .bsvInfo {
    overflow-y: scroll;
    overflow-x: hidden;
    width: 47%;
    height: 75vh;
    font-size: 2.5vh;
    padding-right: 10px;
    font-weight: 600;
    text-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);
  }
  .inscriptionInfo {
    background-color: #ffd700;
    width: 45%;
    height: 70vh;
    border-radius: 20px;
    color: #06c;
    padding: 22.5px;
    font-size: 2.5vh;
    font-weight: 600;
    text-align: justify;
  }

  @media (max-width: 460px) {
    #titrePage {
      margin: 5px auto;
      font-size: 1.5em;
      text-align: center;
    }
    .bsvContainer {
      height: 75vh;
      width: 100%;
      justify-content: space-between;
      overflow: hidden auto;
    }
    .bsvTexte {
      flex-direction: column;
      height: fit-content;
      width: 100%;
    }
    .bsvInfo {
      width: 100%;
      height: fit-content;
      font-size: 1.2em;
      margin-bottom: 25px;
    }
    .inscriptionInfo {
      width: 90%;
      height: fit-content;
      padding: 15px;
      font-size: 1.2em;
      text-align: justify;
    }
  }
</style>
