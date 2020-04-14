export class CartData{
    public constructor(
        public CartID:number,
        public img:string,
        public ProductName:string,
        public Amount:number,
        public Price:number,
        public TotalItemPrice:number,
        public CartCreationDate: Date
    ){}

}