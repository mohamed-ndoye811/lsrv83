<script>
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { gsap, Expo } from "gsap";
  import ActivityPage from "./activites/ActivityPage.svelte";
  import activites from "../utils/activites.js";
  import { db } from "../utils/firestore";

  import { push } from "svelte-spa-router";

  export let params = {};

  gsap.from(".activityItem", {
    y: 100,
    duration: 0.8,
    opacity: 0,
    ease: Expo.easeOut,
    stagger: 0.05,
    delay: 0.2,
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
    <div class="activityList">
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
    height: 75%;
    width: 100%;
  }
  .activityList {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .activityItem {
    height: 24vh;
    width: 20vw;
    display: flex;
    justify-content: center;
    position: relative;
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
    opacity: 1;
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

  @media (max-width: 460px) {
    #activityTitle {
      margin: 10px auto;
      font-size: 1.5em;
    }
    .container {
      height: 80vh;
      width: 100%;
      overflow: hidden auto;
    }
    .activityList {
      width: 100%;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: space-between;
    }
    .activityItem {
      height: 35%;
      width: 100%;
    }

    .activityItem:not(:nth-child(1)) {
      margin-top: 10px;
    }

    .activityItem p {
      font-size: 1.4em;
      opacity: 1;
      text-shadow: 0 0 10px rgba(0, 0, 0, 1);
    }

    .activityItem img {
      filter: blur(3px);
      opacity: 0.6;
    }
  }
</style>
