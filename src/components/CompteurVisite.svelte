<script>
  import { gsap, Expo } from "gsap";
  import { onMount } from "svelte";

  let compteur;

  onMount(() => {
    fetch("https://api.countapi.xyz/update/LSR83000VisitCount/nombreVisites?amount=1")
      .then((res) => res.json())
      .then((res) => {
        compteurVisites = res.value;
      })
      .then(
        gsap.fromTo(
          compteur,
          {
            y: "100%",
          },
          {
            duration: 1.2,
            y: 0,
            ease: Expo.easeOut,
          }
        )
      );
  });

  //---[ COMPTEUR DE VISITES ]---

  /*  
  INFOS POUR LE COMPTEUR:
  
  Namespace: LSR83000VisitCount
  clé: nombreVisites

  Lien site pour voir son état | https://api.countapi.xyz/get/LSR83000VisitCount/nombreVisites
  Lien pour le remettre à zéro | https://api.countapi.xyz/set/LSR83000VisitCount/nombreVisites?value=0
*/

  let compteurVisites = "";
</script>

<div class="visitCount" bind:this={compteur}>
  <p class="visitCount__nombre">{compteurVisites}</p>
  &nbsp;
  <p>VISITES</p>
</div>

<style>
  .visitCount {
    background-color: #ffd700;
    color: #0066cc;
    overflow: hidden;
    width: 10%;
    height: 4%;
    position: fixed;
    right: 12.5%;
    bottom: 0;
    border-radius: 0.8vw 0.8vw 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-style: italic;
    font-size: 1vw;
  }

  @media (max-width: 460px) {
    .visitCount {
      width: 30%;
      height: 25px;
      right: 7.5%;
      border-radius: 7px 7px 0 0;
      font-size: 0.8em;
    }
  }
</style>
