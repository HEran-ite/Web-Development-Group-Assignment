var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
var _this = this;
//admin page
// Define your API endpoint
var apiUrl = 'http://localhost:3000'; // Update with your actual backend URL
// Function to fetch room data from the API
var fetchRooms = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("".concat(apiUrl, "/rooms"))];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error('Failed to fetch room data');
                }
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                return [2 /*return*/, data];
            case 3:
                error_1 = _a.sent();
                console.error('Error fetching room data:', error_1.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Function to render room cards
var renderRoomCards = function (roomType, rooms) {
    var roomContainer = document.getElementById("".concat(roomType.toLowerCase(), "RoomContainer"));
    if (!roomContainer) {
        console.error('Room container not found.');
        return;
    }
    roomContainer.innerHTML = ''; // Clear previous content
    rooms.forEach(function (room) {
        var card = document.createElement('div');
        card.className = 'col-md-4 card-body';
        card.innerHTML = "\n      <ul class=\"list-group\">\n        <li class=\"list-group-item\">\n          <img src=\"../bed-rooms/".concat(room.image, "\" alt=\"Room Image\" class=\"img-fluid\">\n          <div>\n            <p class=\"card-text\"><strong>Description:</strong> ").concat(room.description, "</p>\n            <p class=\"card-text\"><strong>Price:</strong> $").concat(room.price, "</p>\n          </div>\n          <div class=\"text-center\">\n            <button class=\"btn btn-success\">Edit Room</button>\n            <button class=\"btn btn-danger\">Delete Room</button>\n          </div>\n        </li>\n      </ul>\n    ");
        roomContainer.appendChild(card);
    });
};
// Fetch and render room data on page load
document.addEventListener('DOMContentLoaded', function () { return __awaiter(_this, void 0, void 0, function () {
    var vipRooms, middleRooms;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetchRooms()];
            case 1:
                vipRooms = _a.sent();
                renderRoomCards('VIP', vipRooms);
                return [4 /*yield*/, fetchRooms()];
            case 2:
                middleRooms = _a.sent();
                renderRoomCards('Middle', middleRooms);
                return [2 /*return*/];
        }
    });
}); });
// Example: Add event listener for "Add Room" button click
var addRoomBtn = document.querySelector('#addRoomBtn');
addRoomBtn.addEventListener('click', function (event) { return __awaiter(_this, void 0, void 0, function () {
    var roomClass, roomDescription, roomPrice;
    return __generator(this, function (_a) {
        event.preventDefault();
        // Logic to handle adding a new room
        console.log('Add Room button clicked');
        roomClass = document.getElementById('roomClass').value;
        roomDescription = document.getElementById('description').value;
        roomPrice = document.getElementById('price').value;
        // Example: Log retrieved values
        console.log('Room Class:', roomClass);
        console.log('Room Description:', roomDescription);
        console.log('Room Price:', roomPrice);
        return [2 /*return*/];
    });
}); });
// home page
// home.ts
// Sample data structure defining room options for each room type
var roomOptionsData = {
    standard: ["Option 1", "Option 2", "Option 3"],
    vip: ["Option A", "Option B", "Option C"],
    economy: ["Option X", "Option Y", "Option Z"],
    middle: ["Option M1", "Option M2", "Option M3"]
};
// Function to handle form submission
function submitBookingForm(event) {
    event.preventDefault();
    // Add your form handling logic here
    console.log("Form submitted!");
}
// Function to update room options based on the selected room type
function updateRoomOptions() {
    var roomTypeSelect = document.getElementById("room-type");
    var roomOptionsSelect = document.getElementById("room-options");
    // Clear existing options
    roomOptionsSelect.innerHTML = "";
    // Get the selected room type
    var selectedRoomType = roomTypeSelect.value;
    // Get the available options for the selected room type
    var optionsForSelectedRoom = roomOptionsData[selectedRoomType] || [];
    // Populate the room-options select element with the available options
    optionsForSelectedRoom.forEach(function (option) {
        var optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;
        roomOptionsSelect.appendChild(optionElement);
    });
}
// Add event listener for the room-type select element
(_a = document.getElementById("room-type")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", updateRoomOptions);
// login page
// login.ts
// Function to handle form submission
function handleLoginFormSubmission(event) {
    event.preventDefault();
    var usernameInput = document.getElementById('username');
    var passwordInput = document.getElementById('password');
    var username = usernameInput.value;
    var password = passwordInput.value;
    // Add logic to handle the login credentials (e.g., validate, send to server, etc.)
    console.log("Login submitted with username: ".concat(username, " and password: ").concat(password));
}
// Add any other TypeScript code or declarations as needed
//register page 
// register.ts
// Function to handle form submission
function handleRegistrationFormSubmission(event) {
    event.preventDefault();
    var usernameInput = document.getElementById('username');
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');
    var newPasswordInput = document.getElementById('password_new');
    var username = usernameInput.value;
    var email = emailInput.value;
    var password = passwordInput.value;
    var newPassword = newPasswordInput.value;
    // Add logic to handle the registration data (e.g., validate, send to server, etc.)
    console.log("Registration submitted with username: ".concat(username, ", email: ").concat(email, ", password: ").concat(password, ", newPassword: ").concat(newPassword));
}
// Add any other TypeScript code or declarations as needed
