<script>
	import { onMount } from 'svelte';
  import {gsap, Expo} from 'gsap';
  import ActivityPage from "./activites/ActivityPage.svelte";
  import activites from "../utils/activites.js";

  onMount(() => {
    gsap.from(".activityItem", {
      y: 100,
      duration: 0.8,
      opacity: 0,
      ease: Expo.easeOut,
      stagger: 0.05
    })
  })

  let pageActivite = "";

  function choixActivité(nomActivite) {
    console.log(nomActivite);
    pageActivite = nomActivite;
  }
</script>

{#if pageActivite == ""}
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
  .container {
	 display: flex;
	 justify-content: space-between;
	 flex-wrap: wrap;
	 height: 85%;
	 width: 100%;
}
 .activityItem {
	 height: 25vh;
	 width: 22vw;
	 display: flex;
	 justify-content: center;
	 align-items: center;
	 margin-bottom: 2.5vh;
	 overflow: hidden;
	 background-color: rgba(0, 0, 0, 0.2);
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
