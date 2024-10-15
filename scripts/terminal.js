const outputDiv = document.getElementById('output');
const commandInput = document.getElementById('command-input');

const commands = {
    help: () => 'Available commands: help, clear, date, echo, neofetch, exit, background, open <url>, ls, cat',
    clear: () => {
        outputDiv.innerHTML = ''; // Clear the output
        return ''; // Return an empty string
    },
    date: () => new Date().toString(), // Return the current date
    echo: (args) => args.join(' '), // Echo back the input arguments
    neofetch: () => displayNeofetch(), // Display the neofetch output
    exit: () => back(), // Go back one page
    background: () => changeBackground(), // Change the background
    open: (args) => openWebsite(args), // Open a website in iframe
    ls: () => ls(), // List files
    cat: (args) => cat(args), // Display file content
};

const autocompleteCommands = ['help', 'clear', 'date', 'echo', 'neofetch', 'exit', 'background', 'open', 'ls', 'cat'];
const files = ['about.txt', 'projects.txt', 'contact.txt'];

commandInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const input = commandInput.value.trim();
        const [command, ...args] = input.split(' ');
        handleCommand(command, args);
        commandInput.value = ''; // Clear the input after execution
    } else if (event.key === 'Tab') {
        event.preventDefault(); // Prevent default tab action
        completeCommand(); // Trigger command completion
        if (commandInput.value.startsWith('cat')) {
            completeFilename(); // Trigger filename completion only for 'cat' command
        }
    }
});

function handleCommand(command, args) {
    appendOutput(`$ ${command} ${args.join(' ')}`); // Show the command in output

    const commandFunction = commands[command]; // Check if command exists
    const result = commandFunction ? commandFunction(args) : `Command not found: ${command}`; // Execute the command or show error
    if (result) {
        appendOutput(result); // Append result to output
    }
}

function appendOutput(text) {
    const output = document.createElement('div');
    output.textContent = text; // Set output text
    output.style.textAlign = 'left'; // Ensure text is left-aligned
    outputDiv.appendChild(output); // Append output to outputDiv
    outputDiv.scrollTop = outputDiv.scrollHeight; // Auto-scroll to the bottom
}

function completeCommand() {
    const input = commandInput.value.trim();
    const [command] = input.split(' '); // Get the command part only

    // Find matching commands
    const matches = autocompleteCommands.filter(cmd => cmd.startsWith(command));

    if (matches.length === 1) {
        commandInput.value = matches[0]; // Auto-fill if there's a single match
    } else if (matches.length > 1) {
        commandInput.value = `${matches[0]} `; // If multiple matches, fill the first one and keep a space
    }
}

function completeFilename() {
    const input = commandInput.value.trim();
    const [command, ...args] = input.split(' ');

    if (command === 'cat' && args.length > 0) {
        const partialFilename = args.join(' ');
        const matches = files.filter(file => file.startsWith(partialFilename));

        if (matches.length === 1) {
            commandInput.value = `${command} ${matches[0]}`;
        } else if (matches.length > 1) {
            commandInput.value = `${command} ${matches[0]} `;
        }
    }
}

function displayNeofetch() {
    const cpuUsage = Math.floor(Math.random() * 100); // Random CPU usage percentage
    const ramUsage = Math.floor(Math.random() * 100); // Random RAM usage percentage
    const diskUsage = Math.floor(Math.random() * 100); // Random Disk usage percentage

    const neofetchOutput = `
 ▄       ▄    root@catgirl.singles
▄ ▀▄   ▄▀ ▄   Host: RPi 3B+ 1.2GHz
█▄█▀███▀█▄█   System: BugOS 24.04 LTS
 ▀███████▀    Shell: cricket 5.1
▀█████████▀   CPU RAM DISK
 ▄▀     ▀▄    ${cpuUsage}% ${ramUsage}%  ${diskUsage}%`;
    appendOutput(neofetchOutput); // Append neofetch output
}

