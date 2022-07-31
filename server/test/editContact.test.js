import server from "../server";
import mongoose from "mongoose";
import supertest from "supertest";
import Cruds from "../models/crudModel"
import data from './data.json'
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
        let res1 = await req.post("/api/cruds/").send(data.create[0])
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send(data.create[0])
        expect(res2.status).toBe(200)
        expect(res2.body.message).toBe("Crud updated");
        let newContact = await Cruds.findById(res1.body._id)
        expect(newContact).toMatchObject(data.create[0]);

    })
    it('Should update existing contact info with new and valid value for Company Name only', async () => {
        let newcompanyName = 'HanhNguyen'
        let res1 = await req.post("/api/cruds/").send(data.create[0])
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({companyName:newcompanyName})
        expect(res2.status).toBe(200)
        expect(res2.body.message).toBe("Crud updated");
        let newContact = await Cruds.findById(res1.body._id)
        expect(newContact.companyName).toBe(newcompanyName);
    })
    it ('Should update existing contact info with new and valid value for Phone only', async () => {
     
        let newphone = '251-911-603456'
        let res1 = await req.post("/api/cruds/").send(data.create[0])
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({phone:newphone})
        expect(res2.status).toBe(200)
        expect(res2.body.message).toBe("Crud updated");
        let newContact = await Cruds.findById(res1.body._id)
        expect(newContact.phone).toBe(newphone);
    })
    it ('Should update existing contact info with new and valid value for Email only', async () => {
      
        let newEmail = 'hanhnguyen@gmail.com'
        let res1 = await req.post("/api/cruds/").send(data.create[0])
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({email:newEmail})
        expect(res2.status).toBe(200)
        expect(res2.body.message).toBe("Crud updated");
        let newContact = await Cruds.findById(res1.body._id)
        expect(newContact.email).toBe(newEmail);
    })
    it ('Should update existing contact info with new and valid value for Location only', async () => {
       
        let newLocation = '123 New York'
        let res1 = await req.post("/api/cruds/").send(data.create[0])
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({location:newLocation})
        expect(res2.status).toBe(200)
        expect(res2.body.message).toBe("Crud updated");
        let newContact = await Cruds.findById(res1.body._id)
        expect(newContact.location).toBe(newLocation);

    })
    it ('Should update existing contact info with new and valid value for Link only', async () => {
        
        let newLink = 'https://hanh.com'
        let res1 = await req.post("/api/cruds/").send(data.create[0])
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({link:newLink})
        expect(res2.status).toBe(200)
        expect(res2.body.message).toBe("Crud updated");
        let newContact = await Cruds.findById(res1.body._id)
        expect(newContact.link).toBe(newLink);
    })
    it ('Should update existing contact info with new and valid value for Description only', async () => {
        let newDescription = 'A beautiful company'
        let res1 = await req.post("/api/cruds/").send(data.create[0])
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({description:newDescription})
        expect(res2.status).toBe(200)
        expect(res2.body.message).toBe("Crud updated");
        let newContact = await Cruds.findById(res1.body._id)
        expect(newContact.description).toBe(newDescription);
    })   
    
    it('Should not update existing contact info when leaving Company Name empty', async () => {
        let newCompanyName = ''
        let res1 = await req.post("/api/cruds/").send(data.create[0])
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({companyName:newCompanyName})
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(data.create[0]);

    })
    it('Should not update existing contact info when leaving Phone empty', async () => {
        let newPhone= ''
        let res1 = await req.post("/api/cruds/").send(data.create[0])
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({phone:newPhone})
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(data.create[0]);

    })
    it('Should not update existing contact info when leaving Email empty', async () => {
        let newEmail= ''
        let res1 = await req.post("/api/cruds/").send(data.create[0])
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({email:newEmail})
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(data.create[0]);
    })
    it('Should not update existing contact info when leaving Location empty', async () => {
       
        let newLocation = ''
        let res1 = await req.post("/api/cruds/").send(data.create[0])
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({location:newLocation})
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(data.create[0]);

    })
    it('Should not update existing contact info when leaving Description empty', async () => {
      
        let newDescription = ''
        let res1 = await req.post("/api/cruds/").send(data.create[0])
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({description:newDescription})
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(data.create[0]);

    })
    it('Should update existing contact info when leaving Link empty', async () => {
      
        let newLink= ''
        let res1 = await req.post("/api/cruds/").send(data.create[0])
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({link:newLink})
        expect(res2.status).toBe(200)
        expect(res2.body.message).toBe("Crud updated");
        let newContact = await Cruds.findById(res1.body._id)
        expect(newContact.link).toBe(newLink);

    })
    it('Should not update existing contact info when leaving all fields empty', async () => {
        let res1 = await req.post("/api/cruds/").send(data.create[0])
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send(data.create[7])
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(data.create[0]);

    })
    test.each(data.invalidString)('Should not update existing contact info with invalid Company Name', async (invalidString) => {
        let res1 = await req.post("/api/cruds/").send(data.create[0])
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({companyName:invalidString})
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(data.create[0]);
    })
    test.each(data.invalidPhone)('Should not update existing contact info with invalid Phone Number', async (invalidPhone) => {
        let res1 = await req.post("/api/cruds/").send(data.create[0])
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({phone:invalidPhone})
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(data.create[0]);
    })
    test.each(data.invalidEmail)('Should not update existing contact info  with invalid Email', async (invalidEmail) => {
        let res1 = await req.post("/api/cruds/").send(data.create[0])
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({email:invalidEmail})
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(data.create[0]);
    })
    test.each(data.invalidLink)('Should not update existing contact info with invalid Link', async (invalidLink) => {
        let res1 = await req.post("/api/cruds/").send(data.create[0])
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({link:invalidLink})
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(data.create[0]);
    })
    test.each(data.invalidString)('Should not update existing contact info with invalid Location', async (invalidString) => {
        let res1 = await req.post("/api/cruds/").send(data.create[0])
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({location:invalidString})
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(data.create[0]);
    })
    test.each(data.invalidString)('Should not update existing contact info with invalid Description', async (invalidString) => {
        let res1 = await req.post("/api/cruds/").send(data.create[0])
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({description:invalidString})
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(data.create[0]);
    })

    test.only.each(data.existedCompanyName)('Should not update existing contact info when changing Company Name into already existing one', async (existedCompanyName)=>{
        await req.post("/api/cruds/").send(data.create[0])
        let res1 = await req.post("/api/cruds/").send(data.create[8])
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({companyName:existedCompanyName})
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(data.create[8]);
    })
    it('Should not update existing contact info when changing Email into already existing one', async ()=>{
        let existedEmail='info@atlanticplc.com'
        await req.post("/api/cruds/").send(data.create[0])
        let res1 = await req.post("/api/cruds/").send(data.create[8])
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({email:existedEmail})
        expect(res2.status).toBe(422)
        expect(res2.body.message).toBe("Crud update failed");
        let oldContact = await Cruds.findById(res1.body._id)
        expect(oldContact).toMatchObject(data.create[8]);
    })
    it('Should update existing contact info when changing Phone into already existing one', async ()=>{
        
        let existedPhone= '251-456-603566'
        await req.post("/api/cruds/").send(data.create[0])
        let res1 = await req.post("/api/cruds/").send(data.create[8])
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({phone:existedPhone})
        expect(res2.status).toBe(200)
        expect(res2.body.message).toBe("Crud updated");
        let newContact = await Cruds.findById(res1.body._id)
        expect(newContact.phone).toBe(existedPhone);
    })
    it('Should update existing contact info when changing Location into already existing one', async ()=>{
        let existedLocation= 'Wello Sefer, Addis Ababa'
        await req.post("/api/cruds/").send(data.create[0])
        let res1 = await req.post("/api/cruds/").send(data.create[8])
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({location:existedLocation})
        expect(res2.status).toBe(200)
        expect(res2.body.message).toBe("Crud updated");
        let newContact = await Cruds.findById(res1.body._id)
        expect(newContact.location).toBe(existedLocation);
    })
    it('Should update existing contact info when changing Link into already existing one', async ()=>{
        let existedLink= 'https://atlanticplc.com'
        await req.post("/api/cruds/").send(data.create[0])
        let res1 = await req.post("/api/cruds/").send(data.create[8])
        let res2 = await req.patch(`/api/cruds/${res1.body._id}`).send({link:existedLink})
        expect(res2.status).toBe(200)
        expect(res2.body.message).toBe("Crud updated");
        let newContact = await Cruds.findById(res1.body._id)
        expect(newContact.link).toBe(existedLink);
    })
    it('Should update existing contact info when changing Description into already existing one', async ()=>{
        let existedDescription= 'A special company '
        await req.post("/api/cruds/").send(data.create[0])
        let res1 = await req.post("/api/cruds/").send(data.create[8])
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