const request = require('sync-request');
const reviewForm = require('./reviewForm.page');
const Review = require('./review.page');

browser.addCommand("submitReview", function (email, review) {

});


describe('The product review form?', function () {
    beforeEach(function () {
        // Go to the product page
        browser.url('/product-page.html');
    });
    it('it should add a review when submitted properly', function () {
        // Enter the email address
        //browser.click('#review-email');
        //browser.submitReview("test@tester.com", "This is a review comment");
        reviewForm.submit("test@tester.com", "This is a review comment");

        /*browser.setValue('#review-email', 'test@test.com');

        // Enter text in the comment form
        browser.setValue('#review-content', 'This is a review comment');

        browser.submitForm('#comment-form'); */

        let hasReview = browser.isExisting('.comment=This is a review comment');
        expect(hasReview, "comment text exist").to.be.true;

    });

    it('it should show an error message if the input is wrong', function () {
        //let isErrorShowing = browser.isVisible("p=There are some errors in your review");
        let isErrorShowing = reviewForm.formError.isVisible();
        expect(isErrorShowing).to.be.false;

        browser.submitReview();

        //browser.submitForm('#review-content')

        //isErrorShowing = browser.isVisible("p=There are some errors in your review.");
        isErrorShowing = reviewForm.formError.isVisible();
        expect(isErrorShowing).to.be.true;



    });
    
    
    it('it should hide the error message when input is corrected', function () {
        //browser.submitForm('#review-content');
        browser.submitReview();

        //let isErrorShowing = browser.isVisible("p=Please enter a valid email address.");
        let isErrorShowing = reviewForm.emailError.isVisible();
        expect(isErrorShowing).to.be.true;

        //browser.setValue('#review-email', 'email@test.com');
        browser.submitReview("email@test.com");

        browser.click("#review-content")

        //isErrorShowing = browser.isVisible("p=Please enter a valid email address.");
        isErrorShowing = reviewForm.emailError.isVisible();
        expect(isErrorShowing).to.be.false;

        /*browser.setValue('#review-content', 'valid');
        browser.submitForm("#review-content"); */

        browser.submitReview("email@test.com", 'This is the review');

        /*let isMainErrorShowing = browser.isVisible("p=There are some errors in your review.");
        let isContentShowing = browser.isVisible("p=A review without text isn't much of a review."); */

        let isMainErrorShowing = reviewForm.formError.isVisible();
        let isContentShowing = reviewForm.reviewError.isVisible();

        expect(isMainErrorShowing).to.be.false;
        expect(isContentShowing).to.be.false;

    });


    it('it should focus on the first invalid input field on error', function () {
        let emailHasFocus = browser.hasFocus("#review-email");
        expect(emailHasFocus, "email shold not have focus").to.be.false;

        //browser.submitForm("form");
        browser.submitReview();

        emailHasFocus = browser.hasFocus("#review-email");
        expect(emailHasFocus, "email shold have focus").to.be.true;

        /*browser.setValue("#review-email", "valid@example.com");
        browser.submitForm("form"); */
        browser.submitReview("valid@example.com");

        let contentHasFocus = browser.hasFocus("#review-content");
        expect(contentHasFocus, "review content field should have focus").to.be.true;

    });
    
    it.only('should allow multiple reviews', function () {
        let res = request('GET', 'https://jsonplaceholder.typicode.com/posts/1/comments');

        let comments = JSON.parse(res.getBody().toString('utf8'));
        
        comments.forEach(function (comment, idx) {
            browser.submitReview(comment.email, comment.name);
            let review = new Review(idx + 3);

            //let email = browser.getText(".reviews > .comment:nth-of-type(" + (idx + 3) +") .email");
            let email = review.email.getText();
            expect(email).to.equal(comment.email);

            //let reviewText = browser.getText(".reviews > .comment:nth-of-type(" + (idx + 3) +") .comment");
            let reviewText = review.comment.getText();
            expect(reviewText).to.equal(comment.name);
        });
        
    });
});