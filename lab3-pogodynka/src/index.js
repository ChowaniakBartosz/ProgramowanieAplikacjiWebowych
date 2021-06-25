"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = __importDefault(require("./App"));
// On windows load
window.addEventListener('load', function () {
    var app = new App_1.default();
    // Get submit button
    var submitButton = document.getElementById('addCityButton');
    // If there's any and is clicked then app.buttonHandle()
    submitButton.addEventListener('click', function (event) {
        event.preventDefault(); // Disables refreshing of the website
        app.buttonHandle();
    });
});
