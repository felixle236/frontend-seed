export interface IUser {
    id: string;
    roleId: string;
    firstName: string;
    lastName: string | null;
    email: string;
    avatar: string | null;
}
