import server from "../server";
import mongoose from "mongoose";
import supertest from "supertest";
import Cruds from "../models/crudModel"
const invalidPhoneNumbers = [['fdsgfhsdgfjgsdhf'],['251-47-887456'], ['458-656-456255'], ['251-546-66464564'], ['251-455-6456'], ['251-8787-445468'], ['4545456'], ['jkhjkjhd@gmail.com'], ['#%^%#^%^#'], ['1232@$#$$@'], ['123hfkjhsjdfhjkds']];
const invalidEmail = [['123564897'],['hanhnguyen'],['hanhnguyen@'],['hanhnguyen@gmail'],['@%!^$@%'],['hang@gmail.c'],['hanh@g.c'],['hanh nguyen@gmail.com'],['%#@%%$@gmail'],['hanh@nguyen@gmail.com'],['abc#def@mail.com'],['abc.def@mail..com'],['.abc@mail.com'],['abc.def@mail..com']]
const invalidLink = [['http://www.example.com/   %20here.html'],['http://www.example.com/&%26here.html'],['http://www.example.com\space%20here.html'],['/main.html'],['www.example.com/main.html'],['http:www.example.com/main.html'],['jkhjkjhd@gmail.com'], ['#%^%#^%^#'], ['1232@$#$$@'], ['251577354354']]
const invalidString=[['         '],['#$$&#^&$^&^'],['4786574687'],['589347*#&*&(#'],['       77847&*(&*&']]

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
    it('Should post a new contact with valid values', async () => {
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
        expect(res.body).toMatchObject(contact1);
        let insertedContact = await Cruds.findById(res.body._id)
        expect(insertedContact).toMatchObject(contact1);

    })
    it('Should not post a new contact when leaving Company Name field empty', async () => {
        let contact1 = {
            companyName:'',
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
    it('Should not post a new contact when leaving Phone field empty', async () => {
        let contact1 = {
            companyName: 'Atlantic IT Solutions',
            email: 'info@atlanticplc.com',
            location: 'Wello Sefer, Addis Ababa',
            phone:'',
            link: 'https://atlanticplc.com',
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let res = await req.post("/api/cruds/").send(contact1)
        expect(res.status).toBe(422)
        expect(res.body.message).toBe("Crud add failed");
        let insertedContact = await Cruds.findOne({ companyName: contact1.companyName })
        expect(insertedContact).toBeNull();

    })
    it('Should not post a new contact when leaving Email field empty', async () => {
        let contact1 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-911-603566',
            location: 'Wello Sefer, Addis Ababa',
            email:'',
            link: 'https://atlanticplc.com',
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let res = await req.post("/api/cruds/").send(contact1)
        expect(res.status).toBe(422)
        expect(res.body.message).toBe("Crud add failed");
        let insertedContact = await Cruds.findOne({ companyName: contact1.companyName })
        expect(insertedContact).toBeNull();

    })
    it('Should not post a new contact when leaving Location  field empty', async () => {
        let contact1 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-911-603566',
            email: 'info@atlanticplc.com',
            location:'',
            link: 'https://atlanticplc.com',
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let res = await req.post("/api/cruds/").send(contact1)
        expect(res.status).toBe(422)
        expect(res.body.message).toBe("Crud add failed");
        let insertedContact = await Cruds.findOne({ companyName: contact1.companyName })
        expect(insertedContact).toBeNull();

    })
    it('Should not post a new contact when leaving Description field empty', async () => {
        let contact1 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-911-603566',
            email: 'info@atlanticplc.com',
            location: 'Wello Sefer, Addis Ababa',
            link: 'https://atlanticplc.com',
            description:''
        }
        let res = await req.post("/api/cruds/").send(contact1)
        expect(res.status).toBe(422)
        expect(res.body.message).toBe("Crud add failed");
        let insertedContact = await Cruds.findOne({ companyName: contact1.companyName })
        expect(insertedContact).toBeNull();

    })
    it('Should not post a new contact when leaving all fields empty', async () => {
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
    
    it.only('Should post a new contact when leaving Link field empty', async () => {
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
        expect(res.body).toMatchObject(contact1);
        let insertedContact = await Cruds.findById(res.body._id)
        expect(insertedContact).toMatchObject(contact1);

    })
    test.each(invalidString)('Should not post a new contact with invalid Company Name', async (data) => {
        let contact1 = {
            companyName: data,
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
    test.each(invalidPhoneNumbers)('Should not post a new contact with invalid Phone Number', async (data) => {
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
    test.each(invalidEmail)('Should not post a new contact with invalid Email', async (data) => {
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
    test.each(invalidLink)('Should not post a new contact with invalid Link', async (data) => {
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
    test.each(invalidString)('Should not post a new contact with invalid Location', async (data) => {
        let contact1 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-911-603566',
            email: 'info@atlanticplc.com',
            location: data,
            link: 'https://atlanticplc.com',
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let res = await req.post("/api/cruds/").send(contact1)
        expect(res.status).toBe(422)
        expect(res.body.message).toBe("Crud add failed");
        let insertedContact = await Cruds.findOne({ companyName: contact1.companyName })
        expect(insertedContact).toBeNull();
    })
    test.each(invalidString)('Should not post a new contact with invalid Description', async (data) => {
        let contact1 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-911-603566',
            email: 'info@atlanticplc.com',
            location: 'Wello Sefer, Addis Ababa',
            link: 'https://atlanticplc.com',
            description: data
        }
        let res = await req.post("/api/cruds/").send(contact1)
        expect(res.status).toBe(422)
        expect(res.body.message).toBe("Crud add failed");
        let insertedContact = await Cruds.findOne({ companyName: contact1.companyName })
        expect(insertedContact).toBeNull();
    })

    it('Should not post a new contact when a Company Name already exists', async ()=>{
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
    it('Should fail to post a new contact using an already exist Company Name but in lowerCase/Upper Case', async ()=>{
        let contact1 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-911-603466',
            email: 'info@atlanticplc.com',
            location: 'Wello Sefer, Addis Ababa',
            link: 'https://atlanticplc.com',
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let contact2 = {
            companyName: 'atlantic it solutions',
            phone: '251-456-603566',
            email: 'hanh@gmail.com',
            location: '235 New York',
            link: 'https://hanh.com',
            description: 'A special company '
        }
        let contact3 = {
            companyName: 'ATLANTIC IT SOLUTIONS',
            phone: '251-456-603566',
            email: 'hanh@gmail.com',
            location: '235 New York',
            link: 'https://hanh.com',
            description: 'A special company '
        }
        await req.post("/api/cruds/").send(contact1)
        let res1 = await req.post("/api/cruds/").send(contact2)
        let res2 = await req.post("/api/cruds/").send(contact3)
        expect(res1.status).toBe(422)
        expect(res1.body.message).toBe("Crud add failed");
        let insertedContact = await Cruds.findOne({ email: contact2.email })
        expect(insertedContact).toBeNull();
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud add failed");
        let insertedContact2 = await Cruds.findOne({ email: contact3.email })
        expect(insertedContact2).toBeNull();
    })
    it('Should not post a new contact when a Email already exists', async ()=>{
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
    it('Should fail to post a new contact using an already existed Email but in lowerCase/Upper Case', async ()=>{
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
            email: 'Info@atlanticplc.com',
            location: '235 New York',
            link: 'https://hanh.com',
            description: 'A special company'
        }
        let contact3 = {
            companyName: 'HanhMy IT Solutions',
            phone: '251-456-603546',
            email: 'INFO@atlanticplc.com',
            location: '235 New York',
            link: 'https://hanh.com',
            description: 'A special company'
        }
        await req.post("/api/cruds/").send(contact1)
        let res1 = await req.post("/api/cruds/").send(contact2)
        let res2 = await req.post("/api/cruds/").send(contact3)
        expect(res1.status).toBe(422)
        expect(res1.body.message).toBe("Crud add failed");
        let insertedContact1 = await Cruds.findOne({ companyName: contact2.companyName })
        expect(insertedContact1).toBeNull();
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud add failed");
        let insertedContact2 = await Cruds.findOne({ companyName: contact3.companyName })
        expect(insertedContact2).toBeNull();
    })
    it('Should post a new contact when a Phone already exists', async ()=>{
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
        expect(res2.body).toMatchObject(contact2);
        let insertedContact = await Cruds.findById(res.body._id)
        expect(insertedContact).toMatchObject(contact2);
    })
    it('Should post a new contact when a Location already exists', async ()=>{
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
        expect(res2.body).toMatchObject(contact2);
        let insertedContact = await Cruds.findById(res.body._id)
        expect(insertedContact).toMatchObject(contact2);
    })
    it('Should post a new contact when a Link already exists', async ()=>{
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
        expect(res2.body).toMatchObject(contact2);
        let insertedContact = await Cruds.findById(res.body._id)
        expect(insertedContact).toMatchObject(contact2);
    })
    it('Should post a new contact when a Desciption already exists', async ()=>{
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
        expect(res2.body).toMatchObject(contact2);
        let insertedContact = await Cruds.findById(res.body._id)
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