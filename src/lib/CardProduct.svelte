<script lang="ts">
  interface Product {
    id: number;
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
    onUpvote,
    onDownvote,
  }: {
    products: Product[];
    onUpvote: (productId: number) => void;
    onDownvote: (productId: number) => void;
  } = $props();
</script>

<div class="products-grid">
  {#each products as product}
    <div class="product-card">
      <img src={product.image_url} alt={product.name} class="product-image" />
      <div class="product-info">
        <h3 class="product-name">{product.name}</h3>
        <p class="product-price">R$ {product.price}</p>
        <div class="vote-controls">
          <button
            class="vote-button upvote"
            onclick={() => onUpvote(product.id)}
          >
            ▲
          </button>
          <p class="product-votes">Votes: {product.votes}</p>
          <button
            class="vote-button downvote"
            onclick={() => onDownvote(product.id)}
          >
            ▼
          </button>
        </div>
      </div>
    </div>
  {/each}
</div>

<style>
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 50px;
    padding: 20px;
    margin-top: 15px;
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

  .vote-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
  }

  .vote-button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 16px;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .vote-button:hover {
    background-color: #0056b3;
  }

  .product-votes {
    font-size: 0.9em;
    color: #6c757d;
    min-width: 80px; /* Ensure enough space for votes */
  }
</style>
