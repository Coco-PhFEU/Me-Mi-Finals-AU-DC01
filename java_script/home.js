
document.addEventListener("DOMContentLoaded", function () {  //Line of code that waits for the Index file to load before it executes

    const slider = document.getElementById("image_slider"); //slider var points to the id of "image_slider"
    if (!slider) return; //constraint that stops js if there's no id "image_slider"

    //7-11 initializes the other element and store it in their respective variable
    const slides = slider.querySelectorAll(".slide");     
    const dots = slider.querySelectorAll(".slider_dot");    
    const prevBtn = slider.querySelector(".slider_prev");   
    const nextBtn = slider.querySelector(".slider_next");   
                                                          
    const AUTOPLAY_DELAY = 5000; // 5 seconds between auto slides
    let currentIndex = 0; //first slide starts at index 0 and so on (slide 1 = 0, slide 2 = 1, slide 3 = 2)
    let autoplayTimer = null; //int the timer w/o value

    
    function goToSlide(index) {
        // wrap around the images in both directions and it allows us to stay in a 0-2 index
        currentIndex = (index + slides.length) % slides.length; //slide.length also returns the amount of slides I have so it stays at 3

        //22-28 shows which image is being shown and it gives the active class while it disables the other images.
        //24 & 27 are for-loops that check for each id with "slides" and toggles the active class for the current img and dot slider
        slides.forEach((slide, i) => { 
            slide.classList.toggle("active", i === currentIndex);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });
    }

    //33-39 calls the function and looks for the next and prev slides of the active slide
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    //42-49 Stops the old timer and sets a new one that counts to 5s. After the 
    function startAutoplay() {
        stopAutoplay();
        //Func setInterval() is already built-in  
        // calls nextslide() after AUTOPLAY_DELAY has count up to 5s.
        autoplayTimer = setInterval(nextSlide, AUTOPLAY_DELAY); 
    }

    function stopAutoplay() {
        //Func clearInterval is also built-in
        //  it stops the old timer
        if (autoplayTimer) clearInterval(autoplayTimer);
    }

    // 54-62 manual controls to navigate to next or prev slides. If next or left clicked, then execute line function
    nextBtn.addEventListener("click", () => {
        nextSlide();
        startAutoplay(); // reset the timer after manual interaction
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        startAutoplay();
    });

    //You can also find the images through clicking the button below. Line only executes if you click the button
    dots.forEach((dot) => {
        dot.addEventListener("click", () => {
            //Clicking a dot gives the text version number of dot.dataset.index and converts it into a int
            //It then gets sent to the func gotoslide() to go to the active image relative to the button index
                goToSlide(parseInt(dot.dataset.index)); 
                startAutoplay();
        });
    });

    // pause automatic sliding while the user is hovering over it
    slider.addEventListener("mouseenter", stopAutoplay);
    slider.addEventListener("mouseleave", startAutoplay);

    // Starts at the 1st image as the active img and starts the timer when the website loads in
    goToSlide(0);
    startAutoplay();
});