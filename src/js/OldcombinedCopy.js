document.addEventListener('DOMContentLoaded', function() {
  const inputField = document.getElementById('userInput');
  const textareaWrapper = document.getElementById('textareaWrapper');
  const sendButton = document.getElementById('sendButton');
  const uploadButton = document.getElementById('uploadButton');
  const refreshButton = document.getElementById('refreshButton');
  const summaryButton = document.getElementById('summaryButton');
  const fileInput = document.getElementById('fileInput');
  const displayContainer = document.getElementById('displayContainer');
  const instructions = document.getElementById('instructions');
  const apiEndpoint = 'https://your-backend-api.com/endpoint'; // Replace with your backend API endpoint

  // Calculate the character length of the given string
  const referenceLength = "const apiEndpoint = 'https://your-backend-api.com/endpoint'; // Replace with your backend API endpoint API endpoint API endpoint".length;

  inputField.addEventListener('input', function() {
    sendButton.disabled = !inputField.value.trim();

    // Adjust the height of the textarea
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
  });

  sendButton.addEventListener('click', function() {
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
      sendButton.disabled = true;
    }
  });

  uploadButton.addEventListener('click', function() {
    fileInput.click();
  });

  refreshButton.addEventListener('click', function() {
    // Reset the input field
    inputField.value = '';
    inputField.style.height = 'auto';
    sendButton.disabled = true;

    // Clear the display container
    displayContainer.innerHTML = '';

    // Show the instructions
    instructions.style.display = 'block';
  });

  summaryButton.addEventListener('click', function() {
    alert("Summary functionality is not implemented yet.");
  });

  fileInput.addEventListener('change', handleFileUpload);

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const content = e.target.result;

        // Hide instructions when content is uploaded
        instructions.style.display = 'none';  

        // Display the uploaded content in the blue box
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

        // Simulate API call to get response
        displayHelloTxt();

      };
      reader.readAsText(file);
    }
  }

  function displayUserInput(input) {
    const userParagraph = document.createElement('p');
    userParagraph.textContent = input;
    userParagraph.classList.add('user-input-box');
    userParagraph.style.whiteSpace = 'pre-wrap';
    userParagraph.style.wordWrap = 'break-word';

    // Adjust height based on input length
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

  function displayResponse(response) {
    const newParagraph = document.createElement('p');
    newParagraph.textContent = response;
    newParagraph.classList.add('response-box');
    newParagraph.style.whiteSpace = 'pre-wrap';
    newParagraph.style.wordWrap = 'break-word';

    addClipboardIcon(newParagraph, response);

    const responseContainer = displayContainer.querySelector('.response-container');
    responseContainer.appendChild(newParagraph);
    displayContainer.scrollTop = 0; // Scroll to the top
  }

  function displayHelloTxt() {
    fetch('../data/hello.txt') // Adjust the fetch URL if necessary
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

  function addClipboardIcon(paragraph, text) {
    const clipboardIcon = document.createElement('span');
    clipboardIcon.classList.add('clipboard-icon');
    clipboardIcon.innerHTML = 'copy';
    clipboardIcon.addEventListener('click', function() {
      copyToClipboard(text);
    });
    paragraph.appendChild(clipboardIcon);
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }

  // Drag & Drop functionality
  textareaWrapper.addEventListener('dragover', function(event) {
    event.preventDefault();
    textareaWrapper.classList.add('drag-over');
  });

  textareaWrapper.addEventListener('dragleave', function(event) {
    event.preventDefault();
    textareaWrapper.classList.remove('drag-over');
  });

  textareaWrapper.addEventListener('drop', function(event) {
    event.preventDefault();
    textareaWrapper.classList.remove('drag-over');
    
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const content = e.target.result;

        // Hide instructions when content is uploaded
        instructions.style.display = 'none';  

        // Display the uploaded content in the blue box
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

        // Simulate API call to get response
        displayHelloTxt();

      };
      reader.readAsText(file);
    }
  });
});
