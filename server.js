const express = require("express");
const app = express();
const mongoose = require('mongoose');
const userModel = require('./Models/users');
const cors = require('cors');

app.use(express.json());
app.use(cors());

const PORT = 3001;
const MONGODB_URI ='mongodb+srv://727722euec043:divya890ece@cluster0.jcsly.mongodb.net/data01';
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.get("/getUsers", (req, res) => {
    userModel.find({})
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.post("/loginUser", (req, res) => {
    const { email } = req.body;

    console.log('Received email:', email);

    userModel.findOne({ email: email })
        .then(user => {
            if (user) {
                return res.json({ status: "success", message: "Email exists" });
            } else {
                return res.json({ status: "error", message: "No user exists" });
            }
        })
        .catch(err => {
            console.error('Error finding user:', err);
            return res.status(500).json({ status: "error", message: "Internal server error" });
        });
});
app.post("/createUser", (req, res) => {
    const { username, email, password } = req.body;

    // Directly save the password without hashing
    userModel.create({ username, email, password })
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ error: "Internal server error" }));
});

app.listen(PORT, () => {
    console.log("Server runs perfectly!");
});
