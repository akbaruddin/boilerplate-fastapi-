<script>
  import TitleLayout from "../layout/TitleLayout.svelte";
  import Protected from "../components/Protected.svelte";
  import { addDoc, docs } from "../stores/localdb";
  import { t, locale } from "../i18n";
  let name = "World";
  const setEn = () => locale.set("en");
  const setEs = () => locale.set("es");
</script>

<Protected>
  <TitleLayout title="AI Camera About Page">
    <main>
      <h1 class="p-4 text-xl">{@html $t("welcome", { name })}</h1>
      <nav>
        <a href="/#/" class="text-blue-500">Home</a>
        <a href="/#/about" class="text-blue-500">About</a>
      </nav>
      <button on:click={setEn}>EN</button>
      <button on:click={setEs}>ES</button>
      <button
        on:click={() =>
          addDoc({
            text: new Date().toISOString(),
          })}>Add Data</button
      >
      {$t("unknown")}
      <ul class="space-y-2 mt-4">
        {#each $docs as doc}
          <li>
            {doc.content.text}
            ID: {doc._id}, REV: {doc._rev}
          </li>
        {/each}
      </ul>
    </main>
  </TitleLayout>
</Protected>
