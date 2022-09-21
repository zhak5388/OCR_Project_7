//Importation des modules généraux
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

//Bug preflight response
//var cors = require("cors");

//Importation des variables d"environnement
const mongoDbUsername = process.env.MONGODB_USERNAME;
const mongoDdPassword = process.env.MONGODB_PASSWORD;
const imageUploadDirectory = process.env.IMAGE_UPLOAD_DIRECTORY;
const imageAccessDirectory = process.env.IMAGE_ACCESS_DIRECTORY;
const avatarUploadDirectory = process.env.AVATAR_UPLOAD_DIRECTORY;
const avatarAccessDirectory = process.env.AVATAR_ACCESS_DIRECTORY;

//Importation des modules "routes"
const userRoutes = require("./routes/userRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const avatarRoutes = require("./routes/avatarRoutes");

//Importation du module express
const app = express();

mongoose.connect(`mongodb+srv://${mongoDbUsername}:${mongoDdPassword}@ocrprojects.a1zqegb.mongodb.net/?retryWrites=true&w=majority`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => 
{
    console.log("Connexion à MongoDB réussie !")
})
.catch(() => 
{
    console.log("Connexion à MongoDB échouée !")
});

app.use(express.json());

//Définition des headers
app.use((req, res, next) =>
{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});


//Bug preflight response
//app.use(cors())
//app.options("*", cors())

//Appel des routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/submission", submissionRoutes);
app.use("/api/v1/avatar", avatarRoutes);

//Permet la consultation des images stockées
app.use("/api/v1/" + imageAccessDirectory, express.static(path.join(__dirname, imageUploadDirectory)));
app.use("/api/v1/" + avatarAccessDirectory, express.static(path.join(__dirname, avatarUploadDirectory)));

//Exportation de la fonction app
module.exports = app;