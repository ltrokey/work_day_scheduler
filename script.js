$(document).ready(function(){
    // Date
    const currentDayEl = $('#currentDay')
    const currentDay = dayjs()
    currentDayEl.text(currentDay.format('dddd, MMMM D, YYYY'))

  // Time
    const currentHour = dayjs().hour()

    for (var hour = 9; hour <= 17; hour++) {
      var hourElId = '#hour-' + hour
      var currentHourEl = $(hourElId)
      var elementHour = hourElId.split('-')[1]
        if (elementHour < currentHour) {
        currentHourEl.addClass('past')
      } else if (elementHour == currentHour) {
        currentHourEl.addClass('present')
      } else if (elementHour > currentHour) {
        currentHourEl.addClass('future')
      }
    }

    //  Save User Input
    function loadSavedText(hourId) {
      const savedInput = localStorage.getItem(hourId)
      if (savedInput) {
        $('#' + hourId).find('textarea.description').val(savedInput)
      }
    }

    for (var hour = 9; hour <= 17; hour++) {
      var hourElId = 'hour-' + hour
      loadSavedText(hourElId)
    }

    function handleSaveClick(hourId) {
      const textArea = $('#' + hourId).find('textarea.description')
      const userInput = textArea.val()

      if (userInput.trim() === '') {
        alert('Please enter some text before saving.')
      } else {
        localStorage.setItem(hourId, userInput)

        textArea.val(userInput)
        alert('Text successfully saved!')
      }
    }

    $('.saveBtn').on('click', function () {
      const hourId = $(this).closest('.time-block').attr('id')
      handleSaveClick(hourId)
    })

    // Clear User Input
    $('.clearBtn').on('click', function () {
      const hourId = $(this).closest('.time-block').attr('id')
      const textArea = $('#' + hourId).find('textarea.description')

      if (textArea.val().trim() !== '') {
        const confirmation = confirm('Are you sure you want to clear the text? This action cannot be undone.')

        if (confirmation) {
          textArea.val('')
          localStorage.removeItem(hourId)
          alert('Text cleared successfully!')
        }
      }
    })

})


$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
})
