class App {

  constructor(title, pages) {
      this.title = title;
      this.pages = pages;
      this.currentPageObject = null;
  }

  run() {

    window.addEventListener("hashchange", () => this.handleRouting());
    this.handleRouting();

  }

  handleRouting() {
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

  setPageTitle(title) {
      // Optionen auswerten
      //options = options ? options : {};
      //let isSubPage = options.isSubPage ? options.isSubPage : false;

      // Titel setzen
      document.querySelectorAll(".page-name").forEach(e => e.textContent = title);
      document.title = `${title}`;

      // Entscheiden, ob der Zurückbutton angezeigt wird, oder nicht
      //if (isSubPage) {
      //    document.querySelector("header nav .go-back").classList.remove("hidden");
      //    document.querySelector("header nav .dont-go-back").classList.add("hidden");
      //} else {
      //    document.querySelector("header nav .go-back").classList.add("hidden");
      //    document.querySelector("header nav .dont-go-back").classList.remove("hidden");
      //}
  }

  setPageCss(css) {
      document.querySelector("#page-css").innerHTML = css;
  }

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
