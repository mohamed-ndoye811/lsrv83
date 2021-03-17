import firebase from "firebase/app";

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

// Exports des dates d'anniversire associés aux Nom Prénom
anniversaires.forEach((anniversaire) => {
  if (anniversaire.dateNaissance.startsWith("a")) {
    var templateParams = {
      name: anniversaire.nomPrenom.split(" ").slice(-1).join(" "), // returns "Panakkal",
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

//---[ RÉCUPÉRATION MEMBRES ÉQUIPE ]---

var listeEquipe = [];

const dbEquipe = db.collection("equipe");
const equipe = await dbEquipe.where("Categorie", "!=", "").get();

equipe.forEach((doc) => {
  listeEquipe.push(doc.data());
});

//--- EXPORT DES DONNEES

export { anniversaires, listeEquipe };
