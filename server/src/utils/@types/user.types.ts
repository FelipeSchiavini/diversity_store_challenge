import { Role } from "./role.types";

export interface TokenUser {
    role: Role
    sub: string
    login: string
}
