"use strict";

class PageDetail {
    /**
     * Konstruktor
     * @param {App} app Zentrale Instanz der App-Klasse
     */


    constructor(app, db) {
        this.app = app;
        this.db = db;
        this.recordId = -1;

    }
    /**
     * Seite anzeigen. Wird von der App-Klasse aufgerufen.
     */
    async show(matches) {
        // URL-Parameter auswerten
        this.recordId = matches[1];
        this.db = this.db.selectRezeptById(this.recordId);

        // Anzuzeigenden Seiteninhalt nachladen
        let html = await fetch("page-detail/page-detail.html");
        let css = await fetch("page-detail/page-detail.css");

        if (html.ok && css.ok) {
            html = await html.text();
            css = await css.text();
        } else {
            console.error("Fehler beim Laden des HTML/CSS-Inhalts");
            return;
        }

        // Seite zur Anzeige bringen
        let pageDom = this._processTemplate(html);

        this.app.setPageTitle(`Rezept: ${this.db.name}`, {isSubPage: true});
        this.app.setPageCss(css);
        this.app.setPageHeader(pageDom.querySelector("header"));
        this.app.setPageContent(pageDom.querySelector("main"));
    }

     /**
     * Hilfsmethode, welche den HTML-Code der eingelesenen HTML-Datei bearbeitet
     * und anhand der eingelesenen Daten ergänzt.
     */


    _processTemplate(html) {
        // Platzhalter mit den eingelesenen Daten ersetzen
        html = html.replace(/{IMG}/g, this.db.img);
        html = html.replace(/{NAME}/g, this.db.name);
        html = html.replace(/{ZEIT}/g, this.db.zeit);
        html = html.replace(/{AUFWAND}/g, this.db.aufwand);


        let pageDom = document.createElement("div");
        pageDom.innerHTML = html;


        return pageDom;
    }


}
