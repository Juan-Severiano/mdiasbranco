import { User } from "../../types/user";

class LocalClient {
  getUser(): { data: User, error?: string } {
    const client = localStorage.getItem('user')!

    const user = JSON.parse(client) as User;

    return { data: user };
  }
  addUser(values: User): void {
    localStorage.setItem('user', JSON.stringify(values))
  }
  removeUser(): void {
    localStorage.setItem('user', 'null')
  }
}

export const localClient = new LocalClient();