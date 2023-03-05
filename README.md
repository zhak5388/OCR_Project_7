## Introduction

Projet final de la formation “Développeur intégrateur web” d'OpenClassRooms.
+ Construction d’un réseau social interne en responsive pour l’entreprise fictive Groupomania.
+ Élaboration de l’aspect graphique du site.
+ Réalisation du frontend et du backend API (Rest).

![PageAcceuil](https://raw.githubusercontent.com/zhak5388/MiscFiles_Projets/main/Pictures/OCR_Groupomania_1.png "Page de login")

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
3. Renseignez votre `MONGODB_HOST`, plus d'informations [ici](https://docs.mongodb.com/manual/reference/connection-string/#dns-seedlist-connection-format)
4. Renseignez une clé secrète pour le token

### 2 - Importation de la base de données
Vous pouvez importez la base de données fournie située dans `backend/0_DataBase_Sample` dans votre cluster MongoDB.

Si vous **ne** souhaitez **pas** importer cette base de données:
1. Supprimer les images du dossier `backend/public/submission/image` ainsi que le dossier `backend/0_DataBase_Sample`
2. Pour nommer un utilisateur administraeur, il faudra modifier manuellement son attribut `role:lambda` en `role:admin`

Si vous **souhaitez** importer cette base de données:
1. [Installer](https://www.mongodb.com/docs/database-tools/installation/installation/) MongoDB DataBase tools
2. Lancer les commandes
> mongoimport -v \<Adresse SRV\> \<Chemin du fichier groupomania_submissionmodels.json\> <br/>
> mongoimport -v \<Adresse SRV\> \<Chemin du fichier groupomania_usermodels.json\>

Exemple:
> mongoimport -v mongodb+srv://username:password@mongodb.net/ backend/0_DataBase_Sample/groupomania_submissionmodels.json


### 3 - Installation

#### Backend
1. Placez vous dans le dossier `backend`
2. Lancez la commande `npm install`

#### Frontend
1. Placez vous dans le dossier `frontend`
2. Lancez la commande `npm install`

## Lancement
Placez vous dans `backend`:
> node server

Ouvrez une autre fenetre de terminal, placez vous dans `frontend`:
> npm start


### 4 - Aperçu

![PageAcceuil](https://raw.githubusercontent.com/zhak5388/MiscFiles_Projets/main/Pictures/OCR_Groupomania_2.png "Page d'accueil")
