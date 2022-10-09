<script context="module">
  import { checkEventStarted, checkEventEnded } from "$lib/stores/store";

  checkEventStarted();
  checkEventEnded();
</script>

<script>
  // import { checkEventStarted, checkEventEnded } from "$lib/utils/helper";
  import Confet from "$lib/components/Confet.svelte";
  import CountdownPreEvent from "$lib/components/CountdownPreEvent.svelte";
  import CountdownEvent from "$lib/components/CountdownEvent.svelte";

  import { isEventStarted, isEventEnded } from "$lib/stores/store";
  import { eventName } from "$lib/strings/id";

  let eventStarted;
  let eventEnded;

  isEventStarted.subscribe((val) => {
    eventStarted = val;
  });

  isEventEnded.subscribe((val) => {
    eventEnded = val;
  });
</script>

{#if !eventStarted && !eventEnded}
  <CountdownPreEvent />
{:else if eventStarted && !eventEnded}
  <Confet />
  <CountdownEvent />
{:else if eventEnded}
  <CountdownEvent />
  
{/if}
