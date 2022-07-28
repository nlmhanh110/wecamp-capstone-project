import server from "../server";
import mongoose from "mongoose";
import supertest from "supertest";
import Cruds from "../models/crudModel"

describe('DELETE - /api/cruds/:id', () => {
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
    it('Should delete a contact info in detail using right ID',async()=>{
        let contact1 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-911-603566',
            email: 'info@atlanticplc.com',
            location: 'Wello Sefer, Addis Ababa',
            link: 'https://atlanticplc.com',
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.delete(`/api/cruds/${res1.body._id}`)
        expect(res2.status).toBe(200)
        expect(res2.body.message).toBe("Crud deleted");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toBeNull;
    })
    it('Should not delete a contact info in detail using wrong ID',async()=>{
        let contact1 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-911-603566',
            email: 'info@atlanticplc.com',
            location: 'Wello Sefer, Addis Ababa',
            link: 'https://atlanticplc.com',
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.delete(`/api/cruds/${res1.body._id}ffd`)
        expect(res2.status).toBe(404)
        expect(res2.body.message).toBe("Crud not found");
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