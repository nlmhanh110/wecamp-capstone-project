import server from "../server";
import mongoose from "mongoose";
import supertest from "supertest";
import Cruds from "../models/crudModel"
const invalidPhoneNumbers = [['fdsgfhsdgfjgsdhf'], ['251577354354'],['251-47-887456'], ['458-656-456255'], ['251-546-66464564'], ['251-455-6456'], ['251-8787-445468'], ['4545456'], ['jkhjkjhd@gmail.com'], ['#%^%#^%^#'], ['1232@$#$$@'], ['123hfkjhsjdfhjkds']];
const invalidEmail = [['123564897'],['hanhnguyen'],['hanhnguyen@'],['hanhnguyen@gmail'],['@%!^$@%'],['hang@gmail.c'],['hanh@g.c'],['hanh nguyen@gmail.com'],['%#@%%$@gmail'],['43242354@gmail.com'],['hanh@nguyen@gmail.com']]
const invalidLink = [['http://www.example.com/   %20here.html'],['http://www.example.com/&%26here.html'],['http://www.example.com\space%20here.html'],['/main.html'],['www.example.com/main.html'],['http:www.example.com/main.html']]

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
        // const cruds = db.collection('Cruds');

    })
    it('Able to post a new contact with valid values', async () => {
        let contact1 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-911-603566',
            email: 'info@atlanticplc.com',
            location: 'Wello Sefer, Addis Ababa',
            link: 'https://atlanticplc.com',
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let res = await req.post("/api/cruds/").send(contact1)
        expect(res.status).toBe(201)
        expect(res.body.companyName).toBe(contact1.companyName);
        expect(res.body.phone).toBe(contact1.phone);
        expect(res.body.email).toBe(contact1.email);
        expect(res.body.location).toBe(contact1.location);
        expect(res.body.link).toBe(contact1.link);
        expect(res.body.description).toBe(contact1.description);
        let insertedContact = await Cruds.findOne({ companyName: contact1.companyName })
        expect(insertedContact).toMatchObject(contact1);

    })
    it('Unable to post a new contact when leaving Company Name field empty', async () => {
        let contact1 = {
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
    it('Unable to post a new contact when leaving Phone field empty', async () => {
        let contact1 = {
            companyName: 'Atlantic IT Solutions',
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
    it('Unable to post a new contact when leaving Email field empty', async () => {
        let contact1 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-911-603566',
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
    it('Unable to post a new contact when leaving Location  field empty', async () => {
        let contact1 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-911-603566',
            email: 'info@atlanticplc.com',
            link: 'https://atlanticplc.com',
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let res = await req.post("/api/cruds/").send(contact1)
        expect(res.status).toBe(422)
        expect(res.body.message).toBe("Crud add failed");
        let insertedContact = await Cruds.findOne({ companyName: contact1.companyName })
        expect(insertedContact).toBeNull();

    })
    it('Unable to post a new contact when leaving Description field empty', async () => {
        let contact1 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-911-603566',
            email: 'info@atlanticplc.com',
            location: 'Wello Sefer, Addis Ababa',
            link: 'https://atlanticplc.com',
        }
        let res = await req.post("/api/cruds/").send(contact1)
        expect(res.status).toBe(422)
        expect(res.body.message).toBe("Crud add failed");
        let insertedContact = await Cruds.findOne({ companyName: contact1.companyName })
        expect(insertedContact).toBeNull();

    })
    it('Unable to post a new contact when leaving all fields empty', async () => {
        let contact1 = {
            companyName: '',
            phone: '',
            email: '',
            location: '',
            link: '',
            description: ''
        }
        let res = await req.post("/api/cruds/").send(contact1)
        expect(res.status).toBe(422)
        expect(res.body.message).toBe("Crud add failed");
        let insertedContact = await Cruds.findOne({ companyName: contact1.companyName })
        expect(insertedContact).toBeNull();

    })
    it('Able to post a new contact when leaving Link field empty', async () => {
        let contact1 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-911-603566',
            email: 'info@atlanticplc.com',
            location: 'Wello Sefer, Addis Ababa',
            link: '',
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let res = await req.post("/api/cruds/").send(contact1)
        expect(res.status).toBe(201)
        expect(res.body.companyName).toBe(contact1.companyName);
        expect(res.body.phone).toBe(contact1.phone);
        expect(res.body.email).toBe(contact1.email);
        expect(res.body.location).toBe(contact1.location);
        expect(res.body.link).toBe(contact1.link);
        expect(res.body.description).toBe(contact1.description);
        let insertedContact = await Cruds.findOne({ companyName: contact1.companyName })
        expect(insertedContact).toMatchObject(contact1);

    })
    test.each(invalidPhoneNumbers)('Unable to post a new contact with invalid Phone Number', async (data) => {
        let contact1 = {
            companyName: 'Atlantic IT Solutions',
            phone: data,
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
    test.each(invalidEmail)('Unable to post a new contact with invalid Email', async (data) => {
        let contact1 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-911-603566',
            email: data,
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
    test.each(invalidLink)('Unable to post a new contact with invalid Link', async (data) => {
        let contact1 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-911-603566',
            email: 'info@atlanticplc.com',
            location: 'Wello Sefer, Addis Ababa',
            link: data,
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let res = await req.post("/api/cruds/").send(contact1)
        expect(res.status).toBe(422)
        expect(res.body.message).toBe("Crud add failed");
        let insertedContact = await Cruds.findOne({ companyName: contact1.companyName })
        expect(insertedContact).toBeNull();
    })
    it('Unable to post a new contact when a Company Name already exists', async ()=>{
        let contact1 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-911-603466',
            email: 'info@atlanticplc.com',
            location: 'Wello Sefer, Addis Ababa',
            link: 'https://atlanticplc.com',
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let contact2 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-456-603566',
            email: 'hanh@gmail.com',
            location: '235 New York',
            link: 'https://hanh.com',
            description: 'A special company '
        }
        let res = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.post("/api/cruds/").send(contact2)
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud add failed");
        let insertedContact = await Cruds.findOne({ email: contact2.email })
        expect(insertedContact).toBeNull();
    })
    it('Unable to post a new contact when a Email already exists', async ()=>{
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
            phone: '251-456-603546',
            email: 'info@atlanticplc.com',
            location: '235 New York',
            link: 'https://hanh.com',
            description: 'A special company'
        }
        let res = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.post("/api/cruds/").send(contact2)
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud add failed");
        let insertedContact = await Cruds.findOne({ companyName: contact2.companyName })
        expect(insertedContact).toBeNull();
    })
    it.only('Able to post a new contact when a Phone already exists', async ()=>{
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
            phone: '251-456-603566',
            email: 'hanh@atlanticplc.com',
            location: '235 New York',
            link: 'https://hanh.com',
            description: 'A special company'
        }
        let res = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.post("/api/cruds/").send(contact2)
        expect(res2.status).toBe(201)
        expect(res2.body.companyName).toBe(contact2.companyName);
        expect(res2.body.phone).toBe(contact2.phone);
        expect(res2.body.email).toBe(contact2.email);
        expect(res2.body.location).toBe(contact2.location);
        expect(res2.body.link).toBe(contact2.link);
        expect(res2.body.description).toBe(contact2.description);
        let insertedContact = await Cruds.findOne({ companyName: contact2.companyName })
        expect(insertedContact).toMatchObject(contact2);
    })
    it.only('Able to post a new contact when a Location already exists', async ()=>{
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
            phone: '251-456-603536',
            email: 'hanh@atlanticplc.com',
            location: 'Wello Sefer, Addis Ababa',
            link: 'https://hanh.com',
            description: 'A special company'
        }
        let res = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.post("/api/cruds/").send(contact2)
        expect(res2.status).toBe(201)
        expect(res2.body.companyName).toBe(contact2.companyName);
        expect(res2.body.phone).toBe(contact2.phone);
        expect(res2.body.email).toBe(contact2.email);
        expect(res2.body.location).toBe(contact2.location);
        expect(res2.body.link).toBe(contact2.link);
        expect(res2.body.description).toBe(contact2.description);
        let insertedContact = await Cruds.findOne({ companyName: contact2.companyName })
        expect(insertedContact).toMatchObject(contact2);
    })
    it.only('Able to post a new contact when a Link already exists', async ()=>{
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
        let res = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.post("/api/cruds/").send(contact2)
        expect(res2.status).toBe(201)
        expect(res2.body.companyName).toBe(contact2.companyName);
        expect(res2.body.phone).toBe(contact2.phone);
        expect(res2.body.email).toBe(contact2.email);
        expect(res2.body.location).toBe(contact2.location);
        expect(res2.body.link).toBe(contact2.link);
        expect(res2.body.description).toBe(contact2.description);
        let insertedContact = await Cruds.findOne({ companyName: contact2.companyName })
        expect(insertedContact).toMatchObject(contact2);
    })
    it.only('Able to post a new contact when a Desciption already exists', async ()=>{
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
            phone: '251-456-643566',
            email: 'hanh@atlanticplc.com',
            location: '235 New York',
            link: 'https://hanh.com',
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let res = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.post("/api/cruds/").send(contact2)
        expect(res2.status).toBe(201)
        expect(res2.body.companyName).toBe(contact2.companyName);
        expect(res2.body.phone).toBe(contact2.phone);
        expect(res2.body.email).toBe(contact2.email);
        expect(res2.body.location).toBe(contact2.location);
        expect(res2.body.link).toBe(contact2.link);
        expect(res2.body.description).toBe(contact2.description);
        let insertedContact = await Cruds.findOne({ companyName: contact2.companyName })
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