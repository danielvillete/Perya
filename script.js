let pocketMoney = parseInt(document.getElementById('pocketMoney').value); // Initialize pocket money

function rollDice() {
    const betAmount = parseInt(document.getElementById('betAmount').value);
    const colorChoice = document.getElementById('colorChoice').value;

    if (isNaN(betAmount) || betAmount <= 0 || betAmount > pocketMoney) {
        alert("Please enter a valid bet amount within your pocket money.");
        return;
    }

    // Deduct bet from pocket money
    pocketMoney -= betAmount;
    document.getElementById('pocketMoneyDisplay').textContent = `Your pocket money: $${pocketMoney}`;

    const colors = ["green", "red", "blue", "white", "yellow", "black"];

    // Roll three dice with animation
    const dice1 = document.getElementById('dice1');
    const dice2 = document.getElementById('dice2');
    const dice3 = document.getElementById('dice3');

    dice1.className = `dice ${colors[Math.floor(Math.random() * colors.length)]}`;
    dice2.className = `dice ${colors[Math.floor(Math.random() * colors.length)]}`;
    dice3.className = `dice ${colors[Math.floor(Math.random() * colors.length)]}`;

    // Trigger reflow for restarting animation
    dice1.offsetWidth;
    dice2.offsetWidth;
    dice3.offsetWidth;

    dice1.style.animation = "roll 1s ease-out";
    dice2.style.animation = "roll 1s ease-out";
    dice3.style.animation = "roll 1s ease-out";

    // Determine the result
    let winnings = 0;
    if (dice1.className === dice2.className && dice2.className === dice3.className && dice1.className.includes(colorChoice)) {
        winnings = betAmount * 3;
    } else if (dice1.className.includes(colorChoice) || dice2.className.includes(colorChoice) || dice3.className.includes(colorChoice)) {
        winnings = betAmount * 2;
    }

    // Update pocket money with winnings
    pocketMoney += winnings;
    document.getElementById('pocketMoneyDisplay').textContent = `Your pocket money: $${pocketMoney}`;

    // Display result message
    if (winnings > 0) {
        document.getElementById('resultMessage').textContent = `Congratulations! You won $${winnings}!`;
    } else {
        document.getElementById('resultMessage').textContent = `Sorry, you didn't win this time.`;
    }

    // Display color tiles in the popup
    const colorResult = document.getElementById('colorResult');
    colorResult.innerHTML = ''; // Clear previous tiles

    const diceColors = [dice1.className.split(' ')[1], dice2.className.split(' ')[1], dice3.className.split(' ')[1]];
    diceColors.forEach(color => {
        const colorTile = document.createElement('div');
        colorTile.className = `color-tile ${color}`;
        colorTile.textContent = color.charAt(0).toUpperCase(); // Display the first letter of the color
        colorResult.appendChild(colorTile);
    });

    // Show the popup with a 1-second delay
    setTimeout(openPopup, 1000); // 1000 milliseconds = 1 second
}

function openPopup() {
    document.getElementById("popup").style.display = "flex";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}
