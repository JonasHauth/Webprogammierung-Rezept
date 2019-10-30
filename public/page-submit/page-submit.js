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



      this.app.setPageTitle("Einreichen", {isSubPage: true});
      this.app.setPageCss(css);
      this.app.setPageHeader(pageDom.querySelector("header"));
      this.app.setPageContent(pageDom.querySelector("main"));


      pageDom.querySelector("#on-submit-button").addEventListener("click", () => this.onSubmitButtonClicked());
  }

  onSubmitButtonClicked() {

  }

      // Ereignisbehandlung Submit Button
      // Speichert den Eintrag in Datenbank

}
