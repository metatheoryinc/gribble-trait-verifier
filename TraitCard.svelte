<script>
  import { afterUpdate } from "svelte";
  export let traitName;
  export let traitValue;

  const removeUnderscores = traitName => {
    return traitName.replace(/_/g, " ");
  };
  function extractHexFromColorTrait() {
    const hex = String(traitValue).match(/#[0-9a-zA-Z]+/);
    return hex ? hex[0] : null;
  }
  let hexCode = extractHexFromColorTrait();

  afterUpdate(() => {
    hexCode = extractHexFromColorTrait();
  });
</script>

<style>
  .trait-card {
    height: 48px;
    min-width: 235px;
    width: 235px;
    padding: 8px;
    background: #161122;
    border: 1px solid #1e1730;
    margin-top: 12px;
    display: flex;
  }
  .trait-values {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 6px;
    width: 232px;
  }
  .trait-truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 232px;
    text-align: left;
  }
  .hasColor {
    width: 175px;
  }
  p {
    margin: 0;
  }
  .seed {
    font-size: 10px;
    white-space: normal;
    overflow-wrap: break-word;
  }
  .color {
    height: 48px;
    border-radius: 4px;
    min-width: 48px;
    margin-right: 10px;
  }
</style>

<div class="trait-card">
{#if hexCode}<div class="color" style="background: {hexCode}"></div>{/if}
  <div class="trait-values">
    <p style="text-transform: uppercase; color: rgba(255,255,255,0.6)">{removeUnderscores(traitName)}</p>
  <div class="trait-truncate">
    {#if traitName === 'seed'}
      <p class="trait-truncate seed">{traitValue}</p>
    {:else}
      <p class="trait-truncate {hexCode ? 'hasColor' : ''}">{traitValue}</p>
    {/if}
  </div>
  </div>
</div>