import { LightningElement, track } from "lwc";
import { loadStyle } from "lightning/platformResourceLoader";
import fontAwesomeLibrary from "@salesforce/resourceUrl/fontAwesomeLibrary";

export default class MemoryGame extends LightningElement {
  @track
  boardIcons = [
    "fa-solid fa-mug-hot",
    "fa-solid fa-gamepad",
    "fa-solid fa-music",
    "fa-solid fa-rocket",
    "fa-solid fa-sun",
    "fa-solid fa-moon",
    "fa-solid fa-heart",
    "fa-solid fa-camera-retro"
  ];

  coupleOfSelectedBoardPieces = [];
  isBoardPieceCoupleTurnedUp = false;

  connectedCallback() {
    this.loadLibraries();
    this.shuffleboardIcons();
  }

  loadLibraries() {
    const fontAwesomeLocation =
      fontAwesomeLibrary + "/fontawesome-free-6.4.2-web/css/all.min.css";
    Promise.all([loadStyle(this, fontAwesomeLocation)]).catch((error) =>
      console.error(error)
    );
  }

  shuffleboardIcons() {
    this.duplicateboardIcons();

    this.boardIcons.forEach((icon, swappedIconOldIndex) => {
      const randomIndexToSwap = this.getRandomIndex();
      const iconFromSwappedIndex = this.boardIcons[randomIndexToSwap];

      this.boardIcons[randomIndexToSwap] = icon;
      this.boardIcons[swappedIconOldIndex] = iconFromSwappedIndex;
    });
  }

  duplicateboardIcons() {
    this.boardIcons = [...this.boardIcons, ...this.boardIcons];
  }

  getRandomIndex() {
    const randomNumber = Math.random();
    const randomIndexLimit = this.boardIcons.length;

    const randomIndex = Math.floor(randomNumber * randomIndexLimit);

    return randomIndex;
  }

  async handleBoardPieceClick(event) {
    if (this.isBoardPieceCoupleTurnedUp) {
      return;
    }

    const boardPiece = event.target;

    this.addSelectedBoardPiece(boardPiece);
    await this.compareSelectedBoardPieces();
    this.cleanSelectedBoardPieces();
  }

  async compareSelectedBoardPieces() {
    if (
      this.wereTwoBoardPiecesSelected() &&
      this.areBoardPiecesIconsDifferent()
    ) {
      await this.waitToHideBoardPieces();
    }
  }

  waitToHideBoardPieces() {
    this.isBoardPieceCoupleTurnedUp = true;

    return new Promise((resolve) => {
      setTimeout(() => {
        this.hideBoardPieces();

        this.isBoardPieceCoupleTurnedUp = false;

        resolve();
      }, 2000);
    });
  }

  wereTwoBoardPiecesSelected() {
    return this.coupleOfSelectedBoardPieces.length === 2;
  }

  areBoardPiecesIconsDifferent() {
    const boardPiecesIcons = this.getBoardPiecesIcons();
    const firstIcon = boardPiecesIcons[0];
    const secondIcon = boardPiecesIcons[1];

    return firstIcon.className !== secondIcon.className;
  }

  getBoardPiecesIcons() {
    return this.coupleOfSelectedBoardPieces.map((boardPiece) =>
      boardPiece.querySelector("i")
    );
  }

  addSelectedBoardPiece(boardPiece) {
    if (this.wasBoardPieceAlreadyAdded(boardPiece)) return;

    if (!this.wereTwoBoardPiecesSelected()) {
      this.coupleOfSelectedBoardPieces.push(boardPiece);
      this.showBoardPiece(boardPiece);
    }
  }

  wasBoardPieceAlreadyAdded(boardPiece) {
    return this.coupleOfSelectedBoardPieces.includes(boardPiece);
  }

  showBoardPiece(boardPiece) {
    boardPiece.classList.remove("hide-piece");
  }

  hideBoardPieces() {
    this.coupleOfSelectedBoardPieces.forEach((boardPiece) =>
      boardPiece.classList.add("hide-piece")
    );
  }

  cleanSelectedBoardPieces() {
    if (this.wereTwoBoardPiecesSelected()) {
      this.coupleOfSelectedBoardPieces = [];
    }
  }
}
