const inputName = document.getElementById('name');
const inputEmail = document.getElementById('email');
const inputPhone = document.getElementById('phone');
const userList = document.getElementById('users');
const form = document.getElementById('form');
const msg = document.querySelector('.msg');

form.addEventListener('submit', addUser);
userList.addEventListener('click', removeUser);
userList.addEventListener('click', editUser);

//Accessing userData from localStorage and displaying it
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await axios.get('http://localhost:8080/get-user');
        for(let i=0; i<response.data.length; i++) {
            showUserDetail(response.data[i]);
            // console.log(response.data[i]);
        }
    } catch (error) {
        console.log(error);
    }
})

function showUserDetail(user) {
    //Creating different elements to be added in DOM
    const li = document.createElement('li');
    const delBtn = document.createElement('input');
    const editBtn = document.createElement('input');

    //Creating Delete button
    delBtn.className = 'del float-right';
    delBtn.setAttribute('type', "button");
    delBtn.setAttribute('value', "DELETE");

    //Creating Edit button
    editBtn.className = 'edit float-right';
    editBtn.setAttribute('type', "button");
    editBtn.setAttribute('value', "EDIT");

    //Appending all above 3 elements
    li.appendChild(document.createTextNode(`${user.name} - ${user.email} - ${user.phone}`));
    li.appendChild(delBtn);
    li.appendChild(editBtn);
    li.setAttribute("id", user.id);

    //appendimg the li to ul inside DOM
    userList.appendChild(li);

    flag = true;
    appointmentListCSS(flag);
}

async function addUser(e) {
    e.preventDefault();

    if (inputName.value === '' || inputEmail.value === '' || inputPhone.value === '') {
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';
        console.log(1);

        setTimeout(() => msg.remove(), 3000);
    } else {
        //Creating different elements to be added in DOM
        const li = document.createElement('li');
        const delBtn = document.createElement('input');
        const editBtn = document.createElement('input');

        //Creating Delete button
        delBtn.className = 'del float-right';
        delBtn.setAttribute('type', "button");
        delBtn.setAttribute('value', "DELETE");

        //Creating Edit button
        editBtn.className = 'edit float-right';
        editBtn.setAttribute('type', "button");
        editBtn.setAttribute('value', "EDIT");

        //Appending all above 3 elements
        li.appendChild(document.createTextNode(`${inputName.value} - ${inputEmail.value} - ${inputPhone.value}`));
        li.appendChild(delBtn);
        li.appendChild(editBtn);

        //appendimg the li to ul inside DOM
        userList.appendChild(li);

        //Storing user Data as an object
        const userData = {
            name: `${inputName.value}`,
            email: `${inputEmail.value}`,
            phone: `${inputPhone.value}`
        }

        try {
            //adding users to SQL DB
            const response = await axios.post('http://localhost:8080/create-user', userData);
            li.setAttribute("id", response.data.id);
            flag = true;
            appointmentListCSS(flag);
        } catch (error) {
            console.log(error);
        }

        inputName.value = '';
        inputEmail.value = '';
        inputPhone.value = '';
    }
}

async function removeUser(e) {
    if (e.target.classList.contains('del')) {
        try {
            const response = axios.delete(`http://localhost:8080/delete-user/${e.target.parentElement.id}`);
            userList.removeChild(e.target.parentElement);
        } catch (error) {
            console.log(error);
        }
    }
}

async function editUser(e) {
    if (e.target.classList.contains('edit')) {
        partsString = e.target.parentElement.innerText.split('-');
        inputName.value = partsString[0].trim();
        inputEmail.value = partsString[1].trim();
        inputPhone.value = partsString[2].trim();
        try {
            const response = await axios.delete(`http://localhost:8080/delete-user/${e.target.parentElement.id}`);
            userList.removeChild(e.target.parentElement);
        } catch (error) {
            console.log(error);
        }
    }
}

function appointmentListCSS(flag) {
    var appointments = document.getElementById('appointments');
    appointments.style.visibility = 'hidden';
    if(flag) {
        appointments.classList.add('appointments-style');
        appointments.style.visibility = 'visible';
    } else {
        appointments.classList.remove('appointment-style');
        appointments.style.visibility = 'hidden';
    }
}

appointmentListCSS();