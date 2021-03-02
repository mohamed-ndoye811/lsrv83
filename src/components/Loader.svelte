<script>
  import { gsap, Expo } from "gsap";
import { onMount } from "svelte";

  const loaderText = "Loisir et Solidarité des Retraités du VAR";

  const loaderWords = loaderText.split(' ');

  onMount(() => {
      gsap.from(".loader_Mot", {
          duration: 0.6,
          y: 150,
          rotateZ: 25,
          ease: Expo.easeOut,
          stagger: 0.1,
          delay: 0.5
      })
  })

</script>

<div class="loaderContainer">
  <h1 id="loader_Texte">
      {#each loaderWords as word}
        <div class="loader_Mot">{word}</div>
        &nbsp;
      {/each}
  </h1>
</div>

<style>
  .loaderContainer {
    background-color: #0066cc;
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 20;
  }

  #loader_Texte {
    margin: 0;
    position: fixed;
    width: fit-content;
    top: 50%;
    left: 50%;
    font-size: 3vw;
    transform: translate(-50%, -50%);
    text-transform: uppercase;
    display: flex;
    overflow: hidden;
  }
</style>
