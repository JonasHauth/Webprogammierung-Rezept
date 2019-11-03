"use strict";

class PageStart {

  constructor(app, db) {
      this.app = app;
      this.db = db;

  }

  async show() {
      // Anzuzeigenden Seiteninhalt nachladen
      let html = await fetch("page-start/page-start.html");
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

      await this._renderFoodTiles(pageDom);

      this.app.setPageTitle("Startseite");
      this.app.setPageCss(css);
      this.app.setPageHeader(pageDom.querySelector("header"));
      this.app.setPageContent(pageDom.querySelector("main"));

  }

  async _renderFoodTiles(pageDom) {
      let mainElement = pageDom.querySelector("main");
      let templateElement = pageDom.querySelector("#template-tile");
      // Speichert einen Array mit allen in der Datenbank hinterlegten Rezepten in der Variable Rezepte
      let rezepte = await this.app.db.getAllRezepte();

      // Loope über den Rezept-Array und setzte die entsprechenden Elemente in das HTML Template ein und füge es dem HTML hinzu
      for (var i = 0; i < rezepte.length; i++) {
        let html = templateElement.innerHTML;
        html = html.replace("{HREF}", `#/Detail/${rezepte[i].name}`);
        // Auslesen der Firestorage URL des Bildes und setzten als scr Attribut
        let reftoPicture = await this.app.db.rezepteFirestorage.child(rezepte[i].img);
        await reftoPicture.getDownloadURL().then(url => { html = html.replace(`{IMG}`, url); });
        html = html.replace("{NAME}", rezepte[i].name);
        html = html.replace("{ZEIT}", rezepte[i].zubereitungszeit);
        html = html.replace("{AUFWAND}", rezepte[i].aufwand);
        mainElement.innerHTML += html;
    }
  }
}
