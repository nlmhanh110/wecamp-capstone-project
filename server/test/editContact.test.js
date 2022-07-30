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
    it.only('Should update existing contact info with new and valid value for Company Name only', async () => {
        let newcompanyName = 'HanhNguyen IT Solutions'
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({companyName:newcompanyName})
        expect(res2.status).toBe(200)
        expect(res2.body.message).toBe("Crud updated");
        let newContact = await Cruds.findById(res1.body._id)
        expect(newContact.companyName).toBe(newcompanyName);
    })
    it ('Should update existing contact info with new and valid value for Phone only', async () => {
     
        let newphone = '251-911-603456'
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({phone:newphone})
        expect(res2.status).toBe(200)
        expect(res2.body.message).toBe("Crud updated");
        let newContact = await Cruds.findById(res1.body._id)
        expect(newContact.phone).toBe(newphone);
    })
    it ('Should update existing contact info with new and valid value for Email only', async () => {
      
        let newEmail = 'hanhnguyen@gmail.com'
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({email:newEmail})
        expect(res2.status).toBe(200)
        expect(res2.body.message).toBe("Crud updated");
        let newContact = await Cruds.findById(res1.body._id)
        expect(newContact.email).toBe(newEmail);
    })
    it ('Should update existing contact info with new and valid value for Location only', async () => {
       
        let newLocation = '123 New York'
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({location:newLocation})
        expect(res2.status).toBe(200)
        expect(res2.body.message).toBe("Crud updated");
        let newContact = await Cruds.findById(res1.body._id)
        expect(newContact.location).toBe(newLocation);

    })
    it ('Should update existing contact info with new and valid value for Link only', async () => {
        
        let newLink = 'https://hanh.com'
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({link:newLink})
        expect(res2.status).toBe(200)
        expect(res2.body.message).toBe("Crud updated");
        let newContact = await Cruds.findById(res1.body._id)
        expect(newContact.link).toBe(newLink);
    })
    it ('Should update existing contact info with new and valid value for Description only', async () => {
        let newDescription = 'A beautiful company'
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({description:newDescription})
        expect(res2.status).toBe(200)
        expect(res2.body.message).toBe("Crud updated");
        let newContact = await Cruds.findById(res1.body._id)
        expect(newContact.description).toBe(newDescription);
    })   
    
    it('Should not update existing contact info when leaving Company Name empty', async () => {
        let newCompanyName = ''
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({companyName:newcompanyName})
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(contact1);

    })
    it('Should not update existing contact info when leaving Phone empty', async () => {
        let newPhone= ''
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({phone:newPhone})
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(contact1);

    })
    it('Should not update existing contact info when leaving Email empty', async () => {
        let newEmail= ''
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({email:newEmail})
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(contact1);
    })
    it('Should not update existing contact info when leaving Location empty', async () => {
       
        let newLocation = ''
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({location:newLocation})
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(contact1);

    })
    it('Should not update existing contact info when leaving Description empty', async () => {
      
        let newDescription = ''
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({description:newDescription})
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(contact1);

    })
    it('Should update existing contact info when leaving Link empty', async () => {
      
        let newLink= ''
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({link:newLink})
        expect(res2.status).toBe(200)
        expect(res2.body.message).toBe("Crud updated");
        let newContact = await Cruds.findById(res1.body._id)
        expect(newContact.link).toBe(newLink);

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
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({companyName:data})
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(contact1);
    })
    test.each(invalidPhoneNumbers)('Should not update existing contact info with invalid Phone Number', async (data) => {
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({phone:data})
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(contact1);
    })
    test.each(invalidEmail)('Should not update existing contact info  with invalid Email', async (data) => {
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({email:data})
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(contact1);
    })
    test.each(invalidLink)('Should not update existing contact info with invalid Link', async (data) => {
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({link:data})
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(contact1);
    })
    test.each(invalidString)('Should not update existing contact info with invalid Location', async (data) => {
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({location:data})
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(contact1);
    })
    test.each(invalidString)('Should not update existing contact info with invalid Description', async (data) => {
        let res1 = await req.post("/api/cruds/").send(contact1)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({description:data})
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
            description: 'A special company'
        }
        let existedCompanyName= 'Atlantic IT Solutions'
        await req.post("/api/cruds/").send(contact1)
        let res1 = await req.post("/api/cruds/").send(contact2)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({companyName:existedCompanyName})
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
        let existedEmail='info@atlanticplc.com'
        await req.post("/api/cruds/").send(contact1)
        let res1 = await req.post("/api/cruds/").send(contact2)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({email:existedEmail})
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(contact2);
    })
    // it('Should fail to post a new contact using an already exist Company Name but in lowerCase/Upper Case', async ()=>{
    //     let contact2 = {
    //         companyName: 'atlantic it solutions',
    //         phone: '251-456-603566',
    //         email: 'hanh@gmail.com',
    //         location: '235 New York',
    //         link: 'https://hanh.com',
    //         description: 'A special company '
    //     }
    //     let contact3 = {
    //         companyName: 'ATLANTIC IT SOLUTIONS',
    //         phone: '251-456-603566',
    //         email: 'hanh@gmail.com',
    //         location: '235 New York',
    //         link: 'https://hanh.com',
    //         description: 'A special company '
    //     }
    //     await req.post("/api/cruds/").send(contact1)
    //     let res1 = await req.post("/api/cruds/").send(contact2)
    //     let res2 = await req.post("/api/cruds/").send(contact3)
    //     expect(res1.status).toBe(422)
    //     expect(res1.body.message).toBe("Crud add failed");
    //     let insertedContact = await Cruds.findOne({ email: contact2.email })
    //     expect(insertedContact).toBeNull();
    //     expect(res2.status).toBe(422)
    //     expect(res2.body.message).toBe("Crud add failed");
    //     let insertedContact2 = await Cruds.findOne({ email: contact3.email })
    //     expect(insertedContact2).toBeNull();
    // })
    it.only('Should update existing contact info when changing Phone into already existing one', async ()=>{
        let contact2 = {
            companyName: 'Hanh Nguyen',
            phone: '251-456-603545',
            email: 'hanh@gmail.com',
            location: '235 New York',
            link: 'https://hanh.com',
            description: 'A special company '
        }
        let existedPhone= '251-456-603566'
        await req.post("/api/cruds/").send(contact1)
        let res1 = await req.post("/api/cruds/").send(contact2)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({phone:existedPhone})
        expect(res2.status).toBe(200)
        expect(res2.body.message).toBe("Crud updated");
        let newContact = await Cruds.findById(res1.body._id)
        expect(newContact.phone).toBe(existedPhone);
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
        let existedLocation= 'Wello Sefer, Addis Ababa'
        await req.post("/api/cruds/").send(contact1)
        let res1 = await req.post("/api/cruds/").send(contact2)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({location:existedLocation})
        expect(res2.status).toBe(200)
        expect(res2.body.message).toBe("Crud updated");
        let newContact = await Cruds.findById(res1.body._id)
        expect(newContact.location).toBe(existedLocation);
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
        let existedLink= 'https://atlanticplc.com'
        await req.post("/api/cruds/").send(contact1)
        let res1 = await req.post("/api/cruds/").send(contact2)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({link:existedLink})
        expect(res2.status).toBe(200)
        expect(res2.body.message).toBe("Crud updated");
        let newContact = await Cruds.findById(res1.body._id)
        expect(newContact.link).toBe(existedLink);
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
        let existedDescription= 'A special company '
        await req.post("/api/cruds/").send(contact1)
        let res1 = await req.post("/api/cruds/").send(contact2)
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({description:existedDescription})
        expect(res2.status).toBe(200)
        expect(res2.body.message).toBe("Crud updated");
        let newContact = await Cruds.findById(res1.body._id)
        expect(newContact.description).toBe(existedDescription);
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