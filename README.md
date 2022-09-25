## Technologies utilisées

Ce projet utilise:
1. Node.js / Express
2. React
3. MongoDB Atlas

## Installation

### 1 - Configuration de la variable d'environnement `.env`
Dans le dossier `backend` il y a un fichier `.env.example`:
1. Renommez le en `.env`
2. Renseignez vos identifiants MongoDB `MONGODB_USERNAME` et `MONGODB_PASSWORD`
3. Choississez une clé secrète pour le token

### 2 - Importation de la base de données
Vous pouvez importez la base de données fournie située dans `backend/0_DataBase_Sample` dans votre cluster MongoDB.

Si vous ne souhaitez pas importer cette base de données:
1. Supprimer les images du dossier `backend/public/submission/image`
2. Pour nommer un utilisateur administraeur, il faudra modifier manuellement son attribut `role:lambda` en `role:admin`

Si vous souhaitez importer cette base de données:
1. [Installer](https://www.mongodb.com/docs/database-tools/installation/installation/) MongoDB DataBase tools
2. Lancer les commandes
> mongoimport -v <Adresse SRV> <Chemin du fichier groupomania_submissionmodels.json>
> mongoimport -v <Adresse SRV> <Chemin du fichier groupomania_usermodels.json>

### 3 - Installation du backend
1. Placez vous dans le dossier `backend`
2. Lancez la commande `npm install`

### 4 - Installation du frontend
1. Placez vous dans le dossier `frontend`
2. Lancez la commande `npm install`

## Lancement
Placez vous dans `backend`:
> node server

Ouvrez une autre fenetre de terminal, placez vous dans `frontend`:
> npm start