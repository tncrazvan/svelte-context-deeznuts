<script lang="ts" context="module">
  import { get } from '../index.js'
  export const getActiveID = get<false | string>('activeID')
</script>

<script lang="ts">
  import { set } from '../index.js'
  set<false | string>('activeID', false)
</script>

<ul>
  <slot />
</ul>
