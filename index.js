import Game from "./src/game.js";
import View from "./src/view.js";
import Controller from "./src/controller.js";

const $el = document.getElementById("root");

const game = new Game();
const view = new View($el, 480, 600, 20, 10);
const controller = new Controller(game, view);

window.game = game;
window.view = view;
window.controller = controller;
