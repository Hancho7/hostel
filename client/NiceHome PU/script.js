// Function to check if the element is in the viewport
function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

// Function to handle the scroll event
function handleScroll() {
    var elements = document.getElementsByClassName("fade-in-element");
    for (var i = 0; i < elements.length; i++) {
        if (isInViewport(elements[i])) {
            elements[i].style.opacity = 1;
        }
    }
}

// Add scroll event listener to trigger the fade-in effect
window.addEventListener('scroll', handleScroll);

// Initial check on page load
handleScroll();


//Owl Carousel script
$(document).ready(function () {
    $('.owl-carousel').owlCarousel({
        loop: true,
        autoplay: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
});

//Admission letter and Student ID scripts
function handleFileSelection(selectedFile) {
    const studentIDInput = document.getElementById('studentID');
    const admissionLetterInput = document.getElementById('admissionLetter');

    // Disable the other file input when one is selected
    if (selectedFile === 'studentID' && studentIDInput.files.length > 0) {
      admissionLetterInput.disabled = true;
    } else if (selectedFile === 'admissionLetter' && admissionLetterInput.files.length > 0) {
      studentIDInput.disabled = true;
    }

    // Enable both file inputs if none is selected
    if (studentIDInput.files.length === 0) {
      admissionLetterInput.disabled = false;
    }

    if (admissionLetterInput.files.length === 0) {
      studentIDInput.disabled = false;
    }
  }