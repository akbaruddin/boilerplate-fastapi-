<script>
  import { onDestroy } from "svelte";
  import { isAuthenticated } from "../stores/auth";
  import { push } from "svelte-spa-router";

  let authenticated = false;
  const unsubscribe = isAuthenticated.subscribe((value) => {
    authenticated = value;
    if (!authenticated) {
      push("#/");
    }
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

{#if authenticated}
  <slot></slot>
{/if}
