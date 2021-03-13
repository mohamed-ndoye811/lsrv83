<script>
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { gsap, Expo } from "gsap";
  import ActivityPage from "./activites/ActivityPage.svelte";
  import activites from "../utils/activites.js";
  import { db } from "../utils/firestore";

  import { push } from "svelte-spa-router";

  export let params = {};

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
  let imageActivite;

  $: if (params.activiteChoisie == "menu") {
    pageActivite = "";
  }

  function choixActivité(nomActivite, imageSrc = "") {
    pageActivite = nomActivite;
    imageActivite = imageSrc;
    nomActivite != ""
      ? push("/activites/activityDetails")
      : push("/activites/menu");
  }
</script>

{#if params.activiteChoisie == "menu" && pageActivite == ""}
  <h1 id="activityTitle" in:fade={{ duration: 200 }}>ACTIVITÉS</h1>
  <div class="container" in:fade={{ duration: 200 }}>
    {#each activites as activity}
      <div
        class="activityItem"
        on:click={() => choixActivité(activity.nom, activity.imageSrc)}
      >
        <img src={activity.imageSrc} alt={"image " + activity.nom} />
        <p>{activity.nom}</p>
      </div>
    {/each}
  </div>
{:else}
  <ActivityPage activite={pageActivite} activiteImage={imageActivite} {db} />
  <div class="bouton" on:click={() => choixActivité("")}>RETOUR</div>
{/if}

<style>
  .bouton {
    width: 100px;
    font-size: 1em;
    text-align: center;
    border-radius: 25px;
    margin: 20px 0 20px auto;
  }
  #activityTitle {
    position: relative;
    margin: 1% auto;
    width: fit-content;
    font-size: 30px;
  }
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    height: 75%;
    width: 100%;
  }
  .activityItem {
    aspect-ratio: 9/16;
    height: 24vh;
    width: 20vw;
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
    text-align: center;
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
