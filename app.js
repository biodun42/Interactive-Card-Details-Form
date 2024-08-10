
function validateInput (inputElement, placeholder, theInput, placeholderText='', reverse=false, inputLabel=inputElement.previousElementSibling){
    if (reverse) {
        placeholder.innerHTML = placeholderText;
        inputElement.classList.add("error")
        inputLabel.dataset.error = "Wrong format";
        if (inputElement.value.length === 0){
          inputLabel.dataset.error = "Can't be blank";
        }
      } else {
        placeholder.innerHTML = theInput;
        inputElement.classList.remove("error")
        inputLabel.dataset.error = "";

      }
};




const cardholderName = document.querySelector('.cardholder-name');
const namePlaceholder = document.querySelector('.card-holder');
cardholderName.addEventListener('input', () => {
  let userInput = cardholderName.value;
  if (/^[a-z ]+$/i.test(userInput)) {
    validateInput(cardholderName, namePlaceholder, userInput)
} else if (userInput.length === 0){
    validateInput(cardholderName, namePlaceholder, userInput, "Jane Appleseed", true)
} else{
    validateInput(cardholderName, namePlaceholder, userInput, "", true)
}
});


const cardNumber = document.querySelector('.card-number-input');
const numberPlaceholder = document.querySelector('.card-number');
cardNumber.addEventListener('input', () => {
  let userInput = cardNumber.value;
  if (/^[\d+ ]+$/i.test(userInput)) {
    let v = userInput.replace(/\s+/g, '');
    let matches = v.match(/\d{1,16}/g);
    let match = matches && matches[0] || '';
    let output = []
    for (let i = 0; i < match.length; i+=4) {
      output.push(match.substring(i, i+4))
    }
    validateInput(cardNumber, numberPlaceholder, output.join(' '))
  } else{
    validateInput(cardNumber, numberPlaceholder, cardNumber.value, "0000 0000 0000 0000", true)
  }
});


const monthInput = document.querySelector('.card-exp-mm');
const monthYearLabel = document.querySelector('.mm-yy-label');
const monthPlaceholder = document.querySelector('.card-exp-mm-placeholder');
monthInput.addEventListener('input', () => {
    let userInput = monthInput.value;
    if (/\d+/g.test(userInput) && Number(userInput) >= 1 && Number(userInput) <= 12  ) {
        validateInput(monthInput, monthPlaceholder, Number(userInput) <= 9? '0' + userInput: userInput);
    } else{
        validateInput(monthInput, monthPlaceholder, userInput, "00", true)
    }
})


const yearInput = document.querySelector('.card-exp-yy');
const yearPlaceholder = document.querySelector('.card-exp-yy-placeholder');
yearInput.addEventListener('input', () => {
    let userInput = yearInput.value;
    if (/\d+/g.test(userInput) && Number(userInput) >= 1 && Number(userInput) <= 99  ) {
        validateInput(yearInput, yearPlaceholder, Number(userInput) <= 9? '0' + userInput: userInput, "", false, monthYearLabel)
    } else{
        validateInput(yearInput, yearPlaceholder, userInput, "00", true, monthYearLabel)
    }
});


const cvcInput = document.querySelector('.card-cvc');
const cvcPlaceholder = document.querySelector('.card-cvc-placeholder');
cvcInput.addEventListener('input', () => {
    let userInput = cvcInput.value;
    if (/\d+/g.test(userInput) && Number(userInput) >= 1 && Number(userInput) <= 999  ) {
        validateInput(cvcInput, cvcPlaceholder, userInput)
    } else{
        validateInput(cvcInput, cvcPlaceholder, userInput, "000", true)
    }
  });


const inputFields = document.querySelectorAll('.input-field');
const confirmBtn = document.querySelector('.confirm-btn')
confirmBtn.addEventListener('click', () => {
  let errors = 5
  inputFields.forEach(e => {
    if (e.value === ''){
      e.classList.add('error')
      e.previousElementSibling.dataset.error = "Can't be blank"
    } else if (e.classList.contains('error')){
      e.classList.add('error')
      e.previousElementSibling.dataset.error = "Wrong format"
    } else {
      errors -= 1
      e.previousElementSibling.dataset.error = ""
    }
    
  });
  if (errors === 0) {
    document.querySelector('.success-msg').style.display = 'grid';
    document.querySelector('.form-input').style.display = 'none';
  }
})