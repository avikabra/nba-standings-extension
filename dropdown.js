var out = document.getElementsByClassName("dropdown")

out[0].addEventListener('mouseover', myFunction, false);
out[0].addEventListener('mouseout', outHover, false);

function myFunction() {
    console.log('over')
    document.getElementById("myDropdown").classList.toggle("show");
}
  
  // Close the dropdown menu if the user clicks outside of it
function outHover() {
    console.log('out')
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
    }
}