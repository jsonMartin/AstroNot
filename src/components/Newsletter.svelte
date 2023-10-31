<script>
  import { Section, Newsletter } from "flowbite-svelte-blocks";
  import { Input, Button, Label, Modal } from "flowbite-svelte";
  import { EnvelopeSolid } from "flowbite-svelte-icons";

  let email = "";
  let defaultModal = false;

  $: isEmailValid = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  $: emailColor = email.length === 0 ? "base" : isEmailValid ? "green" : "red";
</script>

<Section>
  <Newsletter>
    <svelte:fragment slot="h2">Sign up for the newsletter</svelte:fragment>
    <p
      class="mx-auto mb-8 max-w-2xl font-light text-gray-500 dark:text-gray-400 sm:text-xl md:mb-12"
    >
      Enter an e-mail address to test out form validation and Flowbite modal via
      reactive Svelte components. This form does <span class="font-bold"
        >not</span
      > collect any data.
    </p>

    <form
      on:submit={(e) => {
        defaultModal = !defaultModal;
        e.preventDefault();
      }}
    >
      <div
        class="mx-auto mb-3 max-w-screen-sm items-center space-y-4 sm:flex sm:space-y-0"
      >
        <div class="relative w-full">
          <Label class="hidden">Email address</Label>
          <Input
            id="email"
            type="email"
            color={emailColor}
            placeholder="buzz@astronot.com"
            size="md"
            bind:value={email}
            class="block w-full rounded-lg border border-gray-300 p-3 pl-10 text-sm focus:border-primary-500 focus:ring-primary-500 sm:rounded-none sm:rounded-l-lg"
          >
            <EnvelopeSolid
              slot="left"
              size="sm"
              class="ml-2 text-gray-500 dark:text-gray-400"
            />
          </Input>
        </div>
        <div>
          <Button
            type="submit"
            class="w-full cursor-pointer rounded-lg border border-primary-600 bg-primary-300 px-5 py-3 text-center text-sm font-medium text-white focus:ring-4 dark:focus:ring-primary-800  sm:rounded-none sm:rounded-r-lg"
            disabled={!isEmailValid}>Subscribe</Button
          >
        </div>
      </div>
      <div
        class="newsletter-form-footer mx-auto max-w-screen-sm text-left text-sm text-gray-500 dark:text-gray-300"
      >
        We care about the protection of your data. <a
          href="/"
          class="font-medium text-primary-600 hover:underline dark:text-primary-400"
          >Read our Privacy Policy</a
        >.
      </div>
    </form>
  </Newsletter>
</Section>

<Modal title="Flowbite Modal Test" bind:open={defaultModal} autoclose>
  <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
    Normally this would subscribe <span class="font-extrabold">{email}</span> to
    an e-mail list, but this is just a test for form validation and this interactive
    Modal component.
  </p>
  <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
    Modals are just one of many available interactive Flowbite components
    already included in AstroNot. Check out the documentation for more details
    on Flowbite and Svelte components!
  </p>
  <svelte:fragment slot="footer">
    <Button on:click={() => alert('Handle "success"')}>I accept</Button>
    <Button color="alternative">Decline</Button>
  </svelte:fragment>
</Modal>
