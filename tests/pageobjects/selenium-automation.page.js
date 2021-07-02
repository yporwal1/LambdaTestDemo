import Page from './page';
const http = require('https'); // or 'https' for https:// URLs
const fs = require('fs');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SeleniumAutomationPage extends Page {
    /**
     * define selectors using getter methods
     */
    get integrationSection () { return $(`.//h2[text()[contains(.,'Integrations With CI/CD Tools')]]`).parentElement() }
    Imgjenkinse (toolName) { return this.integrationSection.$(`[href*='${toolName}'] img`) }
   
    /**
     * overwrite specifc options to adapt it to page object
     */
     open () {
        super.open('selenium-automation');
        return this;
    }

    downloadIntegrationToolImage(toolName) {
        this.integrationSection.scrollIntoView({behavior: "smooth", block: "start", inline: "center"});
        let imgURL = this.Imgjenkinse(toolName).getAttribute('src');

        const file = fs.createWriteStream(`${global.downloadDir}/${toolName}.svg`);
        browser.call( () => {
            const req =  http.get(imgURL, function(response) {
                response.pipe(file);
            });
        });
        
        return this;
    }

    
}

export default new SeleniumAutomationPage();
