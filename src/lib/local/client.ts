import { User } from "../../types/user";

class LocalClient {
  getUser(): { data: User | null, error?: string } {
    const client = localStorage.getItem('user')!

    if (!client) {
      return { data: null, error: 'no user found' }
    }

    const user = JSON.parse(client) as User;

    if (user !== null) {
      return { data: user };
    }
    return { data: null, error: 'no user found' }
  }
  addUser(values: User): void {
    localStorage.setItem('user', JSON.stringify(values))
  }
  removeUser(): void {
    localStorage.setItem('user', 'null')
  }
}

export const localClient = new LocalClient();