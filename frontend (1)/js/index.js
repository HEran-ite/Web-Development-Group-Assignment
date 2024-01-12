const loginForm = document.getElementById('login-form')
const signup = document.getElementById('sign-up')
const roomTypeForm = document.getElementById('roomTypeForm')
const baseurl = 'http://localhost:9100/' 

if(loginForm){
    loginForm.addEventListener('submit', handleLogin)
}

if(signup){
    signup.addEventListener('submit', handelSignUp)
}

if(roomTypeForm){
    roomTypeForm.addEventListener('submit', handelRoomCreation)
}



function handleLogin(event) {
    event.preventDefault()
    //const loginEndpoint = `${baseEndpoint}/token/`
    let loginFormData = new FormData(loginForm)
    let loginObjectData = Object.fromEntries(loginFormData)
    let bodyStr = JSON.stringify(loginObjectData)
    console.log(bodyStr)
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",


        },
        body: bodyStr
    }
    fetch(baseurl + 'auth/signin', options)
    .then(response => {
        return response.json()
    })
    .then(authData => {
        console.log(authData)
        handleAuthData(authData)
        window.location.href = 'admin.html'
    })
    .catch(err=> {
        console.log('err', err)
    })
}


function handleAuthData(authData, callback) {
    localStorage.setItem('access_token', authData.access_token)
    if (callback) {
        callback()
    }
}

function getVIPRooms() {
    let viprooms = document.getElementById('vipRooms')
    const options = {
        method: "GET",
    }
    fetch(baseurl + 'hotelroom/vip', options)
    .then(response => {
        return response.json()
    })
    .then(response =>{
        response.forEach(element => {
            viprooms.innerHTML += 
                `<div class="card-body">
                    <ul class="list-group">
                        <li class="list-group-item">
                            <img src="${element.image}" alt="Room Image" class="img-fluid">
                            <div>
                            <p class="card-text"><strong>Description:</strong> ${element.description}</p>
                            <p class="card-text"><strong>Price:</strong> ${element.price}</p>
                            <div class="text-center">
                            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#editmodal${element.id}">
                                Edit
                            </button>
                            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deletemodal${element.id}">
                                Delete
                            </button>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="modal fade" id="deletemodal${element.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Delete</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Do you want to processed with your choice?
                        </div>
                        <div class="modal-footer">
                            <form id="modal-delete">
                            <button type="button" onClick="handelDelete(${element.id})" class="btn btn-danger">Yes</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="editmodal${element.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit room</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="roomClass">Room Class:</label>
                                <select id="roomClass${element.id}" class="form-control">
                                    <option value=1>VIP</option>
                                    <option value=2>Middle</option>
                                    <option value=3>Economy</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="image">Room Image:</label>
                                <input type="file" id="image" required class="form-control-file">
                                <small class="form-text text-muted">Upload an image for the room.</small>
                            </div>
                            <div class="form-group">
                                <label for="description">Description:</label>
                                <textarea id="description${element.id}" placeholder="${element.description}" class="form-control" rows="4" cols="50" required></textarea>
                            </div>
                            
                            <div class="form-group">
                                <label for="price">Price:</label>
                                <input type="number" value=${element.price} id="price${element.id}" class="form-control" required>
                            </div>
                        
                            <div class="form-group">
                                <label for="price">Title:</label>
                                <input type="text" id="title${element.id}" class="form-control" required>
                            </div>
                            <input type="hidden" id='id${element.id}' value=${element.id}>
                            </div>
                            <div class="modal-footer">
                                <button type="button" onclick="handelRoomUpdate(title, description, price, image, id)" class="float-left btn btn-success">Save changes</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
                <script>
                function handelDelete(id) {}
                let title = document.getElementById('title${element.id}').value
                let description = document.getElementById('description${element.id}').value
                let price = document.getElementById('price${element.id}').value
                let image = document.getElementById('image')
                //let classId = document.getElementById('roomClass${element.id}').value
                let id = document.getElementById('id${element.id}').value
                function handelRoomUpdate(title, description, price, image, id) {}
                </script>`
        });
    })
    .catch(err=> {
        console.log('err', err)
    })

}

