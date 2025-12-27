// 1️⃣ Embedded (Nested documents) method : one to few
const mongoose = require("mongoose");
 const {Schema} = mongoose; // Without this line, you would have to write new mongoose.Schema({ ... }) every single time. With this line, you can just write new Schema({ ... }).

main()
  .then(() => console.log("connection succesfull"))
  .catch((err) => console.log((err)));

  async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo')
  }

const userSchema = new Schema({
    username:String,
    addresses: [     // this is one to few relationship though adress is different model but it cant exist without user            
        {  _id:false, // thus in sme module with user
            location:String,
            city:String
        },
    ],
});
const User = mongoose.model("User",userSchema)  // collection

const addUsers = async() => {
    let user1 = new User({
        username:"sherlockholmes",
        addresses: [
            { 
              location:"bakers street",
               city:"london"
         }
        ]
    });
    user1.addresses.push({location:"khulfi bhazzar",city:"london"});
    let result = await user1.save();
    console.log(result)
};
addUsers();