"use strict";

class Database {
  constructor(app) {

    this.app = app;

    // Firebase initialisieren mit allen Diensten.
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

    // Referenz für Filestorage anlegen
    this.rezepteFirestore = firebase.firestore();
    // Referenz für Database anlegen
    this.rezepteFirestorage = firebase.storage().ref();
    this.rezepteCollection = this.rezepteFirestore.collection("rezepte");
  }

  // Schreiben der übergebenen Variablen in die Datenbank
  async writeRezept(idname, showname, zubereitung, aufwand, zubereitungszeit, kategorie, zutaten, file) {
    // Pfad für Bild aus Datum und Dateinamen konkatenieren
    let path = (+new Date()) + '-' + file.name;
    // Directory in Firestorage anlegen
    let rezepteFirestoragedir = this.rezepteFirestorage.child(path);
    // Bild in Directory hochladen
    rezepteFirestoragedir.put(file).catch(console.error);

    // Upload der Informationen aus Einreichen Formular in Firebase Datenbank
    this.rezepteCollection.doc(idname).set({
    name: idname,
    showname: showname,
    zubereitung: zubereitung,
    aufwand: aufwand,
    zubereitungszeit: zubereitungszeit,
    kategorie: kategorie,
    zutaten: zutaten,
    img: path
    // Weitere Behandlung, Log Rezept eingereicht oder Error
    }).then(function() { console.log("Rezept eingereicht"); }).catch(function(error) { console.error("Einreichen fehlgeschlagen: ", error); });
  }

  async getAllRezepte() {
    // Alle Datensätze aus der Firebase Database nach Schlüssel Name sortiert auslesen
    let result = await this.rezepteCollection.orderBy("name").get();
    let rezepte = [];

    // Über die Datzensätze loopen und in Datensätze in den Array rezpte speichen
    result.forEach(entry => {
      let rezept = entry.data();
      rezepte.push(rezept);
    });

    return rezepte;
  };
}
