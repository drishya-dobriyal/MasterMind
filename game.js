const getColors = () => ['Red', 'Blue', 'Yellow', 'Orange', 'Green'];

class Game {
  constructor(code, attemptNum) {
    this.code = code;
    this.attemptNum = attemptNum;
  }

  static setUp() {
    const colors = getColors();
    for (let i = 0; i < colors.length; i++) {
      const j = Math.floor(Math.random() * colors.length);
      const color = colors[i];
      colors[i] = colors[j];
      colors[j] = color;
    }
    colors.pop();
    const game = new Game(colors, 0);
    return game;
  }

  checkCode(playerCode) {
    console.log(this.code, playerCode, this.attemptNum);
    const interpreted = {
      rightColor: 0,
      bothRight: 0,
      crackedCode: false,
      attemptNum: this.attemptNum
    };
    for (let i = 0; i < this.code.length; i++) {
      if (this.code.includes(playerCode[i])) {
        interpreted.rightColor += 1;
      }
      if (this.code[i] === playerCode[i]) {
        interpreted.rightColor -= 1;
        interpreted.bothRight += 1;
      }
    }
    if (interpreted.bothRight === this.code.length) {
      interpreted.crackedCode = true;
    }
    this.attemptNum += 1;
    return interpreted;
  }
}
