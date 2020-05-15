export class CartData{
    public constructor(
        public CartID:number,
        public ProductID?:number,
        public picture?:string,
        public ProductName?:string,
        public Amount?:number,
        public Price?:number,
        public TotalItemPrice?:number,
        public Status?:string,
        public CartCreationDate?: Date
    ){}

}