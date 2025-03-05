
// YES THIS IS AI I CANT SEEM TO GET INTO CODING JAVA :D

document.addEventListener('DOMContentLoaded', function() {
    const minimizeButton = document.querySelector('.button_mini');
    const maximizeButton = document.querySelector('.button_full');
    const closeButton = document.querySelector('.button_close');
    
    if (minimizeButton) {
        minimizeButton.addEventListener('click', handleMinimize);
    }
    
    if (maximizeButton) {
        maximizeButton.addEventListener('click', handleMaximize);
    }
    
    if (closeButton) {
        closeButton.addEventListener('click', handleClose);
    }
    
    function handleMinimize() {
        console.log('Minimize button clicked');
        alert('You cannot minimize this window!');
    }
    
    function handleMaximize() {
        console.log('Maximize/restore button clicked');
        alert('You cannot maximize this window!');
    }
    
    function handleClose() {
        console.log('Close button clicked');
        const cantLeaveMessage = document.createElement('a');
        cantLeaveMessage.textContent = 'YOU CANT LEAVE 💀';
        cantLeaveMessage.style.position = 'fixed';
        
        const x = Math.random() * (window.innerWidth - 200);  // 200px buffer for width
        const y = Math.random() * (window.innerHeight - 50);   // 50px buffer for height
        cantLeaveMessage.style.left = x + 'px';
        cantLeaveMessage.style.top = y + 'px';
        
        cantLeaveMessage.style.fontSize = '2rem';
        cantLeaveMessage.style.fontWeight = 'bold';
        cantLeaveMessage.style.color = 'red';
        cantLeaveMessage.style.zIndex = '9999';
        cantLeaveMessage.style.cursor = 'pointer';
        
        cantLeaveMessage.href = '#';
        cantLeaveMessage.onclick = function(e) {
            alert('You thought you could escape? 😈');
        };
        
        document.body.appendChild(cantLeaveMessage);
    }

    const card = document.getElementById('card2');
    
    // Set the card to absolute position so it can move freely
    card.style.position = 'absolute';
    
    // Initial position
    let posX = Math.random() * (window.innerWidth - card.offsetWidth);
    let posY = Math.random() * (window.innerHeight - card.offsetHeight);
    
    // Initial velocity (speed and direction)
    let velX = 2;
    let velY = 1;
    
    function animateCard() {
        // Update position
        posX += velX;
        posY += velY;
        
        // Bounce off the edges
        if (posX <= 0 || posX + card.offsetWidth >= window.innerWidth) {
            velX = -velX;
        }
        
        if (posY <= 0 || posY + card.offsetHeight >= window.innerHeight) {
            velY = -velY;
        }
        
        // Apply the new position
        card.style.left = posX + 'px';
        card.style.top = posY + 'px';
        
        // Continue animation
        requestAnimationFrame(animateCard);
    }
    
    // Start the animation
    animateCard();
});