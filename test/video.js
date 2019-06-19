browser.addCommand("isVideoPaused", function () {
    /*let isPaused = browser.execute(function () {
        return document.querySelector('#dance-video').paused;
    }); */

    let isPaused = browser.selectorExecute('#dance-video', function (video) {
        return video[0].paused;
    })

    return isPaused.value;
});

describe('About us  video', function () {
    beforeEach(function () {
        browser.url('/');
        browser.click('=About Us')
    });

    it('should open the modal with video paused', function() {
        let isPaused = browser.isVideoPaused();
        console.log(`Is Paused: ${isPaused}`);
        expect(isPaused).to.be.true;

    });

    it('play video on "play" click', function () {
        browser.click('#play-btn');

        let isPaused = browser.isVideoPaused();
        console.log(isPaused);
        expect(isPaused).to.be.false;
    });

    it('paused video on "pause" click', function () {
        browser.click('#play-btn');
        browser.pause(500);
        browser.click('#pause-btn');

        let isPaused = browser.isVideoPaused();
        expect(isPaused).to.be.true;
    });
});