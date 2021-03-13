<script>
  import { fade } from "svelte/transition";
  import { db } from "../utils/firestore";

  export let params = {};
  let textes = [];

  db.collection("administration").onSnapshot((data) => {
    textes = data.docs;
  });
</script>

{#if params.rubrique != "attestation"}
  <div class="selectionContainer" in:fade={{ duration: 200 }}>
    {#each textes as texte}
      {#if texte.id == params.rubrique}
        <p>{@html texte.data().texte}</p>
      {/if}
    {/each}
  </div>
{:else}
  <!-- svelte-ignore a11y-missing-attribute -->
  <iframe
    src="./img/administration/Attestation_Assurance_Responsabilite_Civile.pdf#toolbar=1&view=Fit"
    in:fade={{ duration: 200 }}
  />
{/if}

<style>
  .selectionContainer {
    margin-top: 25px;
    height: 80vh;
    overflow-y: scroll;
  }
  iframe {
    height: 80vh;
    width: 50vw;
    position: relative;
    left: 50%;
    margin-top: 2%;
    transform: translateX(-50%);
  }
  .selectionContainer p {
    font-size: 2vw;
    font-weight: 600;
    letter-spacing: 1px;
    cursor: default;
  }
</style>
