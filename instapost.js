const mongoose = require("mongoose");
 const {Schema} = mongoose; // Without this line, you would have to write new mongoose.Schema({ ... }) every single time. With this line, you can just write new Schema({ ... }).

main()
  .then(() => console.log("connection succesfull"))
  .catch((err) => console.log((err)));

  async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo')
  }

  // usre schema
  const instaSchema = new Schema({
      username:String,
      followers:Number
  });
  const Person = mongoose.model("Person",instaSchema)  // insta user collection

  // post schema
  const postSchema = new Schema({
    likes:Number,
    caption: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person"   // user collection name people
    }
  });
  const Post = mongoose.model("Post",postSchema) 

//   adding data
  const addData = async() => {
    let user1 = new Person ({
        username:"virat",
       followers:50000
    })

    let post1 = new Post ({
        likes:5,
        caption: "Match day 🔥",
    })
    post1.user = user1;
    

  await user1.save();
  const result = await post1.save();
   console.log(result)
  
}
addData();



// ---------- ADD MORE POSTS ----------
const addMorePosts = async () => {
    // find existing user
    const user = await Person.findOne({ username: "virat" });
  
    if (!user) {
      console.log("User not found!");
      return;
    }
  
    const posts = [
      {
        likes: 120,
        caption: "Workout day 💪",
        user: user._id
      },
      {
        likes: 300,
        caption: "Winning moment 🏆",
        user: user._id
      },
      {
        likes: 150,
        caption: "Throwback 🔥",
        user: user._id
      }
    ];
  
    const result = await Post.insertMany(posts);
    console.log("Posts added:");
  };
  
  addMorePosts(); // calling
  Post.find().populate("user").then(console.log); // How to Fetch All Posts with User Info
