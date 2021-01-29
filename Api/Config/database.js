const mongoose=require('mongoose');
const keys=require('./keys');

mongoose.connect(
  keys.mongodb.dbUrl,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify:false,
    useUnifiedTopology: true,
    family:4
  },
  (err) => {
    if (err) console.error(`Error: ${err}`);
    else console.log(`Connected to MongoDB`);
  }
);


