const generateBtn = document.getElementById('generateBtn');
const jokeElement = document.getElementById('joke');

generateBtn.addEventListener('click', generateJoke);

function generateJoke() {
  fetch('http://localhost:3000/generate-joke')
    .then(response => response.json())
    .then(data => {
      jokeElement.textContent = data.joke; // Update the joke element with the generated joke
    })
    .catch(error => {
      console.error(error);
    });
}
