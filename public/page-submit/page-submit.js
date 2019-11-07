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
      let css = await fetch("bootstrap/css/bootstrap.css");

      if (html.ok && css.ok) {
          html = await html.text();
          css = await css.text();
      } else {
          console.error("Fehler beim Laden des HTML/CSS-Inhalts");
          return;
      }

      // Titel und CSS setzen
      this.app.setPageTitle("Einreichen", {isSubPage: true});
      this.app.setPageCss(css);

      // Seite zur Anzeige bringen
      let pageDom = document.createElement("div");
      pageDom.innerHTML = html;

      // Listener Zutatenfeld hinzufügen
      pageDom.querySelector("#addzutat").addEventListener('click',() => {
        var div = document.createElement('div');
        div.innerHTML = '<div><input type="text" name="zutat" class="zutat" placeholder="Menge und Zutat" required></div>';
        document.getElementById("zutaten").appendChild(div);
      });

      // Listener letztes Zutatenfeld entfernen
      pageDom.querySelector("#removezutat").addEventListener('click',() => {
        zutaten = document.getElementById("zutaten");
        zutaten.removeChild(zutaten.lastChild);
      });

      // Listener für das Aussehen und Value des Aufwands
      pageDom.querySelector("#star1").addEventListener('click', this.onclickstar1);
      pageDom.querySelector("#star2").addEventListener('click', this.onclickstar2);
      pageDom.querySelector("#star3").addEventListener('click', this.onclickstar3);
      pageDom.querySelector("#star4").addEventListener('click', this.onclickstar4);
      pageDom.querySelector("#star5").addEventListener('click', this.onclickstar5);


      // Submit Behandlung festlegen
      pageDom.querySelector("#contactForm").addEventListener('submit', (e) => {
        e.preventDefault();

        var pushedzutaten = [];

        var zutaten = document.getElementsByClassName('zutat');
        for(var i = 0; i < zutaten.length; i++){
          if (typeof zutaten[i].value !== "undefined") {
          pushedzutaten.push(zutaten[i].value);
          }
        };

        // Werte aus form holen
        var showname = document.getElementById("contactForm").name.value;
        var zubereitung = document.getElementById("contactForm").zubereitung.value;
        var aufwand = parseInt(document.getElementById("contactForm").auf.value);
        var zubereitungszeit = document.getElementById("contactForm").zubereitungszeit.value;
        var kategorie = document.getElementById("contactForm").kategorie.value;
        let file = document.querySelector('#image').files[0];

        // String bearbeiten, sodass keine Sonderzeichen Probleme bereiten
        var name = showname.replace(/[^A-Za-z0-9\-_]/g, '_');

        // writeRezept aus Datenbank aufrufen, die Datensätze in DB schreibt
        this.db.writeRezept(name, showname, zubereitung, aufwand, zubereitungszeit, kategorie, pushedzutaten, file);

        // Show Rezept eingereicht
        document.querySelector('.alert').style.display = 'block';

        // Hide Rezepte eingereicht after 3 seconds
        setTimeout(function(){
          document.querySelector('.alert').style.display = 'none';
        },3000);

        // Reset Form wenn erfolgreich eingereicht
        document.getElementById('contactForm').reset();

      });

      // Seiteninhalt setzen
      this.app.setPageContent(pageDom.querySelector("main"));
  };

  // Klickbehandlug für die Sterne 1-5, setzt Aussehen und Wert eines versteckten inputs
   onclickstar1() {
     star1 = document.getElementById("star1");
     star1.classList.add("icon-star-filled");
     star1.classList.remove("icon-star");

     star2 = document.getElementById("star2");
     star2.classList.add("icon-star");
     star2.classList.remove("icon-star-filled");
     star3 = document.getElementById("star3");
     star3.classList.add("icon-star");
     star3.classList.remove("icon-star-filled");
     star4 = document.getElementById("star4");
     star4.classList.add("icon-star");
     star4.classList.remove("icon-star-filled");
     star5 = document.getElementById("star5");
     star5.classList.add("icon-star");
     star5.classList.remove("icon-star-filled");
     document.getElementById("stars").value = 1;
   }

   onclickstar2() {
     star1 = document.getElementById("star1");
     star1.classList.add("icon-star-filled");
     star1.classList.remove("icon-star");
     star2 = document.getElementById("star2");
     star2.classList.add("icon-star-filled");
     star2.classList.remove("icon-star");

     star3 = document.getElementById("star3");
     star3.classList.add("icon-star");
     star3.classList.remove("icon-star-filled");
     star4 = document.getElementById("star4");
     star4.classList.add("icon-star");
     star4.classList.remove("icon-star-filled");
     star5 = document.getElementById("star5");
     star5.classList.add("icon-star");
     star5.classList.remove("icon-star-filled");
     document.getElementById("stars").value = 2;
   }

   onclickstar3() {
     star1 = document.getElementById("star1");
     star1.classList.add("icon-star-filled");
     star1.classList.remove("icon-star");
     star2 = document.getElementById("star2");
     star2.classList.add("icon-star-filled");
     star2.classList.remove("icon-star");
     star3 = document.getElementById("star3");
     star3.classList.add("icon-star-filled");
     star3.classList.remove("icon-star");

     star4 = document.getElementById("star4");
     star4.classList.add("icon-star");
     star4.classList.remove("icon-star-filled");
     star5 = document.getElementById("star5");
     star5.classList.add("icon-star");
     star5.classList.remove("icon-star-filled");
     document.getElementById("stars").value = 3;
   }

   onclickstar4() {
     star1 = document.getElementById("star1");
     star1.classList.add("icon-star-filled");
     star1.classList.remove("icon-star");
     star2 = document.getElementById("star2");
     star2.classList.add("icon-star-filled");
     star2.classList.remove("icon-star");
     star3 = document.getElementById("star3");
     star3.classList.add("icon-star-filled");
     star3.classList.remove("icon-star");
     star4 = document.getElementById("star4");
     star4.classList.add("icon-star-filled");
     star4.classList.remove("icon-star");

     star5 = document.getElementById("star5");
     star5.classList.add("icon-star");
     star5.classList.remove("icon-star-filled");
     document.getElementById("stars").value = 4;
   }

   onclickstar5() {
     star1 = document.getElementById("star1");
     star1.classList.add("icon-star-filled");
     star1.classList.remove("icon-star");
     star2 = document.getElementById("star2");
     star2.classList.add("icon-star-filled");
     star2.classList.remove("icon-star");
     star3 = document.getElementById("star3");
     star3.classList.add("icon-star-filled");
     star3.classList.remove("icon-star");
     star4 = document.getElementById("star4");
     star4.classList.add("icon-star-filled");
     star4.classList.remove("icon-star");
     star5 = document.getElementById("star5");
     star5.classList.add("icon-star-filled");
     star5.classList.remove("icon-star");
     document.getElementById("stars").value = 5;
   }
}
