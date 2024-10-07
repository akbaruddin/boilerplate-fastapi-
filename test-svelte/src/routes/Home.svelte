<script>
  import TitleLayout from "../layout/TitleLayout.svelte";
  import { isAuthenticated } from "../stores/auth";
  import { resetDB } from "../stores/localdb";
  import localStore from "../stores/localStore";
  let name = "World";

  const count = localStore("count", 0);
  const enableAuth = async () => {
    isAuthenticated.set(true);
    await resetDB();
  };
</script>

<TitleLayout title="AI Camera:: CamCom">
  <main class="px-4">
    <h1 class="py-4 text-xl">Home page {name}!</h1>
    <nav class="gap-4 flex items-center">
      <a href="/#/" class="text-blue-500">Home</a>
      <a href="/#/about" class="text-blue-500">About</a>
    </nav>
    <button
      on:click={enableAuth}
      class="px-4 py-2 border border-gray-300 mt-4 flex justify-center items-center gap-1"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="size-6"
      >
        <path
          d="M6 12a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 1 1 1.5 0v7.5A.75.75 0 0 1 6 12ZM18 12a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 1.5 0v7.5A.75.75 0 0 1 18 12ZM6.75 20.25v-1.5a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0ZM18.75 18.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 1.5 0ZM12.75 5.25v-1.5a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0ZM12 21a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 1.5 0v7.5A.75.75 0 0 1 12 21ZM3.75 15a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0ZM12 11.25a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5ZM15.75 15a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0Z"
        />
      </svg>

      Login</button
    >
    <div class="mt-10 flex items-center gap-2">
      <button
        on:click={() => ($count -= 1)}
        class="px-4 py-2 border border-gray-300">-</button
      >
      <span class="px-4 py-2">{$count}</span>
      <button
        on:click={() => ($count += 1)}
        class="px-4 py-2 border border-gray-300">+</button
      >
    </div>
  </main>
</TitleLayout>
