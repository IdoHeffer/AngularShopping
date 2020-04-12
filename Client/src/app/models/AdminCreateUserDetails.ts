export class AdminCreateUserDetails{
    public constructor(
        public UserName?:string,
        public FirstName?:string,
        public LastName?:string,
        public Role?:string,
        public City?:string,
        public Street?:string,
        public password?:string
    ){}

}