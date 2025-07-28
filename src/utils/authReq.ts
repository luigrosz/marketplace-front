const url = "http://localhost";
const port = 3001;

export async function login(username: string, password: string): Promise<any> {
  let fullUrl = `${url}:${port}/auth/login`;
  try {
    const response = await fetch(fullUrl, {
      method: 'POST',
      credentials: 'include',
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
    return Promise.reject(error);
  }
}

export async function verifyLogin() {
  let fullUrl = `${url}:${port}/auth/me`;
  try {
    let response = await fetch(fullUrl, {
      credentials: 'include'
    });
    let data = await response.json();
    return data.loggedIn;
  } catch (e) {
    return false;
  }
}
