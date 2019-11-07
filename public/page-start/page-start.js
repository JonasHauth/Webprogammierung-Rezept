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
      this.app.setPageTitle("Startseite");
      this.app.setPageCss(css);

      // Seite zur Anzeige bringen
      let pageDom = document.createElement("div");
      pageDom.innerHTML = html;

      await this._renderFoodTiles(pageDom);

      this.app.setPageContent(pageDom.querySelector("main"));
  }


  async _renderFoodTiles(pageDom) {
      var mainElement = pageDom.querySelector("main");
      // Speichert einen Array mit allen in der Datenbank hinterlegten Rezepten in der Variable Rezepte
      var rezepte = await this.app.db.getAllRezepte();
      var rezepteFruehstueck = [];
      var rezepteMittagessen = [];

      var f = 0;
      var m = 0;
      for (var i = 0; i < rezepte.length; i++) {
        switch (rezepte[i].kategorie) {
            case "Frühstück":
                rezepteFruehstueck[f] = rezepte[i];
                f++;
                break;
            case "Mittagessen":
                rezepteMittagessen[m] = rezepte[i];
                m++;
                break;
            default:

        }
      }

      // Frühstück-Elemente holen
      var kategorie = pageDom.querySelector("#kategorie");
      let html = kategorie.innerHTML;
      html = html.replace("{Kategorie}", "Frühstück");
      mainElement.innerHTML += html;
      var templateElement = pageDom.querySelector("#template-tile");
      for (var i = 0; i < rezepteFruehstueck.length; i++) {
          let html = templateElement.innerHTML;
          html = html.replace("{HREF}", `#/Detail/${rezepteFruehstueck[i].name}`);
          // Auslesen der Firestorage URL des Bildes und setzten als scr Attribut
          let reftoPicture = await this.app.db.rezepteFirestorage.child(rezepteFruehstueck[i].img);
          await reftoPicture.getDownloadURL().then(url => { html = html.replace(`{IMG}`, url); });
          html = html.replace("{NAME}", rezepteFruehstueck[i].showname);
          html = html.replace("{ZEIT}", rezepteFruehstueck[i].zubereitungszeit);
          let anzahlSterne = rezepteFruehstueck[i].aufwand;
          switch (anzahlSterne) {
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
        mainElement.innerHTML += html;
        i++;
        if (rezepteFruehstueck[i] != null){
            var vorhandenesObjekt = pageDom.querySelector("main");
            vorhandenesObjekt = vorhandenesObjekt.lastElementChild.lastElementChild;

            var einzufuegendesObjekt1 = document.createElement("div");
            einzufuegendesObjekt1.className = "col-md-6";

            var einzufuegendesObjekt2 = document.createElement("a");
            einzufuegendesObjekt2.href = `#/Detail/${rezepteFruehstueck[i].name}`;

            var einzufuegendesObjekt3 = document.createElement("img");
            let reftoPicture = await this.app.db.rezepteFirestorage.child(rezepteFruehstueck[i].img);
            let url = await reftoPicture.getDownloadURL()
            einzufuegendesObjekt3.src = url;
            einzufuegendesObjekt3.alt = "";

            var einzufuegendesObjekt4 = document.createElement("div");
            einzufuegendesObjekt4.innerHTML = rezepteFruehstueck[i].showname;

            var einzufuegendesObjekt5 = document.createElement("div");
            einzufuegendesObjekt5.innerHTML = `Zubereitungszeit: ${rezepteFruehstueck[i].zubereitungszeit} Minuten`;

            var einzufuegendesObjekt6 = document.createElement("div");
            einzufuegendesObjekt6.innerHTML = "Aufwand";

            let anzahlSterne = rezepteFruehstueck[i].aufwand;
            switch (anzahlSterne){
                case 5:
                var einzufuegendesObjekt7 = document.createElement("i");
                einzufuegendesObjekt7.className = "icon-star-filled";
                var einzufuegendesObjekt8 = document.createElement("i");
                einzufuegendesObjekt8.className = "icon-star-filled";
                var einzufuegendesObjekt9 = document.createElement("i");
                einzufuegendesObjekt9.className = "icon-star-filled";
                var einzufuegendesObjekt10 = document.createElement("i");
                einzufuegendesObjekt10.className = "icon-star-filled";
                var einzufuegendesObjekt11 = document.createElement("i");
                einzufuegendesObjekt11.className = "icon-star-filled";
                break;

                case 4:
                var einzufuegendesObjekt7 = document.createElement("i");
                einzufuegendesObjekt7.className = "icon-star-filled";
                var einzufuegendesObjekt8 = document.createElement("i");
                einzufuegendesObjekt8.className = "icon-star-filled";
                var einzufuegendesObjekt9 = document.createElement("i");
                einzufuegendesObjekt9.className = "icon-star-filled";
                var einzufuegendesObjekt10 = document.createElement("i");
                einzufuegendesObjekt10.className = "icon-star-filled";
                var einzufuegendesObjekt11 = document.createElement("i");
                einzufuegendesObjekt11.className = "icon-star";
                break;

                case 3:
                var einzufuegendesObjekt7 = document.createElement("i");
                einzufuegendesObjekt7.className = "icon-star-filled";
                var einzufuegendesObjekt8 = document.createElement("i");
                einzufuegendesObjekt8.className = "icon-star-filled";
                var einzufuegendesObjekt9 = document.createElement("i");
                einzufuegendesObjekt9.className = "icon-star-filled";
                var einzufuegendesObjekt10 = document.createElement("i");
                einzufuegendesObjekt10.className = "icon-star";
                var einzufuegendesObjekt11 = document.createElement("i");
                einzufuegendesObjekt11.className = "icon-star";
                break;

                case 2:
                var einzufuegendesObjekt7 = document.createElement("i");
                einzufuegendesObjekt7.className = "icon-star-filled";
                var einzufuegendesObjekt8 = document.createElement("i");
                einzufuegendesObjekt8.className = "icon-star-filled";
                var einzufuegendesObjekt9 = document.createElement("i");
                einzufuegendesObjekt9.className = "icon-star";
                var einzufuegendesObjekt10 = document.createElement("i");
                einzufuegendesObjekt10.className = "icon-star";
                var einzufuegendesObjekt11 = document.createElement("i");
                einzufuegendesObjekt11.className = "icon-star";
                break;

                case 1:
                var einzufuegendesObjekt7 = document.createElement("i");
                einzufuegendesObjekt7.className = "icon-star-filled";
                var einzufuegendesObjekt8 = document.createElement("i");
                einzufuegendesObjekt8.className = "icon-star";
                var einzufuegendesObjekt9 = document.createElement("i");
                einzufuegendesObjekt9.className = "icon-star";
                var einzufuegendesObjekt10 = document.createElement("i");
                einzufuegendesObjekt10.className = "icon-star";
                var einzufuegendesObjekt11 = document.createElement("i");
                einzufuegendesObjekt11.className = "icon-star";
                break;

                case 0:
                var einzufuegendesObjekt7 = document.createElement("i");
                einzufuegendesObjekt7.className = "icon-star";
                var einzufuegendesObjekt8 = document.createElement("i");
                einzufuegendesObjekt8.className = "icon-star";
                var einzufuegendesObjekt9 = document.createElement("i");
                einzufuegendesObjekt9.className = "icon-star";
                var einzufuegendesObjekt10 = document.createElement("i");
                einzufuegendesObjekt10.className = "icon-star";
                var einzufuegendesObjekt11 = document.createElement("i");
                einzufuegendesObjekt11.className = "icon-star";
                break;
            }



            einzufuegendesObjekt6.appendChild(einzufuegendesObjekt7);
            einzufuegendesObjekt6.appendChild(einzufuegendesObjekt8);
            einzufuegendesObjekt6.appendChild(einzufuegendesObjekt9);
            einzufuegendesObjekt6.appendChild(einzufuegendesObjekt10);
            einzufuegendesObjekt6.appendChild(einzufuegendesObjekt11);

            einzufuegendesObjekt2.appendChild(einzufuegendesObjekt3);
            einzufuegendesObjekt2.appendChild(einzufuegendesObjekt4);
            einzufuegendesObjekt2.appendChild(einzufuegendesObjekt5);
            einzufuegendesObjekt2.appendChild(einzufuegendesObjekt6);

            einzufuegendesObjekt1.appendChild(einzufuegendesObjekt2);

            vorhandenesObjekt.appendChild(einzufuegendesObjekt1);
        }

     } // Ende for-Schleife Frühstück

     var kategorieMittag = pageDom.querySelector("#kategorie");
     html = kategorieMittag.innerHTML;
     html = html.replace("{Kategorie}", "Mittagessen");
     mainElement.innerHTML += html;
     templateElement = pageDom.querySelector("#template-tile");

     for (var i = 0; i < rezepteMittagessen.length; i++) {
          html = templateElement.innerHTML;
          html = html.replace("{HREF}", `#/Detail/${rezepteMittagessen[i].name}`);
          // Auslesen der Firestorage URL des Bildes und setzten als scr Attribut
          let reftoPicture = await this.app.db.rezepteFirestorage.child(rezepteMittagessen[i].img);
          await reftoPicture.getDownloadURL().then(url => { html = html.replace(`{IMG}`, url); });
          html = html.replace("{NAME}", rezepteMittagessen[i].showname);
          html = html.replace("{ZEIT}", rezepteMittagessen[i].zubereitungszeit);
          let anzahlSterne = rezepteMittagessen[i].aufwand;
          switch (anzahlSterne) {
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
        mainElement.innerHTML += html;
        i++;

        if (rezepteMittagessen[i] != null){
            var vorhandenesObjekt = pageDom.querySelector("main");
            vorhandenesObjekt = vorhandenesObjekt.lastElementChild.lastElementChild;

            var einzufuegendesObjekt1 = document.createElement("div");
            einzufuegendesObjekt1.className = "col-md-6";

            var einzufuegendesObjekt2 = document.createElement("a");
            einzufuegendesObjekt2.href = `#/Detail/${rezepteMittagessen[i].name}`;

            var einzufuegendesObjekt3 = document.createElement("img");
            let reftoPicture = await this.app.db.rezepteFirestorage.child(rezepteMittagessen[i].img);
            let url = await reftoPicture.getDownloadURL()
            einzufuegendesObjekt3.src = url;
            einzufuegendesObjekt3.alt = "";

            var einzufuegendesObjekt4 = document.createElement("div");
            einzufuegendesObjekt4.innerHTML = rezepteMittagessen[i].showname;

            var einzufuegendesObjekt5 = document.createElement("div");
            einzufuegendesObjekt5.innerHTML = `Zubereitungszeit: ${rezepteMittagessen[i].zubereitungszeit} Minuten`;

            var einzufuegendesObjekt6 = document.createElement("div");
            einzufuegendesObjekt6.innerHTML = "Aufwand";

            let anzahlSterne = rezepteMittagessen[i].aufwand;
            switch (anzahlSterne){
                case 5:
                var einzufuegendesObjekt7 = document.createElement("i");
                einzufuegendesObjekt7.className = "icon-star-filled";
                var einzufuegendesObjekt8 = document.createElement("i");
                einzufuegendesObjekt8.className = "icon-star-filled";
                var einzufuegendesObjekt9 = document.createElement("i");
                einzufuegendesObjekt9.className = "icon-star-filled";
                var einzufuegendesObjekt10 = document.createElement("i");
                einzufuegendesObjekt10.className = "icon-star-filled";
                var einzufuegendesObjekt11 = document.createElement("i");
                einzufuegendesObjekt11.className = "icon-star-filled";
                break;

                case 4:
                var einzufuegendesObjekt7 = document.createElement("i");
                einzufuegendesObjekt7.className = "icon-star-filled";
                var einzufuegendesObjekt8 = document.createElement("i");
                einzufuegendesObjekt8.className = "icon-star-filled";
                var einzufuegendesObjekt9 = document.createElement("i");
                einzufuegendesObjekt9.className = "icon-star-filled";
                var einzufuegendesObjekt10 = document.createElement("i");
                einzufuegendesObjekt10.className = "icon-star-filled";
                var einzufuegendesObjekt11 = document.createElement("i");
                einzufuegendesObjekt11.className = "icon-star";
                break;

                case 3:
                var einzufuegendesObjekt7 = document.createElement("i");
                einzufuegendesObjekt7.className = "icon-star-filled";
                var einzufuegendesObjekt8 = document.createElement("i");
                einzufuegendesObjekt8.className = "icon-star-filled";
                var einzufuegendesObjekt9 = document.createElement("i");
                einzufuegendesObjekt9.className = "icon-star-filled";
                var einzufuegendesObjekt10 = document.createElement("i");
                einzufuegendesObjekt10.className = "icon-star";
                var einzufuegendesObjekt11 = document.createElement("i");
                einzufuegendesObjekt11.className = "icon-star";
                break;

                case 2:
                var einzufuegendesObjekt7 = document.createElement("i");
                einzufuegendesObjekt7.className = "icon-star-filled";
                var einzufuegendesObjekt8 = document.createElement("i");
                einzufuegendesObjekt8.className = "icon-star-filled";
                var einzufuegendesObjekt9 = document.createElement("i");
                einzufuegendesObjekt9.className = "icon-star";
                var einzufuegendesObjekt10 = document.createElement("i");
                einzufuegendesObjekt10.className = "icon-star";
                var einzufuegendesObjekt11 = document.createElement("i");
                einzufuegendesObjekt11.className = "icon-star";
                break;

                case 1:
                var einzufuegendesObjekt7 = document.createElement("i");
                einzufuegendesObjekt7.className = "icon-star-filled";
                var einzufuegendesObjekt8 = document.createElement("i");
                einzufuegendesObjekt8.className = "icon-star";
                var einzufuegendesObjekt9 = document.createElement("i");
                einzufuegendesObjekt9.className = "icon-star";
                var einzufuegendesObjekt10 = document.createElement("i");
                einzufuegendesObjekt10.className = "icon-star";
                var einzufuegendesObjekt11 = document.createElement("i");
                einzufuegendesObjekt11.className = "icon-star";
                break;

                case 0:
                var einzufuegendesObjekt7 = document.createElement("i");
                einzufuegendesObjekt7.className = "icon-star";
                var einzufuegendesObjekt8 = document.createElement("i");
                einzufuegendesObjekt8.className = "icon-star";
                var einzufuegendesObjekt9 = document.createElement("i");
                einzufuegendesObjekt9.className = "icon-star";
                var einzufuegendesObjekt10 = document.createElement("i");
                einzufuegendesObjekt10.className = "icon-star";
                var einzufuegendesObjekt11 = document.createElement("i");
                einzufuegendesObjekt11.className = "icon-star";
                break;
            }



            einzufuegendesObjekt6.appendChild(einzufuegendesObjekt7);
            einzufuegendesObjekt6.appendChild(einzufuegendesObjekt8);
            einzufuegendesObjekt6.appendChild(einzufuegendesObjekt9);
            einzufuegendesObjekt6.appendChild(einzufuegendesObjekt10);
            einzufuegendesObjekt6.appendChild(einzufuegendesObjekt11);

            einzufuegendesObjekt2.appendChild(einzufuegendesObjekt3);
            einzufuegendesObjekt2.appendChild(einzufuegendesObjekt4);
            einzufuegendesObjekt2.appendChild(einzufuegendesObjekt5);
            einzufuegendesObjekt2.appendChild(einzufuegendesObjekt6);

            einzufuegendesObjekt1.appendChild(einzufuegendesObjekt2);

            vorhandenesObjekt.appendChild(einzufuegendesObjekt1);

        }
    } // Ende for-Schleife Mittagessen

  } // Ende _renderFoodTiles

} // Ende Klasse PageStart
