"use strict";

class PageSubmit {

  constructor(app, db) {
      this.app = app;
      this.db = db;
      this.anzahlzutaten = 0;

  }

  async show() {
      // Anzuzeigenden Seiteninhalt nachladen
      let html = await fetch("page-submit/page-submit.html");
      let css = await fetch("bootstrap/css/bootstrap.css");

      if (html.ok && css.ok) {
          html = await html.text();
          css = await css.text();
      } else {
          console.error("Fehler beim Laden des HTML/CSS-Inhalts");
          return;
      }

      // Seite zur Anzeige bringen
      let pageDom = document.createElement("div");
      pageDom.innerHTML = html;

      pageDom.querySelector("#addzutat").addEventListener('click',() => {
        var div = document.createElement('div');
        div.innerHTML = '<div><input type="number" name="menge" class="menge" required><select type="text" name="einheit" class="einheit" required><option value="Tl">Tl</option><option value="g">g</option></select><input type="text" name="zutat" class="zutat" required></div>';
        document.getElementById("zutaten").appendChild(div);
      });

      pageDom.querySelector("#removezutat").addEventListener('click',() => {
        zutaten = document.getElementById("zutaten");
        zutaten.removeChild(zutaten.lastChild);
      });

      pageDom.querySelector("#contactForm").addEventListener('submit', (e) => {
        e.preventDefault();

        var pushedmengen = [];
        var pushedeinheiten = [];
        var pushedzutaten = [];

        var mengen = document.getElementsByClassName('menge');
        for(var i = 0; i < mengen.length; i++){
          if (typeof mengen[i].value !== "undefined") {
          pushedmengen.push(mengen[i].value);
          }
        };

        var einheiten = document.getElementsByClassName('einheit');
        for(var i = 0; i < einheiten.length; i++){
          if (typeof einheiten[i].value !== "undefined") {
          pushedeinheiten.push(einheiten[i].value);
          }
        };

        var zutaten = document.getElementsByClassName('zutat');
        for(var i = 0; i < zutaten.length; i++){
          if (typeof zutaten[i].value !== "undefined") {
          pushedzutaten.push(zutaten[i].value);
          }
        };



        var showname = document.getElementById("contactForm").name.value;
        var zubereitung = document.getElementById("contactForm").zubereitung.value;
        var aufwand = document.getElementById("contactForm").auf.value;
        var zubereitungszeit = document.getElementById("contactForm").zubereitungszeit.value;
        var kategorie = document.getElementById("contactForm").kategorie.value;


        let file = document.querySelector('#image').files[0];
        var name = showname.replace(/[^A-Za-z0-9\-_]/g, '_');

        this.db.writeRezept(name, showname, zubereitung, aufwand, zubereitungszeit, kategorie, pushedmengen, pushedeinheiten, pushedzutaten, file);

        console.log(showname);
        console.log(name);
        console.log(zubereitung);
        console.log(aufwand);
        console.log(zubereitungszeit);
        console.log(kategorie);
        console.log(pushedmengen);
        console.log(pushedeinheiten);
        console.log(pushedzutaten);

      });


      this.app.setPageTitle("Einreichen", {isSubPage: true});
      this.app.setPageCss(css);
      this.app.setPageContent(pageDom.querySelector("main"));
  };

  // Ereignisbehandlung Submit Button
  // Speichert den Eintrag in Datenbank

   writetoDB() {

    //this.db.writeRezept(showname1, str1, "einfach machen", 5, 50, "Frühstück", ["Saab", "Volvo", "BMW"], file);
    //this.db.writeRezept(showname2, str2, "einfach machen", 5, 50, "Mittagessen", ["Saab", "Volvo", "BMW"], file);

  }
}
