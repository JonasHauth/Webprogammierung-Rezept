class App {

  constructor(title, pages) {
      this.title = title;
      this.pages = pages;
      this.currentPageObject = null;
  }

// run ist die Hauptmethode, welche im HTML Dokument ausgeführt wird.
// Event Behandlung für die Änderung der URL registrieren.
  run() {
    document.querySelector("header nav .toggle-menu a").addEventListener("click", this._toggleHamburgerMenu);
    window.addEventListener("hashchange", () => this._handleRouting());
    this._handleRouting();

  }

  _toggleHamburgerMenu(event) {
      // Hamburger-Menu ein- oder ausblenden
      let menu = document.querySelector("header nav .menu-right");
      if (!menu) return;

      if (menu.classList.contains("small-screen-hidden")) {
          menu.classList.remove("small-screen-hidden");
      } else {
          menu.classList.add("small-screen-hidden");
      }

      // Weitere Behandlung des Click-Events unterbinden, da wir hier keine
      // neue Seite anfordern wollen.
      if (event) {
          event.preventDefault();
      }
  }

// handleRouting wird zur Analyse der URL verwendet.
// Die URL wird mit der Liste der definierten Seiten abgeglichen,
// und ruft die show Methoden der Unterseiten auf.
  _handleRouting() {
      let pageUrl = location.hash.slice(1);

      if (pageUrl.length === 0) {
          pageUrl = "/";
      }

      let matches = null;
      let page = this.pages.find(p => matches = pageUrl.match(p.url));

      if (!page) {
          console.error(`Keine Seite zur URL ${pageUrl} gefunden!`);
          return;
      }

      this.currentPageObject = new page.klass(this);
      this.currentPageObject.show(matches);
  }

  //Hilfsmethode für das Setzen des Website Titels.
  setPageTitle(title, options) {
      // Optionen auswerten
      options = options ? options : {};
      let isSubPage = options.isSubPage ? options.isSubPage : false;

      // Titel setzen
      document.querySelectorAll(".page-name").forEach(e => e.textContent = title);
      document.title = `${title}`;

      //Entscheiden, ob der Zurückbutton angezeigt wird, oder nicht
      if (isSubPage) {
          document.querySelector("header nav .go-back").classList.remove("hidden");
          document.querySelector("header nav .dont-go-back").classList.add("hidden");
      } else {
          document.querySelector("header nav .go-back").classList.add("hidden");
          document.querySelector("header nav .dont-go-back").classList.remove("hidden");
      }
  }

  // Hilfsmethode für das Setzen der CSS Datei
  setPageCss(css) {
      document.querySelector("#page-css").innerHTML = css;
  }

  // Hilfsmethode für das Setzen des Page Headers
  setPageHeader(element) {
      let container = document.querySelector("header > .content");
      container.innerHTML = "";

      if (!element) return;
      let len = element.childNodes.length;

      for (var i = 0; i < len; i++) {
          let child = element.childNodes[0];
          element.removeChild(child);
          container.appendChild(child);
      }
  }

  //Hilfsmethode für das Setzen des Seiteninhalts
  setPageContent(element) {
      let container = document.querySelector("#app-main-area");
      container.innerHTML = "";

      if (!element) return;
      let len = element.childNodes.length;

      for (var i = 0; i < len; i++) {
          let child = element.childNodes[0];
          element.removeChild(child);
          container.appendChild(child);
      }
  }

}
