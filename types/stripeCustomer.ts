export interface StripeCustomer{
    id: number; // int AI PK
    userId: string; // varchar(36)
    stripeCustomerId: string; // varchar(255)
    createdAt: string; // datetime
    updatedAt: string; // datetime
};
