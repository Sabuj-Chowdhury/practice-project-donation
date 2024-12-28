const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.i53p4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const db = client.db("OpenEduDB");
    const donationCollections = db.collection("donations");
    const receivedCollections = db.collection("items");

    // **********************POST************************
    //route for adding the donation
    app.post("/add-donation", async (req, res) => {
      const data = req.body;
      const result = await donationCollections.insertOne(data);
      res.send(result);
    });

    // Route to store donation collect details and update booking status on donationCollections
    app.post("/collect-donation", async (req, res) => {
      const data = req.body;
      const result = await receivedCollections.insertOne(data);

      // change the status in donationCollections
      const filter = { _id: new ObjectId(data.donation_id) };
      const update = {
        $set: { status: "unavailable" },
      };
      const updateStatus = await donationCollections.updateOne(filter, update);
      res.send(result);
    });

    // ***********************GET************************
    // route for donations data for that logged in user
    app.get("/my-donations/:email", async (req, res) => {
      const email = req.params.email;
      const query = { "donner.email": email };
      const result = await donationCollections.find(query).toArray();
      res.send(result);
    });

    // Route to get the latest 6 donations
    app.get("/latest-donations", async (req, res) => {
      const query = {};
      const sort = {
        createdAt: -1,
      };
      const result = await donationCollections
        .find(query)
        .sort(sort)
        .limit(6)
        .toArray();

      res.send(result);
    });

    // Route to get all donations
    app.get("/available-donations", async (req, res) => {
      let query = {};

      const result = await donationCollections.find(query).toArray();

      res.send(result);
    });

    // Route for single donation data from DB by "_id"
    app.get("/donation-detail/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await donationCollections.findOne(query);
      res.send(result);
    });

    // ********************DELETE***************************

    // route for delete a donation data from DB
    app.delete("/donation/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await donationCollections.deleteOne(query);
      res.send(result);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server running !");
});

app.listen(port, () => {
  console.log(`Server running at :${port}`);
});
