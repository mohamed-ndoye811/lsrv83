import firebase from "firebase/app";
const cronJob = require("cron").CronJob;

import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyB-iTs21KY9HM38jj-HJ-BGPVGwTojrpPU",
  authDomain: "lsr8300.firebaseapp.com",
  databaseURL: "https://lsr8300-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "lsr8300",
  storageBucket: "lsr8300.appspot.com",
  messagingSenderId: "784956839368",
  appId: "1:784956839368:web:74b893f16c8cfd5cf55cfd",
  measurementId: "G-6LL4GN2J19",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

//---[ FONCTION ANNIVERSAIRE ]---

var anniversaires = [];

const dbAdherents = db.collection("adherents");
const adgerents = await dbAdherents.where("dateNaissance", "!=", "").get();

if (adgerents.empty) {
  console.log("No matching documents.");
}

adgerents.forEach((doc) => {
  anniversaires.push(doc.data());
});

const date = new Date();
const dateJour = date.getDate().toString() + "/" + date.getMonth().toString();

// Fonction qui va se lancer tout les jours à 8h
const job = new cronJob(
  "0 8 * * *",
  () => {
    // Exports des dates d'anniversire associés aux Nom Prénom
    anniversaires.forEach((anniversaire) => {
      if (anniversaire.dateNaissance.startsWith(dateJour)) {
        // On regarde les dates d'anniversaire de tout le monde et si la date correspond au jour on envoi le mail
        var templateParams = {
          name: anniversaire.nomPrenom.split(" ").slice(-1).join(" "), // Récupère le prenom,
          email: "ndoyemd@outlook.fr",
        };

        emailjs
          .send(
            "service_3oelnz8",
            "template_gledkk2",
            templateParams,
            "user_n3Xl5mraHxRkxF4aO1hxR"
          )
          .then(
            function (response) {
              console.log("SUCCESS!", response.status, response.text);
            },
            function (error) {
              console.log("FAILED...", error);
            }
          );
      }
    });
  },
  undefined,
  true,
  "Europe/Paris"
);

job.start(); // Va se lancer tout les jours

//---[ RÉCUPÉRATION MEMBRES ÉQUIPE ]---

var listeEquipe = [];

const dbEquipe = db.collection("equipe");
const equipe = await dbEquipe.where("Categorie", "!=", "").get();

equipe.forEach((doc) => {
  listeEquipe.push(doc.data());
});

//---[ RÉCUPÉRATION ACTIVITÉS ]---

var listeActivites = [];

const dbActivites = db.collection("activites");
const activites = await dbActivites.where("date", "!=", "").get();

activites.forEach((doc) => {
  listeActivites.push(doc.data());
});

//---[ RÉCUPÉRATION ACTUS ]---

var listeActus = [];

const dbActualites = db.collection("actualites");
const actus = await dbActualites.where("titre", "!=", "").get();

actus.forEach((doc) => {
  listeActus.push(doc.data());
});

//--- EXPORT DES DONNEES

export { anniversaires, listeEquipe, listeActivites, listeActus };
