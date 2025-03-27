document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
})

const submitBtn = document.querySelector('.btn')
const inputs = document.querySelectorAll('.input')
const resultYears = document.querySelector('h1 span')
const resultMonths = document.querySelector('h2 span')
const resultDays = document.querySelector('h2+h2 span')

submitBtn.addEventListener('click', () => {
  inputs.forEach(input => removeErrState(input));


  let isEmpty = false

  inputs.forEach(input => {
    if (input.value.trim() === '') {
      addErrState(input)
      isEmpty = true;
    } else {
      removeErrState(input);
    }
  })

  if (isEmpty) return;


  const birthYear = parseInt(document.getElementById('year').value)
  const birthMonth = parseInt(document.getElementById('month').value)
  const birthDay = parseInt(document.getElementById('day').value)
  const currentDate = new Date()

  let isValid = true

  if (birthMonth < 1 || birthMonth > 12) {
    addErrState(document.getElementById('month'), 'Must be a valid month')
    isValid = false;
  }

  const daysInMonth = new Date(birthYear, birthMonth, 0).getDate()
  if (birthDay < 1 || birthDay > daysInMonth) {
    addErrState(document.getElementById('day'), 'Must be a valid day');
    isValid = false;
  }

  if (birthYear > currentDate.getFullYear()) {
    addErrState(document.getElementById('year'), 'Must be in the past')
    isValid = false;
  } else if (birthYear < 1800) {
    addErrState(document.getElementById('year'), 'Must be over 1800')
    isValid = false;
  }

  if (!isValid) return;

  const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
  const age = calculateAge(birthDate, currentDate)

  if (age.years < 10) {
    resultYears.textContent = '0' + age.years
  } else {
    resultYears.textContent = age.years
  }

  if (age.months < 10) {
    resultMonths.textContent = '0' + age.months
  } else {
    resultMonths.textContent = age.months
  }

  if (age.days < 10) {
    resultDays.textContent = '0' + age.days
  } else {
    resultDays.textContent = age.days
  }


  const animatedResult = document.querySelectorAll('.anim')

  animatedResult.forEach(anim => {
    anim.classList.add('animate')

    setTimeout(() => {
      anim.classList.remove('animate');
    }, 1000)
  })
})



//! --- helping functions ---
function calculateAge(birthDate, currentDate) {
  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth();
  let days = currentDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    days += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}


function addErrState(input, message = 'This field is required') {
  const errTxt = getErrTxt(input)
  const label = getLabel(input)

  errTxt.textContent = message

  errTxt.classList.add('show')
  label.classList.add('red-color')
  input.classList.add('border')
}

function removeErrState(input) {
  const errTxt = getErrTxt(input)
  const label = getLabel(input)
  errTxt.classList.remove('show')
  label.classList.remove('red-color')
  input.classList.remove('border')
}

function getErrTxt(input) {
  const parentElement = input.closest('.inputs')
  return parentElement.querySelector('.error-message')
}

function getLabel(input) {
  const parentElement = input.closest('.inputs')
  return parentElement.querySelector('label')
}

//! --- remove error state ---
inputs.forEach(input => {
  input.addEventListener('keydown', () => {
    removeErrState(input)
  })
})

//! cursor ---
const cursor = document.querySelector('.cursor')
document.addEventListener('mousemove', (e) => {
  cursor.style.transform = `translate(${e.x -10}px, ${e.y -10}px`
})

document.querySelector('html').addEventListener('mouseenter', () => {
  cursor.classList.add('cursor-show')
  cursor.style.width = '20px'
  cursor.style.height = '20px'
})
document.querySelector('html').addEventListener('mouseleave', () => {
  cursor.style.width = '0px'
  cursor.style.height = '0px'
})