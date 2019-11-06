"use strict";

/**
 * Klasse PageNotFound: Stellt eine Defaultseite zur Verfügung, die immer
 * dann angezeigt wird, wenn der Anwender eine unbekannte URL aufruft.
 */
class PageNotFound {
    /**
     * Konstruktor
     * @param {App} app Zentrale Instanz der App-Klasse
     */
     constructor(app, db) {
         this.app = app;
         this.db = db;

     }

    /**
     * Seite anzeigen. Wird von der App-Klasse aufgerufen.
     */
    async show() {
        // Anzuzeigenden Seiteninhalt nachladen
        let html = await fetch("page-not-found/page-not-found.html");
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

        this.app.setPageTitle("Seite nicht gefunden", {isSubPage: true});
        this.app.setPageCss(css);
        this.app.setPageContent(pageDom.querySelector("main"));
    }
}
