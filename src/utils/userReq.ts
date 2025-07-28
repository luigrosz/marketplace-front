const url = "http://localhost";
const port = 3001;

export async function getUserByUsername(username: string): Promise<any> {
  let fullUrl = `${url}:${port}/users/getUserByUsername`;
  try {
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username })
    });

    if (response.status === 500) {
      throw new Error('Internal Server Error');
    }

    return response.json();
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function createUser(username: string, password: string, phone: string): Promise<any> {
  let fullUrl = `${url}:${port}/users/create`;
  try {
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, phone })
    });

    if (!response.ok) {
      throw new Error('Internal Server Error');
    }

    return response.json();
  } catch (error) {
    return Promise.reject(error);
  }
}
