import { User,Users } from "../../models/Users";

const user= new Users;

const UserTest:User={
    firstName:"Jimmy",
    lastName:"Grimes",
    password:"123"
}

let result:User;

describe("test users endpoint",()=>{
    beforeAll(async()=>{
        result = await user.create(UserTest);
    })

    it("create method exist",()=>{
        expect(user.create).toBeDefined();
    })
    
   it("index method exist",()=>{
        expect(user.index).toBeDefined();
    })

    it("show method exist",()=>{
        expect(user.show).toBeDefined();
    })

    it("test create method",()=>{
        expect({ firstname: result.firstName, lastname: result.lastName, password: result.password }).toEqual({ firstname: UserTest.firstName, lastname: UserTest.lastName, password: UserTest.password })
    })

    it("test index method",async()=>{
        const users = await user.index();
        expect(users).toContain(result)
    })

    it("test show method",async()=>{
        const User = await user.show(result.id as number);
        expect(User).toEqual(result);
    })
})