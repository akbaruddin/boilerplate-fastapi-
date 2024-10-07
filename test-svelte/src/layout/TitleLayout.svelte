<script>
  export let title = "AI Camera";
  // Update the document title reactively
  $: document.title = title;
</script>

<slot></slot>
