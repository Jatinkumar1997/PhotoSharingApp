const loginForm = document.querySelector('#login')
const email1 = document.querySelector('#uemail1')
const pwd1 = document.querySelector('#upwd1')
const loginMsg = document.querySelector('#loginmessage')
const loginDisplay = document.querySelector('#loginDisplay')
var userToken = "" 

const upload = document.querySelector('#upload')
const imagename = document.querySelector('#imagename')
const imagedesc = document.querySelector('#imagedesc')

// const formData = new FormData();
// const fileField = document.querySelector('input[type="file"]');

// formData.append('username', 'abc123');
// formData.append('avatar', fileField.files[0]);

// const handleImageUpload = event => {
//   const files = event.target.files
//   const formData = new FormData()
//   formData.append('myFile', files[0])
//   formData.append('imageName',imagename.value)
//   formData.append('imageDescription',imagedesc.value)
//   console.log(formData)
//   fetch('/gallery/uploadphoto', {
//     method: 'POST',
//     body: formData,
//     headers: {
//       'Authorization': userToken,
//       'Content-Type': 'application/json'
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//   })
//   .then(response => response.json())
//   .then(data => {
//     console.log(data)
//   })
//   .catch(error => {
//     console.error(error)
//   })
// }
// upload.addEventListener('submit',(e)=>{
//   e.preventDefault
//   handleImageUpload(e)
// })

loginForm.addEventListener('submit',(e)=>{
  e.preventDefault()
  const loginEmail = email1.value
  const loginPwd = pwd1.value

  async function postData(url = '', data = {}) {
    
    const response = await fetch(url, {
      method: 'POST', 
      mode: 'cors', 
      cache: 'no-cache', 
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer', 
      body: JSON.stringify(data) 
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  postData('/users/login',{"email":loginEmail,"password":loginPwd}).then(data=>{
    loginMsg.innerHTML = "User: "+ data.user.name + " logged in successfully."
    loginDisplay.innerHTML = "Logged In User: " + data.user.name
    userToken = data.token
  }).catch(err =>{
    console.log(err)
  })

})

