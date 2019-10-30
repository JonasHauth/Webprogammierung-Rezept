"use strict";

class Database {
  constructor() {
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

       this._data = [
     {
         id:          1,
         img:        "food/rumpsteak.jpg",
         name:       "Rumpsteak mit Balsamico-Tomaten",
         aufwand:    "Mittel",
         zeit:       "90 Minuten"
     },{
         id:          2,
         img:        "food/lasagne",
         name:       "Hackfleisch-Lasagne",
         aufwand:    "Mittel",
         zeit:       "90 Minuten"
     }
 ];
  }

  async createDemoData () {

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

  getAllRezepte() {
    return this._data;
  }
}
