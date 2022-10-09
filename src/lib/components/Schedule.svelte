<script>
  import TextHeader from "./TextHeader.svelte";
  import TextLine from "./TextLine.svelte";

  const scheduleData = [
    {
      name: "#JuaraAndroid Season 2 - Onboarding",
      date: "7 Oktober 2022, 17.00 WIB",
      liveUrl: "https://goo.gle/juara-android-info",
      absentUrl: "",
    },
    {
      name: "#JuaraAndroid Bogor",
      date: "22 Oktober 2022, 09.00 WIB",
      liveUrl: "https://bit.ly/JuaraAndroidBogor1",
      absentUrl: "",
    },
  ];
</script>

<TextHeader>Jadwal Sesi</TextHeader>

<div class="flex flex-col text-left font-mono text-sm divide-y-4 max-w-4xl">
  <table class="table table-auto border-separate">
    <thead>
      <tr>
        <th class="border border-slate-600 p-2">Topik</th>
        <th class="border border-slate-600 p-2">Tanggal / Jam</th>
        <th class="border border-slate-600 p-2">Tautan Registrasi</th>
        <!-- <th class="border border-slate-600">Tautan Absensi</th> -->
      </tr>
    </thead>
    <tbody>
      {#each scheduleData as sched, idx}
        <tr>
          <td class="border border-slate-600 p-2">{sched.name}</td>
          <td class="border border-slate-600 p-2">{sched.date}</td>
          <td class="border border-slate-600 p-2 text-center"
            ><a
              href="{sched.liveUrl}"
              class="text-[#1aa260] hover:text-[#4285f4] hover:underline"
              >Sesi {idx + 1}</a
            ></td
          >
          <!-- <td class="border border-slate-600 text-center">
            {#if sched.absentUrl}
              <a
                href="{sched.absentUrl}"
                class="text-[#1aa260] hover:text-[#4285f4] hover:underline"
                >Absensi {idx + 1}</a
              >
            {:else}
              <span>Tidak Diperlukan</span>
            {/if}
          </td> -->
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<TextLine>
  <a href="/" class="text-[#1aa260] hover:text-[#4285f4] hover:underline"
    >Kembali ke Halaman utama</a
  >
</TextLine>
