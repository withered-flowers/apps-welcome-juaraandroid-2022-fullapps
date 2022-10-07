<script>
  // Modified from
  // https://tailwindcomponents.com/component/countdown-timer
  import dayjs from "dayjs";

  import { onMount, onDestroy } from "svelte";
  import { eventTimeEnd } from "$lib/configs/config";
  import {
    eventUrl,
    eventUrlAlias,
    countdown_event_string1_start,
    countdown_event_string1_end,
    countdown_event_string2_further1,
    countdown_event_string2_further2,
    countdown_event_string3_notif,
    countdown_event_string5_faq1,
    countdown_event_string5_faq2,
    countdown_event_string5_faq3,
    countdown_event_string8_validator1,
    countdown_event_string8_validator2,
    countdown_event_string8_validator3,
    countdown_event_string10_group1,
    countdown_event_string10_group2,
    countdown_event_string10_group3,
    countdown_event_string10_group4,
    countdown_event_string10_group5,
    countdown_event_string10_url,
    countdown_event_string10_url_2,
    countdown_event_string11_group1,
    countdown_event_string11_group2,
    countdown_event_string11_group3,
    countdown_event_string11_url,

  } from "$lib/strings/id";
  import { isEventEnded, checkEventEnded } from "$lib/stores/store";

  import TextHeader from "$lib/components/TextHeader.svelte";
  import TextLine from "$lib/components/TextLine.svelte";
  import TextLineSmall from "$lib/components/TextLineSmall.svelte";

  const endTime = eventTimeEnd;

  let timer = null;
  let eventEnded;
  let now = dayjs().valueOf();
  let end = dayjs(endTime).valueOf();

  isEventEnded.subscribe((val) => {
    eventEnded = val;
  });

  onMount(() => {
    timer = setInterval(() => {
      now = dayjs().valueOf();

      checkEventEnded();

      if (eventEnded) {
        clearInterval(timer);
      }
    }, 1000);
  });

  onDestroy(() => {
    clearInterval(timer);
  });

  $: count = Math.round((end - now) / 1000);
  $: d = Math.floor(count / (3600 * 24));
  $: h = Math.floor(count / 3600) % 24;
  $: m = Math.floor(count / 60) % 60;
  $: s = count % 60;
</script>

{#if !eventEnded}
  <TextHeader>
    {countdown_event_string1_start}
  </TextHeader>

  <div class="text-6xl text-center flex w-full items-center justify-center">
    <div class="w-24 mx-1 p-2 bg-white text-[#fbbc05] rounded-lg">
      <div class="font-mono leading-none">{d}</div>
      <div class="font-mono uppercase text-sm leading-none">Hari</div>
    </div>
    <div class="w-24 mx-1 p-2 bg-white text-[#fbbc05] rounded-lg">
      <div class="font-mono leading-none">{h}</div>
      <div class="font-mono uppercase text-sm leading-none">Jam</div>
    </div>
    <div class="w-24 mx-1 p-2 bg-white text-[#fbbc05] rounded-lg">
      <div class="font-mono leading-none">{m}</div>
      <div class="font-mono uppercase text-sm leading-none">Menit</div>
    </div>
    <div class="text-2xl mx-1 font-extralight text-slate-500">dan</div>
    <div class="w-24 mx-1 p-2 bg-white text-[#fbbc05] rounded-lg">
      <div class="font-mono leading-none">{s}</div>
      <div class="font-mono uppercase text-sm leading-none">Detik</div>
    </div>
  </div>
{:else}
  <TextHeader>
    {countdown_event_string1_end}
  </TextHeader>
{/if}

<TextLine>
  {countdown_event_string2_further1}
  <a
    href="{eventUrl}"
    class="text-[#1aa260] hover:text-[#4285f4] hover:underline"
    >{eventUrlAlias}</a
  >
  {countdown_event_string2_further2}
</TextLine>

<TextLineSmall>
  ({countdown_event_string3_notif})
</TextLineSmall>

<TextLine>
  {countdown_event_string5_faq1}
  <a href="/faq" class="text-[#1aa260] hover:text-[#4285f4] hover:underline">
    {countdown_event_string5_faq2}
  </a>
  {countdown_event_string5_faq3}
</TextLine>

<TextLine>
  {countdown_event_string8_validator1}<a
    href="/validator"
    class="text-[#1aa260] hover:text-[#4285f4] hover:underline"
    >{countdown_event_string8_validator2}</a
  >{countdown_event_string8_validator3}
</TextLine>

<TextLine>
  {countdown_event_string10_group1}<a
    href="{countdown_event_string10_url}"
    class="text-[#1aa260] hover:text-[#4285f4] hover:underline"
    >{countdown_event_string10_group2}</a
  >{countdown_event_string10_group4}<a
  href="{countdown_event_string10_url_2}"
  class="text-[#1aa260] hover:text-[#4285f4] hover:underline"
  >{countdown_event_string10_group3}</a
>{countdown_event_string10_group5}
</TextLine>

<TextLine>
  {countdown_event_string11_group1}<a
    href="{countdown_event_string11_url}"
    class="text-[#1aa260] hover:text-[#4285f4] hover:underline"
    >{countdown_event_string11_group2}</a
  >{countdown_event_string11_group3}
</TextLine>
