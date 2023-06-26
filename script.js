/* 
[1] Duplicate the images automatically that given in the HTML file. [ done ]
[2] When clicking on image give it a .flipped class. [ done ]
[3] Add the .flipped divs to an array. [ done ]
[4] If the array got two indexs .. check if they match and stop the user from making events for a second (fliping the photo time). [ done ]
[5] if they matched => give .has-match and remove .flipped, if no match => remove the .flipped and increase wrong tries by one. [ done ]
[6] update the .tries in the HTML. [ done ]
[7] Create Randomize function. 
-- [1] Make array and put all the cards on [ done ]
-- [2] Make loop and give order to every element depends on it's index [ done ]
-- [3] Make another Array with numbers from 0 to the Array.length. [ done ]
-- [4] Make shuffle function with "de-facto unbiased shuffle" algorithm to shuffle the numbering Array. [ done ]
-- [5] re-asign the order value depends on the shuffled Array. [ done ]
*/ 

// Let the user enters his name and picks the difficulty lvl (for example: easy 10 image - medium 15 image - hard 20 image). 

let category , difficulty;
let gamedifficulty;

// initiating the tries counter
let tries = document.querySelector('nav .score span');
tries.innerHTML = 0;

// Called by start the game button in html
function startGame() {

	// updating the user name 
	let playerName = document.querySelector('.game .message input[id=name]').value;
	document.querySelector('nav .name span').innerHTML = playerName;

	// updaing the category 
	let getCategory = document.getElementsByName("category");

	for (let i = 0; i < getCategory.length; i++) {
		if (getCategory[i].checked) category = getCategory[i].id;
	}

	// updaing the difficulty
	let getDifficulty = document.getElementsByName("difficulty");
	for (let i = 0; i < getDifficulty.length; i++) {
		if (getDifficulty[i].checked) difficulty = getDifficulty[i].id;
	}

	switch (difficulty) {
		case "easy":
			gamedifficulty = "5";
			break;
		case "medium":
			gamedifficulty = "10";
			break;
		case "hard":
			gamedifficulty = "15";
			break;
		case "veryHard":
			gamedifficulty = "20";
			break;
	}
	document.querySelector(".game .message").style.display="none";
	duplicating();
}

// Duplicating the images the exist in the HTML file
function duplicating() {
	let cards = document.querySelectorAll(`.${category}`);
	for (i = 0; i < gamedifficulty; i++) {
		cards[i].style.display = "block" ;
		let cardsCloned	 = cards[i].cloneNode(true);
		let blocks = document.querySelector(`.blocks`);
		blocks.appendChild(cardsCloned);
	}
	reAssigning();
}

// re-assigning the cards value after duplicating:
function reAssigning () {
	cards = document.querySelectorAll(`.${category}`);
	
	// Making Array from the cards
	cardsArray = [...(document.querySelectorAll(`.${category}`))];
	
	let numberingArray = [];
	
	// adding order value to every card
	for (i = 0; i < cardsArray.length; i++) {
		cardsArray[i].style.order = i;
		// making numbering Array from 0 to cards.length
		numberingArray[i] = i;

		cardsArray[i].classList.remove(".has-match");
	}
	
	shuffle(numberingArray);
	
	// re-assign the array with a shuffled order
	for (i = 0; i < cardsArray.length; i++) {
		cardsArray[i].style.order = numberingArray[i];
	}

	// When clicking on image give it a .flipped class and start the main function. 
	document.querySelectorAll(`.${category}`).forEach(function(addFlipped) {
		addFlipped.addEventListener('click', function() {
		this.classList.add("flipped");

		check();
	})
	})
}

// Make shuffle function with "de-facto unbiased shuffle" algorithm to shuffle the numbering Array. 
function shuffle(array) {
	let currentIndex = array.length , temp, randomIndex;
	
	while (currentIndex > 0) {
		// Picking Random Number from the Array
		randomIndex = Math.floor(Math.random() * array.length);
		currentIndex--;
		// Swap it with the current Number

		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}
	return array;
}

let bestScore = 5000;
console.log(bestScore);
// If the array got two indexs .. check if they match and stop the user from making events for a second (fliping the photo time).
function check() {
	// Check if two cards flipped
	let flippedArray = [...(document.querySelectorAll(".flipped"))];
	if (flippedArray.length === 2) {
		// Stop the user from clicking while the function working.
		let pause = document.querySelector(".blocks");
		pause.style.pointerEvents = "none";

		setTimeout (() => {
		flippedArray[0].classList.remove("flipped");
		flippedArray[1].classList.remove("flipped");
		pause.style.pointerEvents = "initial";
		}, 1000)
		
		if (flippedArray[0].dataset.match === flippedArray[1].dataset.match) {
			flippedArray[0].classList.add("has-match");
			flippedArray[1].classList.add("has-match");
			
			// end the game
			if (document.querySelectorAll(`.has-match`).length / 2 == gamedifficulty ) {
				console.log("You won");
				if (bestScore > tries.innerHTML) bestScore = tries.innerHTML;
				console.log(bestScore);
				
				document.querySelector(".game .message").style.display="initial";
				console.log("PLAY AGAIN PLS");
				
			}
			
		} else {
			tries.innerHTML = parseInt(tries.innerHTML) + 1;
		}
	}
}

/* 
Ways to improve the game:
[1] Let the user enters his name and picks the difficulty lvl (for example: easy 10 image - medium 15 image - hard 20 image). [ done ]
[2] Let the user pick the game category (or if he wants maybe shuffle from all). [ done ]
[3] Save the least tries for the player. 
[4] Make play again button.
[5] Let the user change the difficulty without refreshing the page.
*/