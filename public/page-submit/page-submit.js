"use strict";

class PageSubmit {

  constructor(app, db) {
      this.app = app;
      this.db = db;

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

      pageDom.querySelector("#contactForm").addEventListener('submit', (e) => {
        e.preventDefault();
        this.writetoDB();

      });


      this.app.setPageTitle("Einreichen", {isSubPage: true});
      this.app.setPageCss(css);
      this.app.setPageHeader(pageDom.querySelector("header"));
      this.app.setPageContent(pageDom.querySelector("main"));
  };

  // Ereignisbehandlung Submit Button
  // Speichert den Eintrag in Datenbank

   writetoDB() {
    let file = document.querySelector('#image').files[0];

    var str1 = "Müsli";
    var str2 = "Hackbraten";
    var showname1 = str1.replace(/[^A-Za-z0-9\-_]/g, '-');
    var showname2 = str2.replace(/[^A-Za-z0-9\-_]/g, '-');

    this.db.writeRezept(showname1, str1, "einfach machen", 5, 50, "Frühstück", ["Saab", "Volvo", "BMW"], file);
    this.db.writeRezept(showname2, str2, "einfach machen", 5, 50, "Mittagessen", ["Saab", "Volvo", "BMW"], file);

  }



}
