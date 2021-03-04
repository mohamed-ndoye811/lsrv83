<script>
  import { onMount } from "svelte";
  import { gsap, Expo } from "gsap";
  import ActivityPage from "./activites/ActivityPage.svelte";
  import activites from "../utils/activites.js";

  onMount(() => {
    function preloadImages(array) {
      if (!preloadImages.list) {
        preloadImages.list = [];
      }
      var list = preloadImages.list;
      for (var i = 0; i < array.length; i++) {
        var img = new Image();
        img.onload = function () {
          var index = list.indexOf(this);
          if (index !== -1) {
            // remove image from the array once it's loaded
            // for memory consumption reasons
            list.splice(index, 1);
          }
        };
        list.push(img);
        img.src = array[i];
      }

      gsap.from(".activityItem", {
        y: 100,
        duration: 0.8,
        opacity: 0,
        ease: Expo.easeOut,
        stagger: 0.05,
        delay: 0.2,
      });
    }

    preloadImages([
      "./img/activites/zenith.jpg",
      "./img/activites/yoga.jpg",
      "./img/activites/aquagym.jpg",
      "./img/activites/patchwork.jpg",
      "./img/activites/jeux_de_societe.jpg",
      "./img/activites/rando.jpg",
      "./img/activites/bowling.jpg",
      "./img/activites/petanque.jpg",
    ]);
  });

  let pageActivite = "";

  function choixActivité(nomActivite) {
    console.log(nomActivite);
    pageActivite = nomActivite;
  }
</script>

{#if pageActivite == ""}
  <h1 id="activityTitle">ACTIVITÉS</h1>
  <div class="container">
    {#each activites as activity}
      <div class="activityItem" on:click={() => choixActivité(activity.nom)}>
        <img src={activity.imageSrc} alt={"image " + activity.nom} />
        <p>{activity.nom}</p>
      </div>
    {/each}
  </div>
{:else if pageActivite != ""}
  <ActivityPage activite={pageActivite} />
{/if}

<style>
  #activityTitle {
    margin: 1.5% auto;
    width: fit-content;
    font-size: 30px;
  }
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    height: 75%;
    width: 100%;
  }
  .activityItem {
    aspect-ratio: 9/16;
    height: 24vh;
    width: 24.5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.2);
    margin-left: 0.6%;
  }
  .activityItem p {
    position: absolute;
    font-size: 2vw;
    text-transform: uppercase;
    font-weight: 600;
    opacity: 0;
    transition-duration: 0.4s;
  }
  .activityItem img {
    height: 100%;
    width: 100%;
    transition-duration: 0.4s;
  }
  .activityItem:hover {
    cursor: pointer;
  }
  .activityItem:hover p {
    opacity: 1;
    text-shadow: 0 0 10px rgba(0, 0, 0, 1);
  }
  .activityItem:hover img {
    filter: blur(3px);
    opacity: 0.6;
  }
</style>
