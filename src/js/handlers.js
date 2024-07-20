import { displayUserInput, displayResponse, displayHelloTxt, readFile } from './utils.js';

const apiEndpoint = 'https://your-backend-api.com/endpoint'; // Replace with your backend API endpoint

export function handleInput(event) {
  const inputField = event.target;
  const sendButton = document.getElementById('sendButton');
  sendButton.disabled = !inputField.value.trim();

  inputField.style.height = 'auto';
  if (inputField.scrollHeight > inputField.offsetHeight) {
    if (inputField.scrollHeight > 300) {
      inputField.style.overflowY = 'scroll';
      inputField.style.height = '300px';
    } else {
      inputField.style.overflowY = 'hidden';
      inputField.style.height = inputField.scrollHeight + 'px';
    }
  }
}

export function handleSend() {
  const inputField = document.getElementById('userInput');
  const instructions = document.getElementById('instructions');
  const userInput = inputField.value.trim();
  if (userInput) {
    instructions.style.display = 'none';  // Hide instructions

    displayUserInput(userInput);  // Display user input first

    fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: userInput })
    })
    .then(response => response.json())
    .then(data => {
      if (data && data.response) {
        displayResponse(data.response);
      } else {
        displayHelloTxt();
      }
    })
    .catch(error => {
      console.error('Error:', error);
      displayHelloTxt();
    });

    inputField.value = '';
    inputField.style.height = 'auto';
    const sendButton = document.getElementById('sendButton');
    sendButton.disabled = true;
  }
}

export function handleUpload() {
  const fileInput = document.getElementById('fileInput');
  fileInput.click();
}

export function handleRefresh() {
  const inputField = document.getElementById('userInput');
  const displayContainer = document.getElementById('displayContainer');
  const instructions = document.getElementById('instructions');

  inputField.value = '';
  inputField.style.height = 'auto';
  const sendButton = document.getElementById('sendButton');
  sendButton.disabled = true;

  displayContainer.innerHTML = '';
  instructions.style.display = 'block';
}

export function handleSummary() {
  alert("Summary functionality is not implemented yet.");
}

export function handleFileUpload(event) {
  readFile(event.target.files[0]);
}

export function handleDragOver(event) {
  event.preventDefault();
  const textareaWrapper = document.getElementById('textareaWrapper');
  textareaWrapper.classList.add('drag-over');
}

export function handleDragLeave(event) {
  event.preventDefault();
  const textareaWrapper = document.getElementById('textareaWrapper');
  textareaWrapper.classList.remove('drag-over');
}

export function handleDrop(event) {
  event.preventDefault();
  const textareaWrapper = document.getElementById('textareaWrapper');
  textareaWrapper.classList.remove('drag-over');
  readFile(event.dataTransfer.files[0]);
}
