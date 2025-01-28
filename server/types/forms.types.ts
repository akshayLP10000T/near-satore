export interface CreateUserData{
    email: string;
    password: string;
    fullName: {
        firstName: string;
        lastName: string | null;
    };
}