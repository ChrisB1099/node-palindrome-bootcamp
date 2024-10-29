
document.querySelector("#clickMe").addEventListener("click", checkIfPalindrome);

function checkIfPalindrome() {
  const userInput = document.querySelector("#input").value;
  fetch(`/api?userInput=${userInput}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.querySelector("#result").textContent = data.isPalindrome?"Yes it is Palindrome":"No it is not Palindrome"
    
    });
}

