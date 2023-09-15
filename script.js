$(document).ready(function(){
    // Date
    var currentDayEl = $('#currentDay')
    var currentDay = dayjs()
    currentDayEl.text(currentDay.format('dddd, MMMM D, YYYY'))

    //  Save User Input
    function loadSavedText(hourId) {
      const savedInput = localStorage.getItem(hourId)
      if (savedInput) {
        $('#' + hourId).find('textarea.description').val(savedInput)
      }
    }

    loadSavedText('hour-9')
    loadSavedText('hour-10')
    loadSavedText('hour-11')
    loadSavedText('hour-12')
    loadSavedText('hour-1')
    loadSavedText('hour-2')
    loadSavedText('hour-3')
    loadSavedText('hour-4')
    loadSavedText('hour-5')

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
