const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');

Given('I open the home page', function() {
    browser.url('/');
});

When('I click on the CTA button', function () {
    browser.click('.shop-callout a');
});

/*Then('I expect to be on the home page', function () {
    let title = browser.getTitle();
    expect(title).to.equal('Robot Parts Emporium');
});

Then('I expect to be on the product page', function () {

}); */

/*Then(/I expect to be on the (\w+) page/, function (pageName) {
    let pages = {
        home: {
            url: '/',
            title: 'Robot Parts Emporium'
        },
        product: {
            url: 'product-page.html',
            title: 'Totally Not Evil Sentient Robot - Robot Parts Emporium'
        }
    }

    let page = pages[pageName]
    let productPageTitle = browser.getTitle();
    expect(productPageTitle).to.equal(page.title);

    let productPageUrl = browser.getUrl();
    expect(productPageUrl).to.include(page.url, 'URL mismatch');
}); */