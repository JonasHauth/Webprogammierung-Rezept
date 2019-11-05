"use strict";

class PageDetail {

    constructor(app, rezept) {
        this.app = app;
        this.rezept = rezept;
        this.recordId = -1;

    }

     // Seite anzeigen. Wird von der App-Klasse aufgerufen.
    async show(matches) {
        // URL-Parameter auswerten
        this.recordId = matches[1];
        let rezepte = await this.app.db.getAllRezepte();

        for(let i = 0; i < rezepte.length; i++) {
          if(this.recordId == rezepte[i].name) {
            this.rezept = rezepte[i];
          }
        }

        // Anzuzeigenden Seiteninhalt nachladen
        let html = await fetch("page-detail/page-detail.html");
        let css = await fetch("bootstrap-detail/css/bootstrap.css");

        if (html.ok && css.ok) {
            html = await html.text();
            css = await css.text();
        } else {
            console.error("Fehler beim Laden des HTML/CSS-Inhalts");
            return;
        }

        let pageDom = await this._renderFoodTilesOverview(html);

        // Eventhandler zum Umschalten der Tabreiter registrieren
        let tabItems = pageDom.querySelectorAll(".tab-item");

        // Event Handler registrieren und erste Tabseite anzeigen
        tabItems.forEach(tabItem => {
            // Bist du eine aktive Tablasche? Dann Inhalt anzeigen.
            if (tabItem.classList.contains("active")) {
                this._switchTabPage(tabItem);
            }

            // Aktive Seite bei Klick auf die Lasche wechseln
            tabItem.addEventListener("click", event => {
                this._switchTabPage(event.target);
            });
        });

        try {
        // Seite zur Anzeige bringen
        this.app.setPageTitle(`Rezept: ${this.rezept.showname}`, {isSubPage: true});
        this.app.setPageCss(css);
        let headerShow = document.querySelector(".content");
        if(headerShow.classList.contains("hidden")){
          headerShow.classList.remove("hidden");
        }
        this.app.setPageHeader(pageDom.querySelector("header"));
        this.app.setPageContent(pageDom.querySelector("main"));
      } catch(err){
        console.error(err);
      }
    }

    _switchTabPage(clickedTabItem) {
        // Erst mal alle Tabseiten ausblenden
        clickedTabItem.parentNode.childNodes.forEach(tabItem => {
            if (tabItem.nodeType != Node.ELEMENT_NODE) return;

            tabItem.classList.remove("active");
            let tabContent = document.querySelector(tabItem.dataset.tabContent);

            if (tabContent != null) {
                tabContent.classList.add("tab-page");
            }
        });

        // Dann die ausgewählte Tabseite anzeigen
        clickedTabItem.classList.add("active");
        let tabContent = document.querySelector(clickedTabItem.dataset.tabContent);

        if (tabContent != null) {
            tabContent.classList.remove("tab-page");
        }
    }

     //Overview-Daten holen
    async _renderFoodTilesOverview(html) {

        // Platzhalter mit den eingelesenen Daten ersetzen
        let reftoPicture = await this.app.db.rezepteFirestorage.child(this.rezept.img);
        await reftoPicture.getDownloadURL().then(url => { html = html.replace(`{IMG}`, url); });
        html = html.replace(/{NAME}/g, this.rezept.showname);
        html = html.replace(/{ZEIT}/g, this.rezept.zubereitungszeit);


        let anzahlSterne = this.rezept.aufwand;
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

        let pageDom = document.createElement("div");
        pageDom.innerHTML = html;

        return pageDom;
    }

    //ZutatenTab-Daten holen
    async _renderFoodTilesZutaten(html) {

        // Platzhalter mit den eingelesenen Daten ersetzen, DataBase dazu noch nicht vollständig
        //evtl. durch Array, das mit Zutaten befüllt wird
        html = html.replace(/{ZUTATEN}/g, this.rezept.zutaten);

        let pageDom = document.createElement("div");
        pageDom.innerHTML = html;

        return pageDom;
    }

    //ZutatenTab-Daten holen
    async _renderFoodTilesZubereitung(html) {

        // Platzhalter mit den eingelesenen Daten ersetzen, DataBase dazu noch nicht vollständig
        //evtl. durch Array, das mit Zutaten befüllt wird
        html = html.replace(/{ZUBEREITUNG}/g, this.rezept.zubereitung);

        let pageDom = document.createElement("div");
        pageDom.innerHTML = html;

        return pageDom;
    }

}
