let gameHolder = document.getElementById("gameHolder");

let canvasObjects = [];

let currentStage = "";

let numFish = 0;
let cash = 0.0;
let clickAmount = 1;
let passiveAmount = 0;

let purchasePrice = 0;

let autoPoleCost = 5;
let numPoles = 0;

let magnetCost = 100;
let numMagnets = 0;

let vacuumCost = 5000;
let numVacuums = 0;

let shipCost = 100000
let numShips = 0;

let kingMod = 100;
let doubleHookMulti = false;
let queuedSalmon = 0;
let betterPrices = false;

let pricesMod = 1;

let party = false;

let lastTime = 0;
let time = [0, 0, 0, 0, 0];

// let bottomBarMode = "stockMarket";
let bottomBarMode = "timer";

let stockPrices = [1000, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let numStocks = 0;

let totalFish = 0;
let totalCash = 0;

let rebirthChallenges = [false, false, false, false, false];

function main(){
    setResolution();
    progressIntroCinematic(0);
    
    gameHolder.addEventListener('click', gameClick);
    setTimer(decayFadeMessage, 17);
}

// Calls functions depending on what stage of the game the player is on
function gameClick(event){
    if(currentStage == "Intro 0"){
        progressIntroCinematic(1, event.clientX, event.clientY);
    } else if(currentStage == "Intro 1"){
        progressIntroCinematic(2, event.clientX, event.clientY);
    } else if(currentStage == "Intro 2"){
        progressIntroCinematic(3, event.clientX, event.clientY);
    } else if(currentStage == "Intro 3"){
        progressIntroCinematic(4, event.clientX, event.clientY);
    } else if(currentStage == "Intro 4"){
        progressIntroCinematic(5, event.clientX, event.clientY);
    }
    
    if(clickedButton(event.clientX, event.clientY, "clickButton")){
        initFishIcon();
        if(doubleHookMulti){
            queuedSalmon ++;
        }
    } 
    
    if(clickedButton(event.clientX, event.clientY, "autoPolePurchaseButton")){
        buyAutoPole();
    }
    
    if(clickedButton(event.clientX, event.clientY, "magnetPurchaseButton")){
        buyMagnet();
    }
    
    if(clickedButton(event.clientX, event.clientY, "vacuumPurchaseButton")){
        buyVacuum();
    }
    
    if(clickedButton(event.clientX, event.clientY, "shipPurchaseButton")){
        buyShip();
    }
    
    if(clickedButton(event.clientX, event.clientY, "sellButton")){
        sellFish();
    }
    
    if(clickPurchaseCrown(event.clientX, event.clientY)){
        buyCrown();
    }
    
    if(clickPurchaseDoubleHook(event.clientX, event.clientY)){
        buyDoubleHook();
    }
    
    if(clickedButton(event.clientX, event.clientY, "timerIcon")){
        switchTimer(true);
    }
    
    if(clickedButton(event.clientX, event.clientY, "stockIcon")){
        switchTimer(false);
    }
    
    if(clickedButton(event.clientX, event.clientY, "buyStockButton")){
        tradeStocks(true);
    }
    
    if(clickedButton(event.clientX, event.clientY, "sellStockButton")){
        tradeStocks(false);
    }
    
    if(clickPurchaseTopHat(event.clientX, event.clientY)){
        buyTopHat();
    }
    
    if(clickPurchaseRocketShip(event.clientX, event.clientY)){
        buyRocketShip();
    }
    
    if(clickedButton(event.clientX, event.clientY, "rebirthButton")){
        initRebirthPage();
    }
    
    if(clickedButton(event.clientX, event.clientY, "checkBox-0")){
        toggleRebirthOption(0);
    }
    
    if(clickedButton(event.clientX, event.clientY, "checkBox-1")){
        toggleRebirthOption(1);
    }
    
    if(clickedButton(event.clientX, event.clientY, "checkBox-2")){
        toggleRebirthOption(2);
    }
    
    if(clickedButton(event.clientX, event.clientY, "checkBox-3")){
        toggleRebirthOption(3);
    }
    
    if(clickedButton(event.clientX, event.clientY, "checkBox-4")){
        toggleRebirthOption(4);
    }
    
    if(clickedButton(event.clientX, event.clientY, "startGameButton")){
        restartGame();
    }
}

// Restarts the game with the chosen challenges
function restartGame(){
    let modify = 1;
    
    if(rebirthChallenges[0]){
        autoPoleCost = 6;
        magnetCost = 120;
        vacuumCost = 6000;
        shipCost = 120000;
        modify += .05;
    } else {
        autoPoleCost = 5;
        magnetCost = 100;
        vacuumCost = 5000;
        shipCost = 100000;
    }
    
    if(rebirthChallenges[1]){
        modify += .05;
    }
    
    if(rebirthChallenges[2]){
        cash = -500.0
        modify += .05;
    } else {
        cash = 0.0;
    }

    if(rebirthChallenges[3]){
        stockPrices = [2000, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        modify += .05;
    } else {
        stockPrices = [1000, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    
    if(rebirthChallenges[4]){
        kingMod = 500;
        modify += .05;
    } else {
        kingMod = 100;
    }
    
    pricesMod = modify;
    
    let currentStage = "";

    numFish = 0;
    clickAmount = 1;
    passiveAmount = 0;

    purchasePrice = 0;

    numPoles = 0;

    numMagnets = 0;
    
    numVacuums = 0;
    
    numShips = 0;

    doubleHookMulti = false;
    queuedSalmon = 0;
    betterPrices = false;

    party = false;

    lastTime = 0;
    time = [0, 0, 0, 0, 0];

    bottomBarMode = "timer";

    numStocks = 0;

    totalFish = 0;
    totalCash = 0;
    
    deleteAllElements();
    progressIntroCinematic(0);
}

// Edits the rebirth challenge choices
function toggleRebirthOption(index){
    rebirthChallenges[index] = !rebirthChallenges[index];
    
    let width = getElementById("checkBox-" + index).getWidth();
    if(rebirthChallenges[index]){
        getElementById("checkBox-" + index).setImage("assets/game_images/Checked-Box.png");
    } else {
        getElementById("checkBox-" + index).setImage("assets/game_images/Unchecked-Box.png");
    }
    getElementById("checkBox-" + index).setSize(width, width);
}

// Buys and sells stocks
function tradeStocks(purchase){
    if(purchase){
        if(Math.round(stockPrices[0]) > cash){
            initFadeMessage("You don't have enough money for that!");
        } else {
            initFadeMessage("Purchased a stock!");
            numStocks ++;
            updateCash(-1 * Math.round(stockPrices[0]));
        }
    } else {
        if(numStocks == 0){
            initFadeMessage("You don't have any stocks!");
        } else {
            initFadeMessage("Sold a stock!");
            numStocks --;
            updateCash(Math.round(stockPrices[0]));
        }
    }
    
    if(getElementById("numStocksLabel") != null){
        getElementById("numStocksLabel").setText("Stocks: " + numStocks);
    }
}

// Checks if the player clicked on the purchase top hat, price or background
function clickPurchaseTopHat(x, y){
    return clickedButton(x, y, "topHatUpgradeBackground") || 
    clickedButton(x, y, "topHatUpgrade") ||
    clickedButton(x, y, "topHatUpgradePriceLabel");
}

// Checks if the player clicked on the purchase crown, price or background
function clickPurchaseCrown(x, y){
    return clickedButton(x, y, "crownUpgradeBackground") || 
    clickedButton(x, y, "crownUpgrade") ||
    clickedButton(x, y, "crownUpgradePriceLabel");
}

// Checks if the player clicked on the purchase double hook, price or background
function clickPurchaseDoubleHook(x, y){
    return clickedButton(x, y, "doubleHookUpgradeBackground") || 
    clickedButton(x, y, "doubleHookUpgrade") ||
    clickedButton(x, y, "doubleHookUpgradePriceLabel");
}

// Checks if the player clicked on the purchase rocket ship, price or background
function clickPurchaseRocketShip(x, y){
    return clickedButton(x, y, "rocketShipUpgradeBackground") || 
    clickedButton(x, y, "rocketShipUpgrade") ||
    clickedButton(x, y, "rocketShipUpgradePriceLabel");
}

// Incriments the game timer
function incrimentTimer(){
    let increase = Date.now() - lastTime;

    lastTime = Date.now();
    
    time[4] += increase;
    
    if(time[4] >= 1000){
        let amount = Math.floor(time[4] / 1000);
        
        if (amount >= 2){
            time[3] += Math.floor(time[4] / 1000);
            time[4] -= Math.floor(time[4] / 1000) * 1000;
        } else {
            time[4] -= 1000;
            time[3] += 1;
        }
    }
    
    if(time[3] >= 60){
        time[3] -= 60;
        time[2] += 1;
    }
    
    if(time[2] >= 60){
        time[2] -= 60;
        time[1] += 1;
    }
    
    if(time[1] >= 24){
        time[1] -= 24;
        time[0] += 1;
    }
    
    const TIMER_OBJECT = getElementById("timerBar");
    const TIMER_BAR_FONT = (gameHolder.offsetWidth / 20) + "pt Arial";
    
    let time0 = time[0];
    if(time0 / 10 < 1){
        time0 = "0" + time[0];
    }
    
    let time1 = time[1];
    if(time1 / 10 < 1){
        time1 = "0" + time[1];
    }
    
    let time2 = time[2];
    if(time2 / 10 < 1){
        time2 = "0" + time[2];
    }
    
    let time3 = time[3];
    if(time3 / 10 < 1){
        time3 = "0" + time[3];
    }
    
    let time4 = time[4];
    if(time4 / 100 < 1){
        time4 = "0" + time[4];
    }
    
    if(time4 / 10 < 1){
        time4 = "00" + time[4];
    }
    
    const TIME_TEXT = time0 + ":" + time1 + ":" + time2 + ":" + time3 + ":" + time4;
    
    if(bottomBarMode == "timer"){
        TIMER_OBJECT.setText(TIME_TEXT);    
    }
}

// Switches the bottom bar between the stock market and the timer
function switchTimer(timer){
    if(timer){
        bottomBarMode = "timer";
        initTimerPage(true);
    } else {
        bottomBarMode = "stockMarket";
        initTimerPage(false);
    }
}

// Randomizes the stock market price
function shuffleStockMarket(){
    let mult = (Math.random() * 0.32647058824) + 0.85;
    
    let newVal = (stockPrices[0] * mult) + 1;
    
    let placeholder = stockPrices.splice(0, 9);
    
    stockPrices.pop();
    
    stockPrices.push(newVal);
    
    for(let i = 0; i < placeholder.length; i ++){
        stockPrices.push(placeholder[i]);
    }
    
    if(bottomBarMode == "stockMarket"){
        initTimerPage(false);
    }
}

// Removes the elements associated with the timer page
function removeTimerArtifacts(){
    let prevLines = getAllElementsById("dataLin;e");
    for(let i = 0; i < prevLines.length; i ++){
        removeElement(prevLines[i]);
    }
        
    if(getElementById("timerIcon") != null){
        removeElement(getElementById("timerIcon"));
    }
    
    if(getElementById("stockIcon") != null){
        removeElement(getElementById("stockIcon"));
    }
    
    if(getElementById("timerBar") != null){
        removeElement(getElementById("timerBar"));
    }
    
    if(getElementById("currentPriceLabel") != null){
        removeElement(getElementById("currentPriceLabel"));
    }
    
    if(getElementById("maxPriceLabel") != null){
        removeElement(getElementById("maxPriceLabel"));
    }
    
    if(getElementById("minPriceLabel") != null){
        removeElement(getElementById("minPriceLabel"));
    }
    
    if(getElementById("buyStockButton") != null){
        removeElement(getElementById("buyStockButton"));
    }
    
    if(getElementById("sellStockButton") != null){
        removeElement(getElementById("sellStockButton"));
    }
    
    if(getElementById("numStocksLabel") != null){
        removeElement(getElementById("numStocksLabel"));
    }
}

// Creates the bottom panel with the timer
function initTimerPage(timer){
    // Remove artifacts
    removeTimerArtifacts();
    
    const BUTTON_ICON_WIDTH = gameHolder.offsetWidth / 25;
    const BUTTON_ICON_HEIGHT = BUTTON_ICON_WIDTH;
    const BUTTON_ICON_X = (gameHolder.offsetWidth / 14) * 11;

    const TIMER_ICON_Y = (gameHolder.offsetHeight / 11) * 9;
    const STOCK_ICON_Y = (gameHolder.offsetHeight / 44) * 39;
    
    let timerIcon = new WebImage("assets/game_images/Timer-Icon.png");
    timerIcon.setSize(BUTTON_ICON_WIDTH, BUTTON_ICON_HEIGHT);
    timerIcon.setPosition(BUTTON_ICON_X, TIMER_ICON_Y);
    timerIcon.setId("timerIcon");
    timerIcon.moveToTop();
    addElement(timerIcon);
    
    let stockIcon = new WebImage("assets/game_images/Stock-Market-Icon.png");
    stockIcon.setSize(BUTTON_ICON_WIDTH, BUTTON_ICON_HEIGHT);
    stockIcon.setPosition(BUTTON_ICON_X, STOCK_ICON_Y)
    stockIcon.setId("stockIcon");
    stockIcon.moveToTop();
    addElement(stockIcon);

    const BOTTOM_BAR_WIDTH = (gameHolder.offsetWidth / 3 * 2);
    const BOTTOM_BAR_HEIGHT = gameHolder.offsetHeight / 6;
    
    let bottomBar = new Rectangle(BOTTOM_BAR_WIDTH, BOTTOM_BAR_HEIGHT);
    bottomBar.setPosition((gameHolder.offsetWidth / 6), ((gameHolder.offsetHeight / 6) * 5));
    if(timer){
        bottomBar.setColor("gray");
    } else {
        bottomBar.setColor("black");
    }
    
    bottomBar.setId("bottomBar");
    addElement(bottomBar);
    
    if(timer){
        const TIMER_BAR_FONT = (gameHolder.offsetWidth / 20) + "pt Arial";
    
        let timerBar = new Text("00:00:00:00:000", TIMER_BAR_FONT);
    
        const TIMER_BAR_X = bottomBar.getX() + (bottomBar.getWidth() - timerBar.getWidth()) / 2;
        const TIMER_BAR_Y = gameHolder.offsetHeight - (gameHolder.offsetHeight / 20);
    
        timerBar.setPosition(TIMER_BAR_X, TIMER_BAR_Y);
        timerBar.setId("timerBar");
        addElement(timerBar);
    
        if(lastTime == 0){
            lastTime = Date.now();   
        }
    } else {
        let currentPrice = stockPrices[0];
        
        let extremePrices = getExtremeStockPrices();
        let min = extremePrices[0];
        let max = extremePrices[1];

        const LINE_START_X = bottomBar.getX() + (BOTTOM_BAR_WIDTH / 4);
        const LINE_END_X = bottomBar.getX() + ((BOTTOM_BAR_WIDTH / 12) * 11);
        
        const TOP_LINE_Y = bottomBar.getY() + (BOTTOM_BAR_HEIGHT / 12);
        const BOTTOM_LINE_Y = bottomBar.getY() + ((BOTTOM_BAR_HEIGHT / 12) * 11);
        
        const TRADE_STOCK_WIDTH = (gameHolder.offsetWidth / 30);
        const TRADE_STOCK_HEIGHT = TRADE_STOCK_WIDTH;
        
        const TRADE_STOCK_X = (bottomBar.getX() + (bottomBar.getWidth() / 70));
        const BUY_STOCK_Y = (bottomBar.getY() + (bottomBar.getHeight() / 8));
        
        let buyStockButton = new WebImage("assets/game_images/Buy-Stock-Button.png");
        buyStockButton.setSize(TRADE_STOCK_WIDTH, TRADE_STOCK_HEIGHT);
        buyStockButton.setPosition(TRADE_STOCK_X, BUY_STOCK_Y);
        buyStockButton.setId("buyStockButton");
        addElement(buyStockButton);
        
        const SELL_STOCK_Y = (bottomBar.getY() + ((bottomBar.getHeight() / 5) * 3));
        
        let sellStockButton = new WebImage("assets/game_images/Sell-Stock-Button.png");
        sellStockButton.setSize(TRADE_STOCK_WIDTH, TRADE_STOCK_HEIGHT);
        sellStockButton.setPosition(TRADE_STOCK_X, SELL_STOCK_Y);
        sellStockButton.setId("sellStockButton");
        addElement(sellStockButton);
        
        for(let i = 0; i < 4; i ++){
            const DIFF = BOTTOM_LINE_Y - TOP_LINE_Y;
            
            const LINE_Y = TOP_LINE_Y + ((DIFF / 5) * (i + 1)); 

            let grayLine = new Line(LINE_START_X, LINE_Y, LINE_END_X, LINE_Y);
            grayLine.setColor("#3d3d3d");
            grayLine.setId("dataLine");
            addElement(grayLine);
        }
        
        let topLine = new Line(LINE_START_X, TOP_LINE_Y, LINE_END_X, TOP_LINE_Y);
        topLine.setColor("darkgreen");
        topLine.setId("dataLine");
        addElement(topLine);
        
        let bottomLine = new Line(LINE_START_X, BOTTOM_LINE_Y, LINE_END_X, BOTTOM_LINE_Y);
        bottomLine.setColor("darkgreen");
        bottomLine.setId("dataLine");
        addElement(bottomLine);
        
        let leftLine = new Line(LINE_START_X, TOP_LINE_Y, LINE_START_X, BOTTOM_LINE_Y);
        leftLine.setColor("darkgreen");
        leftLine.setId("dataLine");
        addElement(leftLine);
        
        let rightLine = new Line(LINE_END_X, TOP_LINE_Y, LINE_END_X, BOTTOM_LINE_Y);
        rightLine.setColor("darkgreen");
        rightLine.setId("dataLine");
        addElement(rightLine);
        
        const EXTREME_PRICE_LABEL_X = (gameHolder.offsetWidth / 17) * 5;
        const EXTREME_PRICE_LABEL_FONT = (gameHolder.offsetWidth / 100) + "pt Arial";
        
        let currentPriceLabel = new Text(("$" + Math.round(currentPrice)), EXTREME_PRICE_LABEL_FONT);
        
        const CURRENT_PRICE_LABEL_Y = topLine.getY() - ((topLine.getY() - bottomLine.getY()) / 2) + (currentPriceLabel.getHeight() / 2);
        
        currentPriceLabel.setPosition(EXTREME_PRICE_LABEL_X, CURRENT_PRICE_LABEL_Y);
        currentPriceLabel.setId("currentPriceLabel");
        currentPriceLabel.setColor("white");
        addElement(currentPriceLabel);
        
        let maxPriceLabel = new Text(("$" + Math.round(max)), EXTREME_PRICE_LABEL_FONT);
        
        const MAX_PRICE_LABEL_Y = topLine.getY() + (maxPriceLabel.getHeight() / 2);

        maxPriceLabel.setPosition(EXTREME_PRICE_LABEL_X, MAX_PRICE_LABEL_Y);
        maxPriceLabel.setId("maxPriceLabel");
        maxPriceLabel.setColor("darkgreen");
        addElement(maxPriceLabel);
        
        let minPriceLabel = new Text(("$" + Math.round(min)), EXTREME_PRICE_LABEL_FONT);
        
        const MIN_PRICE_LABEL_Y = bottomLine.getY() + (minPriceLabel.getHeight() / 2);
        
        minPriceLabel.setPosition(EXTREME_PRICE_LABEL_X, MIN_PRICE_LABEL_Y);
        minPriceLabel.setId("minPriceLabel");
        minPriceLabel.setColor("red");
        addElement(minPriceLabel);
        
        let numStocksLabel = new Text(("Stocks: " + numStocks), EXTREME_PRICE_LABEL_FONT);
        
        const NUM_STOCKS_LABEL_Y = bottomLine.getY() - (((bottomLine.getY() - topLine.getY()) / 4) * 3);
        const NUM_STOCKS_LABEL_X = TRADE_STOCK_X + TRADE_STOCK_WIDTH + (TRADE_STOCK_WIDTH / 2);
        
        numStocksLabel.setPosition(NUM_STOCKS_LABEL_X, NUM_STOCKS_LABEL_Y);
        numStocksLabel.setId("numStocksLabel");
        numStocksLabel.setColor("white");
        numStocksLabel.moveToTop();
        addElement(numStocksLabel);

        let significantPrices = getNumSignificantPrices();
        
        let bars = significantPrices + 1;
        
        let relative = [];
        for(let i = 0; i < significantPrices; i ++){
            if(max - min == 0){
                relative.push(0.5);
            } else {
                relative.push((stockPrices[i] - min) / (max - min));
            }
        }

        let barHeight = BOTTOM_LINE_Y - TOP_LINE_Y;
        let totalWidth = LINE_END_X - LINE_START_X;
        
        let dataHeights = [];
        for(let i = 0; i < relative.length; i ++){
            dataHeights.push(barHeight * relative[i]);
        }
        
        for(let i = 0; i < dataHeights.length; i ++){
            const startX = ((((dataHeights.length - i) - 1) / dataHeights.length) * totalWidth) + LINE_START_X;
            const endX = (((dataHeights.length - i) / dataHeights.length) * totalWidth) + LINE_START_X;
            

            let endY = BOTTOM_LINE_Y - dataHeights[i];
            let startY = 0;
            
            if(i + 1 < dataHeights.length){
                startY = BOTTOM_LINE_Y - dataHeights[i + 1];
            } else {
                startY = BOTTOM_LINE_Y - dataHeights[i];
            }
            
            let dataLine = new Line(startX, startY, endX, endY);
            if(i + 1 < dataHeights.length && relative[i + 1] < relative[i]){
                dataLine.setColor("green");
            } else if(i + 1 < dataHeights.length && relative[i + 1] > relative[i]){
                dataLine.setColor("red");
            } else {
                dataLine.setColor("white");
            }
            
            dataLine.setId("dataLine");
            addElement(dataLine);
        }
    }
}

// Handles the rebirth page
function initRebirthPage(){
    deleteAllElements();
    
    let rebirthBackground = new Rectangle(gameHolder.offsetWidth, gameHolder.offsetHeight);
    rebirthBackground.setColor("white");
    rebirthBackground.setId("rebirthBackground");
    addElement(rebirthBackground);
    
    const REBIRTH_TITLE_FONT = (gameHolder.offsetWidth / 25) + "pt Arial";
    
    let rebirthTitle = new Text("Rebirth Options", REBIRTH_TITLE_FONT);
    
    const REBIRTH_TITLE_X = (gameHolder.offsetWidth - rebirthTitle.getWidth()) / 2;
    const REBIRTH_TITLE_Y = rebirthTitle.getHeight();
    
    rebirthTitle.setPosition(REBIRTH_TITLE_X, REBIRTH_TITLE_Y);
    rebirthTitle.setId("rebirthTitle");
    addElement(rebirthTitle);
    
    const CHECK_BOX_WIDTH = gameHolder.offsetWidth / 50;
    const CHECK_BOX_HEIGHT = CHECK_BOX_WIDTH;
    const CHECK_BOX_X = CHECK_BOX_WIDTH;
    const CHECK_BOX_FONT = (gameHolder.offsetWidth / 40) + "pt Arial";
    
    const REBIRTH_OPTION_X = CHECK_BOX_X + (CHECK_BOX_WIDTH * 1.5);
    
    for(let i = 0; i < 5; i ++){
        const CHECK_BOX_Y = (gameHolder.offsetHeight / 9) * (i + 2);
        
        let checkBox = new WebImage("assets/game_images/Unchecked-Box.png");
        checkBox.setSize(CHECK_BOX_WIDTH, CHECK_BOX_HEIGHT);
        checkBox.setPosition(CHECK_BOX_X, CHECK_BOX_Y);
        checkBox.setId("checkBox-" + i);
        addElement(checkBox);
        
        let checkBoxText;
        if(i == 0){
            checkBoxText = "All purchasable items cost 20% more - +0.5% revenue";
        } else if(i == 1){
            checkBoxText = "All purchasable upgrades cost 20% more - +0.5% revenue";
        } else if(i == 2){
            checkBoxText = "Start with -$500- +0.5% revenue";
        } else if(i == 3){
            checkBoxText = "The stock market starts at double the price - +0.5% revenue";
        } else if(i == 4){
            checkBoxText = "All king salmon start out less common - +0.5% revenue";
        }
        
        const REBIRTH_OPTION_Y = (CHECK_BOX_Y + CHECK_BOX_HEIGHT);
        
        let rebirthOption = new Text(checkBoxText, CHECK_BOX_FONT);
        rebirthOption.setPosition(REBIRTH_OPTION_X, REBIRTH_OPTION_Y);
        rebirthOption.setId("rebirthOption-" + i);
        addElement(rebirthOption);
    }
    
    const START_GAME_BUTTON_WIDTH = gameHolder.offsetWidth / 6;
    const START_GAME_BUTTON_HEIGHT = START_GAME_BUTTON_WIDTH / 2;
    
    const START_GAME_BUTTON_X = gameHolder.offsetWidth - START_GAME_BUTTON_WIDTH;
    const START_GAME_BUTTON_Y = gameHolder.offsetHeight - START_GAME_BUTTON_HEIGHT;
    
    let startGameButton = new WebImage("assets/game_images/Rebirth-Button.png");
    startGameButton.setSize(START_GAME_BUTTON_WIDTH, START_GAME_BUTTON_HEIGHT);
    startGameButton.setPosition(START_GAME_BUTTON_X, START_GAME_BUTTON_Y);
    startGameButton.setId("startGameButton");
    addElement(startGameButton);
}

// Returns the amount of data in stock prices
function getNumSignificantPrices(){
    for(let i = 0; i < stockPrices.length; i ++){
        if(stockPrices[i] == 0){
            return i;
        }
    }
    return stockPrices.length;
}

// Returns the max and min price of the stock prices
function getExtremeStockPrices(){
    let max = stockPrices[0];
    let min = stockPrices[0];
    
    for(let i = 0; i < stockPrices.length; i ++){
        if(max < stockPrices[i]){
            max = stockPrices[i];
        }
        if((min > stockPrices[i]) && (stockPrices[i] != 0)){
            min = stockPrices[i];
        }
    }
    
    return [min, max];
}

// Changes the amount of cash the player has and updates the counter
function updateCash(change){
    cash = Math.round((cash + change) * 100) / 100;
    if(change > 0){
        totalCash = Math.round((cash + change) * 100) / 100;
    }
    
    let cashAsText = "";
    
    if(cash >= 1000000){
        cashAsText += (Math.round(cash / 10000) / 100) + "M";
    } else if(cash >= 100000){
        cashAsText += (Math.round(cash / 1000)) + "K";
    } else if(cash >= 10000){
        cashAsText += (Math.round(cash / 100) / 10) + "K";
    } else if(cash >= 1000){
        cashAsText += (Math.round(cash / 10) / 100) + "K";
    } else {
        cashAsText = cash;
    }
    
    getElementById("cashCounter").setText("$: " + cashAsText);
}

// Sells fish for $
function sellFish(){
    updateCash(numFish * purchasePrice);
    numFish = 0;
    getElementById("fishCounter").setText("Fish: " + numFish);
}

// Randomizes the value of the purchasing price
function randomizePurchasePrice(){
    if(betterPrices){
        purchasePrice = Math.round(((Math.random() * 0.5) + 1) * 100 * pricesMod) / 100;
        getElementById("sellCounter").setText("Sell Price: $" + purchasePrice);
    } else {
        purchasePrice = Math.round(((Math.random() * 0.5) + .85) * 100 * pricesMod) / 100;
        getElementById("sellCounter").setText("Sell Price: $" + purchasePrice);
    }
}

// Purchases the autoPole if the player has enough $
function buyAutoPole(){
    if(autoPoleCost > cash){
        initFadeMessage("You don't have enough money for that!");
    } else {
        updateCash(-1 * autoPoleCost);
        if(numPoles == 0){
            initFadeMessage("Purchased first Autopole!");
            initAutopole();
        }
        numPoles ++;
        if(numPoles % 10 == 0){
            initHookTrash();
        }
        getElementById("numAutoPoleLabel").setText("Poles: " + numPoles);
        autoPoleCost = Math.round(autoPoleCost * 110) / 100;
        getElementById("autoPoleCostIcon").setText("Cost: $" + autoPoleCost);
        calculatePassiveAmount();
    }
}

// Creates hook trash
function initHookTrash(){
    if(getAllElementsById("hookGarbage").length == 50){
        return;
    }
    initFadeMessage("The autopoles have lost some hooks as trash!")
    for(let i = 0; i < 5; i ++){
        const HOOK_GARBAGE_WIDTH = gameHolder.offsetWidth / 48;
        const HOOK_GARBAGE_HEIGHT = (HOOK_GARBAGE_WIDTH * 12) / 18;
        
        const HOOK_GARBAGE_X = Math.round(Math.random() * ((((gameHolder.offsetWidth / 6) * 5) - HOOK_GARBAGE_WIDTH) - gameHolder.offsetWidth / 6) + (gameHolder.offsetWidth / 6))
        const HOOK_GARBAGE_Y = Math.round(Math.random() * ((((gameHolder.offsetHeight / 6) * 5) - HOOK_GARBAGE_HEIGHT) - ((gameHolder.offsetHeight / 3) * 2)) + ((gameHolder.offsetHeight / 3) * 2));
        
        let hookGarbage = new WebImage("assets/game_images/Hook-Garbage.png");
        hookGarbage.setSize(HOOK_GARBAGE_WIDTH, HOOK_GARBAGE_HEIGHT);
        hookGarbage.setPosition(HOOK_GARBAGE_X, HOOK_GARBAGE_Y);
        hookGarbage.setId("hookGarbage");
        addElement(hookGarbage);
    }
}

// Purchases the magnet if the player has enough $
function buyMagnet(){
    if(magnetCost > cash){
        initFadeMessage("You don't have enough money for that!");
    } else {
        updateCash(-1 * magnetCost);
        if(numMagnets == 0){
            initFadeMessage("Purchased first Magnet!");
            initMagnet();
        }
        numMagnets ++;
        if(numMagnets % 5 == 0){
            initBagTrash();
        }
        getElementById("numMagnetLabel").setText("Magnets: " + numMagnets);
        magnetCost = Math.round(magnetCost * 115) / 100;
        getElementById("magnetCostIcon").setText("Cost: $" + magnetCost);
        calculatePassiveAmount();
    }
}

// Purchases the vacuum if the player has enough $
function buyVacuum(){
    if(vacuumCost > cash){
        initFadeMessage("You don't have enough money for that!");
    } else {
        updateCash(-1 * vacuumCost);
        if(numVacuums == 0){
            initFadeMessage("Purchased first vacuum!");
            initVacuum();
        }
        numVacuums ++;
        getElementById("numVacuumLabel").setText("Vacuums: " + numVacuums);
        vacuumCost = Math.round(vacuumCost * 120) / 100;
        getElementById("vacuumCostIcon").setText("Cost: $" + vacuumCost);
        calculatePassiveAmount();
    }
}

// Purchases the ship if the player has enough $
function buyShip(){
    if(shipCost > cash){
        initFadeMessage("You don't have enough money for that!");
    } else {
        updateCash(-1 * shipCost);
        if(numShips == 0){
            initFadeMessage("Purchased first ship!");
            initShip();
        }
        numShips ++;
        getElementById("numShipLabel").setText("Ships: " + numShips);
        shipCost = Math.round(shipCost * 120) / 100;
        getElementById("shipCostIcon").setText("Cost: $" + shipCost);
        calculatePassiveAmount();
    }
}

// Creates bag trash
function initBagTrash(){
    if(getAllElementsById("bagGarbage").length == 30){
        return;
    }
    initFadeMessage("The magnets have attracted some bags as trash!")
    for(let i = 0; i < 5; i ++){
        const BAG_GARBAGE_WIDTH = gameHolder.offsetWidth / 12;
        const BAG_GARBAGE_HEIGHT = (BAG_GARBAGE_WIDTH);
        
        
        const BAG_GARBAGE_X = Math.round(Math.random() * ((((gameHolder.offsetWidth / 6) * 5) - BAG_GARBAGE_WIDTH) - (gameHolder.offsetWidth / 6)) + (gameHolder.offsetWidth / 6));
        const BAG_GARBAGE_Y = Math.round(Math.random() * ((((gameHolder.offsetHeight / 6) * 5) - (BAG_GARBAGE_HEIGHT / 2)) - ((gameHolder.offsetHeight / 3) * 2)) + ((gameHolder.offsetHeight / 3) * 2));
        
        let bagGarbage = new WebImage("assets/game_images/Trash-Bag.png");
        bagGarbage.setSize(BAG_GARBAGE_WIDTH, BAG_GARBAGE_HEIGHT);
        bagGarbage.setPosition(BAG_GARBAGE_X, BAG_GARBAGE_Y);
        bagGarbage.setId("bagGarbage");
        addElement(bagGarbage);
    }
}


// Purchase the crown upgrade if the player has enough $
function buyCrown(){
    if(!rebirthChallenges[1]){
        if(1000 > cash){
            initFadeMessage("You don't have enough money for that!");
        } else {
            initFadeMessage("King Salmon are more likely!");
            updateCash(-1 * 1000);
            deleteCrownUpgradeButton();
            kingMod = 50;
        }
    } else {
        if(1200 > cash){
            initFadeMessage("You don't have enough money for that!");
        } else {
            initFadeMessage("King Salmon are more likely!");
            updateCash(-1 * 1200);
            deleteCrownUpgradeButton();
            kingMod = 50;
        }
    }
}

// Purchase the double hook upgrade if the player has enough $
function buyDoubleHook(){
    if(!rebirthChallenges[1]){
        if(10000 > cash){
            initFadeMessage("You don't have enough money for that!");
        } else {
            initFadeMessage("Double salmon from clicks!");
            updateCash(-1 * 10000);
            deleteDoubleHookUpgradeButton();
            doubleHookMulti = true;
        }
    } else {
        if(12000 > cash){
            initFadeMessage("You don't have enough money for that!");
        } else {
            initFadeMessage("Double salmon from clicks!");
            updateCash(-1 * 12000);
            deleteDoubleHookUpgradeButton();
            doubleHookMulti = true;
        }
    }
}

// Purchase the top hat upgrade if the player has enough $
function buyTopHat(){
    if(!rebirthChallenges[1]){
        if(50000 > cash){ 
            initFadeMessage("You don't have enough money for that!");
        } else {
            initFadeMessage("Sell prices are higher!");
            updateCash(-1 * 50000);
            deleteTopHatUpgradeButton();
            betterPrices = true;
            randomizePurchasePrice();
        }
    } else {
        if(60000 > cash){ 
            initFadeMessage("You don't have enough money for that!");
        } else {
            initFadeMessage("Sell prices are higher!");
            updateCash(-1 * 60000);
            deleteTopHatUpgradeButton();
            betterPrices = true;
            randomizePurchasePrice();
        }
    }
}

// Purchase the rocket ship upgrade if the player has enough $
function buyRocketShip(){
    if(!rebirthChallenges[1]){
        if(1000000 > cash){
            initFadeMessage("You don't have enough money for that!");
        } else {
            updateCash(-1 * 1000000);
            deleteRocketShipUpgradeButton();
            deleteAllElements();
            currentStage = "credits";
            initEndScreen();
        }
    } else {
        if(1200000 > cash){
            initFadeMessage("You don't have enough money for that!");
        } else {
            updateCash(-1 * 1200000);
            deleteRocketShipUpgradeButton();
            deleteAllElements();
            currentStage = "credits";
            initEndScreen();
        }
    }
}

// Creates the end screen with credits
function initEndScreen(){
    const END_SCREEN_IMAGE_HEIGHT = gameHolder.offsetHeight;
    const END_SCREEN_IMAGE_WIDTH = (END_SCREEN_IMAGE_HEIGHT * 4) / 3; 
    
    const END_SCREEN_IMAGE_X = (gameHolder.offsetWidth - END_SCREEN_IMAGE_WIDTH);
    
    let endScreenImage = new WebImage("assets/game_images/End-Screen.png");
    endScreenImage.setSize(END_SCREEN_IMAGE_WIDTH, END_SCREEN_IMAGE_HEIGHT);
    endScreenImage.setPosition(END_SCREEN_IMAGE_X, 0);
    endScreenImage.setId("endScreenImage");
    addElement(endScreenImage);
    
    const LEFT_BAR_WIDTH = (gameHolder.offsetWidth - END_SCREEN_IMAGE_WIDTH);
    const LEFT_BAR_HEIGHT = gameHolder.offsetHeight;
    
    let leftBar = new Rectangle(LEFT_BAR_WIDTH, LEFT_BAR_HEIGHT);
    leftBar.setColor("black");
    leftBar.setId("leftBar");
    addElement(leftBar);
    
    const CREDITS_LABEL_FONT = (gameHolder.offsetWidth / 40) + "pt Arial";
    
    let creditsLabel = new Text("Credits:", CREDITS_LABEL_FONT);
    
    const CREDITS_LABEL_X = (LEFT_BAR_WIDTH - creditsLabel.getWidth()) / 2;
    const CREDITS_LABEL_Y = creditsLabel.getHeight();
    
    creditsLabel.setPosition(CREDITS_LABEL_X, CREDITS_LABEL_Y);
    creditsLabel.setColor("white");
    creditsLabel.setId("creditsLabel");
    addElement(creditsLabel);
    
    let artCredit = new Text("Art", CREDITS_LABEL_FONT);
    
    const ART_CREDITS_LABEL_X = (LEFT_BAR_WIDTH - artCredit.getWidth()) / 2;
    const ART_CREDITS_LABEL_Y = creditsLabel.getHeight() * 3;
    
    artCredit.setPosition(ART_CREDITS_LABEL_X, ART_CREDITS_LABEL_Y);
    artCredit.setColor("white");
    artCredit.setId("artCredit");
    addElement(artCredit);
    
    const NAME_LABEL_FONT = (gameHolder.offsetWidth / 50) + "pt Arial";
    
    let antwoneCredit = new Text("Antwone Allen", NAME_LABEL_FONT);
    
    const ANTWONE_CREDITS_LABEL_X = (LEFT_BAR_WIDTH - antwoneCredit.getWidth()) / 2;
    const ANTWONE_CREDITS_LABEL_Y = creditsLabel.getHeight() * 4;
    
    antwoneCredit.setPosition(ANTWONE_CREDITS_LABEL_X, ANTWONE_CREDITS_LABEL_Y);
    antwoneCredit.setColor("white");
    antwoneCredit.setId("antwoneCredit");
    addElement(antwoneCredit);
    
    let justinCredit = new Text("Justin Boudreau", NAME_LABEL_FONT);
    
    const JUSTIN_CREDITS_LABEL_X = (LEFT_BAR_WIDTH - justinCredit.getWidth()) / 2;
    const JUSTIN_CREDITS_LABEL_Y = creditsLabel.getHeight() * 5;
    
    justinCredit.setPosition(JUSTIN_CREDITS_LABEL_X, JUSTIN_CREDITS_LABEL_Y);
    justinCredit.setColor("white");
    justinCredit.setId("justinCredit");
    addElement(justinCredit);
    
    let codingCredit = new Text("Code", CREDITS_LABEL_FONT);
    
    const CODE_CREDITS_LABEL_X = (LEFT_BAR_WIDTH - codingCredit.getWidth()) / 2;
    const CODE_CREDITS_LABEL_Y = creditsLabel.getHeight() * 7;
    
    codingCredit.setPosition(CODE_CREDITS_LABEL_X, CODE_CREDITS_LABEL_Y);
    codingCredit.setColor("white");
    codingCredit.setId("codingCredit");
    addElement(codingCredit);
    
    let noahCredit = new Text("Noah McGrail", NAME_LABEL_FONT);
    
    const NOAH_CREDITS_LABEL_X = (LEFT_BAR_WIDTH - noahCredit.getWidth()) / 2;
    const NOAH_CREDITS_LABEL_Y = creditsLabel.getHeight() * 8;
    
    noahCredit.setPosition(NOAH_CREDITS_LABEL_X, NOAH_CREDITS_LABEL_Y);
    noahCredit.setColor("white");
    noahCredit.setId("noahCredit");
    addElement(noahCredit);
    
    let cashAsText = "";
    
    if(cash >= 1000000){
        cashAsText += (Math.round(cash / 10000) / 100) + "M";
    } else if(cash >= 100000){
        cashAsText += (Math.round(cash / 1000)) + "K";
    } else if(cash >= 10000){
        cashAsText += (Math.round(cash / 100) / 10) + "K";
    } else if(cash >= 1000){
        cashAsText += (Math.round(cash / 10) / 100) + "K";
    } else {
        cashAsText = cash;
    } 
    
    let cashIndicator = new Text(("Cash: $" + cashAsText), NAME_LABEL_FONT);
    
    const CASH_INDICATOR_X = (LEFT_BAR_WIDTH - cashIndicator.getWidth()) / 2;
    const CASH_INDICATOR_Y = creditsLabel.getHeight() * 10;
    
    cashIndicator.setPosition(CASH_INDICATOR_X, CASH_INDICATOR_Y);
    cashIndicator.setColor("#b83549");
    cashIndicator.setId("cashIndicator");
    addElement(cashIndicator);
    
    let fishIndicator = new Text(("Total Fish: " + totalFish), NAME_LABEL_FONT);
    
    const FISH_INDICATOR_X = (LEFT_BAR_WIDTH - fishIndicator.getWidth()) / 2;
    const FISH_INDICATOR_Y = creditsLabel.getHeight() * 11;
    
    fishIndicator.setPosition(FISH_INDICATOR_X, FISH_INDICATOR_Y);
    fishIndicator.setColor("#b83549");
    fishIndicator.setId("fishIndicator");
    addElement(fishIndicator);
    
    cashAsText = "";
    
    if(totalCash >= 1000000){
        cashAsText += (Math.round(totalCash / 10000) / 100) + "M";
    } else if(totalCash >= 100000){
        cashAsText += (Math.round(totalCash / 1000)) + "K";
    } else if(totalCash >= 10000){
        cashAsText += (Math.round(totalCash / 100) / 10) + "K";
    } else if(totalCash >= 1000){
        cashAsText += (Math.round(totalCash / 10) / 100) + "K";
    } else {
        cashAsText = totalCash;
    } 
    
    let totalCashIndicator = new Text(("Total Cash: $" + cashAsText), NAME_LABEL_FONT);
    
    const TOTAL_CASH_INDICATOR_X = (LEFT_BAR_WIDTH - totalCashIndicator.getWidth()) / 2;
    const TOTAL_CASH_INDICATOR_Y = creditsLabel.getHeight() * 12;
    
    totalCashIndicator.setPosition(TOTAL_CASH_INDICATOR_X, TOTAL_CASH_INDICATOR_Y);
    totalCashIndicator.setColor("#b83549");
    totalCashIndicator.setId("totalCashIndicator");
    addElement(totalCashIndicator);
    
    let time0 = time[0];
    if(time0 / 10 < 1){
        time0 = "0" + time[0];
    }
    
    let time1 = time[1];
    if(time1 / 10 < 1){
        time1 = "0" + time[1];
    }
    
    let time2 = time[2];
    if(time2 / 10 < 1){
        time2 = "0" + time[2];
    }
    
    let time3 = time[3];
    if(time3 / 10 < 1){
        time3 = "0" + time[3];
    }
    
    let time4 = time[4];
    if(time4 / 100 < 1){
        time4 = "0" + time[4];
    }
    
    if(time4 / 10 < 1){
        time4 = "00" + time[4];
    }
    
    const TIME_TEXT = time0 + ":" + time1 + ":" + time2 + ":" + time3 + ":" + time4;
    
    let totalTimeIndicatorTitle = new Text(("Total Time: "), NAME_LABEL_FONT);
    
    const TOTAL_TIME_INDICATOR_TITLE_X = (LEFT_BAR_WIDTH - totalTimeIndicatorTitle.getWidth()) / 2;
    const TOTAL_TIME_INDICATOR_TITLE_Y = creditsLabel.getHeight() * 13;
    
    totalTimeIndicatorTitle.setPosition(TOTAL_TIME_INDICATOR_TITLE_X, TOTAL_TIME_INDICATOR_TITLE_Y);
    totalTimeIndicatorTitle.setColor("#b83549");
    totalTimeIndicatorTitle.setId("totalTimeIndicatorTitle");
    addElement(totalTimeIndicatorTitle);
    
    let totalTimeIndicator = new Text(TIME_TEXT, NAME_LABEL_FONT);
    
    const TOTAL_TIME_INDICATOR_X = (LEFT_BAR_WIDTH - totalTimeIndicator.getWidth()) / 2;
    const TOTAL_TIME_INDICATOR_Y = creditsLabel.getHeight() * 14;
    
    totalTimeIndicator.setPosition(TOTAL_TIME_INDICATOR_X, TOTAL_TIME_INDICATOR_Y);
    totalTimeIndicator.setColor("#b83549");
    totalTimeIndicator.setId("totalTimeIndicator");
    addElement(totalTimeIndicator);
    
    const REBIRTH_BUTTON_WIDTH = LEFT_BAR_WIDTH / 2;
    const REBIRTH_BUTTON_HEIGHT = REBIRTH_BUTTON_WIDTH / 2;
    
    const REBIRTH_BUTTON_X = (LEFT_BAR_WIDTH - REBIRTH_BUTTON_WIDTH) / 2;
    const REBIRTH_BUTTON_Y = creditsLabel.getHeight() * 14.5;
    
    let rebirthButton = new WebImage("assets/game_images/Rebirth-Button.png");
    rebirthButton.setSize(REBIRTH_BUTTON_WIDTH, REBIRTH_BUTTON_HEIGHT);
    rebirthButton.setPosition(REBIRTH_BUTTON_X, REBIRTH_BUTTON_Y);
    rebirthButton.setId("rebirthButton");
    addElement(rebirthButton);
}

// Deletes everything on the screen
function deleteAllElements(){
    while(canvasObjects.length > 0){
        removeElement(getElementById(canvasObjects[0].id));
    }
    stopTimer(increaseFish);
    stopTimer(animateFishIcons);
    stopTimer(animateHalos);
    stopTimer(randomizePurchasePrice);
    stopTimer(incrimentTimer);
    stopTimer(shuffleStockMarket);
    stopTimer(initQueuedSalmon);
}

// Deletes the crown upgrade elements
function deleteCrownUpgradeButton(){
    removeElement(getElementById("crownUpgradeBackground"));
    removeElement(getElementById("crownUpgrade"));
    removeElement(getElementById("crownUpgradePriceLabel"));
}

// Deletes the double hook upgrade elements
function deleteDoubleHookUpgradeButton(){
    removeElement(getElementById("doubleHookUpgradeBackground"));
    removeElement(getElementById("doubleHookUpgrade"));
    removeElement(getElementById("doubleHookUpgradePriceLabel"));
}

// Deletes the top hat upgrade elements
function deleteTopHatUpgradeButton(){
    removeElement(getElementById("topHatUpgradeBackground"));
    removeElement(getElementById("topHatUpgrade"));
    removeElement(getElementById("topHatUpgradePriceLabel"));
}

// Deletes the rocket ship upgrade elements
function deleteRocketShipUpgradeButton(){
    removeElement(getElementById("rocketShipUpgradeBackground"));
    removeElement(getElementById("rocketShipUpgrade"));
    removeElement(getElementById("rocketShipUpgradePriceLabel"));
}

// Creates a fading message for the player
function initFadeMessage(message){
    const TEXT_MESSAGE_FONT = (gameHolder.offsetWidth / 36) + "pt Arial";
    
    let textMessage = new Text(message, TEXT_MESSAGE_FONT);
    textMessage.setPosition(((gameHolder.offsetWidth - textMessage.getWidth()) / 2), ((gameHolder.offsetHeight - textMessage.getHeight()) / 2));
    textMessage.setId("textMessage");
    textMessage.moveToTop();
    addElement(textMessage);
}

// Decays the fading message
function decayFadeMessage(){
    let textMessages = getAllElementsById("textMessage");
    
    for(let i = 0; i < textMessages.length; i ++){
        let textMessage = textMessages[i];
        
        textMessage.move(0, (-1 * gameHolder.offsetHeight / 100));

        let oldFont = parseFloat(textMessage.getFont());
        
        textMessage.setFont((oldFont - (oldFont / 24)) + "pt Arial");
        textMessage.setX(((gameHolder.offsetWidth - textMessage.getWidth()) / 2));
        
        if(parseFloat(textMessage.getY()) < (0)){
            removeElement(textMessage);
        }
    }
}

// Creates the purchase buttons
function initPurchaseOptions(){
    // USED FOR ALL PURCHASES
    
    const PURCHASE_BUTTON_WIDTH = (getElementById("leftBar").getWidth() / 1.4);
    const PURCHASE_BUTTON_HEIGHT = PURCHASE_BUTTON_WIDTH * 0.5;
    
    const ICON_X = PURCHASE_BUTTON_WIDTH / 8;
    const ICON_FONT = (getElementById("leftBar").getWidth() / 15) + "pt Arial";    

    // END
    
    const AUTOPOLE_PURCHASE_BUTTON_Y = PURCHASE_BUTTON_HEIGHT / 2;
    
    let autoPolePurchaseButton = new WebImage("assets/game_images/Buy-Autopole-Button.png");
    autoPolePurchaseButton.setSize(PURCHASE_BUTTON_WIDTH, PURCHASE_BUTTON_HEIGHT);
    autoPolePurchaseButton.setPosition(ICON_X, AUTOPOLE_PURCHASE_BUTTON_Y);
    autoPolePurchaseButton.setId("autoPolePurchaseButton");
    addElement(autoPolePurchaseButton);
    
    let autoPoleCostIcon = new Text(("Cost: $" + autoPoleCost), ICON_FONT);
    
    const AUTO_POLE_COST_ICON_Y = AUTOPOLE_PURCHASE_BUTTON_Y + PURCHASE_BUTTON_HEIGHT + autoPoleCostIcon.getHeight();
    
    autoPoleCostIcon.setPosition(ICON_X, AUTO_POLE_COST_ICON_Y);
    autoPoleCostIcon.setId("autoPoleCostIcon");
    addElement(autoPoleCostIcon);
    
    const NUM_AUTO_POLE_LABEL_Y = AUTO_POLE_COST_ICON_Y + autoPoleCostIcon.getHeight();
    
    let numAutoPoleLabel = new Text(("Poles: " + numPoles), ICON_FONT);
    numAutoPoleLabel.setPosition(ICON_X, NUM_AUTO_POLE_LABEL_Y);
    numAutoPoleLabel.setId("numAutoPoleLabel");
    addElement(numAutoPoleLabel);
    
    const MAGNET_PURCHASE_BUTTON_Y = PURCHASE_BUTTON_HEIGHT * 2.25;
    
    let magnetPurchaseButton = new WebImage("assets/game_images/Buy-Magnet-Button.png");
    magnetPurchaseButton.setSize(PURCHASE_BUTTON_WIDTH, PURCHASE_BUTTON_HEIGHT);
    magnetPurchaseButton.setPosition(ICON_X, MAGNET_PURCHASE_BUTTON_Y);
    magnetPurchaseButton.setId("magnetPurchaseButton");
    addElement(magnetPurchaseButton);
    
    let magnetCostIcon = new Text(("Cost: $" + magnetCost), ICON_FONT);
    
    const MAGNET_COST_ICON_Y = MAGNET_PURCHASE_BUTTON_Y + PURCHASE_BUTTON_HEIGHT + magnetCostIcon.getHeight();
    
    magnetCostIcon.setPosition(ICON_X, MAGNET_COST_ICON_Y);
    magnetCostIcon.setId("magnetCostIcon");
    addElement(magnetCostIcon);
    
    const NUM_MAGNET_LABEL_Y = MAGNET_COST_ICON_Y + magnetCostIcon.getHeight();
    
    let numMagnetLabel = new Text(("Magnets: " + numMagnets), ICON_FONT);
    numMagnetLabel.setPosition(ICON_X, NUM_MAGNET_LABEL_Y);
    numMagnetLabel.setId("numMagnetLabel");
    addElement(numMagnetLabel);
    
    const VACUUM_PURCHASE_BUTTON_Y = PURCHASE_BUTTON_HEIGHT * 4;
    
    let vacuumPurchaseButton = new WebImage("assets/game_images/Buy-Vacuum-Button.png");
    vacuumPurchaseButton.setSize(PURCHASE_BUTTON_WIDTH, PURCHASE_BUTTON_HEIGHT);
    vacuumPurchaseButton.setPosition(ICON_X, VACUUM_PURCHASE_BUTTON_Y);
    vacuumPurchaseButton.setId("vacuumPurchaseButton");
    addElement(vacuumPurchaseButton);
    
    let vacuumCostIcon = new Text(("Cost: $" + vacuumCost), ICON_FONT);
    
    const VACUUM_COST_ICON_Y = VACUUM_PURCHASE_BUTTON_Y + PURCHASE_BUTTON_HEIGHT + vacuumCostIcon.getHeight();
    
    vacuumCostIcon.setPosition(ICON_X, VACUUM_COST_ICON_Y);
    vacuumCostIcon.setId("vacuumCostIcon");
    addElement(vacuumCostIcon);
    
    const NUM_VACUUM_LABEL_Y = VACUUM_COST_ICON_Y + vacuumCostIcon.getHeight();
    
    let numVacuumLabel = new Text(("Vacuums: " + numVacuums), ICON_FONT);
    numVacuumLabel.setPosition(ICON_X, NUM_VACUUM_LABEL_Y);
    numVacuumLabel.setId("numVacuumLabel");
    addElement(numVacuumLabel);
    
    const SHIP_PURCHASE_BUTTON_Y = PURCHASE_BUTTON_HEIGHT * 5.75;
    
    let shipPurchaseButton = new WebImage("assets/game_images/Buy-Ship-Button.png");
    shipPurchaseButton.setSize(PURCHASE_BUTTON_WIDTH, PURCHASE_BUTTON_HEIGHT);
    shipPurchaseButton.setPosition(ICON_X, SHIP_PURCHASE_BUTTON_Y);
    shipPurchaseButton.setId("shipPurchaseButton");
    addElement(shipPurchaseButton);
    
    let shipCostIcon = new Text(("Cost: $" + shipCost), ICON_FONT);
    
    const SHIP_COST_ICON_Y = SHIP_PURCHASE_BUTTON_Y + PURCHASE_BUTTON_HEIGHT + shipCostIcon.getHeight();
    
    shipCostIcon.setPosition(ICON_X, SHIP_COST_ICON_Y);
    shipCostIcon.setId("shipCostIcon");
    addElement(shipCostIcon);
    
    const NUM_SHIP_LABEL_Y = SHIP_COST_ICON_Y + shipCostIcon.getHeight();
    
    let numShipLabel = new Text(("Ships: " + numShips), ICON_FONT);
    numShipLabel.setPosition(ICON_X, NUM_SHIP_LABEL_Y);
    numShipLabel.setId("numShipLabel");
    addElement(numShipLabel);
}

// Creates the stats
function initStatsPage(){
    const RIGHT_BAR = getElementById("rightBar");
    const COUNTER_FONT_SIZE = (RIGHT_BAR.getWidth() / 8);
    
    const FISH_COUNTER_FONT = COUNTER_FONT_SIZE + "pt Arial";
    const FISH_COUNTER_X = RIGHT_BAR.getX() + (RIGHT_BAR.getWidth() / 6);
    const FISH_COUNTER_Y = gameHolder.offsetHeight / 18;
    
    let fishCounter = new Text(("Fish: " + numFish), FISH_COUNTER_FONT);
    fishCounter.setPosition(FISH_COUNTER_X, FISH_COUNTER_Y);
    fishCounter.setId("fishCounter");
    addElement(fishCounter);
    
    const SELL_BUTTON_WIDTH = RIGHT_BAR.getWidth() / 1.5;
    const SELL_BUTTON_HEIGHT = SELL_BUTTON_WIDTH / 2;
    const SELL_BUTTON_X = RIGHT_BAR.getX() + (RIGHT_BAR.getWidth() / 6);
    const SELL_BUTTON_Y = gameHolder.offsetHeight / 18 * 1.5;
    
    let sellButton = new WebImage("assets/game_images/Sell-Button.png");
    sellButton.setSize(SELL_BUTTON_WIDTH, SELL_BUTTON_HEIGHT);
    sellButton.setPosition(SELL_BUTTON_X, SELL_BUTTON_Y);
    sellButton.setId("sellButton");
    addElement(sellButton);
    
    const SELL_COUNTER_FONT = (COUNTER_FONT_SIZE / 1.7) + "pt Arial";
    const SELL_COUNTER_X = RIGHT_BAR.getX() + (RIGHT_BAR.getWidth() / 6);
    const SELL_COUNTER_Y = gameHolder.offsetHeight / 18 * 4;
    
    let sellCounter = new Text(("Sell Price: $" + purchasePrice), SELL_COUNTER_FONT);
    sellCounter.setPosition(SELL_COUNTER_X, SELL_COUNTER_Y);
    sellCounter.setId("sellCounter");
    addElement(sellCounter);
    
    const CASH_COUNTER_FONT = COUNTER_FONT_SIZE + "pt Arial";
    const CASH_COUNTER_X = RIGHT_BAR.getX() + (RIGHT_BAR.getWidth() / 5);
    const CASH_COUNTER_Y = gameHolder.offsetHeight / 18 * 5;
    
    let cashCounter = new Text(("$: " + cash), CASH_COUNTER_FONT);
    cashCounter.setPosition(CASH_COUNTER_X, CASH_COUNTER_Y);
    cashCounter.setId("cashCounter");
    addElement(cashCounter);
    
    const PASSIVE_AMOUNT_COUNTER_FONT = COUNTER_FONT_SIZE + "pt Arial";
    const PASSIVE_AMOUNT_COUNTER_X = RIGHT_BAR.getX() + (RIGHT_BAR.getWidth() / 5);
    const PASSIVE_AMOUNT_COUNTER_Y = gameHolder.offsetHeight - (gameHolder.offsetHeight / 100);
    
    let passiveAmountCounter = new Text(("S/S: " + passiveAmount), FISH_COUNTER_FONT);
    passiveAmountCounter.setPosition(PASSIVE_AMOUNT_COUNTER_X, PASSIVE_AMOUNT_COUNTER_Y);
    passiveAmountCounter.setId("passiveAmountCounter");
    addElement(passiveAmountCounter);
    
    const FISH_POSTER_WIDTH = gameHolder.offsetWidth / 8;
    const FISH_POSTER_HEIGHT = ((FISH_POSTER_WIDTH * 1024) / 683);
    
    const FISH_POSTER_X = (gameHolder.offsetWidth / 15) * 13;
    const FISH_POSTER_Y = (gameHolder.offsetHeight / 19) * 6;
    
    let fishPoster = new WebImage("assets/game_images/Salmon-Wanted-Poster.png");
    fishPoster.setSize(FISH_POSTER_WIDTH, FISH_POSTER_HEIGHT);
    fishPoster.setPosition(FISH_POSTER_X, FISH_POSTER_Y);
    fishPoster.setId("fishPoster");
    addElement(fishPoster);
    
    initCrownPurchaseIcons(COUNTER_FONT_SIZE, SELL_COUNTER_FONT);
    initDoubleHookPurchaseIcons(COUNTER_FONT_SIZE, SELL_COUNTER_FONT);
    initTopHatPurchaseIcons(COUNTER_FONT_SIZE, SELL_COUNTER_FONT);
    initRocketShipPurchaseIcons(COUNTER_FONT_SIZE, SELL_COUNTER_FONT);
}

// Creates the crown purchase icons
function initCrownPurchaseIcons(COUNTER_FONT_SIZE, SELL_COUNTER_FONT){
    const CROWN_UPGRADE_BACKGROUND_WIDTH = COUNTER_FONT_SIZE * 2.5;
    const CROWN_UPGRADE_BACKGROUND_HEIGHT = COUNTER_FONT_SIZE * 2.5;
    const CROWN_UPGRADE_BACKGROUND_X = (gameHolder.offsetWidth / 15) * 13;
    const CROWN_UPGRADE_BACKGROUND_Y = (gameHolder.offsetHeight / 13) * 9;
    
    let crownUpgradeBackground = new Rectangle(CROWN_UPGRADE_BACKGROUND_WIDTH, CROWN_UPGRADE_BACKGROUND_HEIGHT);
    crownUpgradeBackground.setPosition(CROWN_UPGRADE_BACKGROUND_X, CROWN_UPGRADE_BACKGROUND_Y);
    crownUpgradeBackground.setColor("#71601b");
    crownUpgradeBackground.setId("crownUpgradeBackground");
    addElement(crownUpgradeBackground);
    
    const CROWN_UPGRADE_WIDTH = gameHolder.offsetWidth / 8;
    const CROWN_UPGRADE_HEIGHT = CROWN_UPGRADE_WIDTH / 2;
    
    const CROWN_UPGRADE_X = CROWN_UPGRADE_BACKGROUND_X - (CROWN_UPGRADE_BACKGROUND_WIDTH / 1.5);
    const CROWN_UPGRADE_Y = CROWN_UPGRADE_BACKGROUND_Y - (CROWN_UPGRADE_BACKGROUND_WIDTH / 4);
    
    let crownUpgrade = new WebImage("assets/game_images/Crown.png");
    crownUpgrade.setSize(CROWN_UPGRADE_WIDTH, CROWN_UPGRADE_HEIGHT);
    crownUpgrade.setPosition(CROWN_UPGRADE_X, CROWN_UPGRADE_Y);
    crownUpgrade.setId("crownUpgrade");
    addElement(crownUpgrade);
    
    const CROWN_UPGRADE_PRICE_LABEL_X = CROWN_UPGRADE_BACKGROUND_X;
    const CROWN_UPGRADE_PRICE_LABEL_Y = CROWN_UPGRADE_BACKGROUND_Y + CROWN_UPGRADE_BACKGROUND_HEIGHT;
    
    let price = "$1000";
    if(rebirthChallenges[1]){
        price = "$1200"
    }
    
    let crownUpgradePriceLabel = new Text(price, SELL_COUNTER_FONT);
    crownUpgradePriceLabel.setPosition(CROWN_UPGRADE_PRICE_LABEL_X, CROWN_UPGRADE_PRICE_LABEL_Y);
    crownUpgradePriceLabel.setId("crownUpgradePriceLabel");
    addElement(crownUpgradePriceLabel);
}

// Creates the double hook purchase icons
function initDoubleHookPurchaseIcons(COUNTER_FONT_SIZE, SELL_COUNTER_FONT){
    const DOUBLE_HOOK_UPGRADE_BACKGROUND_WIDTH = COUNTER_FONT_SIZE * 2.5;
    const DOUBLE_HOOK_UPGRADE_BACKGROUND_HEIGHT = COUNTER_FONT_SIZE * 2.5;
    const DOUBLE_HOOK_UPGRADE_BACKGROUND_X = (gameHolder.offsetWidth / 15) * 14;
    const DOUBLE_HOOK_UPGRADE_BACKGROUND_Y = (gameHolder.offsetHeight / 13) * 9;
    
    let doubleHookUpgradeBackground = new Rectangle(DOUBLE_HOOK_UPGRADE_BACKGROUND_WIDTH, DOUBLE_HOOK_UPGRADE_BACKGROUND_HEIGHT);
    doubleHookUpgradeBackground.setPosition(DOUBLE_HOOK_UPGRADE_BACKGROUND_X, DOUBLE_HOOK_UPGRADE_BACKGROUND_Y);
    doubleHookUpgradeBackground.setColor("#71601b");
    doubleHookUpgradeBackground.setId("doubleHookUpgradeBackground");
    addElement(doubleHookUpgradeBackground);
    
    const DOUBLE_HOOK_UPGRADE_WIDTH = gameHolder.offsetWidth / 16;
    const DOUBLE_HOOK_UPGRADE_HEIGHT = DOUBLE_HOOK_UPGRADE_WIDTH;
    
    const DOUBLE_HOOK_UPGRADE_X = DOUBLE_HOOK_UPGRADE_BACKGROUND_X + (DOUBLE_HOOK_UPGRADE_BACKGROUND_WIDTH / 10);
    const DOUBLE_HOOK_UPGRADE_Y = DOUBLE_HOOK_UPGRADE_BACKGROUND_Y - (DOUBLE_HOOK_UPGRADE_BACKGROUND_WIDTH / 2);
    
    let doubleHookUpgrade = new WebImage("assets/game_images/Double-Hook.png");
    doubleHookUpgrade.setSize(DOUBLE_HOOK_UPGRADE_WIDTH, DOUBLE_HOOK_UPGRADE_HEIGHT);
    doubleHookUpgrade.setPosition(DOUBLE_HOOK_UPGRADE_X, DOUBLE_HOOK_UPGRADE_Y);
    doubleHookUpgrade.setId("doubleHookUpgrade");
    addElement(doubleHookUpgrade);
    
    const DOUBLE_HOOK_UPGRADE_PRICE_LABEL_X = DOUBLE_HOOK_UPGRADE_BACKGROUND_X;
    const DOUBLE_HOOK_UPGRADE_PRICE_LABEL_Y = DOUBLE_HOOK_UPGRADE_BACKGROUND_Y + DOUBLE_HOOK_UPGRADE_BACKGROUND_HEIGHT;
    
    let price = "$10k";
    if(rebirthChallenges[1]){
        price = "$12k"
    }
    
    let doubleHookUpgradePriceLabel = new Text(price, SELL_COUNTER_FONT);
    doubleHookUpgradePriceLabel.setPosition(DOUBLE_HOOK_UPGRADE_PRICE_LABEL_X, DOUBLE_HOOK_UPGRADE_PRICE_LABEL_Y);
    doubleHookUpgradePriceLabel.setId("doubleHookUpgradePriceLabel");
    addElement(doubleHookUpgradePriceLabel);
}

// Creates the tophat purchase icons
function initTopHatPurchaseIcons(COUNTER_FONT_SIZE, SELL_COUNTER_FONT){
    const TOP_HAT_UPGRADE_BACKGROUND_WIDTH = COUNTER_FONT_SIZE * 2.5;
    const TOP_HAT_UPGRADE_BACKGROUND_HEIGHT = COUNTER_FONT_SIZE * 2.5;
    const TOP_HAT_UPGRADE_BACKGROUND_X = (gameHolder.offsetWidth / 15) * 13;
    const TOP_HAT_UPGRADE_BACKGROUND_Y = (gameHolder.offsetHeight / 15) * 12;
    
    let topHatUpgradeBackground = new Rectangle(TOP_HAT_UPGRADE_BACKGROUND_WIDTH, TOP_HAT_UPGRADE_BACKGROUND_HEIGHT);
    topHatUpgradeBackground.setPosition(TOP_HAT_UPGRADE_BACKGROUND_X, TOP_HAT_UPGRADE_BACKGROUND_Y);
    topHatUpgradeBackground.setColor("#71601b");
    topHatUpgradeBackground.setId("topHatUpgradeBackground");
    addElement(topHatUpgradeBackground);
    
    const TOP_HAT_UPGRADE_WIDTH = gameHolder.offsetWidth / 20;
    const TOP_HAT_UPGRADE_HEIGHT = TOP_HAT_UPGRADE_WIDTH;
    
    const TOP_HAT_UPGRADE_X = TOP_HAT_UPGRADE_BACKGROUND_X + (TOP_HAT_UPGRADE_BACKGROUND_WIDTH / 15);
    const TOP_HAT_UPGRADE_Y = TOP_HAT_UPGRADE_BACKGROUND_Y - (TOP_HAT_UPGRADE_BACKGROUND_HEIGHT / 10);
    
    let topHatUpgrade = new WebImage("assets/game_images/Top-Hat.png");
    topHatUpgrade.setSize(TOP_HAT_UPGRADE_WIDTH, TOP_HAT_UPGRADE_HEIGHT);
    topHatUpgrade.setPosition(TOP_HAT_UPGRADE_X, TOP_HAT_UPGRADE_Y);
    topHatUpgrade.setId("topHatUpgrade");
    addElement(topHatUpgrade);
    
    const TOP_HAT_UPGRADE_PRICE_LABEL_X = TOP_HAT_UPGRADE_BACKGROUND_X;
    const TOP_HAT_UPGRADE_PRICE_LABEL_Y = TOP_HAT_UPGRADE_BACKGROUND_Y + TOP_HAT_UPGRADE_BACKGROUND_HEIGHT;
    
    let price = "$50k";
    if(rebirthChallenges[1]){
        price = "$60k"
    }
    
    let topHatUpgradePriceLabel = new Text(price, SELL_COUNTER_FONT);
    topHatUpgradePriceLabel.setPosition(TOP_HAT_UPGRADE_PRICE_LABEL_X, TOP_HAT_UPGRADE_PRICE_LABEL_Y);
    topHatUpgradePriceLabel.setId("topHatUpgradePriceLabel");
    addElement(topHatUpgradePriceLabel);
}

// Creates the rocket ship purchase icons
function initRocketShipPurchaseIcons(COUNTER_FONT_SIZE, SELL_COUNTER_FONT){
    const ROCKET_SHIP_UPGRADE_BACKGROUND_WIDTH = COUNTER_FONT_SIZE * 2.5;
    const ROCKET_SHIP_UPGRADE_BACKGROUND_HEIGHT = COUNTER_FONT_SIZE * 2.5;
    const ROCKET_SHIP_UPGRADE_BACKGROUND_X = (gameHolder.offsetWidth / 15) * 14;
    const ROCKET_SHIP_UPGRADE_BACKGROUND_Y = (gameHolder.offsetHeight / 15) * 12;
    
    let rocketShipUpgradeBackground = new Rectangle(ROCKET_SHIP_UPGRADE_BACKGROUND_WIDTH, ROCKET_SHIP_UPGRADE_BACKGROUND_HEIGHT);
    rocketShipUpgradeBackground.setPosition(ROCKET_SHIP_UPGRADE_BACKGROUND_X, ROCKET_SHIP_UPGRADE_BACKGROUND_Y);
    rocketShipUpgradeBackground.setColor("#7242f5");
    rocketShipUpgradeBackground.setId("rocketShipUpgradeBackground");
    addElement(rocketShipUpgradeBackground);
    
    const ROCKET_SHIP_UPGRADE_WIDTH = gameHolder.offsetWidth / 30;
    const ROCKET_SHIP_UPGRADE_HEIGHT = ROCKET_SHIP_UPGRADE_WIDTH;
    
    const ROCKET_SHIP_UPGRADE_X = ROCKET_SHIP_UPGRADE_BACKGROUND_X + (ROCKET_SHIP_UPGRADE_BACKGROUND_WIDTH / 6.5);
    const ROCKET_SHIP_UPGRADE_Y = ROCKET_SHIP_UPGRADE_BACKGROUND_Y + (ROCKET_SHIP_UPGRADE_BACKGROUND_HEIGHT / 45);
    
    let rocketShipUpgrade = new WebImage("assets/game_images/Rocket-Ship.png");
    rocketShipUpgrade.setSize(ROCKET_SHIP_UPGRADE_WIDTH, ROCKET_SHIP_UPGRADE_HEIGHT);
    rocketShipUpgrade.setPosition(ROCKET_SHIP_UPGRADE_X, ROCKET_SHIP_UPGRADE_Y);
    rocketShipUpgrade.setId("rocketShipUpgrade");
    addElement(rocketShipUpgrade);
    
    const ROCKET_SHIP_UPGRADE_PRICE_LABEL_X = ROCKET_SHIP_UPGRADE_BACKGROUND_X;
    const ROCKET_SHIP_UPGRADE_PRICE_LABEL_Y = ROCKET_SHIP_UPGRADE_BACKGROUND_Y + ROCKET_SHIP_UPGRADE_BACKGROUND_HEIGHT;
    
    let price = "$1M";
    if(rebirthChallenges[1]){
        price = "$1.2M"
    }
    
    let rocketShipUpgradePriceLabel = new Text(price, SELL_COUNTER_FONT);
    rocketShipUpgradePriceLabel.setPosition(ROCKET_SHIP_UPGRADE_PRICE_LABEL_X, ROCKET_SHIP_UPGRADE_PRICE_LABEL_Y);
    rocketShipUpgradePriceLabel.setId("rocketShipUpgradePriceLabel");
    addElement(rocketShipUpgradePriceLabel);
}

// Creates the autopole icon
function initAutopole(){
    const AUTOPOLE_WIDTH = gameHolder.offsetWidth / 48;
    const AUTOPOLE_X = gameHolder.offsetWidth / 4;
    const AUTOPOLE_Y = gameHolder.offsetHeight / 3;
    
    let autopoleIcon = new WebImage("assets/game_images/Autopole.png");
    autopoleIcon.setSize(AUTOPOLE_WIDTH, (AUTOPOLE_WIDTH * 8));
    autopoleIcon.setId("autoPole");
    autopoleIcon.setPosition(AUTOPOLE_X, AUTOPOLE_Y);
    addElement(autopoleIcon);
}

// Creates the magnet icon
function initMagnet(){
    const MAGNET_WIDTH = gameHolder.offsetWidth / 6;
    const MAGNET_HEIGHT = (MAGNET_WIDTH * 427) / 585;
    
    const MAGNET_X = gameHolder.offsetWidth / 4;
    const MAGNET_Y = (gameHolder.offsetHeight / 5) * 3;
    
    let magnetIcon = new WebImage("assets/game_images/Fish-Magnet.png");
    magnetIcon.setSize(MAGNET_WIDTH, MAGNET_HEIGHT);
    magnetIcon.rotate(90);
    magnetIcon.setId("magnetIcon");
    magnetIcon.setPosition(MAGNET_X, MAGNET_Y);
    addElement(magnetIcon);
}

// Creates the vacuum icon
function initVacuum(){
    const VACUUM_WIDTH = gameHolder.offsetWidth / 4;
    const VACUUM_HEIGHT = (VACUUM_WIDTH * 417) / 598;
    
    const VACUUM_X = ((gameHolder.offsetWidth / 6) * 5) - VACUUM_WIDTH;
    const VACUUM_Y = 0;
    
    let vacuumIcon = new WebImage("assets/game_images/Vacuum.png");
    vacuumIcon.setSize(VACUUM_WIDTH, VACUUM_HEIGHT);
    vacuumIcon.rotate(90);
    vacuumIcon.setId("vacuumIcon");
    vacuumIcon.setPosition(VACUUM_X, VACUUM_Y);
    addElement(vacuumIcon);
}

// Creates the ship icon
function initShip(){
    const SHIP_WIDTH = gameHolder.offsetWidth / 2.5;
    const SHIP_HEIGHT = (SHIP_WIDTH * 375) / 666;
    
    const SHIP_X = ((gameHolder.offsetWidth / 6) * 5) - SHIP_WIDTH;
    const SHIP_Y = ((gameHolder.offsetHeight / 6));
    
    let shipIcon = new WebImage("assets/game_images/Dredging-Ship.png");
    shipIcon.setSize(SHIP_WIDTH, SHIP_HEIGHT);
    shipIcon.setId("shipIcon");
    shipIcon.setPosition(SHIP_X, SHIP_Y);
    addElement(shipIcon);
}

// Destroys confetti after 2 frames
function destroyConfetti(){
    let confetti = getElementById("confetti");
    
    while(getElementById("confetti") != null){
        removeElement(getElementById("confetti"));
    }
    
    stopTimer(destroyConfetti);
}

// Creates confetti when a fish finishes animating
function initConfetti(king = false, holy = false, party = false){
    let SALMON_WIDTH, SALMON_X, SALMON_Y;
    
    if(holy){
        SALMON_WIDTH = getElementById("holyFishIcon").getWidth();
        SALMON_X = getElementById("holyFishIcon").getX();
        SALMON_Y = getElementById("holyFishIcon").getY();
    } else if(party){
        SALMON_WIDTH = getElementById("partyFishIcon").getWidth();
        SALMON_X = getElementById("partyFishIcon").getX();
        SALMON_Y = getElementById("partyFishIcon").getY();
    } else if(king){
        SALMON_WIDTH = getElementById("kingFishIcon").getWidth();
        SALMON_X = getElementById("kingFishIcon").getX();
        SALMON_Y = getElementById("kingFishIcon").getY();
    } else {
        SALMON_WIDTH = getElementById("fishIcon").getWidth();
        SALMON_X = getElementById("fishIcon").getX();
        SALMON_Y = getElementById("fishIcon").getY();
    }
    
    let confetti = new WebImage("assets/game_images/Catch-Confetti.png");
    confetti.setSize((SALMON_WIDTH * 2), (SALMON_WIDTH * 2));
    confetti.setPosition((SALMON_X - (SALMON_WIDTH / 2)), (SALMON_Y - (SALMON_WIDTH / 2)));
    
    confetti.rotate(Math.round(Math.random() * 359) + (1));
    confetti.setId("confetti");
    addElement(confetti);
    
    setTimer(destroyConfetti, 34);
}

// Moves the fish icons
function animateFishIcons(){
    for(let i = 0; i < canvasObjects.length; i ++){
        let currentObject = canvasObjects[i];
        if(isIdFish(currentObject.id)){
            currentObject.move(-(gameHolder.offsetWidth / 80), -(gameHolder.offsetHeight / 60));
            if(currentObject.getWidth() <gameHolder.offsetWidth / 12){
                currentObject.setSize((currentObject.getWidth() * 1.05), (currentObject.getHeight() * 1.05));
            }
            currentObject.rotate(-10);
            
            if(currentObject.getY() < (gameHolder.offsetHeight / 2.25)){
                if(currentObject.id == "fishIcon"){
                    initConfetti();
                } else if(currentObject.id == "kingFishIcon"){
                    initConfetti(true);
                } else if(currentObject.id == "holyFishIcon"){
                    initConfetti(false, true);
                    initHalos();
                } else if(currentObject.id == "partyFishIcon"){
                    initConfetti(false, false, true);
                }
                removeElement(currentObject);
            }
        }
    }
}

// Returns true if the object id is a fish
function isIdFish(id){
    return id == "fishIcon" || id == "kingFishIcon" || id == "holyFishIcon"
    || id == "partyFishIcon";
}

// Creates the fish icon
function initFishIcon(){
    let foreground = getElementById("foreground");
    
    const FISH_WIDTH = gameHolder.offsetWidth / 24;
    const FOREGROUND_BOTTOM = foreground.getY() + foreground.getHeight();
    
    let holyChance = Math.floor(Math.random() * 1000); 
    
    let partyChance = Math.floor(Math.random() * 500);
    
    let kingChance = Math.floor(Math.random() * kingMod);
    
    let fishIcon;
    
    if(holyChance == 0) {
        fishIcon = new WebImage("assets/game_images/Holy-Salmon.png");
        fishIcon.setId("holyFishIcon");
        initFadeMessage("A rapture has begun!");
        increaseFish(true, false, true);
    } else if (partyChance == 0){
        fishIcon = new WebImage("assets/game_images/Party-Salmon.png");
        fishIcon.setId("partyFishIcon");
        initFadeMessage("A party has started!");
        party = true;
        initBearPartyHat();
        setTimer(stopParty, 10000);
        increaseFish(true);
    } else if(kingChance == 0){
        fishIcon = new WebImage("assets/game_images/King-Salmon.png");
        fishIcon.setId("kingFishIcon");
        initFadeMessage("You've caught a king salmon!");
        increaseFish(true, true);
    } else {
        if(party){
            fishIcon = new WebImage("assets/game_images/Party-Salmon.png");
        } else {
            fishIcon = new WebImage("assets/game_images/Salmon-Icon.png");    
        }
        fishIcon.setId("fishIcon");
        increaseFish(true);
    }
    
    fishIcon.setSize(FISH_WIDTH, (FISH_WIDTH / 2));
    fishIcon.setPosition(((gameHolder.offsetWidth - fishIcon.getWidth()) / 1.85), (FOREGROUND_BOTTOM - fishIcon.getHeight()));
    addElement(fishIcon);
}

// Creates the bear's party hat
function initBearPartyHat(){
    const BEAR_PARTY_HAT_WIDTH = gameHolder.offsetWidth / 10;
    const BEAR_PARTY_HAT_HEIGHT = (BEAR_PARTY_HAT_WIDTH * 27) / 52;
    
    const BEAR_PARTY_HAT_X = (gameHolder.offsetWidth / 2.95);
    const BEAR_PARTY_HAT_Y = (gameHolder.offsetHeight / 2.8);
    
    let bearPartyHat = new WebImage("assets/game_images/Party-Hat.png");
    bearPartyHat.setSize(BEAR_PARTY_HAT_WIDTH, BEAR_PARTY_HAT_HEIGHT);
    bearPartyHat.setPosition(BEAR_PARTY_HAT_X, BEAR_PARTY_HAT_Y);
    bearPartyHat.setId("bearPartyHat");
    bearPartyHat.rotate(330);
    bearPartyHat.moveToTop();
    addElement(bearPartyHat);
}

// Stops the party after x seconds
function stopParty(){
    party = false;
    initFadeMessage("The party has ended!");
    
    let partyHats = getAllElementsById("bearPartyHat");
    
    for(let i = 0; i < partyHats.length; i ++){
        removeElement(partyHats[i]);
    }
    
    stopTimer(stopParty);
}

// Creates the halos that rain down the screen
function initHalos(){
    const HALO_WIDTH = gameHolder.offsetWidth / 10;
    const HALO_HEIGHT = HALO_WIDTH / 2;
    
    for(let i = 0; i < 50; i ++){
        const HALO_X = (Math.random() * (gameHolder.offsetWidth - HALO_WIDTH));
        const HALO_Y = 0 - ((Math.random()) * (HALO_HEIGHT * 10));

        let halo = new WebImage("assets/game_images/Halo.png");
        halo.setSize(HALO_WIDTH, HALO_HEIGHT);
        halo.setPosition(HALO_X, HALO_Y);
        halo.setId("rainingHalo");
        addElement(halo);
    }
}

// Function that animates halos every frame
function animateHalos(){
    for(let i = 0; i < canvasObjects.length; i ++){
        let currentObject = canvasObjects[i];
        
        if(currentObject.id == "rainingHalo"){
            currentObject.move(0, (currentObject.getHeight() / 4));
            currentObject.rotate((Math.random() * 30));
        }
        
        if(currentObject.getY() > gameHolder.offsetHeight){
            removeElement(currentObject);
            initFishIcon();
        }
    }
}

// Calculates the passive amount
function calculatePassiveAmount(){
    passiveAmount = 0;
    
    passiveAmount += Math.round(numPoles * 100) / 100;
    
    passiveAmount += Math.round(numMagnets * 500) / 100;
    
    passiveAmount += Math.round(numVacuums * 10000) / 100;
    
    passiveAmount += Math.round(numShips * 500000) / 100;
    
    getElementById("passiveAmountCounter").setText("S/S: " + passiveAmount);
}

// Increases the fish count based on whether it is passive gain or a click
function increaseFish(clicked = false, king = false, holy = false){
    let multiplier = 1;
    
    if(party){
        multiplier *= 2;
    }
    
    if(king){
        multiplier *= 20;
    }
    
    if(holy){
        multiplier *= 500;
    }
    
    if(clicked){
        numFish += clickAmount * multiplier;
        totalFish += clickAmount * multiplier;
    } else {
        numFish += passiveAmount;
        totalFish += passiveAmount;
    }
    
    getElementById("fishCounter").setText("Fish: " + numFish);
}

// Checks if the player clicked on the main button
function clickedButton(mouseX, mouseY, id){
    return (getElementAt(mouseX, mouseY) != null) && (getElementAt(mouseX, mouseY).id == id);
}

// Creates the main frame for the game
function initMainGame(){
    const BAR_COLOR = "#3B3131";
    
    let backColor = new Rectangle(gameHolder.offsetWidth, gameHolder.offsetHeight);
    backColor.setColor(BAR_COLOR);
    backColor.setId("backColor");
    addElement(backColor);
    
    let background = new WebImage("assets/game_images/Game-Background-1.png");
    background.setSize(((gameHolder.offsetWidth / 3) * 2), ((gameHolder.offsetHeight / 3) * 2));
    background.setPosition((gameHolder.offsetWidth / 6), 0);
    background.setId("background");
    addElement(background)
    
    let foreground = new WebImage("assets/game_images/Bear-Foreground.png");
    foreground.setSize(((gameHolder.offsetWidth / 3) * 2), ((gameHolder.offsetHeight / 3) * 2));
    foreground.setPosition((gameHolder.offsetWidth / 6), (gameHolder.offsetHeight / 6));
    foreground.setId("foreground");
    addElement(foreground);
    
    let leftBar = new WebImage("assets/game_images/Left-Bar.png");
    leftBar.setSize((gameHolder.offsetWidth / 6), gameHolder.offsetHeight);
    leftBar.setId("leftBar");
    addElement(leftBar);
    
    initPurchaseOptions();
    
    let rightBar = new WebImage("assets/game_images/Right-Bar.png");
    rightBar.setSize((gameHolder.offsetWidth / 6), gameHolder.offsetHeight);
    rightBar.setPosition((gameHolder.offsetWidth - rightBar.getWidth()), 0);
    rightBar.setId("rightBar");
    addElement(rightBar);
    
    initStatsPage();
    
    randomizePurchasePrice();
    
    let clickButton = new WebImage("assets/game_images/Click-Button.png");
    clickButton.setSize((gameHolder.offsetWidth / 6), (gameHolder.offsetWidth / 6));
    clickButton.setPosition((((gameHolder.offsetWidth * 2 / 3) - clickButton.getWidth()) / 2), ((gameHolder.offsetHeight - clickButton.getHeight()) / 12));
    clickButton.setId("clickButton");
    addElement(clickButton);
    
    initTimerPage(bottomBarMode == "timer");
    
    setTimer(increaseFish, 1000);
    setTimer(animateFishIcons, 17);
    setTimer(animateHalos, 17);
    setTimer(randomizePurchasePrice, 100000);
    setTimer(incrimentTimer, 17);
    setTimer(shuffleStockMarket, 25000);
    setTimer(initQueuedSalmon, 34);
    
    // setTimer(shuffleStockMarket, 1000); Uncomment for faster stock market shuffling
    // setTimer(checkCanvasArray, 10000) Uncomment to get canvas checks every 10 sec.
}

// Creates salmon when queued
function initQueuedSalmon(){
    if(queuedSalmon > 0){
        initFishIcon();
        queuedSalmon --;
    }
}

// DEBUG function that prints out the array that is supossed to have the canvas objects
function checkCanvasArray(){
    console.log("\nCANVAS CHECK ---------------")
    for(let i = 0; i < canvasObjects.length; i ++){
        console.log(canvasObjects[i].id);
    }
}

// Handles the intro cinematic
function progressIntroCinematic(index, mouseX, mouseY){
    rebirthChallenges = [false, false, false, false, false];
    
    const TITLE_FONT = (gameHolder.offsetWidth / 30) + "pt Arial";
    const TITLE_HEIGHT = ((gameHolder.offsetHeight / 30) * 29);
    const TEXT_COLOR = "#230940";
    
    if(index == 0){
        const SKIP_WIDTH = (200 / 1920) * gameHolder.offsetWidth;
        const SKIP_HEIGHT = (100 / 1080) * gameHolder.offsetHeight;
        
        let introImage1 = new WebImage("assets/game_images/Intro-Image-1.png");
        introImage1.setSize(gameHolder.offsetWidth, gameHolder.offsetHeight);
        introImage1.setId("introImage1");
        addElement(introImage1);
        
        let introText1 = new Text("Finally, you've found it...", TITLE_FONT);
        introText1.setPosition(((gameHolder.offsetWidth - introText1.getWidth()) / 2), TITLE_HEIGHT);
        introText1.setColor(TEXT_COLOR);
        introText1.setId("introText1");
        addElement(introText1);
        
        let skipButton = new WebImage("assets/game_images/Skip-Button.png");
        skipButton.setSize(SKIP_WIDTH, SKIP_HEIGHT);
        skipButton.setPosition((gameHolder.offsetWidth - skipButton.getWidth()), 0);
        skipButton.setId("skipButton");
        addElement(skipButton);
    
        currentStage = "Intro 0";
    }
    
    if(index == 1){
        removeElement(getElementById("introText1"));
        
        let introText2 = new Text("...the tree of life", TITLE_FONT);
        introText2.setPosition(((gameHolder.offsetWidth - introText2.getWidth()) / 2), TITLE_HEIGHT);
        introText2.setColor(TEXT_COLOR);
        introText2.setId("introText2");
        addElement(introText2);
        
        currentStage = "Intro 1";
    }
    
    if(index == 2){
        removeElement(getElementById("introText2"));
        
        let introText3 = new Text("from which an infinite flow of salmon run", TITLE_FONT);
        introText3.setPosition(((gameHolder.offsetWidth - introText3.getWidth()) / 2), TITLE_HEIGHT);
        introText3.setColor(TEXT_COLOR);
        introText3.setId("introText3");
        addElement(introText3);
        
        currentStage = "Intro 2";
    }
    
    if(index == 3){
        removeElement(getElementById("introImage1"));
        removeElement(getElementById("introText3"));
        
        let introImage2 = new WebImage("assets/game_images/Intro-Image-2.png");
        introImage2.setSize(gameHolder.offsetWidth, gameHolder.offsetHeight);
        introImage2.setId("introImage2");
        introImage2.moveToTop();
        addElement(introImage2);
        
        currentStage = "Intro 3";
    }
    
    if(index == 4){
        removeElement(getElementById("introImage2"));
        
        let introImage3 = new WebImage("assets/game_images/Mr-Frog-Parody.png");
        introImage3.setSize(gameHolder.offsetWidth, gameHolder.offsetHeight);
        introImage3.setId("introImage3");
        introImage3.moveToTop();
        addElement(introImage3);
        
        let introText4 = new Text("It's time to profit!", TITLE_FONT);
        introText4.setPosition(((gameHolder.offsetWidth - introText4.getWidth()) / 2), TITLE_HEIGHT);
        introText4.setColor(TEXT_COLOR);
        introText4.setId("introText4");
        addElement(introText4);
        
        currentStage = "Intro 4";
    }
    
    if((index == 5) || checkPressSkipButton(mouseX, mouseY)){
        // Removes each element based on what stage the player was previously on
        // Intro 0 is not included because the intro index updates whenever a click is detected
        if(currentStage == "Intro 1"){
            removeElement(getElementById("introImage1"));
            removeElement(getElementById("introText2"));
        } else if(currentStage == "Intro 2"){
            removeElement(getElementById("introImage1"));
            removeElement(getElementById("introText3"));
        } else if(currentStage == "Intro 3"){
            removeElement(getElementById("introImage2"));
        } else {
            removeElement(getElementById("introImage3"));
            removeElement(getElementById("introText4"));
        }
        
        removeElement(getElementById("skipButton"));
        
        currentStage = "Main Game";
        initMainGame();
    }
}

// Returns if the skip button was pressed during the intro
function checkPressSkipButton(mouseX, mouseY){
    let skipButton = getElementById("skipButton");
    
    return skipButton != null && ((mouseX >= (skipButton.getX()))) && 
    (mouseY <= (skipButton.getY() + skipButton.getHeight()));
}

// Returns the element associated with the input ID and null if none exist
function getElementById(id){
    for (let i = 0; i < canvasObjects.length; i ++){
        if(canvasObjects[i].id == id){
            return canvasObjects[i];
        }
    }
    return null;
}

// Returns an array of all elements associated with an ID
function getAllElementsById(id){
    let objects = [];
    for (let i = 0; i < canvasObjects.length; i ++){
        if(canvasObjects[i].id == id){
            objects.push(canvasObjects[i]);
        }
    }
    return objects;
}

// Removes the desired Graphic element from the screen and canvas array
function removeElement(element){
    element.getImage().remove();
    for (let i = 0; i < canvasObjects.length; i ++){
        if(canvasObjects[i] == element){
            canvasObjects.splice(i, 1);
            element.getImage().remove();
            return;
        }
    }
}

// Adds a Graphic element to the screen and to the canvas array
function addElement(element){
    gameHolder.appendChild(element.getImage());
    canvasObjects.push(element);
}

// Sets the screen to fit the browser in a 1920 x 1080 size
function setResolution(){
    const DESIRED_WIDTH = 1920;
    const DESIRED_HEIGHT = 1080;

    gameHolder.style.position = "absolute";
    
    let modWidth = window.innerWidth / DESIRED_WIDTH;
    let modHeight = window.innerHeight / DESIRED_HEIGHT;
    
    if(modWidth > modHeight){
        gameHolder.style.width = window.innerHeight * (1920/1080);
        gameHolder.style.height = window.innerHeight;
    } else {
        gameHolder.style.width = window.innerWidth;
        gameHolder.style.height = window.innerWidth * (1080/1920);
    }
}

// Functions below are implemented to mimic codeHS image objects

// Object that is an image
function WebImage(src){
    this.src = src;

    let image = document.createElement('img');
    image.src = src;
    image.style.position = "absolute";
    image.style.margin = 0;
    image.style.transform = "rotate(0deg)";
    image.draggable = false;

    let width = 0;
    let height = 0;

    this.width = width;
    this.height = height;
    this.rotation = 0;

    this.setSize = function(width, height){
        image.style.width = width;
        image.style.height = height;

        this.width = width;
        this.height = height;
    }

    this.getImage = function(){
        return image;
    }

    this.getWidth = function(){
        return this.width;
    }

    this.getHeight = function(){
        return this.height;
    }

    this.setPosition = function(x, y){
        image.style.left = x;
        image.style.top = y;
    }

    this.getX = function(){
        return parseFloat(image.style.left);
    }

    this.getY = function(){
        return parseFloat(image.style.top);
    }

    this.move = function(x, y){
        let prevx = parseFloat(image.style.left);
        let prevy = parseFloat(image.style.top);

        image.style.left = prevx + x;
        image.style.top = prevy + y;
    }

    this.rotate = function(r){
        image.style.transform = "rotate(" + (this.rotation + r) + "deg)";

        this.rotation += r;
    }

    this.setId = function(id){
        image.id = id;
        this.id = id;
    }

    this.getId = function(){
        return image.id;
    }

    this.moveToTop = function(){
        image.style.zIndex = 5;
    }

    this.setImage = function(src){
        image.src = src;
    }
}

// Object that is a rectangle
function Rectangle(width, height){
    let image = document.createElement('div');
    image.style.position = "absolute";

    this.width = width;
    this.height = height;

    image.style.width = width;
    image.style.height = height;
    image.style.margin = 0;
    image.draggable = false;

    this.setSize = function(width, height){
        image.style.width = width;
        image.style.height = height;

        this.width = width;
        this.height = height;
    }

    this.setColor = function(color){
        image.style.backgroundColor = color;
    }

    this.getWidth = function(){
        return this.width;
    }

    this.getHeight = function(){
        return this.height;
    }

    this.setPosition = function(x, y){
        image.style.left = x;
        image.style.top = y;
    }

    this.getX = function(){
        return parseFloat(image.style.left);
    }

    this.getY = function(){
        return parseFloat(image.style.top);
    }

    this.move = function(x, y){
        let prevx = parseFloat(image.style.left);
        let prevy = parseFloat(image.style.top);

        image.style.left = prevx + x;
        image.style.top = prevy + y;
    }

    this.getImage = function(){
        return image;
    }

    this.setId = function(id){
        image.id = id;
        this.id = id;
    }

    this.getId = function(){
        return image.id;
    }
}

// Object that is a line
function Line(x1, y1, x2, y2, color = "white", thickness = 1) {
    const dx = x2 - x1;
    const dy = y2 - y1;

    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    const line = document.createElement("div");

    line.style.position = "absolute";
    line.style.left = x1 + "px";
    line.style.top = y1 + "px";
    line.style.width = length + "px";
    line.style.height = thickness + "px";
    line.style.backgroundColor = color;
    line.draggable = false;

    line.style.transformOrigin = "0 0";
    line.style.transform = `rotate(${angle}deg)`;

    this.setColor = function(color){
        line.style.backgroundColor = color;
    }

    this.setId = function(id){
        line.id = id;
        this.id = id;
    }

    this.getId = function(){
        return line.id;
    }

    this.getImage = function(){
        return line;
    }

    this.getY = function(){
        return parseFloat(line.style.top);
    }
}

// Object that is text
function Text(text, font){
    this.text = text;
    this.font = font;

    let fontSize = "";
    let fontFamily = "";

    const match = font.match(/^(\d+(?:\.\d+)?)pt\s+(.+)$/);

    if (match) {
        fontSize = Number(match[1]);
        fontFamily = match[2];
    }

    let image = document.createElement('p');
    image.style.fontSize = fontSize;
    image.style.fontFamily = fontFamily;
    image.innerHTML = text;
    image.style.position = "absolute";
    image.style.margin = 0;
    image.draggable = false;

    let width = 0;
    let height = 0;

    this.width = measureText(text, fontFamily, fontSize).width;
    this.height = measureText(text, fontFamily, fontSize).height;

    this.getWidth = function(){
        return this.width;
    }

    this.getHeight = function(){
        return this.height;
    }

    this.setPosition = function(x, y){
        image.style.left = x;
        image.style.top = y - (this.height);
    }

    this.setColor = function(color){
        image.style.color = color;
    }

    this.getImage = function(){
        return image;
    }

    this.getX = function(){
        return parseFloat(image.style.left);
    }

    this.setX = function(x){
        image.style.left = x;
    }

    this.getY = function(){
        return parseFloat(image.style.top);
    }

    this.setText = function(text){
        image.innerHTML = text;
        this.width = measureText(text, fontFamily, fontSize).width;
        this.height = measureText(text, fontFamily, fontSize).height;
    }

    this.setId = function(id){
        image.id = id;
        this.id = id;
    }

    this.getId = function(){
        return image.id;
    }

    this.move = function(x, y){
        let prevx = parseFloat(image.style.left);
        let prevy = parseFloat(image.style.top);

        image.style.left = prevx + x;
        image.style.top = prevy + y;
    }

    this.setFont = function(newFont){
        fontSize = "";
        fontFamily = "";

        const match = newFont.match(/^(\d+(?:\.\d+)?)pt\s+(.+)$/);

        if (match) {
            fontSize = Number(match[1]);
            fontFamily = match[2];
        }

        image.style.fontSize = fontSize;
        image.style.fontFamily = fontFamily;
        image.innerHTML = text;
        image.style.position = "absolute";
        image.style.margin = 0;

        this.width = measureText(text, fontFamily, fontSize).width;
        this.height = measureText(text, fontFamily, fontSize).height;
    }

    this.getFont = function(){
        return image.style.fontSize + "pt " + image.style.fontFamily;
    }

    this.moveToTop = function(){
        image.style.zIndex = 5;
    }
}

// Measures the text forwidth and height of text object
function measureText(text, fontFamily, fontSize) {
    const p = document.createElement("p");

    p.style.position = "absolute";
    p.style.visibility = "hidden";
    p.style.margin = "0";
    p.style.padding = "0";
    p.style.whiteSpace = "nowrap";

    p.style.fontFamily = fontFamily;
    p.style.fontSize = `${fontSize}px`;

    p.textContent = text;

    document.body.appendChild(p);

    const rect = p.getBoundingClientRect();

    document.body.removeChild(p);

    return {
        width: rect.width,
        height: rect.height
    };
}

// Returns the element at the given x and y
function getElementAt(x, y){
    return document.elementFromPoint(x, y);
}

const timers = new Map();

// Recreates the timers functions
function setTimer(fn, delay) {
    const id = setInterval(fn, delay);
    timers.set(fn, id);
}

function stopTimer(fn) {
    const id = timers.get(fn);
    if (id) {
        clearInterval(id);
        timers.delete(fn);
    }
}

main();