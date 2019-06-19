const cart = require('./cart.page');
describe("Cart Functionality", function () {
    beforeEach(function () {
        browser.url("/product-page.html");
    });

    it('should only let you buy after setting a quantity', function () {
        //let isBtnEnabled = browser.isEnabled(btn);
        let isBtnEnabled = cart.btn.isEnabled();
        expect(isBtnEnabled, "buy now should be diabled to begin").to.be.false;

        //browser.setValue(qty, 10);
        cart.qty.setValue(10);

        //isBtnEnabled = browser.isEnabled(btn);
        isBtnEnabled = cart.btn.isEnabled();
        expect(isBtnEnabled, "buy now is now enabled").to.be.true;
    });
    
    describe("checkout process", function () {
        beforeEach(function () {
            //browser.setValue(qty, 10);
            cart.qty.setValue(10);

            //browser.click(btn);
            cart.btn.click();

        });
        
        it('should disable buy now button during processing', function () {
            //let isBtnEnabled = browser.isEnabled(btn);
            let isBtnEnabled = cart.btn.isEnabled();
            expect(isBtnEnabled, "'buy now' should be disabled after clicking").to.be.false;

            //let btnText = browser.getText(btn);
            let btnText = cart.btn.getText();
            expect(btnText, "Verify 'buy now' text has changed").to.contain("Purchasing");
        });

        it('should show a thank you message with qty and type', function () {
            //let thankYou = ".callout*=Thank you human";

            //browser.waitForExist(thankYou, 3000);
            cart.thankYou.waitForExist();


            //let thankText = browser.getText(thankYou);
            let thankText = cart.thankYou.getText();
            expect(thankText, ).to.contain("10 T-800 Model 101");
        });
        
        it('should clear input after completion', function () {
            //browser.waitForValue(qty, 300, true);
            cart.qty.waitForValue(null, true);
        });
        
        it('should reset button text after purchase completes',function () {
            
            browser.waitUntil(function () {
                console.log('here');
                //return browser.getText(btn) !== 'Purchasing...';
                return cart.btn.getText() !== 'Purchasing...';
            }, 3000);
            //let btnText = browser.getText(btn);
            let btnText = cart.btn.getText();
            expect(btnText).to.equal('Buy Now');
        });
        
        it("should hide thank you message after clicking close button", function () {
            //browser element represents $ and returns a single match
            //$$ browser.element and returns a list of all elements found array []
            //let thankYou = $(".callout*=Thank you human");
            cart.thankYou.waitForExist();
            $(".close-button").click();
            cart.thankYou.waitForVisible(null, true);
        });
        
    });
});