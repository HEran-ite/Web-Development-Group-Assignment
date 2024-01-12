
//admin page
// Define your API endpoint
const apiUrl = 'http://localhost:3000'; // Update with your actual backend URL

// Function to fetch room data from the API
const fetchRooms = async () => {
  try {
    const response = await fetch(`${apiUrl}/rooms`);
    if (!response.ok) {
      throw new Error('Failed to fetch room data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching room data:', error.message);
  }
};

// Function to render room cards
const renderRoomCards = (roomType: string, rooms: any[]) => {
  const roomContainer = document.getElementById(`${roomType.toLowerCase()}RoomContainer`);
  if (!roomContainer) {
    console.error('Room container not found.');
    return;
  }

  roomContainer.innerHTML = ''; // Clear previous content

  rooms.forEach((room) => {
    const card = document.createElement('div');
    card.className = 'col-md-4 card-body';

    card.innerHTML = `
      <ul class="list-group">
        <li class="list-group-item">
          <img src="../bed-rooms/${room.image}" alt="Room Image" class="img-fluid">
          <div>
            <p class="card-text"><strong>Description:</strong> ${room.description}</p>
            <p class="card-text"><strong>Price:</strong> $${room.price}</p>
          </div>
          <div class="text-center">
            <button class="btn btn-success">Edit Room</button>
            <button class="btn btn-danger">Delete Room</button>
          </div>
        </li>
      </ul>
    `;

    roomContainer.appendChild(card);
  });
};

// Fetch and render room data on page load
document.addEventListener('DOMContentLoaded', async () => {
  const vipRooms = await fetchRooms();
  renderRoomCards('VIP', vipRooms);

  const middleRooms = await fetchRooms();
  renderRoomCards('Middle', middleRooms);

  // Add similar code for other room types
});

// Example: Add event listener for "Add Room" button click
const addRoomBtn = document.querySelector('#addRoomBtn');
addRoomBtn.addEventListener('click', async (event) => {
  event.preventDefault();

  // Logic to handle adding a new room
  console.log('Add Room button clicked');

  // Retrieve form values and perform necessary actions here
  const roomClass = (document.getElementById('roomClass') as HTMLSelectElement).value;
  const roomDescription = (document.getElementById('description') as HTMLTextAreaElement).value;
  const roomPrice = (document.getElementById('price') as HTMLInputElement).value;

  // Example: Log retrieved values
  console.log('Room Class:', roomClass);
  console.log('Room Description:', roomDescription);
  console.log('Room Price:', roomPrice);

  // Additional logic to send the data to your backend/API
});




// home page
// home.ts

// Sample data structure defining room options for each room type
const roomOptionsData: Record<string, string[]> = {
    standard: ["Option 1", "Option 2", "Option 3"],
    vip: ["Option A", "Option B", "Option C"],
    economy: ["Option X", "Option Y", "Option Z"],
    middle: ["Option M1", "Option M2", "Option M3"]
};

// Function to handle form submission
function submitBookingForm(event: Event): void {
    event.preventDefault();
    // Add your form handling logic here
    console.log("Form submitted!");
}

// Function to update room options based on the selected room type
function updateRoomOptions(): void {
    const roomTypeSelect = document.getElementById("room-type") as HTMLSelectElement;
    const roomOptionsSelect = document.getElementById("room-options") as HTMLSelectElement;

    // Clear existing options
    roomOptionsSelect.innerHTML = "";

    // Get the selected room type
    const selectedRoomType = roomTypeSelect.value;

    // Get the available options for the selected room type
    const optionsForSelectedRoom = roomOptionsData[selectedRoomType] || [];

    // Populate the room-options select element with the available options
    optionsForSelectedRoom.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;
        roomOptionsSelect.appendChild(optionElement);
    });
}

// Add event listener for the room-type select element
document.getElementById("room-type")?.addEventListener("change", updateRoomOptions);


// login page


// login.ts

// Function to handle form submission
function handleLoginFormSubmission(event: Event): void {
    event.preventDefault();

    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;

    const username = usernameInput.value;
    const password = passwordInput.value;

    // Add logic to handle the login credentials (e.g., validate, send to server, etc.)
    console.log(`Login submitted with username: ${username} and password: ${password}`);
}

// Add any other TypeScript code or declarations as needed


//register page 

// register.ts

// Function to handle form submission
function handleRegistrationFormSubmission(event: Event): void {
    event.preventDefault();

    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const newPasswordInput = document.getElementById('password_new') as HTMLInputElement;

    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const newPassword = newPasswordInput.value;

    // Add logic to handle the registration data (e.g., validate, send to server, etc.)
    console.log(`Registration submitted with username: ${username}, email: ${email}, password: ${password}, newPassword: ${newPassword}`);
}

// Add any other TypeScript code or declarations as needed
