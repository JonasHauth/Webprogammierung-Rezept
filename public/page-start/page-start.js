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
        html = html.replace("{NAME}", rezepte[i].showname);
        html = html.replace("{ZEIT}", rezepte[i].zubereitungszeit);
        let anzahlSterne = rezepte[i].aufwand;
        switch (anzahlSterne){
            case 5:
            html = html.replace("{Stern1}", "icon-star-filled");
            html = html.replace("{Stern2}", "icon-star-filled");
            html = html.replace("{Stern3}", "icon-star-filled");
            html = html.replace("{Stern4}", "icon-star-filled");
            html = html.replace("{Stern5}", "icon-star-filled");
            break;
            case 4:
            html = html.replace("{Stern1}", "icon-star-filled");
            html = html.replace("{Stern2}", "icon-star-filled");
            html = html.replace("{Stern3}", "icon-star-filled");
            html = html.replace("{Stern4}", "icon-star-filled");
            html = html.replace("{Stern5}", "icon-star");
            break;
            case 3:
            html = html.replace("{Stern1}", "icon-star-filled");
            html = html.replace("{Stern2}", "icon-star-filled");
            html = html.replace("{Stern3}", "icon-star-filled");
            html = html.replace("{Stern4}", "icon-star");
            html = html.replace("{Stern5}", "icon-star");
            break;
            case 2:
            html = html.replace("{Stern1}", "icon-star-filled");
            html = html.replace("{Stern2}", "icon-star-filled");
            html = html.replace("{Stern3}", "icon-star");
            html = html.replace("{Stern4}", "icon-star");
            html = html.replace("{Stern5}", "icon-star");
            break;
            case 1:
            html = html.replace("{Stern1}", "icon-star-filled");
            html = html.replace("{Stern2}", "icon-star");
            html = html.replace("{Stern3}", "icon-star");
            html = html.replace("{Stern4}", "icon-star");
            html = html.replace("{Stern5}", "icon-star");
            break;
            case 0:
            html = html.replace("{Stern1}", "icon-star");
            html = html.replace("{Stern2}", "icon-star");
            html = html.replace("{Stern3}", "icon-star");
            html = html.replace("{Stern4}", "icon-star");
            html = html.replace("{Stern5}", "icon-star");
            break;
        }
        i++;
        if (rezepte[i] != null){
            html = html.replace("{HREF}", `#/Detail/${rezepte[i].name}`);
            // Auslesen der Firestorage URL des Bildes und setzten als scr Attribut
            let reftoPicture = await this.app.db.rezepteFirestorage.child(rezepte[i].img);
            await reftoPicture.getDownloadURL().then(url => { html = html.replace(`{IMG}`, url); });
            html = html.replace("{NAME}", rezepte[i].showname);
            html = html.replace("{ZEIT}", rezepte[i].zubereitungszeit);
            let anzahlSterne = rezepte[i].aufwand;
            switch (anzahlSterne){
                case 5:
                html = html.replace("{Stern1}", "icon-star-filled");
                html = html.replace("{Stern2}", "icon-star-filled");
                html = html.replace("{Stern3}", "icon-star-filled");
                html = html.replace("{Stern4}", "icon-star-filled");
                html = html.replace("{Stern5}", "icon-star-filled");
                break;
                case 4:
                html = html.replace("{Stern1}", "icon-star-filled");
                html = html.replace("{Stern2}", "icon-star-filled");
                html = html.replace("{Stern3}", "icon-star-filled");
                html = html.replace("{Stern4}", "icon-star-filled");
                html = html.replace("{Stern5}", "icon-star");
                break;
                case 3:
                html = html.replace("{Stern1}", "icon-star-filled");
                html = html.replace("{Stern2}", "icon-star-filled");
                html = html.replace("{Stern3}", "icon-star-filled");
                html = html.replace("{Stern4}", "icon-star");
                html = html.replace("{Stern5}", "icon-star");
                break;
                case 2:
                html = html.replace("{Stern1}", "icon-star-filled");
                html = html.replace("{Stern2}", "icon-star-filled");
                html = html.replace("{Stern3}", "icon-star");
                html = html.replace("{Stern4}", "icon-star");
                html = html.replace("{Stern5}", "icon-star");
                break;
                case 1:
                html = html.replace("{Stern1}", "icon-star-filled");
                html = html.replace("{Stern2}", "icon-star");
                html = html.replace("{Stern3}", "icon-star");
                html = html.replace("{Stern4}", "icon-star");
                html = html.replace("{Stern5}", "icon-star");
                break;
                case 0:
                html = html.replace("{Stern1}", "icon-star");
                html = html.replace("{Stern2}", "icon-star");
                html = html.replace("{Stern3}", "icon-star");
                html = html.replace("{Stern4}", "icon-star");
                html = html.replace("{Stern5}", "icon-star");
                break;
            }
        }
        mainElement.innerHTML += html;
    }
  }
}
