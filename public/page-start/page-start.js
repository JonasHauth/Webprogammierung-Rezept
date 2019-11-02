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

      this._renderFoodTiles(pageDom);

      this.app.setPageTitle("Startseite");
      this.app.setPageCss(css);
      this.app.setPageHeader(pageDom.querySelector("header"));
      this.app.setPageContent(pageDom.querySelector("main"));

  }

  async _renderFoodTiles(pageDom) {
      let mainElement = pageDom.querySelector("main");
      let templateElement = pageDom.querySelector("#template-tile");
      let rezepte = await this.app.db.getAllRezepte();

      for (var i = 0; i < rezepte.length; i++) {
        let html = templateElement.innerHTML;
        html = html.replace("{HREF}", `#/Detail/${rezepte[i].name}`);
        //html = html.replace("{IMG}", rezept.img);
        //let reftoPicture = this.app.db.rezepteFirestorage.child(rezept.img);
        //reftoPicture.getDownloadURL().then(url => {
        //html.querySelector('#reftoPicture').src = url;
        //});
        console.log(rezepte[i].img);
        html = html.replace("{NAME}", rezepte[i].name);
        console.log(rezepte[i].name);
        html = html.replace("{ZEIT}", rezepte[i].zubereitungszeit);
        console.log(rezepte[i].zubereitungszeit);
        html = html.replace("{AUFWAND}", rezepte[i].aufwand);
        console.log(rezepte[i].aufwand);

        mainElement.innerHTML += html;
      }

      rezepte.forEach(rezept => {
          let html = templateElement.innerHTML;
          html = html.replace("{HREF}", `#/Detail/${rezept.name}`);
          //html = html.replace("{IMG}", rezept.img);
          /*let reftoPicture = this.app.db.rezepteFirestorage.child(rezept.img);
          reftoPicture.getDownloadURL().then(url => {
          html.querySelector('#reftoPicture').src = url;
        });*/

          html = html.replace("{NAME}", rezept.name);
          html = html.replace("{ZEIT}", rezept.zubereitungszeit);
          html = html.replace("{AUFWAND}", rezept.aufwand);

          mainElement.innerHTML += html;
      });

  }



}
