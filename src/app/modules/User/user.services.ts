import { Get_User_Type, User_Type } from "./user.interface"



// create user service
const Create_User_Service = async (data: Get_User_Type) => {


    console.log(data)

    return {}
}





export const User_Services = {
    Create_User_Service,
}