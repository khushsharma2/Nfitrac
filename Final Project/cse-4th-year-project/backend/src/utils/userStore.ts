import fs from 'fs';
import path from 'path';

const userFilePath = path.join(__dirname, '../../users.json');

interface User {
  id: number;
  email: string;
  password: string;}
export function getUsers(): User[] {
  try {
    const data = fs.readFileSync(userFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}
export function saveUsers(users: User[]): void {
  fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2));
}
