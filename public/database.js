"use strict";

class Database {
  constructor(app) {

    this.app = app;

    firebase.initializeApp({
      apiKey: 'AIzaSyCqun6HRisfdCVH7PoWShcV7DOGSOhQHw4',
      authDomain: 'https://rezeptefinder.firebaseio.com',
      projectId: 'rezeptefinder'
    });

    this.rezepteFirestore = firebase.firestore();
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


  async writeRezept(name, zubereitung, aufwand, zubereitungszeit) {
    this.rezepteCollection.doc(name).set({
    name: name,
    zubereitung: zubereitung,
    aufwand: aufwand,
    zubereitungszeit: zubereitungszeit
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
      console.log(rezept);
      rezepte.push(rezepte);
    });

    return rezepte;
  };


  getAllRecords() {
      return this._data;
  }

//für Datenbankzugriff, wenn diese fertig ist
  async selectRezeptById(id) {
        //let result = await this.rezepteCollection.doc(id).get();
        //return result;
        let result;
        for(let i = 0; i < this._data.length; i++) {
          if(this._data[i].id == id) {
            result = this._data[i];
          }
        }
        return result;
    }
}
