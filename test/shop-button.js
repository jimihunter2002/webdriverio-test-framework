
const assert = require('chai').assert;


let locator = '.submenu.menu li:nth-child(1)';
let dropD = '.has-submenu';
describe('Shop CTA Button', function() {
    it('should link to the product page', function(){
        browser.url('/');
        let title = browser.getTitle();
        //assert.equal(title, 'Robot Parts Emporium');
        expect(title).to.equal('Robot Parts Emporium');
            /*console.log('QDot') */
        browser.moveToObject(dropD);
        browser.click(locator);
        let sTitle = browser.getTitle();
        //assert.equal(sTitle, 'Totally Not Evil Sentient Robot - Robot Parts Emporium');
        expect(sTitle).to.equal('Totally Not Evil Sentient Robot - Robot Parts Emporium');

        let sUrl = browser.getUrl();
        //let containsFile = sUrl.includes('product-paged.html');
        //assert.isOk(containsFile, 'URL mismatch');
        //assert.include(sUrl, 'product-pages.html', 'URL mismatch');
        expect(sUrl).to.include('product-page.html', 'URL mismatch');
    })

});





