import Stripe from "stripe";
import handler from "./libs/handler-lib";
import { calculateCost,success,failure } from "./libs/billing-lib";
// import handler from "./libs/handler-lib";
// import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event) => {
  const { storage, source } = JSON.parse(event.body);
  const amount = calculateCost(storage);
  const description = "Scratch charge";

  // Load our secret key from the  environment variables
  const stripe = new Stripe(process.env.stripeSecretKey);

  try {
    await stripe.charges.create({
    source,
    amount,
    description,
    currency: "usd"
   });
   return success({ status: true });
  } catch (e) {
    return failure({ message: e.message }); }
  });