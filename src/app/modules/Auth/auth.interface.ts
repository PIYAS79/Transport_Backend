



export type Get_Login_Type = {
    email: string,
    password: string,
}

export type Get_Change_Password_Type = {
    new_password: string,
    old_password: string,
}
export type Get_Reset_Password_Type = {
    new_password: string,
    email: string,
}