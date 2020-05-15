export class UpdateProductModel{
    public constructor(
        public ProductID?:number,
        public ProductName?:string,
        public CategoryID?:number,
        public Price?:number,
        public picture?:string,
        public Amount?:number
    ){}

}