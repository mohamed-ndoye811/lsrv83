<script>
  document.getElementById("darkenScreen").style.visibility = "visible";

  export let typeActivite = "vebeb";
</script>

<div class="detailsPannel" on:click>
  <div class="reliefPannel" />
  <div class="backgroundPannel" />
  <div class="textContainer">
    <p><strong>Activitée:</strong> {typeActivite}</p>
  </div>
</div>

<div class="blurBackground" on:click />

<style>
  .blurBackground {
	 position: fixed;
	 height: 100%;
	 width: 100%;
	 backdrop-filter: blur(2px);
}
 .detailsPannel {
	 cursor: pointer;
	 transform: translate(-50%, -50%);
	 position: absolute;
	 height: 300px;
	 width: 700px;
	 font-size: 1.2vw;
	 z-index: 1;
	 left: 50%;
	 top: 35%;
	 border-radius: 20px;
}
 .backgroundPannel {
	 position: absolute;
	 height: 100%;
	 width: 100%;
	 z-index: 3;
	 background-color: #06c;
	 border-radius: inherit;
}
 .reliefPannel {
	 border-radius: inherit;
	 position: absolute;
	 height: 100%;
	 width: 100%;
	 background-color: #ffd700;
	 z-index: 2;
	 top: 4px;
	 left: -4px;
	 box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.7);
}
 .textContainer {
	 position: absolute;
	 z-index: 3;
	 color: #ffd700;
	 width: fit-content;
	 min-width: 85%;
	 height: 65%;
	 left: 50%;
	 top: 50%;
	 transform: translate(-50%, -50%);
}
 
</style>
