chrome.action.onClicked.addListener((tab) => {
    const screenWidth = screen.availWidth;
    const screenHeight = screen.availHeight;
    const popupWidth = Math.round(screenWidth * 0.3);
    const popupHeight = Math.round(screenHeight * 0.3);
  
    chrome.windows.create({
      url: chrome.runtime.getURL("popup.html"),
      type: "popup",
      width: popupWidth,
      height: popupHeight
    });
  });
  