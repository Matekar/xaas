<script lang="ts">
  import { selected } from "$lib";
	export let node: Node;
</script>

{#if node.nodeType == 1}
	<div
		on:mouseover={function (ev) {
			ev.stopPropagation();
			this.style.backgroundColor = '#2b2b2b';
		}}
		on:mouseout={function (ev) {
			ev.stopPropagation();
			this.style.backgroundColor = '';
		}}
    on:click={function (ev) {
      ev.stopPropagation();
      ev.preventDefault();
      $selected = node;
    }}
	>
		<span style="color: cyan;">&lt;</span>
		<span style="color: tomato;">{node.nodeName}</span>
		{#if node.attributes.length > 0}
			{#each node.attributes as attr}
				<div>
					&ensp;
					<span style="color: violet;">{attr.name}</span>
					<span style="color: cyan;">=</span>
					<span style="color: lightgreen;">{'"' + attr.value + '"'}</span> <br />
				</div>
			{/each}
		{/if}
		<span style="color: cyan;">&gt;</span>
		{#if node.hasChildNodes()}
			{#each node.childNodes as childNode, index}
				<svelte:self node={childNode}/>
			{/each}
		{:else}
			{#if node.nodeValue}{node.nodeValue}{/if}
		{/if}
		<span style="color: cyan;">&lt;/</span>
		<span style="color: tomato;"
			>{node.nodeName}
			<span style="color: cyan;">&gt;</span>
		</span>
	</div>
{:else if node.nodeType == 3}
	{node.nodeValue}
{/if}

<style>
	div {
		line-height: 125%;
		border-radius: 1em;
		padding: 5px;
		font-size: 1.1rem;
		transition: background-color 0.3s;
		width: fit-content;
    cursor: pointer;
	}
</style>
