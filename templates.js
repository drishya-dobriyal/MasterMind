const clueGrid = function() {
  let div = '';
  for (let pos = 0; pos < 10; pos++) {
    div += `
      <div id="CB_${pos}" class="move">
          <div class="position" id="C_1"></div>
          <div class="position" id="C_2"></div>
          <div class="position" id="C_3"></div>
          <div class="position" id="C_4"></div>
      </div>`;
  }
  document.getElementById('clueBox').innerHTML = div;
};

const playerGrid = function() {
  let div = '';
  for (let pos = 0; pos < 10; pos++) {
    div += `
      <div id="M_${pos}" class="move">
          <div class="position notClickable" id="P_1" onclick="setColorAsCode()"></div>
          <div class="position notClickable" id="P_2" onclick="setColorAsCode()"></div>
          <div class="position notClickable" id="P_3" onclick="setColorAsCode()"></div>
          <div class="position notClickable" id="P_4" onclick="setColorAsCode()"></div>
          <div class="moveCompleted notClickable">
            <img src="checkMark.png" height="80%" width="80%"/>
          </div>
      </div>`;
  }
  document.getElementById('playerMoves').innerHTML = div;
};

const createSetUp = function() {
  playerGrid();
  clueGrid();
};
