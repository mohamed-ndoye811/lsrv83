<script>
  export let textToShow;

  import { db } from "../utils/firestore.js";

  let textes = [];

  db.collection("administration").onSnapshot((data) => {
    textes = data.docs;
  });
</script>

<div class="selectionContainer">
  {#each textes as texte}
    {#if texte.id == textToShow}
      <p>{@html texte.data().texte}</p>
    {/if}
  {/each}
</div>

<style>

  .selectionContainer {
	 height: 80vh;
	 overflow-y: scroll;
}
 .selectionContainer p {
	 font-size: 2vw;
	 font-weight: 600;
	 letter-spacing: 1px;
	 cursor: default;
}
 
</style>
