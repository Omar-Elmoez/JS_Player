const arrows = Array.from(document.querySelectorAll(".popular__arrows"));

for(let i = 0; i < arrows.length; i++) {
  arrows[i].addEventListener('click', (e) => {

    let clicked_arrow = e.target;
    let current_parent = e.currentTarget.parentElement.parentElement;
    let posters = current_parent.querySelector('.popular__posters');

    if(clicked_arrow.classList.contains('right-arrow')) {
      posters.scrollLeft += 150;
    } else if (clicked_arrow.classList.contains('left-arrow')) {
      posters.scrollLeft -= 150;
    }

    
  })
}

