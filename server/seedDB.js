// import Cruds from "../models/crudModel"
// import mongoose from "mongoose";
const mongoose = require("mongoose");
const Cruds = require("./models/crudModel");
const url = 'mongodb+srv://nlmhanh110:dBCPa4lpiAFHpnBF@clusterforvoteweb.rcb08.mongodb.net/crudapp?retryWrites=false&w=majority';
mongoose
    .connect(url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    .then(() => {
        console.log("1: test database connected");
    })
    .catch((error) => {
        console.log(error.message);
    });
const seedData = [
    {
        companyName: "Nguyen IT",
        phone: "251-418-603566",
        email: "nguyenit@gmail.com",
        location: "Dien Toan",
        link: "https://nguyenit.com",
        description: "A beautifull company"
    },
    {
        companyName: "Le IT",
        phone: "251-234-603566",
        email: "leit@gmail.com",
        location: "Dien Khanh",
        link: "https://leit.com",
        description: "A normal company"
    },
    {
        companyName: "My IT",
        phone: "251-911-423566",
        email: "myit@gmail.com",
        location: "Khanh Hoa",
        link: "https://myit.com",
        description: "My IT is a company that ..."
    },
    {
        companyName: "Hanh IT",
        phone: "251-911-443466",
        email: "hanhit@gmail.com",
        location: "Nha Trang",
        link: "https://hanhit.com",
        description: "Hanh IT helps customer with ..."
    },
    {
        companyName: "Hibir Academy",
        phone: "251-116-465665",
        email: "info@hibiracademy.com",
        location: "Gurd Shola Behind Beshale Hotel, Addis Ababa",
        link: "https://hibiracademy.com/",
        description: "Choose Hibir Academy Our Project Based Learning held in the state-of-the-art comfortable classes will nurture your kid’s independent thinking and make them a leader of Future World!\n\nWhy Hibir Academy\n\n✅Project Based Learning\n✅ Nurturing critical and independent thinking\n✅ Wide range of extracurricular and after school activities by professional trainers and coaches\n✅ Comfortable class rooms equipped with state-of-the-art facilities to increase teacher-student interactions\n✅ Committed teachers and support staff\n\nThe Values that unite our School Community are:\n\n- Integrity\n- Excellence\n- Curiosity\n- Respect\n- Compassion\n- Responsibility\n\nCome and Visit Us! \n\nGurd Shola Behind Beshale Hotel, Addis Ababa\n☎️Call: +251-116-465665 or ? +251-978-815277\n#hibiracademy #preschools #schools #education #learning #parents #mom #dads #schoolinaddisababa #addisababa"
    }
]

const seedDB = async () => {
    await Cruds.deleteMany()
    await Cruds.insertMany(seedData)
}

seedDB().then(() => {
    mongoose.disconnect();
    mongoose.connection.close()
})