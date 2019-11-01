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

      pageDom.querySelector("#submit-button").addEventListener("click", () => this.onSubmitButtonClicked());

      this.app.setPageTitle("Einreichen", {isSubPage: true});
      this.app.setPageCss(css);
      this.app.setPageHeader(pageDom.querySelector("header"));
      this.app.setPageContent(pageDom.querySelector("main"));
  }

  // Ereignisbehandlung Submit Button
  // Speichert den Eintrag in Datenbank
  onSubmitButtonClicked() {
  //  this.db.createDemoData();
  //  this.db.saveRezept({
  /*      "id":          "3",
        "img":        "food/rumpsteak.jpg",
        "name":       "Rumpsteak mit Balsamico-Tomaten",
        "aufwand":    "Mittel",
        "zeit":       "90 Minuten"
    })*/
    let rezept = this.db.writeRezept("Hähnchen", "einfach machen", 5, 50 );
    let rezpte = this.db.getAllRezepte();
    
  }



}
