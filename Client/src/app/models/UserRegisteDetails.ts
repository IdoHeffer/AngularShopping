export class UserRegisterDetails{
    public constructor(
        public UserName?:string,
        public FirstName?:string,
        public LastName?:string,
        public City?:string,
        public Street?:string,
        public password?:string,
        public confirmpassword?:string
    ){}

}