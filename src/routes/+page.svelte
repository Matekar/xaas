<script>
	// @ts-nocheck
	import { xmlp, xmlContent, selected } from '$lib/index';
	import { XML } from '$lib/xmlAPI';
  import XMLNode from './XMLNode.svelte';

  let newAttrNameInput;
  let newNodeNameInput;
</script>

<article>
{#if $xmlp}
  <!-- <pre>{$xmlContent}</pre>
  {XML.modifyNodeAttribute(XML.findNodeByPath(get(xmlp).document, "//breakfast_menu/food[3]"), "name", "TEST")}
  <pre>{XML.serialize(get(xmlp))}</pre> -->

  <XMLNode node={$xmlp.document.firstChild}/>
  {#if $selected}
  <div id="modForm" >
    <h2 style="align-self: left; width: 90%;">Node name: {$selected.nodeName}</h2>
    {#if $selected.childNodes.length === 1 && $selected.childNodes[0].nodeType === 3}
      <input type="text" value={$selected.textContent} on:change={
        (ev) => {
          ev.preventDefault();
          XML.modifyNodeText($selected, ev.target.value);
          $xmlp = $xmlp;
        }
      }>
    {/if}
    <input type="button" value="Delete selected" on:click={
      (ev) => {
        ev.preventDefault();
        XML.deleteNode($selected);
        $selected = undefined;
        $xmlp = $xmlp;
      } 
    }>
    <h2 style="align-self: left; width: 90%;">Attributes: </h2>
    {#each $selected.attributes as attr}
      <div class="attrRow">
        <h3>{attr.name}&nbsp;=</h3>
        <input type="text" value={attr.value} on:change={
          (ev) => {
            ev.preventDefault();
            XML.modifyNodeAttribute($selected, attr.name, ev.target.value);
            $xmlp = $xmlp;
          }
        }>
        <input type="button" value="Remove attribute" on:click={
          (ev) => {
            ev.preventDefault();
            XML.removeNodeAttribute($selected, attr.name);
            $xmlp = $xmlp;
          }
        }>
      </div>
    {/each}
    <div class="attrRow">
      <input type="text" id="newAttrName" bind:this={newAttrNameInput}>
      <input type="button" value="Add attribute" on:click={
        (ev) => {
          ev.preventDefault();
          XML.modifyNodeAttribute($selected, newAttrNameInput.value, "initial");
          $xmlp = $xmlp;
          $selected = $selected;
        }
      }>
    </div>
    <h2 style="align-self: left; width: 90%;">Child nodes: </h2>
    {#each $selected.childNodes as childNode}
      {#if childNode.nodeType === 1}
        <div class="nodeRow">
          <h3>{childNode.nodeName}</h3>
          <input type="button" value="Select" on:click={() => $selected = childNode}>
          <input type="button" value="Remove Node" on:click={
            (ev) => {
              ev.preventDefault();
              XML.deleteNode(childNode);
              $xmlp = $xmlp;
              $selected = $selected;
            }
          }>
        </div>
      {/if}
    {/each}
    <div class="attrRow">
      <input type="text" id="newNodeName" bind:this={newNodeNameInput}>
      <input type="button" value="Append node" on:click={
        (ev) => {
          ev.preventDefault();
          const created = XML.createNode($xmlp.document, $selected, newNodeNameInput.value);
          created.textContent = "initial";
          $xmlp = $xmlp;
        }
      }>
    </div>
  </div>
  {/if}
{/if}
</article>

<style>
  article {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
  }

  div#modForm {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 0.5rem 0;
    align-items: center;
  }

  div.attrRow {
    width: 90%;
    display: flex;
    gap: 0.5rem;
    align-items:center;
    justify-content:space-evenly;
  }

  div.nodeRow {
    width: 90%;
    display: grid;
    grid-template-columns: 0.75fr 1.5fr 1.5fr;
    gap: 0.25rem;
    align-items: center;
  }
</style>
