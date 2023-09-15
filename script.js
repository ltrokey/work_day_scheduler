$(document).ready(function(){
    // Date
    const currentDayEl = $('#currentDay')
    const currentDay = dayjs()
    currentDayEl.text(currentDay.format('dddd, MMMM D, YYYY'))

  // Time
    const presentHour = dayjs().hour()

    for (var hour = 9; hour <= 17; hour++) {
      var hourElId = '#hour-' + hour
      var timeBlockEl = $(hourElId)
      var elementHour = hourElId.split('-')[1]
        if (elementHour < presentHour) {
        timeBlockEl.addClass('past')
      } else if (elementHour == presentHour) {
        timeBlockEl.addClass('present')
      } else if (elementHour > presentHour) {
        timeBlockEl.addClass('future')
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

