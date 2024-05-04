document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;


  if (username === 'maha' && password === 'maha') {
    localStorage.setItem('isLoggedIn', true);
    window.location.href = 'resume.html'; // Redirect to resume page
  } else {
    document.getElementById('loginError').textContent = 'Invalid username/password.';
  }
});
