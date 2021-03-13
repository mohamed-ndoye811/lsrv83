<script>
  import { gsap, Expo } from "gsap";
  import { onMount } from "svelte";

  const loaderText = "Loisir et Solidarité des Retraités du VAR";

  const loaderWords = loaderText.split(" ");

  onMount(() => {
    setTimeout(() => {
      gsap.from(["#layer3", "#layer2", "#layer1"], {
        y: "-100vh",
        ease: Expo.easeInOut,
        stagger: 0.15,
        duration: 0.8,
        delay: 2,
        onComplete: () => {
          gsap.to([".backgroundImg", ".loaderLogo"], {
            duration: 0.1,
            autoAlpha: 0,
          });
        },
      });

      gsap
        .from(".loader_Mot", {
          duration: 1.4,
          y: 200,
          rotateZ: 20,
          ease: Expo.easeOut,
          stagger: 0.04,
          delay: 2.4,
        })
        .then(() => {
          gsap.to(".loader_Mot", {
            duration: 1.2,
            y: -200,
            ease: Expo.easeIn,
            stagger: 0.04,
            delay: 0.8,
          });

          gsap.to(["#layer1", "#layer2", "#layer3"], {
            y: "100vh",
            ease: Expo.easeInOut,
            stagger: 0.15,
            duration: 0.8,
            delay: 1.5,
            onComplete: () => {
              gsap.to(".loaderContainer", {
                duration: 0.1,
                autoAlpha: 0,
              });
            },
          });
        });
    });
  });
</script>

<div class="loaderContainer">
  <h1 id="loader_Texte">
    {#each loaderWords as word}
      <div class="loader_Mot">{word}</div>
      &nbsp;
    {/each}
  </h1>

  <div class="loaderBackground" id="layer1" />
  <div class="loaderBackground" id="layer2" />
  <div class="loaderBackground" id="layer3" />

  <img src="./img/LSR_LOGO/LSR83_logo.png" alt="" class="loaderLogo" />
  <img src="./img/Loader/Loaderimg.jpg" class="backgroundImg" alt="la Verne" />
</div>

<style>
  .loaderLogo {
    position: absolute;
    width: 25%;
    height: 25%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .backgroundImg {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .loaderContainer {
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 10;
    color: #0066cc;
  }

  .loaderBackground {
    position: fixed;
    width: 100%;
    height: 100%;
  }

  #layer1 {
    background-color: #ffda0a;
    z-index: 18;
  }

  #layer2 {
    background-color: #f0a402;
    z-index: 17;
  }

  #layer3 {
    background-color: #da6201;
    z-index: 16;
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
    z-index: 20;
  }
</style>
