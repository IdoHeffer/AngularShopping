export class Order{
    public constructor(
        public OrderID:number,
        public CartID:number,
        public FinalPrice:number,
        public DeliveryCityAddress:string,
        public DeliveryStreetAddress:string,
        public DeliveryDate:Date,
        public OrderDate:Date,
        public LastFourCreditCardDigits:string,
        public UserID?:number,
    ){}

}