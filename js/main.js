let nextBtn = document.querySelector("#next");
let prevBtn = document.querySelector("#prev");
let slides = document.querySelectorAll(".slide");
let changeSlide = 0;
// console.log(changeSlide);
nextBtn.addEventListener("click", function() {
  
    slides.forEach(function (slide, index) {
    if (slide.classList.contains("show") === true) {
      changeSlide = index + 1;
      slide.classList.remove("show");
    }
    
  });
//   console.log(changeSlide);
  if (changeSlide < slides.length) {
    slides[changeSlide].classList.add("show");
    }
  else {
      changeSlide = 0;
      slides[changeSlide].classList.add("show");
    }
});
// console.log(changeSlide);
prevBtn.addEventListener('click', function () {
   
    slides.forEach(function (slide, index) {
        if (slide.classList.contains("show") === true) {
            changeSlide = index - 1;
            slide.classList.remove("show");
        }
       
        
    });
    // console.log(changeSlide);

    if (changeSlide < slides.length && changeSlide > -1) {
        slides[changeSlide].classList.add("show");
    }
    else {
        // console.log(slides.length);
        
        changeSlide = slides.length - 1;
        slides[changeSlide].classList.add("show");
    }
});



// Get unique values for the desired columns

// {2 : ["M", "F"], 3 : ["RnD", "Engineering", "Design"], 4 : [], 5 : []}

function getUniqueValuesFromColumn() {

  var unique_col_values_dict = {}

  allFilters = document.querySelectorAll(".table-filter")
  allFilters.forEach((filter_i) => {
      col_index = filter_i.parentElement.getAttribute("col-index");
      // alert(col_index)
      const rows = document.querySelectorAll("#emp-table > tbody > tr")

      rows.forEach((row) => {
          cell_value = row.querySelector("td:nth-child("+col_index+")").innerHTML;
          // if the col index is already present in the dict
          if (col_index in unique_col_values_dict) {

              // if the cell value is already present in the array
              if (unique_col_values_dict[col_index].includes(cell_value)) {
                  // alert(cell_value + " is already present in the array : " + unique_col_values_dict[col_index])

              } else {
                  unique_col_values_dict[col_index].push(cell_value)
                  // alert("Array after adding the cell value : " + unique_col_values_dict[col_index])

              }


          } else {
              unique_col_values_dict[col_index] = new Array(cell_value)
          }
      });

      
  });



  updateSelectOptions(unique_col_values_dict)

};

// Add <option> tags to the desired columns based on the unique values

function updateSelectOptions(unique_col_values_dict) {
  allFilters = document.querySelectorAll(".table-filter")

  allFilters.forEach((filter_i) => {
      col_index = filter_i.parentElement.getAttribute('col-index')

      unique_col_values_dict[col_index].forEach((i) => {
          filter_i.innerHTML = filter_i.innerHTML + `\n<option value="${i}">${i}</option>`
      });

  });
};


// Create filter_rows() function

// filter_value_dict {2 : Value selected, 4:value, 5: value}

function filter_rows() {
  allFilters = document.querySelectorAll(".table-filter")
  var filter_value_dict = {}

  allFilters.forEach((filter_i) => {
      col_index = filter_i.parentElement.getAttribute('col-index')

      value = filter_i.value
      if (value != "all") {
          filter_value_dict[col_index] = value;
      }
  });

  var col_cell_value_dict = {};

  const rows = document.querySelectorAll("#emp-table tbody tr");
  rows.forEach((row) => {
      var display_row = true;

      allFilters.forEach((filter_i) => {
          col_index = filter_i.parentElement.getAttribute('col-index')
          col_cell_value_dict[col_index] = row.querySelector("td:nth-child(" + col_index+ ")").innerHTML
      })

      for (var col_i in filter_value_dict) {
          filter_value = filter_value_dict[col_i]
          row_cell_value = col_cell_value_dict[col_i]
          
          if (row_cell_value.indexOf(filter_value) == -1 && filter_value != "all") {
              display_row = false;
              break;
          }


      }

      if (display_row == true) {
          row.style.display = "table-row"

      } else {
          row.style.display = "none"

      }





  })

}



  function playPauseAudio(flag) {
    var audio = document.getElementById('playerAudio');
    var playIcons = flag.getElementsByClassName('play-icon');
    var pauseIcons = flag.getElementsByClassName('pause-icon');
    
    if (audio.paused) {
      audio.play();
      showIcons(playIcons);
      hideIcons(pauseIcons);
    } else {
      audio.pause();
      showIcons(pauseIcons);
      hideIcons(playIcons);
    }
  }

  function showIcons(icons) {
    for (var i = 0; i < icons.length; i++) {
      icons[i].style.display = 'inline-block';
    }
  }

  function hideIcons(icons) {
    for (var i = 0; i < icons.length; i++) {
      icons[i].style.display = 'none';
    }
  }

