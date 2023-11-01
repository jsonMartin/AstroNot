<script>
  import { Section, HeroHeader } from "flowbite-svelte-blocks";
  import { Button, DeviceMockup } from "flowbite-svelte";
  import { ArrowRightSolid } from "flowbite-svelte-icons";
  import ParallaxDevices from "./_ParallaxDevices.svelte";
</script>

<Section name="heroVisual">
  <div class="mx-auto place-self-center lg:col-span-7">
    <div class="-mt-8 mb-4 block w-full lg:hidden">
      <DeviceMockup device="desktop">
        <div class="bg-pink flex h-full w-full items-center justify-center">
          <img
            src="https://flowbite.s3.amazonaws.com/docs/device-mockups/laptop-screen.png"
            class="min-h-[278px] w-full rounded-xl dark:hidden md:min-h-[278px]"
            alt="laptop example 1"
          />
          <img
            src="https://flowbite.s3.amazonaws.com/docs/device-mockups/laptop-screen-dark.png"
            class="hidden w-full rounded-lg dark:block"
            alt="laptop example 2"
          />
        </div>
      </DeviceMockup>
    </div>
    <HeroHeader
      h1Class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white"
      pClass="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"
    >
      <svelte:fragment slot="h1">
        Your <a href="https://notion.so" target="_blank" class="underline"
          >Notion</a
        >
        powered Blog on rocket fuel 🚀
      </svelte:fragment>
      <svelte:fragment slot="paragraph">
        <span class="font-bold text-primary-200">AstroNot</span> is a fully
        customizable site builder powered by
        <a
          href="https://astro.build/"
          target="_blank"
          class="text-secondary-500 underline hover:no-underline">Astro</a
        >
        &
        <a
          href="https://notion.so"
          target="_blank"
          class="text-secondary-500 underline">Notion</a
        >
        Publish directly from Notion with total control over website and design
      </svelte:fragment>

      <p
        class="md:text-md lg:text-md mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 lg:mb-8"
      >
        <li>
          Write Articles, Edit Posts & Publish all within Notion. Content <span
            class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text font-bold text-transparent"
            >automagically</span
          > syncs!
        </li>
        <li>
          <span class="animated animate-pulse">Fully Interactive</span> with
          <span class="font-semibold">60+ Tailwind Components</span>,
          <span class="font-semibold">Animations</span>, and
          <span class="font-semibold">View Transitions</span>.
        </li>
        <li>
          <span class="underline">Built for Performance</span>:
          <span class="font-semibold">Image optimization</span>,
          <span class="font-semibold">minimal bundle size</span>,
          <span class="font-semibold">opt-in hydration</span>.
        </li>
        <br />
        Space requires <span class="font-semibold">FAST</span> speeds, so
        AstroNot is built for performance with the
        <span class="font-semibold">FAST</span>
        stack: <br />
        <span class="font-bold text-secondary-800 dark:text-secondary-300"
          ><a
            href="https://flowbite.com/svelte"
            target="_blank"
            class="underline hover:no-underline">Flowbite</a
          >
          +
          <a
            href="https://astro.build/"
            target="_blank"
            class="underline hover:no-underline">Astro</a
          >
          +
          <a
            href="https://svelte.dev/"
            target="_blank"
            class="underline hover:no-underline">Svelte</a
          >
          +
          <a
            href="https://tailwindcss.com/"
            target="_blank"
            class="underline hover:no-underline">Tailwind</a
          ></span
        >
      </p>

      <div class="flex flex-col gap-2 sm:flex-row sm:gap-0">
        <a
          href="https://github.com/jsonmartin/AstroNot#-installation"
          target="_blank"
          ><Button
            size="xl"
            color="red"
            class="mr-3 inline-flex items-center justify-center"
            >Get started<ArrowRightSolid size="md" class="-mr-1 ml-2" /></Button
          >
        </a>
        <a
          href="https://github.com/jsonmartin/AstroNot#-why-astronot"
          target="_blank"
          ><Button
            color="light"
            size="xl"
            class="inline-flex items-center justify-center"
            >View Documentation</Button
          >
        </a>
      </div>
    </HeroHeader>
  </div>

  <ParallaxDevices />
</Section>
