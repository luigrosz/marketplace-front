const url = "http://localhost";
const port = 3001;
// const routes = [users, products, auth];


export async function login(username: string, password: string): Promise<any> {
  let fullUrl = `${url}:${port}/auth`;
  try {
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error === '401') {
      console.log("Invalid credentials");
    }
    console.error("Error logging in");
    return Promise.reject(error);
  }
}
