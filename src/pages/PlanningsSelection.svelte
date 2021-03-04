<script>
  import Annuel from "./Plannings/Annuel.svelte";
  import Mensuel from "./Plannings/Mensuel.svelte";
  import { db } from "../utils/firestore";

  let hideSelection = false;
  let planningSelected = "";

  function planningSelection(choix) {
    planningSelected = choix;
    hideSelection = true;
  }

  function backButton() {
    hideSelection = false;
    planningSelected = "";
  }
</script>

<ul class:hideSelection>
  <li on:click={() => planningSelection("Annuel")}>Annuel</li>
  <li on:click={() => planningSelection("Mensuel")}>Mensuel</li>
</ul>

{#if planningSelected != ""}
  <div class="planningContainer">
    {#if planningSelected === "Annuel"}
      <Annuel />
    {:else if planningSelected === "Mensuel"}
      <Mensuel {db} />
    {/if}
    <div class="bouton" on:click={() => backButton()}>RETOUR</div>
  </div>
{/if}

<style>
  ul {
    visibility: visible;
    margin: auto;
    width: 70%;
    position: relative;
    top: 35%;
    height: fit-content;
    padding: 0;
    list-style-type: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  ul li {
    font-size: 4vw;
    font-weight: 700;
    text-transform: uppercase;
  }
  ul li:hover {
    cursor: pointer;
    text-decoration: underline;
  }
  .planningContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  .hideSelection {
    visibility: hidden;
  }
  .bouton {
    width: 150px;
    font-size: 1vw;
    font-weight: 700;
    text-align: center;
    align-self: flex-end;
    position: fixed;
    bottom: 25px;
  }
</style>
