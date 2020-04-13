export class SuccessfulLoginServerResponse{
    public constructor(
        public token?:number,       
        public userType?:string,
        public id?:number,
        public userName?:string
    ){}

}