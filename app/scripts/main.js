var collection = new Collection([]);
collection.addSlide(new Slide('Familienblog', 'http://cevapsushi.de', 5000));
collection.addSlide(new Slide('Bdminton App', 'http://smash.cologne', 5000));

var slideController = new SlideController(collection, document.getElementById('slide-container'))
console.log(slideController);
slideController.play();