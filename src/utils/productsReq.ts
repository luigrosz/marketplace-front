const url = "http://localhost";
const port = 3001;
// const routes = [users, products, auth];

export const ids_categorias = {
  Eletronicos: 1,
  Moveis: 2,
  Roupas: 3,
}

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

async function getReq(route: string): Promise<any> {
  let fullUrl = `${url}:${port}/${route}`;
  try {
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function postReq(route: string, body: any): Promise<any> {
  let fullUrl = `${url}:${port}/${route}`;
  try {
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

type ProductCategory = keyof typeof ids_categorias;

export async function products(category: ProductCategory | "Todos") {
  if (category === "Todos") {
    const result = await getReq("products");
    return result;
  }
  const result = await getReq(`products/?category=${ids_categorias[category]}`);
  return result;
}

export async function createProduct(product: Product) {
  const result = await postReq("products", product);
  return result;
}
