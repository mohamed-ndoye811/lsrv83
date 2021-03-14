<script>
  import Carousel from "@beyonk/svelte-carousel";

  function importAll(r) {
    return r.keys().map(r);
  }

  const images = importAll(require.context("./", false, /\.(png|jpe?g|svg)$/));
</script>

<div class="carouselContainer">
  <Carousel perPage={3} loop={true}>
    <div class="slide-content">Slide 1</div>
    <div class="slide-content">Slide 2</div>
    <div class="slide-content">Slide 3</div>
    <div class="slide-content">Slide 4</div>
  </Carousel>
</div>

<style>
  .carouselContainer {
    width: 100%;
    height: 100%;
  }
</style>
