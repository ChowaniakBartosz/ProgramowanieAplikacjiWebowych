"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var Application = /** @class */ (function () {
    function Application() {
        var _this = this;
        this.buttonHandle = function () {
            var input = document.querySelector('input[id="location"]');
            if (input != null) {
                var city = input.value;
                _this.getWeather(city);
                _this.render();
            }
        };
        // Gets weather forecast for provided city
        this.getWeather = function (city) {
            var appid = 'aa8b6dc42b70fe9332a39e81c4b28230';
            var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appid + "&units=metric&lang=PL";
            axios_1.default.get(url)
                .then(function (response) {
                var data = response.data;
                _this.addToLocalStorage(data);
                return data;
            })
                .catch(function (error) {
                console.log(error);
            });
            return;
        };
        this.render();
    }
    // Saves data to localstorage
    Application.prototype.setData = function (data) {
        localStorage.setItem('weatherData', JSON.stringify(data));
    };
    // Gets saved data from localstorage
    Application.prototype.getData = function () {
        var data = localStorage.getItem('weatherData');
        return data ? JSON.parse(data) : [];
    };
    // Adds new data to current saved data in localstorage
    Application.prototype.addToLocalStorage = function (data) {
        var tab = [];
        tab = this.getData();
        tab.push(data);
        this.setData(tab);
    };
    // Renders weather info
    Application.prototype.render = function () {
        // gets section with weather items
        var cities = document.getElementById('widgets');
        if (cities !== null) {
            var elements = this.getData();
            elements.forEach(function (item) {
                var cityItem = document.createElement('div');
                cityItem.classList.add('card');
                var cityName = document.createElement('h2.cityName');
                cityName.classList.add('cityName');
                cityName.innerHTML = item.name;
                var description = document.createElement('p');
                description.classList.add('description');
                description.innerHTML = item.weather[0].description;
                var temperature = document.createElement('p');
                temperature.classList.add('temperature');
                temperature.innerHTML = item.main.temp + " <sup>o</sup>C";
                var image = document.createElement('img');
                image.classList.add('weatherIcon');
                var imgSource = "http://openweathermap.org/img/wn/" + item.weather[0].icon + "@2x.png";
                image.src = imgSource;
                cityItem.append(cityName);
                cityItem.append(image);
                cityItem.append(temperature);
                cityItem.append(description);
                cities.append(cityItem);
            });
        }
    };
    return Application;
}());
;
exports.default = Application;
