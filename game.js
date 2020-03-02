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

  interpretedCode(playerCode) {
    let rightColor = 0;
    let bothRight = 0;
    playerCode.forEach((inputCode, i) => {
      if (this.code.includes(inputCode)) {
        rightColor += 1;
      }
      if (this.code[i] === inputCode) {
        rightColor -= 1;
        bothRight += 1;
      }
    });
    return { rightColor, bothRight };
  }

  checkCode(playerCode) {
    const { rightColor, bothRight } = this.interpretedCode(playerCode);
    let crackedCode = false;
    if (bothRight === this.code.length) {
      crackedCode = true;
    }
    const attemptNum = this.attemptNum;
    this.attemptNum += 1;
    return {
      attemptNum,
      rightColor,
      bothRight,
      crackedCode
    };
  }
}
