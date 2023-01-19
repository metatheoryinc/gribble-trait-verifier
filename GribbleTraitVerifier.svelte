<script>
  import generateGribble_v1 from "./gribbleTraitVerifier_v1.js";
  import algoData_v1 from "./algoData_v1.js";
  import TraitCard from "./TraitCard.svelte";
  import TooltipIcon from "./TooltipIcon.svelte";

  let seed = "123456789";
  let eggLevel = 1;
  let gribblePrimaryTraits;
  let gribbleSecondaryTraits;
  let gribble;

  function handleSeedButtonClick() {
    gribble = null;
    gribblePrimaryTraits = null;
    gribbleSecondaryTraits = null;
    try {
      gribble = generateGribble_v1(seed, eggLevel, algoData_v1);
      gribblePrimaryTraits = Object.entries(gribble.primary).map(item => ({
        traitName: item[0],
        traitValue: item[1]
      }));
      gribbleSecondaryTraits = Object.entries(gribble.secondary).map(item => {
        const isTraitBoolean = typeof item[1] === "boolean";
        let traitValue = item[1];
        if (isTraitBoolean) {
          traitValue = item[1] ? "Yes" : "No";
        }
        return {
          traitName: item[0],
          traitValue: traitValue
        };
      });
    } catch (error) {
      alert(error);
    }
  }
</script>

<style>
  @font-face {
    font-family: "Resolve Sans";
    src: url("./fonts/Resolve-Regular.woff2");
  }

  @font-face {
    font-family: "Resolve Light";
    src: url("./fonts/Resolve-Light.otf");
  }

  main {
    font-family: "Resolve Sans", sans-serif;
    text-align: center;
    background: #110d1b;
    padding: 0 8px;
    min-height: 100%;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
  }

  h1 {
    margin-top: 50px;
  }

  h3 {
    margin-top: 30px;
  }

  button {
    background: #ff3c23;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 2px;
    cursor: pointer;
    width: 190px;
    font-family: "Resolve Sans", sans-serif;
    transition: background-color 300ms ease-in-out;
  }

  button:hover {
    background-color: #ff674d;
  }

  .bold {
    font-weight: bold;
  }

  .margin-top {
    margin-top: 12px;
  }

  .margin-bottom {
    margin-bottom: 8px;
  }

  .margin-bottom-40 {
    margin-bottom: 40px;
  }

  .white-60 {
    color: rgba(255, 255, 255, 0.6);
  }

  .input-group {
    width: 400px;
    max-width: 100%;
  }

  .input-group input {
    width: calc(100% - 32px);
    padding: 16px;
    background: #1e1730;
    border: 1px solid #342853;
    color: white;
    border-radius: 4px;
    margin-top: 8px;
    font-family: "Resolve Sans", sans-serif;
  }

  .input-group input::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  .text-input {
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  .divider {
    background-color: #1e1730;
    height: 3px;
    width: 100%;
    margin-top: 30px;
  }

  .traits {
    height: 100%;
    width: 100%;
    max-width: 540px;
  }

  .traits-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .tooltip-wrapper {
    padding-top: 12px;
    position: relative;
  }

  .secondary-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }

  .tooltip {
    position: absolute;
    background: #110d1b;
    transition: 0.3s opacity ease-in-out;
    display: flex;
    visibility: hidden;
    opacity: 0;
  }

  .tooltip p {
    margin: 0;
  }

  .tooltip .tooltip-title {
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 14px;
  }

  .tooltip-text {
    font-family: "Resolve Light", sans-serif;
    font-weight: 350;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
  }

  .tooltip-wrapper:hover .tooltip {
    opacity: 1;
    height: auto;
    border: 1px solid rgba(255, 255, 255, 0.1);
    left: 0;
    width: 360px;
    max-width: calc(100vw - 44px);
    padding: 16px;
    visibility: visible;

    flex-direction: column;
    align-items: start;
    justify-content: start;
    text-align: start;
    border-radius: 4px;
  }

  @media (max-width: 1024px) {
    .tooltip-wrapper:hover .tooltip {
      left: initial;
      right: -12px;
    }
  }

  @media (max-width: 768px) {
    .input-group input {
      max-width: calc(100% - 32px);
    }

    .traits-container {
      flex-wrap: nowrap;
      overflow-x: auto;
      justify-content: start;
      gap: 5px;
    }
  }

  @media (max-width: 360px) {
    .tooltip-wrapper:hover .tooltip {
      right: 0;
    }
  }
</style>

<main>
	<h1>Gribble Trait Verifier</h1>
  <div class="input-group">
    <div class="margin-bottom text-input">
      <span class="bold white-60">Egg Level </span>
      <input type="number" bind:value={eggLevel} min=1 max=5>
    </div>
    <div class="margin-bottom text-input">
      <span class="bold white-60">Seed</span>
      <input type="text" placeholder="Enter a seed" bind:value={seed}>
    </div>
  </div>
  <button on:click={handleSeedButtonClick} class="margin-top">Generate Traits From Seed</button>
  <div class="traits">
  {#if gribble}
    <div class="divider"></div>
    <h3>Primary Gribble Traits</h3>
    <div class="traits-container margin-bottom">
    {#each gribblePrimaryTraits as trait}
      <TraitCard traitName={trait.traitName} traitValue={trait.traitValue} />
    {/each}
    </div>
    <div class="secondary-wrapper">
    <h3>Secondary Gribble Traits</h3>
    <div class="tooltip-wrapper"><TooltipIcon/>
      <div class="tooltip">
        <p class="tooltip-title">Secondary Traits</p>
        <p class="tooltip-text">These traits define details of your Gribble that aren't shown in the NFT metadata.</p>
      </div>
    </div>
    </div>
    <div class="traits-container margin-bottom-40">
    {#each gribbleSecondaryTraits as trait}
      <TraitCard traitName={trait.traitName} traitValue={trait.traitValue} />
    {/each}
    </div>
  {/if}
  </div>
</main>