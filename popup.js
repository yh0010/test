document.addEventListener('DOMContentLoaded', function() {
    const inputField = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const uploadButton = document.getElementById('uploadButton');
    const fileInput = document.getElementById('fileInput');
    const displayContainer = document.getElementById('displayContainer');
    const fileContentDiv = document.getElementById('fileContent');
  
    inputField.addEventListener('input', function() {
      // Enable/disable send button
      sendButton.disabled = !inputField.value.trim();
  
      // Adjust the height of the textarea
      inputField.style.height = 'auto'; // Reset the height
      if (inputField.scrollHeight > inputField.offsetHeight) {
        if (inputField.scrollHeight > 300) {
          inputField.style.overflowY = 'scroll';
          inputField.style.height = '300px'; // Set maximum height before scrolling
        } else {
          inputField.style.overflowY = 'hidden';
          inputField.style.height = inputField.scrollHeight + 'px'; // Set the new height
        }
      }
    });
  
    sendButton.addEventListener('click', function() {
      const userInput = inputField.value.trim();
      if (userInput) {
        // Clear previous inputs
        displayContainer.innerHTML = '';
  
        // Display new input
        const newParagraph = document.createElement('p');
        newParagraph.textContent = userInput;
        displayContainer.appendChild(newParagraph);
        inputField.value = '';
        displayContainer.scrollTop = displayContainer.scrollHeight;
  
        // Reset textarea height
        inputField.style.height = 'auto';
        sendButton.disabled = true;
  
        // Display hello.txt content
        fetch(chrome.runtime.getURL('hello.txt'))
          .then(response => response.text())
          .then(data => {
            fileContentDiv.textContent = data;
            fileContentDiv.style.display = 'block';
          })
          .catch(error => console.error('Error fetching hello.txt:', error));
      }
    });
  
    uploadButton.addEventListener('click', function() {
      fileInput.click();
    });
  
    fileInput.addEventListener('change', function(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const content = e.target.result;
          // Display file content or process as needed
          const newParagraph = document.createElement('p');
          newParagraph.textContent = content;
          displayContainer.appendChild(newParagraph);
        };
        reader.readAsText(file);
      }
    });
  });
  