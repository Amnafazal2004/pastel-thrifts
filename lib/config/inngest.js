//inngest is used to sync the requests 
//basically whenever a user logs in then we dont have to manually sync the requests like GET type
//this is all done by inngest 
import UserModel from "@/models/UserModel";
import { Inngest } from "inngest";
import ConnectDB from "./db";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "pastelthrifts-next" });

//Inngest function to save user data to a database
export const syncUserCreation = inngest.createFunction(
    {
        id:'sync_user_from_clerk'
    },
    {
        event: 'clerk/user.created'
    },
    //the user will enter this data and then it will be saved into the database
    async({event})=>{
        const {id,username,image_url,email_addresses} = event.data
        const userData = {
            id: id,
            email: email_addresses[0].email_address,
            name: username,
            image_url:image_url
        }
        await ConnectDB()
        await UserModel.create(userData)
    }
)

//Inngest function to update user data to a database
export const syncUserUpdation = inngest.createFunction(
    {
        id:'update_user_from_clerk'
    },
    {
        event: 'clerk/user.updated'
    },
    //the user will enter this data and then it will be saved into the database
    async({event})=>{
        const {id,username,image_url,email_addresses} = event.data
        const userData = {
            id: id,
            email: email_addresses[0].email_address,
            name: username,
            image_url:image_url
        }
        await ConnectDB()
        await UserModel.findByIdAndUpdate(id,userData)
    }
)

//Inngest function to delete user data from a database
export const syncUserDeletion = inngest.createFunction(
    {
        id:'delete_user_from_clerk'
    },
    {
        event: 'clerk/user.deleted'
    },
    //the user will enter this data and then it will be saved into the database
    async({event})=>{
       const {id} = event.data
        await ConnectDB()
        await UserModel.findByIdAndDelete(id)
    }
)