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

const citiesRef = db.collection("adherents");
const snapshot = await citiesRef.where("dateNaissance", "!=", "").get();
if (snapshot.empty) {
  console.log("No matching documents.");
}

snapshot.forEach((doc) => {
  anniversaires.push(doc.data());
});

anniversaires.forEach((anniversaire) => {
  if (anniversaire.dateNaissance.startsWith("a")) {
    var templateParams = {
      name: anniversaire.nomPrenom.split(" ").slice(-1).join(" "), // returns "Panakkal",
      email: "ndoyemd@outlook.fr",
    };

    emailjs
      .send(
        "service_372foy7",
        "template_esbvazo",
        templateParams,
        "user_wLxdF6iNzWGc5Z43gXKiZ"
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

export { anniversaires };
