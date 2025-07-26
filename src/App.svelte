<script lang="ts">
  import CardProduct from "./lib/CardProduct.svelte";
  import RadioButtonGroup from "./lib/RadioButtonGroup.svelte";
  import { getProducts } from "./utils/productsReq";

  type ProductCategory = "Todos" | "Roupas" | "Eletronicos" | "Moveis";
  const categoryOptions: ProductCategory[] = [
    "Todos",
    "Eletronicos",
    "Roupas",
    "Moveis",
  ];

  // interface Product {
  //   id: string;
  //   name: string;
  //   category_id: number;
  //   user_id: number;
  //   price: number;
  //   image_url: string;
  //   votes: number;
  //   created_at: string;
  //   modified_at: string;
  // }

  let promiseProducts = $state(getProducts("Todos"));
  let category: ProductCategory = $state("Todos");
  let searchQuery: string = $state("");

  let filteredProducts = $derived(
    promiseProducts.then((products) => {
      return products;
    }),
  );

  function handleCategoryChange(categoryChosen: ProductCategory) {
    category = categoryChosen;
    promiseProducts = getProducts(categoryChosen);
  }

  function clearSearch() {
    searchQuery = "";
  }

  function performSearch() {
    promiseProducts = getProducts(category, searchQuery);
  }
</script>

<main>
  <h1 id="title">MARKETPLACE</h1>

  <div id="search-container">
    <input
      type="text"
      placeholder="Search products..."
      bind:value={searchQuery}
      id="search-input"
      onkeypress={(e) => {
        if (e.key === "Enter") {
          performSearch();
        }
      }}
    />
    <button onclick={performSearch} id="search-button">Pesquisar</button>
    <button onclick={clearSearch} id="clear-search-button">Limpar</button>
  </div>

  <div id="buttons-container">
    <RadioButtonGroup
      buttons={categoryOptions}
      changeButtonCategory={handleCategoryChange}
    />
  </div>

  <div id="products-container">
    {#await filteredProducts}
      <p>Loading...</p>
    {:then products}
      <CardProduct {products} />
    {/await}
  </div>
</main>

<style>
  #title {
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
  }
  #buttons-container {
    display: flex;
    text-decoration: none;
    justify-content: center;
    margin: 0px;
  }

  #search-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    gap: 10px;
  }

  #search-input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 50%;
    font-size: 16px;
  }

  #search-button,
  #clear-search-button {
    padding: 10px 15px;
    border: 1px solid #007bff;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }

  #clear-search-button {
    background-color: #f8f9fa;
    color: #212529;
    border-color: #ccc;
  }

  #search-button:hover {
    background-color: #0056b3;
  }

  #clear-search-button:hover {
    background-color: #e2e6ea;
  }
</style>
