const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');

Then(/I expect to be on the (\w+) page/, function (pageName) {
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
});