"use strict";

class PageStart {

  constructor(app, db) {
      this.app = app;
      this.db = db;

  }

  async show() {
      // Anzuzeigenden Seiteninhalt nachladen
      let html = await fetch("page-start/page-start.html");
      let css = await fetch("page-start/page-start.css");

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

      this._renderFoodTiles(pageDom);

      this.app.setPageTitle("Startseite");
      this.app.setPageCss(css);
      this.app.setPageHeader(pageDom.querySelector("header"));
      this.app.setPageContent(pageDom.querySelector("main"));

  }

  _renderFoodTiles(pageDom) {
      let mainElement = pageDom.querySelector("main");
      let templateElement = pageDom.querySelector("#template-tile");

      this.app.db.getAllRecords().forEach(food => {
          let html = templateElement.innerHTML;
          html = html.replace("{HREF}", `#/Detail/${food.id}`);
          html = html.replace("{IMG}", food.img);
          html = html.replace("{NAME}", food.name);
          html = html.replace("{ZEIT}", food.zeit);
          html = html.replace("{AUFWAND}", food.aufwand);

          mainElement.innerHTML += html;
      });
  }



}
