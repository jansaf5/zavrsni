    <script>
      import {login,register} from "../lib/apiFunctions";
	    import Index from "./index.svelte";
      let firstName = '';
      let lastName = '';
      let emailLogin = '';
      let emailSignUp = '';
      let passwordLogin = '';
      let passwordSignUp = '';

     async function registerWrapper(){
       let firstName=document.getElementById("firstName").value;
      let lastName=document.getElementById("lastName").value;
      let email=document.getElementById("emailSignUp").value;
      let password=document.getElementById("passwordSignUp").value;
      console.log(firstName,lastName,email,password)
      await register({firstName,lastName,email,password});
      }

      async function loginWrapper(){
        let email=document.getElementById("emailLogin").value;
        let password=document.getElementById("passwordLogin").value
        console.log(email,password)
        let res = await login({email,password});
        console.log(res);
        if(res.token!=null){
          window.location.href="http://localhost:5173/"  
          
        }
      }

      
    </script>

  
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous">
    <style>
       body {
      display: flex;
      justify-content: center;
      font-family: Roboto, Arial, sans-serif;
      font-size: 15px;
      }
      form {
      border: 5px solid #f1f1f1;
      }
      input[type=text], input[type=password] {
      width: 100%;
      padding: 16px 8px;
      margin: 8px 0;
      display: inline-block;
      border: 1px solid #ccc;
      box-sizing: border-box;
      }
      
      button {
      background-color: #4286f4;
      color: white;
      padding: 14px 0;
      margin: 10px 0;
      border: none;
      cursor: grab;
      width: 48%;
      }
      h1 {
      text-align:center;
      font-size:18;
      }
      button:hover {
      opacity: 0.8;
      }
      .formcontainer {
      text-align: center;
      margin: 24px 50px 12px;
      }
      .container {
      padding: 16px 0;
      text-align:left;
      }
      
      /* Change styles for span on extra small screens */
      @media screen and (max-width: 300px) {
      
    }
    .forms{
        display: flex;
        align-content: center;
        
    }
  </style>
  
  <body>
    <div class="forms">
        <body>
          <form method="post" form  on:submit|preventDefault={registerWrapper}>
            <h1>SIGN UP</h1>
    
            <div class="formcontainer">
            <div class="container">
              <label for="uname"><strong>First Name</strong></label>
              <input value={firstName} type="text" placeholder="Enter First Name" id="firstName" name="firstName" required>
              <label for="uname"><strong>Last Name</strong></label>
              <input value={lastName} type="text" placeholder="Enter Last Name" id="lastName" name="lastName" required>
              <label for="mail"><strong>E-mail</strong></label>
              <input value={emailSignUp} type="text" placeholder="Enter E-mail" id="emailSignUp" name="email" required>
              <label for="psw"><strong>Password</strong></label>
              <input value={passwordSignUp} type="password" placeholder="Enter Password" id="passwordSignUp" name="password" required>
              
            </div>
            <button value="Sign Up" type="submit"><strong>SIGN UP</strong></button>
    
    
    
            </div>
          </form>
        </body>
        <body>
          <form method="post" form on:submit|preventDefault={loginWrapper}>
            <h1>LOGIN</h1>
            <div class="formcontainer">
            <hr/>
            <div class="container">
              <label for="emaill"><strong>Email</strong></label>
              <input bind:value={emailLogin} type="text" placeholder="Enter Email" id="emailLogin" name="email" required>
              <label for="psw"><strong>Password</strong></label>
              <input bind:value={passwordLogin} type="password" placeholder="Enter Password" id="passwordLogin" name="psw" required>
            </div>
            <button  type="submit">Login</button>
            </div>
          </form>
        </body>
    </div>
  </body>