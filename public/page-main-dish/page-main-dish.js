"use strict";

class PageMainDish {

  constructor(app, db) {
      this.app = app;
      this.db = db;

  }

  async show() {
      // Anzuzeigenden Seiteninhalt nachladen
      let html = await fetch("page-main-dish/page-main-dish.html");
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

      await this._renderLunchTiles(pageDom);

      this.app.setPageTitle("Kategorie: Hauptspeise", {isSubPage: true});
      this.app.setPageCss(css);
      this.app.setPageContent(pageDom.querySelector("main"));
  }


  async _renderLunchTiles(pageDom) {
      var mainElement = pageDom.querySelector("main");
      // Speichert einen Array mit allen in der Datenbank hinterlegten Rezepten in der Variable Rezepte
      var rezepte = await this.app.db.getAllRezepte();
      var rezepteHauptspeise = [];

      var m = 0;
      for (var i = 0; i < rezepte.length; i++) {
        if (rezepte[i].kategorie == "Hauptspeise") {
            rezepteHauptspeise[m] = rezepte[i];
            m++;
        }
      }

      // Mittagessen-Elemente holen
      var kategorieMittag = pageDom.querySelector("#kategorie");
      let html = kategorieMittag.innerHTML;
      html = html.replace("{Kategorie}", "Hauptspeise");
      mainElement.innerHTML += html;
      let templateElement = pageDom.querySelector("#template-tile");

      for (var i = 0; i < rezepteHauptspeise.length; i++) {
           html = templateElement.innerHTML;
           html = html.replace("{HREF}", `#/Detail/${rezepteHauptspeise[i].name}`);
           // Auslesen der Firestorage URL des Bildes und setzten als scr Attribut
           let reftoPicture = await this.app.db.rezepteFirestorage.child(rezepteHauptspeise[i].img);
           await reftoPicture.getDownloadURL().then(url => { html = html.replace(`{IMG}`, url); });
           html = html.replace("{NAME}", rezepteHauptspeise[i].showname);
           html = html.replace("{ZEIT}", rezepteHauptspeise[i].zubereitungszeit);
           let anzahlSterne = rezepteHauptspeise[i].aufwand;
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

         if (rezepteHauptspeise[i] != null){
             var vorhandenesObjekt = pageDom.querySelector("main");
             vorhandenesObjekt = vorhandenesObjekt.lastElementChild.lastElementChild;

             var einzufuegendesObjekt1 = document.createElement("div");
             einzufuegendesObjekt1.className = "col-md-6";

             var einzufuegendesObjekt2 = document.createElement("a");
             einzufuegendesObjekt2.href = `#/Detail/${rezepteHauptspeise[i].name}`;

             var einzufuegendesObjekt3 = document.createElement("img");
             let reftoPicture = await this.app.db.rezepteFirestorage.child(rezepteHauptspeise[i].img);
             let url = await reftoPicture.getDownloadURL()
             einzufuegendesObjekt3.src = url;
             einzufuegendesObjekt3.alt = "";

             var einzufuegendesObjekt4 = document.createElement("div");
             einzufuegendesObjekt4.innerHTML = rezepteHauptspeise[i].showname;

             var einzufuegendesObjekt5 = document.createElement("div");
             einzufuegendesObjekt5.innerHTML = `Zubereitungszeit: ${rezepteHauptspeise[i].zubereitungszeit} Minuten`;

             var einzufuegendesObjekt6 = document.createElement("div");
             einzufuegendesObjekt6.innerHTML = "Aufwand";

             let anzahlSterne = rezepteHauptspeise[i].aufwand;
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

} // Ende Klasse PageLunch
