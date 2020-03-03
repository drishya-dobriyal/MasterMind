const clueGrid = function() {
  let div = '';
  for (let pos = 0; pos < 10; pos++) {
    div += `
      <div id="CB_${pos}" class="clueBox">
          <div class="position"></div>
          <div class="position"></div>
          <div class="position"></div>
          <div class="position"></div>
          <div class="position"></div>
      </div>`;
  }
  document.getElementById('clueBox').innerHTML = div;
};

const playerGrid = function() {
  let div = '';
  for (let pos = 0; pos < 10; pos++) {
    div += `
      <div id="M_${pos}" class="move">
          <div class="position" id="P_1"></div>
          <div class="position" id="P_2"></div>
          <div class="position" id="P_3"></div>
          <div class="position" id="P_4"></div>
          <div class="position" id="P_5"></div>
          <div class="moveCompleted">
            <img src="../images/checkMark.png" height="80%" width="80%"/>
          </div>
      </div>`;
  }
  document.getElementById('playerMoves').innerHTML = div;
};

const createSetUp = function() {
  playerGrid();
  clueGrid();
};
