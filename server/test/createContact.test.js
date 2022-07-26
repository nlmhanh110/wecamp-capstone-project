import app from "../server";
import supertest from "supertest";

describe('POST - /api/cruds/ ', () => {
    beforeAll(async () => {
        const url = `mongodb+srv://nlmhanh110:vcBtAaIxUo2ljE1v@cluster0.soave.mongodb.net/crudapp?retryWrites=true&w=majority`;
        await mongoose.connect(url,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
    })
    beforeEach(() =>  {
        request = supertest(app)
    })
    it('Able to post a new contact with valid values', async () => {
        let response = await request.post("/").send({
            companyName: 'Atlantic IT Solutions',
            phone: '251-911-603566',
            email: 'info@atlanticplc.com',
            location:'Wello Sefer, Addis Ababa' ,
            link: 'https://atlanticplc.com',
            description: 'Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia'
        })
        expect(response.status).toBe(201)
        expect()
        
    })
})