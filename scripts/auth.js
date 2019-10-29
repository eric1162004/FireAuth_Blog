// add admin cloub function
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const adminEmail = document.querySelector('#admin-email').value;
    const addAdminRole = functions.httpsCallable('addAdminRole');
    addAdminRole({email: adminEmail}).then(result=>{
        console.log(result);
    });
})

//listen for auth status changes
auth.onAuthStateChanged(user =>{
    if (user) {
        user.getIdTokenResult().then(idTokenResult=>{
            // console.log(idTokenResult);
            user.admin = idTokenResult.claims.admin;
            
            setupUI(user);
        });

        db.collection('posts').onSnapshot((snapshot)=>{
            // console.log(snapshot.docs);
            setupPosts(snapshot.docs);
        }, err=>{
            console.log(err.message);
        });
    } else {
        setupUI();
        setupPosts([]);
    }
});

// create new guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    db.collection('posts').add({
        title: createForm['title'].value,
        content: createForm['content'].value
    }).then(()=>{
        //close the model and reset form
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    }).catch((err)=>{
        console.log(err.message);
    })

});

//signup

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    //get user info - get the input fields by id 
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    const displayName = signupForm['display-name'].value;

    //sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
       return db.collection('users').doc(cred.user.uid).set({
           displayName: displayName,
       });
    }).then(()=>{
       //Close the modal upon success
       const modal = document.querySelector('#modal-signup');
       M.Modal.getInstance(modal).close();
       signupForm.querySelector('.error').innerHTML = '';
       signupForm.reset();
    }).catch(err=>{
        signupForm.querySelector('.error').innerHTML = err.message;
    });
});

//logout
const logout = document.querySelector('#logout')
    
logout.addEventListener('click', (e)=>{
    e.preventDefault();

    auth.signOut();
})

//login

const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    //login the user
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        // console.log(cred.user);
        
        //Close the modal upon success
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.querySelector('.error').innerHTML = '';
        loginForm.reset();
    }).catch(err=>{
        loginForm.querySelector('.error').innerHTML = err.message;
    });

});