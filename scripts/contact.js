/**
 * Contact page button functionality
 * This script handles the window-like buttons in the contact.html page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get references to buttons
    const minimizeButton = document.querySelector('.button_mini');
    const maximizeButton = document.querySelector('.button_full');
    const closeButton = document.querySelector('.button_close');
    
    // Add event listeners
    if (minimizeButton) {
        minimizeButton.addEventListener('click', handleMinimize);
    }
    
    if (maximizeButton) {
        maximizeButton.addEventListener('click', handleMaximize);
    }
    
    if (closeButton) {
        closeButton.addEventListener('click', handleClose);
    }
    
    // Button handler functions
    function handleMinimize() {
        console.log('Minimize button clicked');
        alert('Minimize button clicked');
        // TODO: Implement minimize functionality
        // For example: collapse the card to just show the header
    }
    
    function handleMaximize() {
        console.log('Maximize/restore button clicked');
        // TODO: Implement maximize functionality
        // For example: expand the card to fill more of the viewport
    }
    
    function handleClose() {
        console.log('Close button clicked');
        // TODO: Implement close functionality
        // For example: navigate back to main page
        // window.location.href = 'index.html';
    }
});