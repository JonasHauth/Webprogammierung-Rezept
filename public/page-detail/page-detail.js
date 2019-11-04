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
    //    this.db = this.db.selectRezeptById(this.recordId);
        let rezepte = await this.app.db.getAllRezepte();

        for(let i = 0; i < rezepte.length; i++) {
          if(this.recordId == rezepte[i].name) {
            this.db = rezepte[i];
          }
        }

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
        let pageDom = await   this._renderFoodTiles(html);

        this.app.setPageTitle(`Rezept: ${this.db.name}`, {isSubPage: true});
        this.app.setPageCss(css);
        this.app.setPageHeader(pageDom.querySelector("header"));
        this.app.setPageContent(pageDom.querySelector("main"));
    }

     /**
     * Hilfsmethode, welche den HTML-Code der eingelesenen HTML-Datei bearbeitet
     * und anhand der eingelesenen Daten ergänzt.
     */


    async _renderFoodTiles(html) {

        // Platzhalter mit den eingelesenen Daten ersetzen
        let reftoPicture = await this.app.db.rezepteFirestorage.child(this.db.img);
        await reftoPicture.getDownloadURL().then(url => { html = html.replace(`{IMG}`, url); });
        html = html.replace(/{NAME}/g, this.db.name);
        html = html.replace(/{ZEIT}/g, this.db.zubereitungszeit);
        html = html.replace(/{AUFWAND}/g, this.db.aufwand);

        let pageDom = document.createElement("div");
        pageDom.innerHTML = html;

        return pageDom;
    }


}