function handelRoomCreation(event) {
    event.preventDefault();
    let image = event.target.image.files[0]
    const formData = new FormData();
    formData.append('Image', image)
    formData.append('description', event.target.description.value)
    formData.append('price', event.target.price.value)
    formData.append('classId', event.target.roomClass.value)
    formData.append('title', event.target.title.value)
    formData.append('avaliable', false)
    console.log(formData)

    const options = {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: formData
    }
    fetch(baseurl + 'hotelroom/create', options)
    .then(response => {
        return response.json()
    })
    .then(() => {
        location.reload();
    })
    .catch(err=> {
        console.log('err', err)
    })


}


function handelSignUp(event){
    console.log(event)
    event.preventDefault();
    if(event.target.password.value != event.target.password_new.value){
        return alert('password does not match')
    }
    let loginFormData = new FormData(signup)
    let signupObjectData = Object.fromEntries(loginFormData)
    let bodyStr = JSON.stringify(signupObjectData)
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",

        },
        body: bodyStr
    }
    fetch(baseurl + 'auth/signup', options)
    .then(response => {
        return response.json()
    })
    .then(authData => {
        window.location.href = 'login.html'
    })
    .catch(err=> {
        console.log('err', err)
    })

}


function handelDelete(id) {
    const options = {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
    }
    fetch(baseurl + `hotelroom/${id}`, options)
    .then(response => {
        return response.json()
    })
    .then(res => {
        location.reload();
    })
    .catch(err=> {
        console.log('err', err)
    })
}


