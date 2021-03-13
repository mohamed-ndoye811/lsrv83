<script>
  import PlanningMensuel from "./Plannings/PlanningMensuel.svelte";
  import PlanningAnnuel from "./Plannings/PlanningAnnuel.svelte";

  // Récuperation des paramètres passées dans le lien
  export let params = {};
</script>

{#if params.espaceTemps == "annuel"}
  <PlanningAnnuel />
{:else if params.espaceTemps == "mensuel"}
  <PlanningMensuel />
{/if}
