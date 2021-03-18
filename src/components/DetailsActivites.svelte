<script>
  document.getElementById("darkenScreen").style.visibility = "visible";

  export let typeActivite = "";
  export let actuTitre = "";
  export let actu = "";
</script>

<div class="detailsPannel" on:click>
  <div class="reliefPannel" />
  <div class="backgroundPannel" />
  <div class="textContainer">
    {#if typeActivite != ""}
      <p><strong>Activitée:</strong> {typeActivite}</p>
    {/if}
    {#if actuTitre != "" && actu != ""}
      <p><strong>{actuTitre}</strong> <br /><br />{actu}</p>
    {/if}
  </div>
</div>

<div class="blurBackground" on:click />

<style>
  .blurBackground {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    backdrop-filter: blur(2px);
    z-index: 2;
  }
  .detailsPannel {
    cursor: pointer;
    transform: translate(-50%, -50%);
    position: fixed;
    height: 300px;
    width: 700px;
    font-size: 1.2vw;
    z-index: 3;
    left: 50%;
    top: 50%;
    border-radius: 20px;
  }
  .backgroundPannel {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #06c;
    border-radius: inherit;
  }
  .reliefPannel {
    border-radius: inherit;
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #ffd700;
    top: 4px;
    left: -4px;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.7);
  }
  .textContainer {
    position: absolute;
    color: #ffd700;
    width: fit-content;
    min-width: 85%;
    height: 65%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  @media (max-width: 460px) {
    .detailsPannel {
      height: 40%;
      width: 80%;
      font-size: 1.2em;
      border-radius: 10px;
    }
    .textContainer {
      height: 80%;
    }
  }
</style>
