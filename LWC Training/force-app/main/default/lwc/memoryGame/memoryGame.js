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

  connectedCallback() {
    this.loadLibraries();
    this.shuffleboardIcons();
  }

  loadLibraries() {
    const fontAwesomeLocation =
      fontAwesomeLibrary + "/fontawesome-free-6.4.2-web/css/all.min.css";
    console.log(fontAwesomeLocation);
    Promise.all([loadStyle(this, fontAwesomeLocation)])
      .then(() => console.log("Libraries loaded"))
      .catch((error) => console.error(error));
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
}
