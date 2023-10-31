<script>
  let scrollY = 0;
  let innerWidth = 0;

  export let imgClass =
    "w-full h-[256px] sm:h-[256px] md:h-[384px] lg:h-[512px] 2xl:h-[640px] object-cover";

  export let scrollMax = -150; // To control the maximum amount of scrolling, in px
  export let src = "";
  export let scrollRate = -0.75; // Adjust negative scroll rate for image to slide off top of screen, positive scroll rate for body to slide over image

  const WIDTH_THRESHOLD = 1280;
  $: scrollPosition = Math.max(
    scrollY * scrollRate,
    scrollMax *
      (innerWidth < WIDTH_THRESHOLD
        ? 1 - (WIDTH_THRESHOLD - innerWidth) / WIDTH_THRESHOLD
        : 1),
  );
  $: imgStyle = `object-position: 50% calc(50% + ${scrollPosition}px)`;
</script>

<svelte:window bind:scrollY bind:innerWidth />

<div>
  <img {src} class={imgClass} alt="parallax" style={imgStyle} />
</div>
