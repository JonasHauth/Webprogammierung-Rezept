"use strict";

class Database {
  constructor(app) {

    this.app = app;

    firebase.initializeApp({
      apiKey: "AIzaSyCqun6HRisfdCVH7PoWShcV7DOGSOhQHw4",
      authDomain: "rezeptefinder.firebaseapp.com",
      databaseURL: "https://rezeptefinder.firebaseio.com",
      projectId: "rezeptefinder",
      storageBucket: "rezeptefinder.appspot.com",
      messagingSenderId: "1073345181097",
      appId: "1:1073345181097:web:4e448a1ec88b36108cc0b8",
      measurementId: "G-KZM50L6CCE"
      });

       this._db = firebase.firestore();
       this._rezepte = this._db.collection("rezepte");
  }

  async createDemoData () {
    this.saveRezept([{
                "id": "1",
                "titel": "Gemüsebraten",
                "zubereitung": "Einfach alles reinmachen",
                "Aufwand": 3,
                "Zeit": 15,
            }]);
  }

  async selectRezeptById(id) {
        let result = await this._rezepte.doc(id).get();
        return result.data();
    }

  async saveRezept(rezept){
      this._rezepte.doc(book.id).set(book);
  }
  async deleteRezeptbyId(id) {
       return this._rezepte.doc(id).delete();
  }
}
