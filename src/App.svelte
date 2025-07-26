<script lang="ts">
  import CardProduct from "./lib/CardProduct.svelte";
  import RadioButtonGroup from "./lib/RadioButtonGroup.svelte";
  import { getProducts, voteProduct } from "./utils/productsReq";
  import RegisterAndLogin from "./lib/RegisterAndLogin.svelte";

  type ProductCategory = "Todos" | "Roupas" | "Eletronicos" | "Moveis";
  const categoryOptions: ProductCategory[] = [
    "Todos",
    "Eletronicos",
    "Roupas",
    "Moveis",
  ];

  // interface Product {
  //   id: number;
  //   name: string;
  //   category_id: number;
  //   user_id: number;
  //   price: number;
  //   image_url: string;
  //   votes: number;
  //   created_at: string;
  //   modified_at: string;
  // }

  // ESTADOS
  let promiseProducts = $state(getProducts("Todos"));
  let category: ProductCategory = $state("Todos");
  let searchQuery: string = $state("");
  let isLoggedIn = $state(false);
  let showModal = $state(false);

  let filteredProducts = $derived(
    promiseProducts.then((products) => {
      return products;
    }),
  );

  function handleCategoryChange(categoryChosen: ProductCategory) {
    category = categoryChosen;
    promiseProducts = getProducts(categoryChosen);
  }

  function performSearch() {
    promiseProducts = getProducts(category, searchQuery);
    searchQuery = "";
  }

  async function handleVote(productId: number, direction: string) {
    await voteProduct(productId, direction);
  }

  function modalLogin() {
    showModal = true;
  }
</script>

<main>
  <div id="header">
    <h1 id="title">MARKETPLACE</h1>
    {#if !isLoggedIn}
      <button id="login-button" onclick={modalLogin}>Login</button>
    {/if}
  </div>

  <!-- Modal for login and registration -->
  <RegisterAndLogin bind:showModal></RegisterAndLogin>

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
    <button onclick={() => (searchQuery = "")} id="clear-search-button"
      >Limpar</button
    >
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
      <CardProduct {products} onVote={handleVote} />
    {/await}
  </div>
</main>