function getMidddleRoom() {
    let middleroom = document.getElementById('middleroom')
    const options = {
        method: "GET",
    }
    fetch(baseurl + 'hotelroom/middle', options)
    .then(resposne => {
        return resposne.json()
    })
    .then(response =>{
            response.forEach(element => {
            middleroom.innerHTML += 
                `<div class="card-body">
                    <ul class="list-group">
                        <li class="list-group-item">
                            <img src="${element.image}" alt="Room Image" class="img-fluid">
                            <div>
                            <p class="card-text"><strong>Description:</strong> ${element.description}</p>
                            <p class="card-text"><strong>Price:</strong> ${element.price}</p>
                            <div class="text-center">
                            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#editmodal${element.id}">
                                Edit
                            </button>
                            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deletemodal${element.id}">
                                Delete
                            </button>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="modal fade" id="deletemodal${element.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Delete</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Do you want to processed with your choice?
                        </div>
                        <div class="modal-footer">
                            <form id="modal-delete">
                            <button type="button" onClick="handelDelete(${element.id})" class="btn btn-danger">Yes</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="editmodal${element.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit room</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="roomClass">Room Class:</label>
                                <select id="roomClass${element.id}" class="form-control">
                                    <option value=1>VIP</option>
                                    <option value=2>Middle</option>
                                    <option value=3>Economy</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="image">Room Image:</label>
                                <input type="file" id="image${element.id}" required class="form-control-file">
                                <small class="form-text text-muted">Upload an image for the room.</small>
                            </div>
                            <div class="form-group">
                                <label for="description">Description:</label>
                                <textarea id="description${element.id}" placeholder="${element.description}" class="form-control" rows="4" cols="50" required></textarea>
                            </div>
                            
                            <div class="form-group">
                                <label for="price">Price:</label>
                                <input type="number" value=${element.price} id="price${element.id}" class="form-control" required>
                            </div>
                        
                            <div class="form-group">
                                <label for="price">Title:</label>
                                <input type="text" id="title${element.id}" class="form-control" required>
                            </div>
                            <input type="hidden" id='id${element.id}' value=${element.id}>
                            </div>
                            <div class="modal-footer">
                                <button type="button" onclick="handelRoomUpdate(title, description, price, classId, image, id)" class="float-left btn btn-success">Save changes</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
                <script>
                    function handelDelete(id) {}
                    let title = document.getElementById('title${element.id}').value
                    let description = document.getElementById('description${element.id}').value
                    let price = document.getElementById('price${element.id}').value
                    let image = document.getElementById('image${element.id}')
                    let id = document.getElementById('id${element.id}').value
                    function handelRoomUpdate(title, description, price, image, id) {}
                </script>`
        });
    })
}
function getEconomicRoom() {
    let middleroom = document.getElementById('economicroom')
    const options = {
        method: "GET",
    }
    fetch(baseurl + 'hotelroom/economic', options)
    .then(resposne => {
        return resposne.json()
    })
    .then(response =>{
            response.forEach(element => {
            middleroom.innerHTML += 
                `<div class="card-body">
                    <ul class="list-group">
                        <li class="list-group-item">
                            <img src="${element.image}" alt="Room Image" class="img-fluid">
                            <div>
                            <p class="card-text"><strong>Description:</strong> ${element.description}</p>
                            <p class="card-text"><strong>Price:</strong> ${element.price}</p>
                            <div class="text-center">
                            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#editmodal${element.id}">
                                Edit
                            </button>
                            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deletemodal${element.id}">
                                Delete
                            </button>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="modal fade" id="deletemodal${element.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Delete</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Do you want to processed with your choice?
                        </div>
                        <div class="modal-footer">
                            <form id="modal-delete">
                            <button type="button" onClick="handelDelete(${element.id})" class="btn btn-danger">Yes</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="editmodal${element.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit room</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="roomClass">Room Class:</label>
                                <select id="roomClass${element.id}" class="form-control">
                                    <option value=1>VIP</option>
                                    <option value=2>Middle</option>
                                    <option value=3>Economy</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="image">Room Image:</label>
                                <input type="file" id="image${element.id}" required class="form-control-file">
                                <small class="form-text text-muted">Upload an image for the room.</small>
                            </div>
                            <div class="form-group">
                                <label for="description">Description:</label>
                                <textarea id="description${element.id}" placeholder="${element.description}" class="form-control" rows="4" cols="50" required></textarea>
                            </div>
                            
                            <div class="form-group">
                                <label for="price">Price:</label>
                                <input type="number" value=${element.price} id="price${element.id}" class="form-control" required>
                            </div>
                        
                            <div class="form-group">
                                <label for="price">Title:</label>
                                <input type="text" id="title${element.id}" class="form-control" required>
                            </div>
                            <input type="hidden" id='id${element.id}' value=${element.id}>
                            </div>
                            <div class="modal-footer">
                                <button type="button" onclick="handelRoomUpdate(title, description, price, classId, image, id)" class="float-left btn btn-success">Save changes</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
                <script>
                    function handelDelete(id) {}
                    let title = document.getElementById('title${element.id}').value
                    let description = document.getElementById('description${element.id}').value
                    let price = document.getElementById('price${element.id}').value
                    let image = document.getElementById('image${element.id}')
                    let id = document.getElementById('id${element.id}').value
                    function handelRoomUpdate(title, description, price, image, id) {}
                </script>`
        });
    })
}
getVIPRooms()
getMidddleRoom()
getEconomicRoom()

function handelRoomUpdate(title, description, price, image, id) {
    console.log(image.files)
    const formData = new FormData();
    formData.append('Image', image.files[0])
    formData.append('description', description)
    formData.append('price', price)
    formData.append('classId', 1)
    formData.append('title', title)
    formData.append('avaliable', false)
    console.log(formData)

    const options = {
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: formData
    }
    fetch(baseurl + 'hotelroom/'+ id, options)
    console.log(document.getElementById('id').value)
    .then(response => {
        return response.json()
    })
    .then(res =>
        location.reload())
    .catch(err=> {
        console.log('err', err)
    })
}
