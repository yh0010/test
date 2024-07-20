export function displayUserInput(input) {
    const referenceLength = "const apiEndpoint = 'https://your-backend-api.com/endpoint'; // Replace with your backend API endpoint API endpoint API endpoint".length;
    const displayContainer = document.getElementById('displayContainer');
    const userParagraph = document.createElement('p');
    userParagraph.textContent = input;
    userParagraph.classList.add('user-input-box');
    userParagraph.style.whiteSpace = 'pre-wrap';
    userParagraph.style.wordWrap = 'break-word'; //yes deprecated but it works ...
  
    if (input.length > referenceLength) {
      userParagraph.style.height = '150px';
      userParagraph.style.overflowY = 'auto';  // Enable scrolling
    } else {
      userParagraph.style.height = '20px';
      userParagraph.style.overflowY = 'hidden';  // No scrolling needed
    }
  
    const responseContainer = document.createElement('div');
    responseContainer.classList.add('response-container');
    responseContainer.appendChild(userParagraph);
  
    displayContainer.prepend(responseContainer); // Prepend to display the latest at the top
    displayContainer.scrollTop = 0; // Scroll to the top
  }
  
  export function displayResponse(response) {
    const displayContainer = document.getElementById('displayContainer');
    const newParagraph = document.createElement('p');
    newParagraph.textContent = response;
    newParagraph.classList.add('response-box');
    newParagraph.style.whiteSpace = 'pre-wrap';
    newParagraph.style.overflowWrap = 'break-word';
  
    addClipboardIcon(newParagraph, response);
  
    const responseContainer = displayContainer.querySelector('.response-container');
    responseContainer.appendChild(newParagraph);
    displayContainer.scrollTop = 0; // Scroll to the top
  }
  
  export function displayHelloTxt() {
    const displayContainer = document.getElementById('displayContainer');
    fetch('../data/hello.txt')
      .then(response => response.text())
      .then(data => {
        const helloTxtParagraph = document.createElement('p');
        helloTxtParagraph.textContent = data;
        helloTxtParagraph.classList.add('response-box');
        helloTxtParagraph.style.whiteSpace = 'pre-wrap';
        helloTxtParagraph.style.wordWrap = 'break-word';
  
        addClipboardIcon(helloTxtParagraph, data);
  
        const responseContainer = displayContainer.querySelector('.response-container');
        responseContainer.appendChild(helloTxtParagraph);
        displayContainer.scrollTop = 0; // Scroll to the top
      })
      .catch(error => console.error('Error fetching hello.txt:', error));
  }
  
  export function readFile(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const content = e.target.result;
      const instructions = document.getElementById('instructions');
      instructions.style.display = 'none';  
  
      const displayContainer = document.getElementById('displayContainer');
      const userParagraph = document.createElement('p');
      userParagraph.textContent = content;
      userParagraph.classList.add('user-input-box');
      userParagraph.style.whiteSpace = 'pre-wrap';
      userParagraph.style.wordWrap = 'break-word';
      userParagraph.style.height = '150px';
      userParagraph.style.overflowY = 'auto';  // Enable scrolling
  
      const responseContainer = document.createElement('div');
      responseContainer.classList.add('response-container');
      responseContainer.appendChild(userParagraph);
  
      displayContainer.prepend(responseContainer); // Prepend to display the latest at the top
      displayContainer.scrollTop = 0; // Scroll to the top
  
      displayHelloTxt();
    };
    reader.readAsText(file);
  }
  
  export function addClipboardIcon(paragraph, text) {
    const clipboardIcon = document.createElement('span');
    clipboardIcon.classList.add('clipboard-icon');
    clipboardIcon.innerHTML = 'copy';
    clipboardIcon.addEventListener('click', function() {
      copyToClipboard(text);
    });
    paragraph.appendChild(clipboardIcon);
  }
  
  export function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }

