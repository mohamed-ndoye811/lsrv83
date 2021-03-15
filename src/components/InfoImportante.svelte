<script>
  let informationImportante = "Information importante!";
  let barreAnnonce;

  let texteInformationImportante = (
    informationImportante.toUpperCase() + " - "
  ).repeat(3);
</script>

<div class="infoImportante" bind:this={barreAnnonce}>
  {#each Array(3) as _}
    <span class="infoImportante__texte">
      &nbsp;{texteInformationImportante}
    </span>
  {/each}
</div>

<style>
  .infoImportante {
    height: 40px;
    width: 100%;
    background-color: #ffd700;
    color: #06c;
    white-space: nowrap;
    overflow: hidden;
    display: flex;
    align-items: center;
    z-index: 1;
  }

  .infoImportante__texte {
    cursor: default;
    font-size: 1.25vw;
    font-weight: 600;
    animation: scrollTxtInfoImportante 40s linear infinite;
    z-index: 1;
  }

  @keyframes scrollTxtInfoImportante {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(-100%, 0);
    }
  }

  @media only screen and (max-width: 460px) {
    .infoImportante {
      height: 25px;
    }

    .infoImportante__texte {
      font-size: 0.8em;
    }
  }
</style>
