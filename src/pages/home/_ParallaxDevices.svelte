<script>
  import { DeviceMockup } from "flowbite-svelte";

  let scrollY = 0;
  let innerWidth = 0;
  let innerHeight = 0;

  export let scrollMax = -1000; // To control the maximum amount of scrolling, in px
  export let scrollRate = -0.75; // Adjust negative scroll rate for image to slide off top of screen, positive scroll rate for body to slide over image

  const WIDTH_THRESHOLD = 1280;

  $: scrollPosition = Math.max(
    scrollY * scrollRate,
    scrollMax *
      (innerWidth < WIDTH_THRESHOLD
        ? 1 - (WIDTH_THRESHOLD - innerWidth) / WIDTH_THRESHOLD
        : 1),
  );
  $: desktopStyle = `top: ${10 + scrollPosition}px`;
  $: phoneStyle = `right: ${Math.min(
    Math.min(-11 - (scrollPosition / innerHeight) * 100, 20) *
      (innerWidth / 1920),
    35,
  )}%`;
</script>

<svelte:window bind:scrollY bind:innerWidth bind:innerHeight />

<div
  class="m-auto hidden !min-w-fit justify-center lg:col-span-5 lg:mt-0 lg:flex lg:flex-col"
>
  <div class="relative h-fit w-fit animate-fade" style={desktopStyle}>
    <DeviceMockup device="desktop">
      <div class="bg-pink flex h-full w-full items-center justify-center">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/ikAnAXf3gJo?autoplay=1&loop=1&mute=1&playlist=ikAnAXf3gJo"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          class="w-[720px]"
          allowfullscreen
        ></iframe>
      </div>
    </DeviceMockup>
  </div>

  <div
    class="absolute mt-[1200px] hidden h-fit w-fit xl:block"
    style={phoneStyle}
  >
    <DeviceMockup device="android">
      <img
        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/mockup-1-light.png"
        class="h-[572px] w-[272px] dark:hidden"
        alt="android example 1"
      />
      <img
        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/mockup-1-dark.png"
        class="hidden h-[572px] w-[272px] dark:block"
        alt="android example 2"
      />
    </DeviceMockup>
  </div>
</div>
