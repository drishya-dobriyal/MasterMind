let playerColorChosen = '';

const colorChosen = function(color) {
  playerColorChosen = color;
};

const setColorAsCode = function() {
  const id = event.target.id;
  const parentId = event.target.parentNode.id;
  document.querySelector(
    `#${parentId} #${id}`
  ).style.backgroundColor = playerColorChosen;
  playerColorChosen = '';
};

const enableNextMove = function(nextMoveNUm) {
  const nextMove = document.querySelector(`#M_${nextMoveNUm}`);
  nextMove.querySelector('.moveCompleted').classList.remove('notClickable');
  const newPositions = Array.from(nextMove.querySelectorAll('.position'));
  newPositions.forEach(position =>
    position.addEventListener('click', setColorAsCode)
  );
  nextMove.classList.add('onMove');
};

const disablePreviousMove = function(attemptNum) {
  const previousMove = document.querySelector(`#M_${attemptNum}`);
  previousMove.querySelector('.moveCompleted').classList.add('notClickable');
  const previousPositions = Array.from(
    previousMove.querySelectorAll('.position')
  );
  previousPositions.forEach(position =>
    position.removeEventListener('click', setColorAsCode)
  );
  previousMove.classList.remove('onMove');
};

const giveClue = function(rightColor, bothRight, attemptNum) {
  const clueBox = document.querySelector(`#CB_${attemptNum}`);
  const cluePlaceholders = Array.from(clueBox.querySelectorAll('.position'));
  const correctChoices = rightColor + bothRight;
  for (let choice = 0; choice < correctChoices; choice++) {
    if (rightColor != 0) {
      cluePlaceholders[choice].style.backgroundColor = 'grey';
      rightColor -= 1;
    } else {
      cluePlaceholders[choice].style.backgroundColor = 'red';
    }
  }
};

const showCorrectCode = function(code, text) {
  const result = document.getElementById('result');

  const header = document.createElement('h4');
  header.innerText = text + ' Code: ';
  let colorData = '';
  code.forEach((color, index) => {
    const div = document.createElement('div');
    div.style.backgroundColor = color;
    div.classList.add('correctColor');
    result.prepend(div);
  });
  result.prepend(header);
};

const isVacant = function(color) {
  return color === '';
};

const checkPlayerCode = function() {
  const id = event.target.parentNode.id;
  const currentMove = document.getElementById(id);
  const positions = Array.from(currentMove.querySelectorAll('.position')).map(
    move => move.style.backgroundColor
  );
  if (positions.some(isVacant)) {
    return;
  }
  const { rightColor, bothRight, crackedCode, attemptNum } = this.checkCode(
    positions
  );
  giveClue(rightColor, bothRight, attemptNum);
  if (crackedCode) {
    showCorrectCode(this.getCode(), 'code cracked');
    return;
  }
  if (attemptNum >= 9) {
    showCorrectCode(this.getCode(), 'Attempts completed');
    return;
  }
  enableNextMove(attemptNum + 1);
  disablePreviousMove(attemptNum);
};

const attachEventListeners = function(game) {
  const completedMove = Array.from(document.querySelectorAll('.moveCompleted'));
  completedMove.forEach(move => {
    move.addEventListener('click', checkPlayerCode.bind(game));
    move.classList.add('notClickable');
  });
  enableNextMove(0);
};

const main = () => {
  createSetUp();
  const game = Game.setUp();
  attachEventListeners(game);
};

window.onload = main;
