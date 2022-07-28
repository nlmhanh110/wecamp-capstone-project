import server from "../server";
import mongoose from "mongoose";
import supertest from "supertest";
import Cruds from "../models/crudModel"
const invalidPhoneNumbers = [['fdsgfhsdgfjgsdhf'],['251-47-887456'], ['458-656-456255'], ['251-546-66464564'], ['251-455-6456'], ['251-8787-445468'], ['4545456'], ['jkhjkjhd@gmail.com'], ['#%^%#^%^#'], ['1232@$#$$@'], ['123hfkjhsjdfhjkds']];
const invalidEmail = [['123564897'],['hanhnguyen'],['hanhnguyen@'],['hanhnguyen@gmail'],['@%!^$@%'],['hang@gmail.c'],['hanh@g.c'],['hanh nguyen@gmail.com'],['%#@%%$@gmail'],['43242354@gmail.com'],['hanh@nguyen@gmail.com']]
const invalidLink = [['http://www.example.com/   %20here.html'],['http://www.example.com/&%26here.html'],['http://www.example.com\space%20here.html'],['/main.html'],['www.example.com/main.html'],['http:www.example.com/main.html'],['jkhjkjhd@gmail.com'], ['#%^%#^%^#'], ['1232@$#$$@'], ['251577354354']]
const invalidString=[['         '],['#$$&#^&$^&^'],['4786574687'],['589347*#&*&(#'],['       77847&*(&*&']]
const contact1 = {
    companyName: 'Atlantic IT Solutions',
    phone: '251-911-603566',
    email: 'info@atlanticplc.com',
    location: 'Wello Sefer, Addis Ababa',
    link: 'https://atlanticplc.com',
    description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
}
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
    it('Should update existing contact info with new and valid values for all fields', async () => {
        let contact2 = {
            companyName: 'HanhNguyen IT Solutions',
            phone: '251-456-603566',
            email: 'hanh@gmail.com',
            location: '235 New York',
            link: 'https://hanh.com',
            description: 'A special company'
        }
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send(contact2)
        expect(res2.status).toBe(200)
        expect(res2.body.message).toBe("Crud updated");
        let newContact = await Cruds.findById(res1.body._id)
        expect(newContact).toMatchObject(contact2);

    })
    it ('Should update existing contact info with new and valid value for Company Name only', async () => {
        let contact2 = {
            companyName: 'HanhNguyen IT Solutions',
            phone: '251-911-603566',
            email: 'info@atlanticplc.com',
            location: 'Wello Sefer, Addis Ababa',
            link: 'https://atlanticplc.com',
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send(contact2)
        expect(res2.status).toBe(200)
        expect(res2.body.message).toBe("Crud updated");
        let newContact = await Cruds.findById(res1.body._id)
        expect(newContact).toMatchObject(contact2);
    })
    it ('Should update existing contact info with new and valid value for Phone only', async () => {
     
        let contact2 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-911-603456',
            email: 'info@atlanticplc.com',
            location: 'Wello Sefer, Addis Ababa',
            link: 'https://atlanticplc.com',
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send(contact2)
        expect(res2.status).toBe(200)
        expect(res2.body.message).toBe("Crud updated");
        let newContact = await Cruds.findById(res1.body._id)
        expect(newContact).toMatchObject(contact2);
    })
    it ('Should update existing contact info with new and valid value for Email only', async () => {
      
        let contact2 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-911-603566',
            email: 'hanhnguyen@gmail.com',
            location: 'Wello Sefer, Addis Ababa',
            link: 'https://atlanticplc.com',
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send(contact2)
        expect(res2.status).toBe(200)
        expect(res2.body.message).toBe("Crud updated");
        let newContact = await Cruds.findById(res1.body._id)
        expect(newContact).toMatchObject(contact2);
    })
    it ('Should update existing contact info with new and valid value for Location only', async () => {
       
        let contact2 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-911-603566',
            email: 'info@atlanticplc.com',
            location: '123 New York',
            link: 'https://atlanticplc.com',
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send(contact2)
        expect(res2.status).toBe(200)
        expect(res2.body.message).toBe("Crud updated");
        let newContact = await Cruds.findById(res1.body._id)
        expect(newContact).toMatchObject(contact2);

    })
    it ('Should update existing contact info with new and valid value for Link only', async () => {
        
        let contact2 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-911-603566',
            email: 'info@atlanticplc.com',
            location: 'Wello Sefer, Addis Ababa',
            link: 'https://hanh.com',
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send(contact2)
        expect(res2.status).toBe(200)
        expect(res2.body.message).toBe("Crud updated");
        let newContact = await Cruds.findById(res1.body._id)
        expect(newContact).toMatchObject(contact2);
    })
    it ('Should update existing contact info with new and valid value for Description only', async () => {
        let contact2 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-911-603566',
            email: 'info@atlanticplc.com',
            location: 'Wello Sefer, Addis Ababa',
            link: 'https://atlanticplc.com',
            description: 'A beautiful company'
        }
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send(contact2)
        expect(res2.status).toBe(200)
        expect(res2.body.message).toBe("Crud updated");
        let newContact = await Cruds.findById(res1.body._id)
        expect(newContact).toMatchObject(contact2);
    })   
    
    it('Should not update existing contact info when leaving Company Name empty', async () => {
        let contact2 = {
            companyName: '',
            phone: '251-911-603566',
            email: 'info@atlanticplc.com',
            location: 'Wello Sefer, Addis Ababa',
            link: 'https://atlanticplc.com',
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send(contact2)
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(contact1);

    })
    it('Should not update existing contact info when leaving Phone empty', async () => {
        let contact2 = {
            companyName: 'Atlantic IT Solutions',
            phone: '',
            email: 'info@atlanticplc.com',
            location: 'Wello Sefer, Addis Ababa',
            link: 'https://atlanticplc.com',
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send(contact2)
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(contact1);

    })
    it('Should not update existing contact info when leaving Email empty', async () => {
        let contact2 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-911-603566',
            email: '',
            location: 'Wello Sefer, Addis Ababa',
            link: 'https://atlanticplc.com',
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send(contact2)
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(contact1);

    })
    it('Should not update existing contact info when leaving Location empty', async () => {
       
        let contact2 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-911-603566',
            email: 'info@atlanticplc.com',
            location: '',
            link: 'https://atlanticplc.com',
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send(contact2)
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(contact1);

    })
    it('Should not update existing contact info when leaving Description empty', async () => {
      
        let contact2 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-911-603566',
            email: 'info@atlanticplc.com',
            location: 'Wello Sefer, Addis Ababa',
            link: 'https://atlanticplc.com',
            description: ''
        }
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send(contact2)
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(contact1);

    })
    it('Should update existing contact info when leaving Link empty', async () => {
      
        let contact2 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-911-603566',
            email: 'info@atlanticplc.com',
            location: 'Wello Sefer, Addis Ababa',
            link: '',
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send(contact2)
        expect(res2.status).toBe(200)
        expect(res2.body.message).toBe("Crud updated");
        let newContact = await Cruds.findById(res1.body._id)
        expect(newContact).toMatchObject(contact2);

    })
    it('Should not update existing contact info when leaving all fields empty', async () => {
      
        let contact2 = {
            companyName: '',
            phone: '',
            email: '',
            location: '',
            link: '',
            description: ''
        }
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send(contact2)
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(contact1);

    })
    test.each(invalidString)('Should not update existing contact info with invalid Company Name', async (data) => {
        let contact2 = {
            companyName: data,
            phone: '251-911-603566',
            email: 'info@atlanticplc.com',
            location: 'Wello Sefer, Addis Ababa',
            link: 'https://atlanticplc.com',
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send(contact2)
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(contact1);
    })
    test.each(invalidPhoneNumbers)('Should not update existing contact info with invalid Phone Number', async (data) => {
        let contact2 = {
            companyName: 'Atlantic IT Solutions',
            phone: data,
            email: 'info@atlanticplc.com',
            location: 'Wello Sefer, Addis Ababa',
            link: 'https://atlanticplc.com',
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send(contact2)
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(contact1);
    })
    test.each(invalidEmail)('Should not update existing contact info  with invalid Email', async (data) => {
        let contact2 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-911-603566',
            email: data,
            location: 'Wello Sefer, Addis Ababa',
            link: 'https://atlanticplc.com',
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send(contact2)
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(contact1);
    })
    test.each(invalidLink)('Should not update existing contact info with invalid Link', async (data) => {
        let contact2 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-911-603566',
            email: 'info@atlanticplc.com',
            location: 'Wello Sefer, Addis Ababa',
            link: data,
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send(contact2)
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(contact1);
    })
    test.each(invalidString)('Should not update existing contact info with invalid Location', async (data) => {
        let contact2 = {
            companyName:'Atlantic IT Solutions',
            phone: '251-911-603566',
            email: 'info@atlanticplc.com',
            location: data,
            link: 'https://atlanticplc.com',
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        }
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send(contact2)
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(contact1);
    })
    test.each(invalidString)('Should not update existing contact info with invalid Description', async (data) => {
        let contact2 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-911-603566',
            email: 'info@atlanticplc.com',
            location: 'Wello Sefer, Addis Ababa',
            link: 'https://atlanticplc.com',
            description: data
        }
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send(contact2)
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(contact1);
    })

    it.only('Should not update existing contact info when changing Company Name into already existing one', async ()=>{
        let contact2 = {
            companyName: 'Hanh Nguyen',
            phone: '251-456-603566',
            email: 'hanh@gmail.com',
            location: '235 New York',
            link: 'https://hanh.com',
            description: 'A special company '
        }
        let contact3 = {
            companyName: 'Atlantic IT Solutions',
            phone: '251-456-603566',
            email: 'hanh@gmail.com',
            location: '235 New York',
            link: 'https://hanh.com',
            description: 'A special company '
        }
        await req.post("/api/cruds/").send(contact1)
        let res1 = await req.post("/api/cruds/").send(contact2)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send(contact3)
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(contact2);
    })
    it.only('Should not update existing contact info when changing Email into already existing one', async ()=>{
        let contact2 = {
            companyName: 'Hanh Nguyen',
            phone: '251-456-603566',
            email: 'hanh@gmail.com',
            location: '235 New York',
            link: 'https://hanh.com',
            description: 'A special company '
        }
        let contact3 = {
            companyName: 'Hanh Nguyen',
            phone: '251-456-603566',
            email: 'info@atlanticplc.com',
            location: '235 New York',
            link: 'https://hanh.com',
            description: 'A special company '
        }
        await req.post("/api/cruds/").send(contact1)
        let res1 = await req.post("/api/cruds/").send(contact2)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send(contact3)
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(contact2);
    })
    it.only('Should update existing contact info when changing Phone into already existing one', async ()=>{
        let contact2 = {
            companyName: 'Hanh Nguyen',
            phone: '251-456-603545',
            email: 'hanh@gmail.com',
            location: '235 New York',
            link: 'https://hanh.com',
            description: 'A special company '
        }
        let contact3 = {
            companyName: 'Hanh Nguyen',
            phone: '251-456-603566',
            email: 'hanh@gmail.com',
            location: '235 New York',
            link: 'https://hanh.com',
            description: 'A special company '
        }
        await req.post("/api/cruds/").send(contact1)
        let res1 = await req.post("/api/cruds/").send(contact2)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send(contact3)
        expect(res2.status).toBe(200)
        expect(res2.body.message).toBe("Crud updated");
        let newContact = await Cruds.findById(res1.body._id)
        expect(newContact).toMatchObject(contact3);
    })
    it.only('Should update existing contact info when changing Location into already existing one', async ()=>{
        let contact2 = {
            companyName: 'Hanh Nguyen',
            phone: '251-456-603545',
            email: 'hanh@gmail.com',
            location: '235 New York',
            link: 'https://hanh.com',
            description: 'A special company '
        }
        let contact3 = {
            companyName: 'Hanh Nguyen',
            phone: '251-456-603545',
            email: 'hanh@gmail.com',
            location: 'Wello Sefer, Addis Ababa',
            link: 'https://hanh.com',
            description: 'A special company '
        }
        await req.post("/api/cruds/").send(contact1)
        let res1 = await req.post("/api/cruds/").send(contact2)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send(contact3)
        expect(res2.status).toBe(200)
        expect(res2.body.message).toBe("Crud updated");
        let newContact = await Cruds.findById(res1.body._id)
        expect(newContact).toMatchObject(contact3);
    })
    it.only('Should update existing contact info when changing Link into already existing one', async ()=>{
        let contact2 = {
            companyName: 'Hanh Nguyen',
            phone: '251-456-603545',
            email: 'hanh@gmail.com',
            location: '235 New York',
            link: 'https://hanh.com',
            description: 'A special company '
        }
        let contact3 = {
            companyName: 'Hanh Nguyen',
            phone: '251-456-603545',
            email: 'hanh@gmail.com',
            location: '235 New York',
            link: 'https://atlanticplc.com',
            description: 'A special company '
        }
        await req.post("/api/cruds/").send(contact1)
        let res1 = await req.post("/api/cruds/").send(contact2)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send(contact3)
        expect(res2.status).toBe(200)
        expect(res2.body.message).toBe("Crud updated");
        let newContact = await Cruds.findById(res1.body._id)
        expect(newContact).toMatchObject(contact3);
    })
    it.only('Should update existing contact info when changing Description into already existing one', async ()=>{
        let contact2 = {
            companyName: 'Hanh Nguyen',
            phone: '251-456-603545',
            email: 'hanh@gmail.com',
            location: '235 New York',
            link: 'https://hanh.com',
            description: 'A pretty company'
        }
        let contact3 = {
            companyName: 'Hanh Nguyen',
            phone: '251-456-603545',
            email: 'hanh@gmail.com',
            location: '235 New York',
            link: 'https://hanh.com',
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'   
        }
        await req.post("/api/cruds/").send(contact1)
        let res1 = await req.post("/api/cruds/").send(contact2)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send(contact3)
        expect(res2.status).toBe(200)
        expect(res2.body.message).toBe("Crud updated");
        let newContact = await Cruds.findById(res1.body._id)
        expect(newContact).toMatchObject(contact3);
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