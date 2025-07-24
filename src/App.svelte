<script lang="ts">
  import CardProduct from "./lib/CardProduct.svelte";
  import RadioButtonGroup from "./lib/RadioButtonGroup.svelte";
  import { products } from "./utils/productsReq";

  type ProductCategory = "Todos" | "Roupas" | "Eletronicos" | "Moveis";
  const categoryOptions: ProductCategory[] = [
    "Todos",
    "Eletronicos",
    "Roupas",
    "Moveis",
  ];

  let promiseProducts = $state(products("Todos"));

  function handleCategoryChange(category: ProductCategory) {
    promiseProducts = products(category);
  }
</script>

<main>
  <h1 id="title">MARKETPLACE</h1>

  <div id="buttons-container">
    <RadioButtonGroup
      buttons={categoryOptions}
      changeButtonCategory={handleCategoryChange}
    />
  </div>

  <div id="products-container">
    {#await promiseProducts}
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
</style>
