<script>
    import {register} from "../lib/apiFunctions";
    let firstName = '';
    let lastName = '';
    let emailSignUp = '';
    let passwordSignUp = '';
     
    

   async function registerWrapper(){
     let firstName=document.getElementById("firstName").value;
    let lastName=document.getElementById("lastName").value;
    let email=document.getElementById("emailSignUp").value;
    let password=document.getElementById("passwordSignUp").value;
    console.log(firstName,lastName,email,password)
    await register({firstName,lastName,email,password});
    }
</script>

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
        <input value={emailSignUp} type="email" placeholder="Enter E-mail" id="emailSignUp" name="email" required>
        <label for="psw"><strong>Password</strong></label>
        <input value={passwordSignUp} type="password" placeholder="Enter Password" id="passwordSignUp" name="password" required>
        
      </div>
      <div class="bottom">
          <button value="Sign Up" type="submit"><strong>SIGN UP</strong></button>
          <a href="/login">Go to login</a>
      </div>


      </div>
    
    </form>
  </body>


  <style>
    .bottom{
        display: flex;
        flex-direction: column;
        
        align-items: center;
    }
    body {
   display: flex;
   justify-content: center;
   font-family: Roboto, Arial, sans-serif;
   font-size: 15px;
   }
   form {
   border: 5px solid #f1f1f1;
   }
   input[type=text], input[type=password],input[type=email] {
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
   
   
   @media screen and (max-width: 300px) {
   
 }

</style>