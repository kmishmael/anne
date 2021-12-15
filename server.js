const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://anne:anne2021@cluster0.l084b.mongodb.net/annedb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
