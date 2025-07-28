<script lang="ts">
  import CardProduct from "./lib/CardProduct.svelte";
  import RadioButtonGroup from "./lib/RadioButtonGroup.svelte";
  import { getProducts, voteProduct } from "./utils/productsReq";
  import RegisterAndLogin from "./lib/RegisterAndLogin.svelte";
  import { verifyLogin } from "./utils/authReq";

  type ProductCategory = "Todos" | "Roupas" | "Eletronicos" | "Moveis";
  const categoryOptions: ProductCategory[] = [
    "Todos",
    "Eletronicos",
    "Roupas",
    "Moveis",
  ];

  let promiseProducts = $state(getProducts("Todos"));
  let category: ProductCategory = $state("Todos");
  let searchQuery: string = $state("");
  let isLoggedIn = $state(false);
  let isLoggedInButton = $state(true);
  let showModal = $state(false);

  let filteredProducts = $derived(
    promiseProducts.then((products) => {
      return products;
    }),
  );

  async function ifLogin() {
    let response = await verifyLogin();
    isLoggedIn = response;
  }

  ifLogin();

  function getCookie(name: string) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
    }
    return null;
  }

  function removeCookies() {
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    isLoggedIn = false;
  }

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
</script>

<main>
  <div id="header">
    <h1 id="title">MARKETPLACE</h1>
    {#if !isLoggedIn}
      <button
        id="login-button"
        class="log-buttons"
        onclick={() => (showModal = true)}>Login</button
      >
    {/if}
    {#if isLoggedIn}
      <button id="logout-button" class="log-buttons" onclick={removeCookies}
        >Logout</button
      >
    {/if}
  </div>

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
    <button onclick={performSearch} id="search-button" class="search-buttons"
      >Pesquisar</button
    >
    <button
      onclick={() => (searchQuery = "")}
      id="clear-search-button"
      class="search-buttons">Limpar</button
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
