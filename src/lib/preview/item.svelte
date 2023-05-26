<script lang="ts">
  import { getActiveID } from './list.svelte'
  const activeID = getActiveID()
  const id = crypto.randomUUID()
</script>

<li on:mouseup={() => ($activeID = id)}>
  <span>
    <slot />
  </span>
  {#if id === $activeID}
    <span>(active)</span>
  {/if}
</li>
