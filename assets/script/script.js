class GeneratePassword { // Password generator 
  constructor(size) {
    this.size = size;
  }

  lowercase = "abcdefghijklmnopqrstuvwxyz";
  uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  numbers = "0123456789";
  symbols = "!@#$%^&*()_+-={}[]|\\:;\"'<>,.?/";

  selectedCharacters() { // Checks the selected checboxes
    const lowercaseCheck = document.querySelector("#lowercase").checked;
    const uppercaseCheck = document.querySelector("#uppercase").checked;
    const numberCheck = document.querySelector("#number").checked;
    const symbolCheck = document.querySelector("#symbol").checked;
    if(!lowercaseCheck && !uppercaseCheck && !numberCheck && !symbolCheck) return 'Select at least one option'
    this.passwordStrenght(lowercaseCheck, uppercaseCheck, numberCheck, symbolCheck, this.size)
    return this.generateCharacters(lowercaseCheck, uppercaseCheck, numberCheck, symbolCheck)
  }

  generateCharacters(lowercaseCheck, uppercaseCheck, numberCheck, symbolCheck){ // Generates a string with the selected characters
    let characters = ''
    if(lowercaseCheck) characters += this.lowercase
    if(uppercaseCheck) characters += this.uppercase
    if(numberCheck) characters += this.numbers
    if(symbolCheck) characters += this.symbols
    return this.generatePassword(characters)
  }

  generatePassword(characters){ // Generates the actual password using the characters string and the provided size
    let password = ''
    
    while(password.length <= this.size){
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    return password
  }

  passwordStrenght(lowercaseCheck, uppercaseCheck, numberCheck, symbolCheck, length) { // Calculates the password strength based of the options selected
    let lengthScore = 0
    if(length <= 12) lengthScore = 25
    if(length <= 15) lengthScore = 40
    if(length == 16) lengthScore = 50
  
    const lowercaseScore = lowercaseCheck ? 7 : 0;
    const uppercaseScore = uppercaseCheck ? 10 : 0;
    const numberScore = numberCheck ? 15: 0;
    const symbolScore = symbolCheck ? 18 : 0;
  
    const totalScore = lengthScore + lowercaseScore + uppercaseScore + numberScore + symbolScore;
  
    return this.updateStrengthBar(totalScore);
  }

  updateStrengthBar(strength) { // Updates the stenght bar based of the returned strength value
    const strengthBar = document.querySelector('.fill');
  
    if (strength <= 25) {
      strengthBar.style.width = strength + "%";
      strengthBar.style.backgroundColor = "red";
      strengthBar.style.boxShadow = "0 0 5px red"; 
    } else if (strength <= 50) {
      strengthBar.style.width = strength + "%";
      strengthBar.style.backgroundColor = "yellow";
      strengthBar.style.boxShadow = "0 0 5px yellow";
    } else if (strength <= 99) {
      strengthBar.style.width = strength + "%";
      strengthBar.style.backgroundColor = "orange";
      strengthBar.style.boxShadow = "0 0 5px orange";
    } else {
      strengthBar.style.width = "100%";
      strengthBar.style.backgroundColor = "blue";
      strengthBar.style.boxShadow = "0 0 5px blue";
    }
  }
}

function generatePassword() { // Generates the password when activated (button press)
  const output = document.querySelector('#password')
  const lenght = document.querySelector('#length').value
  const newPassword = new GeneratePassword(lenght)
  output.innerHTML = newPassword.selectedCharacters()
  
}

// Updates the range value every time its moved
const output = document.querySelector("#password-length")
const input = document.querySelector("#length")
output.innerHTML = input.value
input.addEventListener("input", (e) => {
  output.innerHTML = e.target.value
})

// Copies the password to clipboard
const password = document.querySelector('#password');
const clipboard = document.querySelector('i');
clipboard.addEventListener('click', e => {
    navigator.clipboard.writeText(password.innerHTML);
});

