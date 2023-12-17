import mongoose from 'mongoose';

function dbConnect() {
  mongoose.connect('mongodb://127.0.0.1:27017/miniwiki')
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log("Database error \n" + err);
    });  
}

export default dbConnect;
