'use strict';

// utility functions
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}
    
function select(selector, parent = document) {
    return parent.querySelector(selector);
}
    
function selectAll(selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
}

// variables and consts
const userAgent = navigator.userAgent;


// Checking the Window size
function getWindowHeight() {
    window.innerHeight;
}

function getWindowWidth() {
   window.innerWidth;
}

// Browser
function checkBrowser() {
    if (/Edg/i.test(userAgent)) return `Browser: Edge`;
    if (/Chrome/i.test(userAgent)) return `Browser: Chrome`;
    if (/Firefox/i.test(userAgent)) return `Browser: Firefox`;
    return 'Browser: NA';
}

function checkOS() {
    if (/Macintosh/i.test(userAgent)) return `OS: Mac OS`;
    if (/Windows/i.test(userAgent)) return `OS: Windows`;
    return 'OS: NA';
}


// cookies

function areCookiesEnabled() {
   return navigator.cookieEnabled;
}
let lifespan = 15;

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
  
   
  
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

function setCookie() {
    document.cookie = `Browser=${checkBrowser()}; OS=${checkOS()}; 
    Height=${getWindowHeight()}; Width=${getWindowWidth()}; max-age=${lifespan} `;
}

function updateCookieSettings() {
    const settings = {
      browser: document.getElementById('chk-browser').checked,
      os: document.getElementById('chk-os').checked,
      width: document.getElementById('chk-width').checked,
      height: document.getElementById('chk-height').checked
    };
    document.cookie = `Settings=${JSON.stringify(settings)}; max-age=${lifespan} `;
}


// load current settings
document.getElementById('settings').addEventListener('click', function() {
    let settings = getCookie('Settings');
    if (settings) {
        settings = JSON.parse(settings);
        document.getElementById('chk-browser').checked = Boolean(settings.browser);
        document.getElementById('chk-os').checked = Boolean(settings.os);
        document.getElementById('chk-width').checked = Boolean(settings.width);
        document.getElementById('chk-height').checked = Boolean(settings.height);
    }
    showDialog('dialog-two');
});

//dialog functions
//show dialog 1
function dialogOne() {
    setTimeout(function () {
        if (!areCookiesEnabled() || !getCookie("user_accepted_cookies")) {
            document.getElementById("dialog-one").style.display = "block";
        }
    }, 2000);
}

// Function to close a dialog
function closeDialog(dialogId) {
    document.getElementById(dialogId).style.display = "none";
}


// Function to show Dialog Box 2
function dialogTwo() {
    document.getElementById("dialog-two").style.display = "block";
}


// calling functions
// Function to accept all cookies
function acceptAllCookies() {
    setCookie("user_accepted_cookies", "true", 20); // Live for 15-20 seconds
    closeDialog("dialog-one");
}

// Function to save user-selected cookie settings
function saveCookieSettings() {
    closeDialog("dialog-two");
}

// Call the function to show the initial dialog
dialogOne();

// Event listeners for buttons in Dialog Box 1
document.getElementById("accept").addEventListener("click", acceptAllCookies);
document.getElementById("settings").addEventListener("click", dialogTwo);

// Event listener for the close button in both dialogs
document.querySelectorAll(".close").forEach(function (closeButton) {
    closeButton.addEventListener("click", function () {
        closeDialog(closeButton.closest(".dialog").id);
    });
});

// Update the cookie settings when the user clicks "Save Preferences"
document.getElementById('save').addEventListener('click', function() {
    saveCookieSettings();
    closeDialog('dialog-two');
});
