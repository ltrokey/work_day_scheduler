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

    //  Alert User

    var alertTextEl = $('#alertText')

    function showAlert(message, alertType) {
      alertTextEl.text(message)
      setTimeout(function () {
        alertTextEl.text('')
      }, 2000)
      if (alertType == 'success') {
        alertTextEl.attr('style', 'color: white;')
      } else if (alertType == 'error') {
        alertTextEl.attr('style', 'color: #411b3d;')
      }
    }

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
        showAlert('Please enter some text before saving.', 'error')
      } else {
        localStorage.setItem(hourId, userInput)

        textArea.val(userInput)
        showAlert('Event successfully saved!', 'success')
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
        const confirmation = confirm('Are you sure you want to clear the event? This action cannot be undone.')

        if (confirmation) {
          textArea.val('')
          localStorage.removeItem(hourId)
          showAlert('Event cleared successfully!', 'success')
        }
      }
    })
})
