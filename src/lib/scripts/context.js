import { getContext, setContext } from 'svelte'
import { writable } from 'svelte/store'

/**
 * Wraps `value` in a `Writable<T>` store and sets the `name` context.
 *
 * You would usually call this function at the component level, then use `get` in order to retrieve the context from within children components.
 *
 * Something like this:
 *
 * ```svelte
 * <!-- List.svelte -->
 * <script lang="ts">
 *  import { set } from 'svelte-context-deeznuts'
 *  set('activeID', false)
 * </script>
 * ```
 * @see {@link get}
 * @template T type of the context value.
 * @param {string} name name of the context.
 * @param {T} value value of the context (this will be converted into `Writable<T>`)
 * @returns {import('svelte/store').Writable<T>} store of the context.
 */
export function set(name, value) {
  return setContext(name, writable(value))
}

/**
 * Creates a getter function for the given context.
 *
 * Use this function in a parent component context module and export the value for the children to import.
 *
 * Something like this:
 *
 * ```svelte
 * <!-- List.svelte -->
 * <script lang="ts" context="module">
 *  import { get } from 'svelte-context-deeznuts'
 *  export const getActiveID = get<false|string>('activeID', false)
 * </script>
 * ```
 * ```svelte
 * then
 * <!-- Item.svelte -->
 * <script lang="ts">
 *  import { activeID } from './List.svelte'
 *  export const activeID = getActiveID() // type hints available
 * </script>
 * ```
 * @see {@link set}
 * @template T type of the context value
 * @param {string} name name of the context.
 * @returns {function():import('svelte/store').Writable<T>} store of the context.
 */
export function get(name) {
  return () => getContext(name)
}
