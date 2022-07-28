import server from "../server";
import mongoose from "mongoose";
import supertest from "supertest";
import Cruds from "../models/crudModel"

describe('GET - /api/cruds/ - /api/cruds/:id', () => {
    let req;
    beforeAll(async () => {
        const url = 'mongodb+srv://nlmhanh110:dBCPa4lpiAFHpnBF@clusterforvoteweb.rcb08.mongodb.net/?retryWrites=true&w=majority';
        try {
            await mongoose.createConnection(url,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });
            console.log("1: test database connected");
        }
        catch (error) {
            console.log(error.message);
        }
    })
    beforeEach(() => {
        req = supertest(server)
    })
    it('Should get all available contact info in database',async()=>{
        let contact1 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-911-603566',
            email: 'info@atlanticplc.com',
            location: 'Wello Sefer, Addis Ababa',
            link: 'https://atlanticplc.com',
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let contact2 = {
            companyName: 'HanhNguyen IT Solutions',
            phone: '251-456-443555',
            email: 'hanh@atlanticplc.com',
            location: '235 New York',
            link: 'https://atlanticplc.com',
            description: 'A special company'
        }
        await req.post("/api/cruds/").send(contact1)
        await req.post("/api/cruds/").send(contact2)
        let res = await req.get("/api/cruds/")
        expect(res.status).toBe(200)
        expect(Object.keys(res.body).length).toEqual(2)
        expect(res.body[0].companyName).toBe(contact1.companyName)
        expect(res.body[1].companyName).toBe(contact2.companyName)
    })
    it('Should get a contact info in detail using right ID',async()=>{
        let contact1 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-911-603566',
            email: 'info@atlanticplc.com',
            location: 'Wello Sefer, Addis Ababa',
            link: 'https://atlanticplc.com',
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.get(`/api/cruds/${res1.body._id}`)
        expect(res2.status).toBe(200)
        console.log(res2.body)
        expect(res2.body).toMatchObject(contact1)
    })
    it.only('Should not get a contact info in detail using wrong ID',async()=>{
        let contact1 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-911-603566',
            email: 'info@atlanticplc.com',
            location: 'Wello Sefer, Addis Ababa',
            link: 'https://atlanticplc.com',
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.get(`/api/cruds/${res1.body._id}ffd`)
        expect(res2.status).toBe(404)
        expect(res2.body.message).toBe("No result found");
    })
    afterEach(async () => {
        await Cruds.deleteMany();
        server.close()
    });
    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    })
})