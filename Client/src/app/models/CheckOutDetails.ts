export class CheckOutDetails{
    public constructor(
        public CartID?:number,
        public FinalPrice?:number,
        public DeliveryCityAddress?:string,
        public DeliveryStreetAddress?:string,
        public DeliveryDate?:Date,
        public CreditCardDigits?:number
    ){}

}