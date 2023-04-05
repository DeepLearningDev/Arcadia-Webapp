/* eslint-disable no-unused-vars */
function logout() {
    fetch('http://localhost:3000/account/logout')
        .then((response) => {
        if (response.status === 200) {
            console.log('Logged out');
            window.location.href = 'arcadia.html';
        } else {
            console.error('Error logging out');
        }
        })
        .catch((error) => {
        console.error('Error:', error);
    });
}

async function fetchUserData() {
    try {
        const response = await fetch('http://localhost:3000/account/get-user-data');
        if (response.ok) {
        const userData = await response.json();
        const welcomeMessage = document.querySelector('.user-display h2');
        welcomeMessage.innerHTML = `Welcome <strong>${userData.display_name}</strong>`;
        
        // Populate user-info <p> elements
        document.getElementById('display_name').innerText = `Display Name: ${userData.display_name || ''}`;
        document.getElementById('email').innerText = `Email: ${userData.email}`;
        document.getElementById('name').innerText = `Name: ${userData.First_name,' ', userData.last_name|| ''}`;
        document.getElementById('age').innerText = `Age: ${userData.age || ''}`;
        document.getElementById('phone_number').innerText = `Phone Number: ${userData.phone_number || ''}`;

        // Pre-populate edit-form input fields
        document.querySelector('#edit-form input[name="display_name"]').value = userData.display_name || '';
        document.querySelector('#edit-form input[name="email"]').value = userData.email;
        document.querySelector('#edit-form input[name="first_name"]').value = userData.First_name || '';
        document.querySelector('#edit-form input[name="last_name"]').value = userData.last_name || '';
        document.querySelector('#edit-form input[name="age"]').value = userData.age || '';
        document.querySelector('#edit-form input[name="phone_number"]').value = userData.phone_number || '';
    } else {
        console.error('Error fetching user data');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


function toggleEditForm() {
  const userInfo = document.getElementById('user-info');
  const editForm = document.getElementById('edit-form');
  const editBtn = document.getElementById('edit-btn');

  if (editForm.style.display === 'none') {
    userInfo.style.display = 'none';
    editForm.style.display = 'block';
    editBtn.textContent = 'Done';
  } else {
    userInfo.style.display = 'block';
    editForm.style.display = 'none';
    editBtn.textContent = 'Edit Profile';
  }
}


document.getElementById('update-user-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('http://localhost:3000/account/update-user-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        });

        if (response.ok) {
        alert('User data updated successfully');
        fetchUserData(); // Update displayed user data
        } else {
        alert('Error updating user data');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error updating user data');
    }
});


document.addEventListener('DOMContentLoaded', fetchUserData);