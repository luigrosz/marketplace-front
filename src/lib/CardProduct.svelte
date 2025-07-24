<script lang="ts">
  interface Product {
    id: string;
    name: string;
    category_id: number;
    user_id: number;
    price: number;
    image_url: string;
    votes: number;
    created_at: string;
    modified_at: string;
  }

  let {
    products,
  }: {
    products: Product[];
  } = $props();
</script>

<div class="products-grid">
  {#each products as product}
    <div class="product-card">
      <img src={product.image_url} alt={product.name} class="product-image" />
      <div class="product-info">
        <h3 class="product-name">{product.name}</h3>
        <p class="product-price">${product.price}</p>
        <p class="product-votes">Votes: {product.votes}</p>
      </div>
    </div>
  {/each}
</div>

<style>
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
    justify-content: center;
  }

  .product-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 15px;
    background-color: #fff;
    color: #333;
  }

  .product-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-bottom: 1px solid #eee;
  }

  .product-info {
    padding: 10px;
    text-align: center;
    width: 100%;
  }

  .product-name {
    font-size: 1.2em;
    margin: 10px 0;
    color: #007bff;
  }

  .product-price {
    font-size: 1.1em;
    font-weight: bold;
    color: #28a745;
    margin-bottom: 5px;
  }

  .product-votes {
    font-size: 0.9em;
    color: #6c757d;
  }
</style>
