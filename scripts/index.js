const postList = document.querySelector('.posts');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');

const setupUI = (user) => {
  if (user) {
    if(user.admin){
      adminItems.forEach(item =>{item.style.display ='block'});
    }

    //account info
    db.collection('users').doc(user.uid).get().then(doc=>{
      const html = `
      <div><h2>Welcome, ${doc.data().displayName}!</h2></div>
      <div>Email: ${user.email}</div>
      <div class='pink-text'>${user.admin ? 'Admin' : ''}</div>
      `;
      accountDetails.innerHTML= html;
    })

    //toggle UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    adminItems.forEach(item =>{item.style.display = 'none'});
    //hide account Info
    accountDetails.innerHTML = '';
    //toggle UI elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
}

const setupPosts = (data) =>{
  if (data.length){
    let html = '';
  
    data.forEach(doc => {
      const post = doc.data();
      const li = `
      <li>
      <div class="collapsible-header white-text blue-grey darken-1">
      ${post.title}
      </div>
      <div class="collapsible-body grey lighten-4">
      ${post.content}
      </div>
      </li>`
      html += li;
    });
  
    postList.innerHTML = html;
  } else {
    postList.innerHTML = 
    '<h1 class="center-align"><i class="material-icons large blue-text">account_box</i> Login to view Blog Posts</h1>';
  }
  
}


// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);
});