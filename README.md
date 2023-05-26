
![deeznuts](./deeznuts.jpg "deeznuts")

# Introduction

Svelte Context Deeznuts is a very advanced 58 line library that solves a problem that's already been solved by the svelte standard library.

## Why?

It is often the case that we need to provide some type hinting for component contexts.

Unfortunately `getContext` does not inherit type hints from `setContext` and there is probably no easy way to fix that in the standard library without adding unnecessary complexity to the context api; and I like my standard libraries to be simple.

Some workarounds include creating separate files to define the typed contexts and importing them separately.

I don't like that, all `component.svelte`'s affairs should remain in the `component.svelte` file.

## When to use

Make sure you actually need to use the context api.

This library automatically converts your value into a `Writable<T>`.

Chances are that if you don't need a `Writable` in your context, you probably don't need the context api itself.

We may agree to disagree.

## How to use

Install with

```sh
npm i -D svelte-context-deeznuts
```

Create you parent component and set a context.

```svelte
<!-- List.svelte -->
<script lang="ts">
  import { set } from 'svelte-context-deeznuts'
  set<false | string>('activeID', false)
</script>

<ul>
  <slot />
</ul>
```

This will create your context.

Then export the getter from the module context.

```svelte
<!-- List.svelte -->
<script lang="ts" context="module">
  import { get } from 'svelte-context-deeznuts'
  export const getActiveID = get<false | string>('activeID')
</script>

<script lang="ts">
  import { set } from 'svelte-context-deeznuts'
  set<false | string>('activeID', false)
</script>

<ul>
  <slot />
</ul>
```

Once that's done create your child component.

```svelte
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
```

And to put things together:

```svelte
<!-- App.svelte -->
<script>
  import Item from './item.svelte'
  import List from './list.svelte'
</script>

<List>
  <Item>item 1</Item>
  <Item>item 2</Item>
  <Item>item 3</Item>
  <Item>item 4</Item>
  <Item>item 5</Item>
</List>
```
