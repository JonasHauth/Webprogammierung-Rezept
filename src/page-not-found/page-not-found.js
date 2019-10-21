class PageNotFound {
  constructor(app) {
    this._app = app;
  }

  async show() {
    let html = await fetch("page-not-found/page-not-found.html");
    let css = await fetch("page-not-found/page-not-found.css");

    if (html.ok && css.ok) {
      html = await html.text();
      html = await css.text();
    } else {
      console.error("Fehler beim Laden des HTML/CSS Inhalts")
    }
    let pageDom = document.createElement("div");
    pageDom.innerHTML = html;

    this._app.setPageTitle("Seite nicht gefunden");
    this._app.setPageCss(css);
    this._app.setPageHeader(pageDom.querySelector("header"));
    this._app.setPageContent(pageDom.querySelector("main"));
  }


}
