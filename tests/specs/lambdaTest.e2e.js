import LoginPage from  '../pageobjects/login.page';
import DemoFormPage from '../pageobjects/demo-form.page';
import seleniumAutomationPage from '../pageobjects/selenium-automation.page';

describe('LambdaTest Automation Demo', () => {
    let registeredEmail  = "yogendra@binmile.com";

    it('should login with valid credentials', () => {
        LoginPage.open()
        .login('lambda', 'lambda123');

        //asserting toast existence and login success message.
        expect(DemoFormPage.toast).toBeExisting();
        expect(DemoFormPage.toast).toHaveTextContaining(
            'Thank You Successully Login!!');
    });

    it('Should be able to fill form and upload image', () => {

        //populating email and asseting alert message
        DemoFormPage.populateEmailAlert(registeredEmail);
        expect(browser.getAlertText()).toEqual(registeredEmail);
        browser.acceptAlert();

        //fill the remaining feedback form 
        DemoFormPage.choosePurchaseFrequency("Every month")
        .choosePurchaseFactors(['Customer service', 'Delivery time'])
        .enableRatingAndFeedback()
        .rateEcomExperience(9);

        //Asserting that slider position is updated
        expect(DemoFormPage.sliderHandel).toHaveAttribute('aria-valuenow', '90');
        
        DemoFormPage.enterFeedback("some test feedback!!!");

        //opening new tab to download jenkins.svg 
        let oldWindow = browser.getWindowHandle();
        let newWindow = browser.createWindow("tab");
        browser.switchToWindow(newWindow.handle);

        seleniumAutomationPage.open()
        .downloadIntegrationToolImage('jenkins');
        
        //switching back to previous tab
        browser.closeWindow();
        browser.switchToWindow(oldWindow);

        //uploading jenkins.svg 
        DemoFormPage.uploadFile(`${global.downloadDir}/jenkins.svg`)
        
        //asserting file uploaded successfully and have same name
        expect(browser.getAlertText()).toEqual("your image upload sucessfully!!");
        browser.acceptAlert();

        expect(DemoFormPage.inputFileUpload).toHaveValueContaining('jenkins.svg')

    })

    it('Should be able to submit form', () => {
        //submitting form
        DemoFormPage.submitForm();
        expect(DemoFormPage.successMessage).toHaveTextContaining('You have successfully submitted the form.');
    })
});


