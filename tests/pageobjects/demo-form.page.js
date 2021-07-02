import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class DemoFormPage extends Page {
    /**
     * define selectors using getter methods
     */
    get toast () { return $('.automation__toast') }
    get inputEmail () { return $('#developer-name') }
    get buttonPopulate () { return $('#populate') }
    get selectPerferedPaymentMode () { return $('#preferred-payment') }
    get checkboxTriedEcom () { return $('#tried-ecom') }
    get sliderRating () { return $(`(.//div[@class='sliderBar']/div/div/div)[1]/div`) }
    get sliderHandel () { return $(`div[role='slider']`) }
    get textAreaFeedback () {return $('#comments') }
    get inputFileUpload () { return $('#file') }
    get buttonSubmit () { return $('#submit-button') }
    get successMessage() { return $('section.success-message p') }

    inputPurchaseFrequency (frequency) { return $(`.//input[@type='radio' and @name='os' and @value='${frequency}']`) }
    checkboxFactorForPurchase (text) {return $(`label=${text}`).$('input')}

    populateEmailAlert(email) {
        this.inputEmail.setValue(email);
        this.buttonPopulate.click();
        return this;
    }

    choosePurchaseFrequency(frequency) {
        this.inputPurchaseFrequency(frequency).click();
        return this;
    }

    choosePurchaseFactors(factors) {
        factors.forEach( (factor) => {
            this.checkboxFactorForPurchase(factor).click();
        })
        return this;
    }

    choosePrefredPaymentMode(value) {
        this.selectPerferedPaymentMode.selectByVisibleText(value);
        return this;
    }

    enableRatingAndFeedback(){
        this.checkboxTriedEcom.click()
        return this;
    }

    rateEcomExperience(rating){
        this.sliderRating.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});

        let width = this.sliderRating.getSize('width');
        let currentValue = Number(this.sliderHandel.getAttribute('aria-valuenow')) / 10;
        let offsetX = (rating - currentValue) * (width/10);
        this.sliderHandel.dragAndDrop({x: offsetX, y: 0});
        
        return this;
    }

    enterFeedback(feedback){
        this.textAreaFeedback.setValue(feedback);
        return this;
    }

    uploadFile(path){
        browser.execute(
            // assign style to elem in the browser
            (el) => el.style.display = 'block',
            // pass in element so we don't need to query it again in the browser
            this.inputFileUpload
        );
        this.inputFileUpload.waitForDisplayed();
        if(browser.config.hostname == 'hub.lambdatest.com'){
            const remoteFilePath = browser.uploadFile(path)
            this.inputFileUpload.setValue(remoteFilePath);
        }else{
            this.inputFileUpload.setValue(path);
        }
        
        return this;
    }

    submitForm(){
        this.buttonSubmit.click();
        return this;
    }
}

export default new DemoFormPage();
