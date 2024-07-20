import { handleInput, handleSend, handleUpload, handleRefresh, handleSummary, handleFileUpload, handleDragOver, handleDragLeave, handleDrop } from './handlers.js';

export function initEventListeners() {
  const inputField = document.getElementById('userInput');
  const textareaWrapper = document.getElementById('textareaWrapper');
  const sendButton = document.getElementById('sendButton');
  const uploadButton = document.getElementById('uploadButton');
  const refreshButton = document.getElementById('refreshButton');
  const summaryButton = document.getElementById('summaryButton');
  const fileInput = document.getElementById('fileInput');

  inputField.addEventListener('input', handleInput);
  sendButton.addEventListener('click', handleSend);
  uploadButton.addEventListener('click', handleUpload);
  refreshButton.addEventListener('click', handleRefresh);
  summaryButton.addEventListener('click', handleSummary);
  fileInput.addEventListener('change', handleFileUpload);
  textareaWrapper.addEventListener('dragover', handleDragOver);
  textareaWrapper.addEventListener('dragleave', handleDragLeave);
  textareaWrapper.addEventListener('drop', handleDrop);
}
