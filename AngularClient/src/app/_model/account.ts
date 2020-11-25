import { Role } from './role'

export class Account {
    username: string;
    accountType: Role;
    token?: string
}