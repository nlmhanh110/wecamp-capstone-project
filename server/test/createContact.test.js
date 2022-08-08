import server from "../server";
import mongoose from "mongoose";
import supertest from "supertest";
import Cruds from "../models/crudModel"
import data from "./data.json"

describe('POST - /api/cruds/ ', () => {
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
    it('Should post successfully a new contact with valid values', async () => {   
        let res = await req.post("/api/cruds/").send(data.create[0])
        expect(res.status).toBe(201)
        expect(res.body).toMatchObject(data.create[0]);
        let insertedContact = await Cruds.findById(res.body._id)
        expect(insertedContact).toMatchObject(data.create[0]);
    })
    it('Should fail to post a new contact when leaving Company Name field empty', async () => {
        let res = await req.post("/api/cruds/").send(data.create[1])
        expect(res.status).toBe(422)
        expect(res.body.message).toBe("Crud add failed");
        let insertedContact = await Cruds.findOne({ companyName: data.create[1].companyName })
        expect(insertedContact).toBeNull();

    })
    it('Should fail to post a new contact when leaving Phone field empty', async () => {
        let res = await req.post("/api/cruds/").send(data.create[2])
        expect(res.status).toBe(422)
        expect(res.body.message).toBe("Crud add failed");
        let insertedContact = await Cruds.findOne({ companyName: data.create[2].companyName })
        expect(insertedContact).toBeNull();

    })
    it('Should fail to post a new contact when leaving Email field empty', async () => {
        let res = await req.post("/api/cruds/").send(data.create[3])
        expect(res.status).toBe(422)
        expect(res.body.message).toBe("Crud add failed");
        let insertedContact = await Cruds.findOne({ companyName: data.create[3].companyName })
        expect(insertedContact).toBeNull();

    })
    it('Should fail to post a new contact when leaving Location field empty', async () => {
        let res = await req.post("/api/cruds/").send(data.create[4])
        expect(res.status).toBe(422)
        expect(res.body.message).toBe("Crud add failed");
        let insertedContact = await Cruds.findOne({ companyName: data.create[4].companyName })
        expect(insertedContact).toBeNull();

    })
    it('Should fail to post a new contact when leaving Description field empty', async () => {
        let res = await req.post("/api/cruds/").send(data.create[6])
        expect(res.status).toBe(422)
        expect(res.body.message).toBe("Crud add failed");
        let insertedContact = await Cruds.findOne({ companyName: data.create[6].companyName })
        expect(insertedContact).toBeNull();

    })
    it('Should fail to post a new contact when leaving all fields empty', async () => {
        let res = await req.post("/api/cruds/").send(data.create[7])
        expect(res.status).toBe(422)
        expect(res.body.message).toBe("Crud add failed");
        let insertedContact = await Cruds.findOne({ companyName: data.create[7].companyName })
        expect(insertedContact).toBeNull();

    })
    
    it('Should post successfully a new contact when leaving Link field empty', async () => {
        let res = await req.post("/api/cruds/").send(data.create[5])
        expect(res.status).toBe(201)
        expect(res.body).toMatchObject(data.create[5]);
        let insertedContact = await Cruds.findById(res.body._id)
        expect(insertedContact).toMatchObject(data.create[5]);

    })
    test.each(data.invalidString)('Should fail to post a new contact with invalid Company Name', async (invalidString) => {
        let contact1 = {
            companyName: invalidString,
            phone: '251-911-603566',
            email: 'info@atlanticplc.com',
            location: 'Wello Sefer, Addis Ababa',
            link: 'https://atlanticplc.com',
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let res = await req.post("/api/cruds/").send(contact1)
        expect(res.status).toBe(422)
        expect(res.body.message).toBe("Crud add failed");
        let insertedContact = await Cruds.findOne({ companyName: contact1.companyName })
        expect(insertedContact).toBeNull();
    })
    test.each(data.invalidPhone)('Should fail to post a new contact with invalid Phone Number', async (invalidPhone) => {
        let contact1 = {
            companyName: 'Atlantic IT Solutions',
            phone: invalidPhone,
            email: 'info@atlanticplc.com',
            location: 'Wello Sefer, Addis Ababa',
            link: 'https://atlanticplc.com',
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let res = await req.post("/api/cruds/").send(contact1)
        expect(res.status).toBe(422)
        expect(res.body.message).toBe("Crud add failed");
        let insertedContact = await Cruds.findOne({ companyName: contact1.companyName })
        expect(insertedContact).toBeNull();
    })
    test.each(data.invalidEmail)('Should fail to post a new contact with invalid Email', async (invalidEmail) => {
        let contact1 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-911-603566',
            email: invalidEmail,
            location: 'Wello Sefer, Addis Ababa',
            link: 'https://atlanticplc.com',
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let res = await req.post("/api/cruds/").send(contact1)
        expect(res.status).toBe(422)
        expect(res.body.message).toBe("Crud add failed");
        let insertedContact = await Cruds.findOne({ companyName: contact1.companyName })
        expect(insertedContact).toBeNull();
    })
    test.only.each(data.invalidLink)('Should fail to post a new contact with invalid Link', async (invalidLink) => {
        let contact1 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-911-603566',
            email: 'info@atlanticplc.com',
            location: 'Wello Sefer, Addis Ababa',
            link: invalidLink,
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let res = await req.post("/api/cruds/").send(contact1)
        expect(res.status).toBe(422)
        expect(res.body.message).toBe("Crud add failed");
        let insertedContact = await Cruds.findOne({ companyName: contact1.companyName })
        expect(insertedContact).toBeNull();
    })
    test.only.each(data.invalidString)('Should fail to post a new contact with invalid Location', async (invalidString) => {
        let contact1 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-911-603566',
            email: 'info@atlanticplc.com',
            location: invalidString,
            link: 'https://atlanticplc.com',
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let res = await req.post("/api/cruds/").send(contact1)
        expect(res.status).toBe(422)
        expect(res.body.message).toBe("Crud add failed");
        let insertedContact = await Cruds.findOne({ companyName: contact1.companyName })
        expect(insertedContact).toBeNull();
    })
    test.only.each(data.invalidString)('Should fail to post a new contact with invalid Description', async (invalidString) => {
        let contact1 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-911-603566',
            email: 'info@atlanticplc.com',
            location: 'Wello Sefer, Addis Ababa',
            link: 'https://atlanticplc.com',
            description: invalidString
        }
        let res = await req.post("/api/cruds/").send(contact1)
        expect(res.status).toBe(422)
        expect(res.body.message).toBe("Crud add failed");
        let insertedContact = await Cruds.findOne({ companyName: contact1.companyName })
        expect(insertedContact).toBeNull();
    })

    test.only.each(data.existedCompanyName)('Should fail to post a new contact when a Company Name already exists', async (existedCompanyName)=>{
        let contact2 = {
            companyName: existedCompanyName,
            phone: '251-456-603566',
            email: 'hanh@gmail.com',
            location: '235 New York',
            link: 'https://hanh.com',
            description: 'A special company '
        }
        console.log(contact2)
        let res = await req.post("/api/cruds/").send(data.create[0])
        let res2 = await req.post("/api/cruds/").send(contact2)
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud add failed");
        let insertedContact = await Cruds.findOne({ email: contact2.email })
        expect(insertedContact).toBeNull();
    })
    it('Should fail to post a new contact when a Email already exists', async ()=>{
        let contact2 = {
            companyName: 'HanhNguyen IT Solutions',
            phone: '251-456-603546',
            email: 'info@atlanticplc.com',
            location: '235 New York',
            link: 'https://hanh.com',
            description: 'A special company'
        }
        let res = await req.post("/api/cruds/").send(data.create[0])
        let res2 = await req.post("/api/cruds/").send(contact2)
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud add failed");
        let insertedContact = await Cruds.findOne({ companyName: contact2.companyName })
        expect(insertedContact).toBeNull();
    })
    it('Should post successfully a new contact when a Phone already exists', async ()=>{
        let contact2 = {
            companyName: 'HanhNguyen IT Solutions',
            phone: '251-456-603566',
            email: 'hanh@atlanticplc.com',
            location: '235 New York',
            link: 'https://hanh.com',
            description: 'A special company'
        }
        let res = await req.post("/api/cruds/").send(data.create[0])
        let res2 = await req.post("/api/cruds/").send(contact2)
        expect(res2.status).toBe(201)
        expect(res2.body).toMatchObject(contact2);
        let insertedContact = await Cruds.findById(res2.body._id)
        expect(insertedContact).toMatchObject(contact2);
    })
    it('Should post successfully a new contact when a Location already exists', async ()=>{
        let contact2 = {
            companyName: 'HanhNguyen IT Solutions',
            phone: '251-456-603536',
            email: 'hanh@atlanticplc.com',
            location: 'Wello Sefer, Addis Ababa',
            link: 'https://hanh.com',
            description: 'A special company'
        }
        let res = await req.post("/api/cruds/").send(data.create[0])
        let res2 = await req.post("/api/cruds/").send(contact2)
        expect(res2.status).toBe(201)
        expect(res2.body).toMatchObject(contact2);
        let insertedContact = await Cruds.findById(res2.body._id)
        expect(insertedContact).toMatchObject(contact2);
    })
    it('Should post successfully a new contact when a Link already exists', async ()=>{

        let contact2 = {
            companyName: 'HanhNguyen IT Solutions',
            phone: '251-456-443555',
            email: 'hanh@atlanticplc.com',
            location: '235 New York',
            link: 'https://atlanticplc.com',
            description: 'A special company'
        }
        let res = await req.post("/api/cruds/").send(data.create[0])
        let res2 = await req.post("/api/cruds/").send(contact2)
        expect(res2.status).toBe(201)
        expect(res2.body).toMatchObject(contact2);
        let insertedContact = await Cruds.findById(res2.body._id)
        expect(insertedContact).toMatchObject(contact2);
    })
    it('Should post successfully a new contact when a Desciption already exists', async ()=>{
        let contact2 = {
            companyName: 'HanhNguyen IT Solutions',
            phone: '251-456-643566',
            email: 'hanh@atlanticplc.com',
            location: '235 New York',
            link: 'https://hanh.com',
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let res = await req.post("/api/cruds/").send(data.create[0])
        let res2 = await req.post("/api/cruds/").send(contact2)
        expect(res2.status).toBe(201)
        expect(res2.body).toMatchObject(contact2);
        let insertedContact = await Cruds.findById(res2.body._id)
        expect(insertedContact).toMatchObject(contact2);
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