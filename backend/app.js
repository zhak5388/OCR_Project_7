//Importation des modules généraux
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

//Importation des variables d"environnement
const mongoDbUsername = process.env.MONGODB_USERNAME;
const mongoDdPassword = process.env.MONGODB_PASSWORD;

//Importation des modules "routes"
/* TO BE CHANGED */
//const userRoutes = require("./routes/userRoutes");
//const sauceRoutes = require("./routes/sauceRoutes");
const userRoutes = require("./1_routes/userRoutes");

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

//Appel des routes
/* TO BE CHANGED */
//app.use("/api/auth", userRoutes);
//app.use("/api/sauces", sauceRoutes);
app.use("/api", userRoutes);

//Permet la consultation des images stockées
/* TO BE CHANGED */
//app.use("/" + imageDirectory, express.static(path.join(__dirname, imageDirectory)));

//Exportation de la fonction app
module.exports = app;