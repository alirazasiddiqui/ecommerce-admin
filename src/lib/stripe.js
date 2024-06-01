import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIP_API_KEy,{
    apiVersion: "2022-11-15",
    
});