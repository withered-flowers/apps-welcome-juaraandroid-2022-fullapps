<script>
  // Modified from
  // https://tailwindcomponents.com/component/countdown-timer
  import dayjs from "dayjs";

  import { onMount, onDestroy } from "svelte";
  import { goto } from "$app/navigation";
  import { eventTimeStart } from "$lib/configs/config";
  import {
    eventUrl,
    eventUrlAlias,
    countdown_pre_event_string1_start,
    countdown_pre_event_string2_further1,
    countdown_pre_event_string2_further2,
    countdown_pre_event_string4_group1,
    countdown_pre_event_string4_group2,
    countdown_pre_event_string4_group3,
    countdown_pre_event_string4_url,
  } from "$lib/strings/id";
  // import { checkEventStarted } from "$lib/utils/helper";
  import { checkEventStarted, isEventStarted } from "$lib/stores/store";

  import TextHeader from "$lib/components/TextHeader.svelte";
  import TextLine from "$lib/components/TextLine.svelte";

  const endTime = eventTimeStart;

  let eventStarted;

  isEventStarted.subscribe((val) => {
    eventStarted = val;
  });

  let timer = null;
  let now = dayjs().valueOf();
  let end = dayjs(endTime).valueOf();

  onMount(() => {
    timer = setInterval(() => {
      now = dayjs().valueOf();

      checkEventStarted();

      if (eventStarted) {
        goto("/", { replaceState: true });
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

<TextHeader>
  {countdown_pre_event_string1_start}
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

<TextLine>
  {countdown_pre_event_string2_further1}
  <a
    href="{eventUrl}"
    class="text-[#1aa260] hover:text-[#4285f4] hover:underline"
    >{eventUrlAlias}</a
  >
  {countdown_pre_event_string2_further2}
</TextLine>

<TextLine>
  {countdown_pre_event_string4_group1}<a
    href="{countdown_pre_event_string4_url}"
    class="text-[#1aa260] hover:text-[#4285f4] hover:underline"
    >{countdown_pre_event_string4_group2}</a
  >{countdown_pre_event_string4_group3}
</TextLine>
