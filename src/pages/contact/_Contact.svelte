<script>
  import { Section, Contact } from "flowbite-svelte-blocks";
  import { Label, Input, Textarea, Button, Helper } from "flowbite-svelte";

  let email = "";
  let subject = "";
  let message = "";

  $: isEmailValid = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  $: emailColor = email.length === 0 ? "base" : isEmailValid ? "green" : "red";

  $: isValidSubject = subject.length > 4;
  $: subjectColor =
    subject.length === 0 ? "base" : isValidSubject ? "green" : "red";

  $: isValidMessage = message.length > 20;
  $: messageColor =
    message.length === 0 ? "base" : isValidMessage ? "green" : "red";

  $: isValidForm = isEmailValid && isValidSubject && isValidMessage;
</script>

<Section name="contact">
  <Contact>
    <svelte:fragment slot="h2">Contact</svelte:fragment>
    <svelte:fragment slot="paragraph"
      >Have any questions or comments? Get in touch!</svelte:fragment
    >
    <form class="space-y-8">
      <div>
        <Label for="email" class="mb-2 block" color={emailColor}>
          Your email
        </Label>
        <Input
          id="email"
          name="email"
          bind:value={email}
          placeholder="buzz@astronot.com"
          color={emailColor}
          required
        />
      </div>
      <div>
        <Label for="subject" class="mb-2 block" color={subjectColor}>
          Subject
        </Label>

        <Input
          id="subject"
          name="subject"
          bind:value={subject}
          color={subjectColor}
          placeholder="What's up?"
          required
        />
      </div>
      <div>
        <Label for="" class="mb-2 block" color={messageColor}>Message</Label>

        <Textarea
          id="message"
          name="message"
          bind:value={message}
          color={messageColor}
          placeholder="This form is only for testing purposes, and does not actually submit a message."
          label=""
        />
        {#if message.length > 0 && !isValidMessage}
          <Helper class="mt-0" color="red">
            <span class="font-medium"
              >Please enter a valid message. At least a few words 😄</span
            >
          </Helper>
        {/if}
      </div>

      <Button size="lg" type="submit" disabled={!isValidForm} color="primary">
        Send message
      </Button>
    </form>
  </Contact>
</Section>
