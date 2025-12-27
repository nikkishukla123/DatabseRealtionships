
// 2️⃣ Referenced method for two schema (Using IDs)

const mongoose = require("mongoose");
 const {Schema} = mongoose; // Without this line, you would have to write new mongoose.Schema({ ... }) every single time. With this line, you can just write new Schema({ ... }).

main()
  .then(() => console.log("connection succesfull"))
  .catch((err) => console.log((err)));

  async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo')
  }



  const customerSchema = new Schema({
      name:String,
      email: { type: String, unique: true }
  });

// ✅ MIDDLEWARE (BEFORE model creation)
  customerSchema.post("findOneAndDelete",async(data)=>{ //Middleware must be defined before mongoose.model() and must match the exact method name.
    if(data){
      let res = await Order.deleteMany({ customer: data._id})
    }
    console.log("deletion successfull")
})

// ---------------- MODEL ----------------
  const Customer = mongoose.model("Customer",customerSchema)  // collection

// ---------------- ORDER MODEL ----------------
const orderSchema = new Schema({
  product:String,
  price: Number,
  customer:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer"
  },
});
// collection
const Order = mongoose.model("Order",orderSchema)  // collection

// ------ adding data in customer--------
const addcustom = async() => {
    let c1 = new Customer ({
        name:"neha",
        email: "neha@gmail.com"
    })
   let result = await c1.save()
   return result._id;
}



// -------order insertion and calling customer to get thier id------
  const addorder = async() => {
    const customerId = await addcustom(); // get customer id

    let orders = [
      {
        product: "Samosa",
        price: 20,
        customer: customerId
      },
      {
        product: "Cold Drink",
        price: 40,
        customer: customerId
      },
      {
        product: "Burger",
        price: 60,
        customer: customerId
      }
    ];
  
    let res = await Order.insertMany(orders);
    // console.log("Orders Added:", res); 
}
addorder();  // calling the order function

// using populate
const findorder = async() => {
    const result = await Order.find().populate("customer");  //👉 populate() is used to replace an ObjectId with real data from another collection.
    console.log(result);
}
findorder()




// ---------------- DELETE FUNCTION ----------------
const delcustomer = async() => {
  const data = await Customer.findOneAndDelete({ _id: "694fbe52e34b7e87d88ae193" })
   console.log(data);
}
delcustomer();

