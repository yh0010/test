export function initTestButton() {
    const testButton = document.getElementById('testButton');
    testButton.addEventListener('click', function() {
      document.getElementById('message').textContent = 'Button was clicked!';
    });
  }
  