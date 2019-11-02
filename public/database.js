"use strict";

class Database {
  constructor(app) {

    this.app = app;

    firebase.initializeApp({
      apiKey: "AIzaSyCqun6HRisfdCVH7PoWShcV7DOGSOhQHw4",
      authDomain: "rezeptefinder.firebaseapp.com",
      databaseURL: "gs://rezeptefinder.appspot.com/",
      projectId: "rezeptefinder",
      storageBucket: "rezeptefinder.appspot.com",
      messagingSenderId: "1073345181097",
      appId: "1:1073345181097:web:4e448a1ec88b36108cc0b8",
      measurementId: "G-KZM50L6CCE"
    });


    this.rezepteFirestore = firebase.firestore();
    this.rezepteFirestorage = firebase.storage().ref();
    this.rezepteCollection = this.rezepteFirestore.collection("rezepte");



    this._data = [{
         id:          1,
         img:        "food/rumpsteak.jpg",
         name:       "Rumpsteak mit Balsamico-Tomaten",
         aufwand:    "Mittel",
         zeit:       "90 Minuten"
     },{
         id:          2,
         img:        "food/lasagne.jpg",
         name:       "Hackfleisch-Lasagne",
         aufwand:    "Mittel",
         zeit:       "90 Minuten"
     }];
  }

  bildurl;

/*
Datenstruktur
name: String, ist eindeutige ID. Das heißt es kann z.B. nur ein Rezept mit dem Namen Hähnchen geben. (Zweites Hähnchen überschreibt erstes Hähnchen)
zubereitung: String
aufwand: Wertebereicht 1-5, gespeichert als int.
zubereitungszeit: int in Minuten


Implementation später:
zutaten: Unterarray mit Strings
img: Referenz auf Datei in Firestorage als String übergeben


*/


  async writeRezept(name, zubereitung, aufwand, zubereitungszeit, file) {
    let downloadurl;
    let path = (+new Date()) + '-' + file.name;
    let metadata = {
      contentType: file.type
    };

    let rezepteFirestoragedir = this.rezepteFirestorage.child(path);
    rezepteFirestoragedir.put(file, metadata)
    .catch(console.error);

    this.rezepteCollection.doc(name).set({
    name: name,
    zubereitung: zubereitung,
    aufwand: aufwand,
    zubereitungszeit: zubereitungszeit,
    img: path
    }).then(function() {
    console.log("Rezept eingereicht");
    }).catch(function(error) {
    console.error("Einreichen fehlgeschlagen: ", error);
    });
  }

  async getAllRezepte() {
    let result = await this.rezepteCollection.orderBy("name").get();
    let rezepte = [];

    result.forEach(entry => {
      let rezept = entry.data();
      rezepte.push(rezept);
    });

    return rezepte;
  };

  getpictureURL(rezept, ) {
    let path = rezept.path;
    let rezepteFirestoragedir = this.rezepteFirestorage.child(path);

  };

  getAllRecords() {
      return this._data;
  }
}
