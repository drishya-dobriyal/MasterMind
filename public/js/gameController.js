const colorChosen = function(color) {
  localStorage.setItem('color', color);
};

const setColorAsCode = function() {
  const id = event.target.id;
  const parentId = event.target.parentNode.id;
  document.querySelector(
    `#${parentId} #${id}`
  ).style.backgroundColor = localStorage.getItem('color');
  localStorage.removeItem('color');
};

const enableNextMove = function(nextMoveNUm) {
  const nextMove = document.querySelector(`#M_${nextMoveNUm}`);
  nextMove.querySelector('.moveCompleted').classList.remove('notClickable');
  const newPositions = Array.from(nextMove.querySelectorAll('.position'));
  newPositions.map(position =>
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
  previousPositions.map(position =>
    position.removeEventListener('click', setColorAsCode)
  );
  previousMove.classList.remove('onMove');
  previousMove.classList.add('checkedMove');
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

const checkPlayerCode = function() {
  const id = event.target.parentNode.parentNode.id;
  const currentMove = document.getElementById(id);
  const positions = Array.from(currentMove.querySelectorAll('.position')).map(
    move => move.style.backgroundColor
  );
  const { rightColor, bothRight, crackedCode, attemptNum } = this.checkCode(
    positions
  );
  if (crackedCode) {
    alert('cracked Code');
  }
  if (attemptNum === 9) {
    alert('number of attempts finished');
  }
  giveClue(rightColor, bothRight, attemptNum);
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