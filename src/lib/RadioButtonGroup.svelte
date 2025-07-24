<script lang="ts">
  type ProductCategory = "Todos" | "Roupas" | "Eletronicos" | "Moveis";

  let {
    buttons,
    changeButtonCategory,
  }: {
    buttons: ProductCategory[];
    changeButtonCategory: (category: ProductCategory) => void;
  } = $props();

  let selectedOption: ProductCategory = $state("Todos");

  function selectOption(option: ProductCategory) {
    selectedOption = option;
    changeButtonCategory(selectedOption);
  }
</script>

<div class="button-group">
  {#each buttons as option}
    <button
      class:selected={selectedOption === option}
      onclick={() => selectOption(option)}
    >
      {option}
    </button>
  {/each}
</div>

<style>
  .button-group {
    display: flex;
    justify-content: space-around;
    width: 70%;
  }

  button {
    padding: 7px 10px;
    border: 1px solid #ccc;
    background-color: #f0f0f0;
    cursor: pointer;
    border-radius: 4px;
    font-size: 16px;
  }

  button:hover {
    background-color: #e0e0e0;
  }

  button.selected {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
  }
</style>
