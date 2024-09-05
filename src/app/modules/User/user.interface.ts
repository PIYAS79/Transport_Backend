

export type User_Type = {
    email: string,
    password: string,
    role: 'SUPER' | 'ADMIN' | 'STUDENT' | 'FACULTY',
    isPasswordChanged: boolean,
    status: 'ACTIVE' | 'BLOCK' | 'EXPIRED',
    passwordChangedAt?: Date,
}