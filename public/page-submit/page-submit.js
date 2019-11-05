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
      let css = await fetch("page-submit/page-submit.css");

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
        div.innerHTML = '<input type="number" name="menge"><select type="text" name="kategorie"><option value="Tl">Tl</option><option value="g">g</option></select><input type="text" name="zutat">';
        document.getElementById("zutaten").appendChild(div);
      });

      pageDom.querySelector("#contactForm").addEventListener('submit', (e) => {
        e.preventDefault();

        var showname = document.getElementById("contactForm").name.value;
        var zubereitung = document.getElementById("contactForm").zubereitung.value;
        var aufwand = document.getElementById("contactForm").auf.value;
        var zubereitungszeit = document.getElementById("contactForm").zubereitungszeit.value;
        var kategorie = document.getElementById("contactForm").kategorie.value;

        //let file = document.querySelector('#image').files[0];
        var name = showname.replace(/[^A-Za-z0-9\-_]/g, '_');

        this.writetoDB();

        console.log(showname);
        console.log(name);
        console.log(zubereitung);
        console.log(aufwand);
        console.log(zubereitungszeit);
        console.log(kategorie);

      });


      this.app.setPageTitle("Einreichen", {isSubPage: true});
      this.app.setPageCss(css);
      this.app.setPageHeader(pageDom.querySelector("header"));
      this.app.setPageContent(pageDom.querySelector("main"));
  };

  // Ereignisbehandlung Submit Button
  // Speichert den Eintrag in Datenbank

   writetoDB() {

    //this.db.writeRezept(showname1, str1, "einfach machen", 5, 50, "Frühstück", ["Saab", "Volvo", "BMW"], file);
    //this.db.writeRezept(showname2, str2, "einfach machen", 5, 50, "Mittagessen", ["Saab", "Volvo", "BMW"], file);

  }
}