function back() {
    appendOutput("Bye bye! ^_^");
    setTimeout(() => {
        window.history.back();
    }, 2000);
}

let backgroundNum = 0;

function changeBackground() {
    // Array of background URLs
    const backgrounds = [
        "url('https://www.format.com/wp-content/uploads/andrew-benson-3-1.gif')",
        "url('https://33.media.tumblr.com/e5f2e745362bfad1796e0d8d0d28f59c/tumblr_nbhxy5f8Ay1sfbqxao1_400.gif')",
        "url('https://mir-s3-cdn-cf.behance.net/project_modules/disp/fd467a29718651.5600c1962d09d.gif')"
    ];

    // Set the background image
    document.body.style.background = `${backgrounds[backgroundNum]} no-repeat center center`;
    document.body.style.backgroundSize = "cover";
    document.body.style.height = "100vh"; // Ensure the background takes the whole screen height
    document.body.style.width = "100vw"; // Ensure the background takes the whole screen width
    document.body.style.margin = "0"; // Remove any default margin

    appendOutput("Background changed my love :)");

    // Increment backgroundNum and wrap around if necessary
    backgroundNum = (backgroundNum + 1) % backgrounds.length;
}

function openWebsite(args) {
    if (args.length === 0) {
        return 'Usage: open <url>'; // Usage message if no URL is provided
    }

    const url = args.join(' '); // Join the arguments to form the URL

    // Check if the URL starts with http:// or https://
    if (!/^https?:\/\//i.test(url)) {
        return 'Please provide a valid URL starting with http:// or https://'; // Error message
    }

    // Check if the URL is a YouTube link and convert it to embed format
    const youtubeMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (youtubeMatch) {
        const videoId = youtubeMatch[1]; // Extract the video ID
        const embedUrl = `https://www.youtube.com/embed/${videoId}`; // Construct the embed URL
        appendOutput(`Opening ${embedUrl}`); // Indicate the opening process

        // Create a new div for the embedded video display
        const iframeWrapper = document.createElement('div');
        iframeWrapper.className = 'web-view'; // Add class for styling

        // Create a new iframe for YouTube video
        const iframe = document.createElement('iframe');
        iframe.src = embedUrl; // Set the iframe source to the embedded YouTube URL
        iframe.style.width = '100%'; // Set iframe width to fill the wrapper
        iframe.style.height = '320px'; // Set height of iframe
        iframe.allowFullscreen = true; // Allow fullscreen for the video

        // Append the iframe to the wrapper
        iframeWrapper.appendChild(iframe);

        // Append the wrapper to the output area
        outputDiv.appendChild(iframeWrapper); // Append the iframe to the output
        return;
    }

    // For other URLs, just open them as before
    appendOutput(`Opening ${url}...`);
    const iframeWrapper = document.createElement('div');
    iframeWrapper.className = 'web-view'; // Add class for styling

    const iframe = document.createElement('iframe');
    iframe.src = url; // Set the iframe source to the provided URL
    iframe.style.width = '100%'; // Set iframe width to fill the wrapper
    iframe.style.height = '320px'; // Set height of iframe

    iframeWrapper.appendChild(iframe);
    outputDiv.appendChild(iframeWrapper); // Append the iframe to the output
}

function ls() {
    return files.join(' ');
}

function cat(args) {
    if (args.length === 0) {
        return 'Usage: cat <file>';
    }

    const file = args[0];

    if (!files.includes(file)) {
        return `File not found: ${file}`;
    }

    if (file === 'about.txt') {
        return "# Hello, I'm 1k4k! \nI'm in love with code and playing around with computers. \nI'm always curious and ready to learn new things. \nHave fun! ^_^";
    }

    if (file === 'projects.txt') {
        return "# My projects \n Check out my projects on the main website. I'm working on a lot of cool stuff! \n Stay tuned!";
    }

    if (file === 'contact.txt') {
        return "# Contact Me \n Reach out to me via email or through my social media. \n Let's connect and create something amazing!";
    }

    return '';
}