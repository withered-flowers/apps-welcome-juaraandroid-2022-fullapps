<script>
  import TextHeader from "$lib/components/TextHeader.svelte";
  import TextLine from "$lib/components/TextLine.svelte";

  export let errors;
  export let dgData;
</script>

<TextHeader>Pengecek Profil Publik</TextHeader>

{#if !dgData}
  <form method="POST">
    <div>
      <input
        class="px-4 py-4 rounded-full w-96 text-center mb-4 text-slate-500"
        type="text"
        name="dg"
        id="dg"
        placeholder="Tautan Profil Publik Dev Google"
      />
    </div>
    <div>
      <button
        type="submit"
        class="px-4 py-2 rounded-full border-2 text-slate-500 border-[#1aa260] hover:border-2 hover:text-slate-50 hover:bg-[#4285f4] hover:border-white"
        >Cek Profil</button
      >
    </div>
  </form>
{/if}

{#if errors}
  <div class="mt-4 text-[#EA4325]">
    {errors}
  </div>
{/if}

{#if dgData}
  <div class="text-slate-500">
    <div class="mb-4">
      <p class="text-2xl text-center font-semibold">
        Detail Profil Google Developers
      </p>
    </div>

    <div class="mb-4">
      <div>
        <p class="text-xl text-center">
          <span class="font-semibold">Nama:</span>
          <span>{dgData.profileName}</span>
        </p>
      </div>
      <div>
        <p class="text-xl text-center">
          <span class="font-semibold">Selesai Pelatihan? </span>
          {#if dgData.tiers === 1}
            <span class="text-[#1aa260]">Selesai</span>
          {:else}
            <span class="text-[#EA4325]">Belum Selesai</span>
          {/if}
        </p>
      </div>
      <div>
        <p class="text-xl text-center">
          <span class="font-semibold">Total Badge Didapat:</span>
          <span>{dgData.validBadges}</span>
        </p>
      </div>
    </div>

    {#if dgData.validBadge > 0}
      <div>
        <table class="table w-full">
          <thead>
            <tr>
              <th>Nama Course</th>
              <th>Tanggal Course Selesai</th>
            </tr>
          </thead>
          <tbody>
            {#each dgData.detailValidBadges as badge}
              <tr>
                <td>{badge.badgeName}</td>
                <td>{badge.badgeDateOfCompletion}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {:else}
      <div>Maaf, belum ada badge yang sesuai</div>
    {/if}
  </div>

  {#if dgData.tiers === 1}
    <div class="text-slate-500 mt-4">
      <div class="animate-pulse text-[#1aa260]">
        Selamat, Anda sudah menyelesaikan pelatihan !
      </div>
      <div>
        Silahkan mengisi pada Form submission untuk mengirimkan data ke Kominfo
        pada tautan berikut:
      </div>
      <div>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfV3JqmbZYfgSHUKYD0Jx5KdsTM8Tv-LoXj0FjJwhn0ph0Kbg/viewform"
          class="text-[#1aa260] hover:text-[#4285f4] hover:underline"
          >JuaraAndroid Submission</a
        >
      </div>
    </div>
  {/if}
{/if}

<TextLine>
  <a href="/" class="text-[#1aa260] hover:text-[#4285f4] hover:underline"
    >Kembali ke Halaman Utama</a
  >
</TextLine>
