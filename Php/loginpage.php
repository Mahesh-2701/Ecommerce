<?php
 
 session_start();

 if(isset(($_SESSION['access']))){

    header("location:displayDb1.php");
 }
 

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</head>
<style>
    #log{
        height: 100vh;
    }
    form{
        background-image: linear-gradient(#EEAECA,#94BBE9);
    }
</style>
<body>
    <div class="container d-flex justify-content-center w-50 align-items-center" id="log">
        
        <form action="loginpage.php" method="POST" class="w-100 border border-dark border-1 rounded p-5 d-flex flex-column gap-2" >
            
            <div class="d-flex align-items-center justify-content-center gap-2">
                <img src="instagram.png" alt="" class="img-fluid" width="40">
                <h2>Login</h2>
            </div>
             <div>
            <label class="form-label">Email :</label>
            <input type="text" class="form-control" name="email" required>
            </div>
             <div>
            <label class="form-label">Password :</label>
            <input type="password" class="form-control" name="password" required>
            </div>
            <div class="text-center">
            <button  type="submit" class="btn btn-primary" name="login">Login</button>
            </div>
            <div class="text-center">
            <a class="btn btn-primary" href="signup.php">Signup</a>
            </div>
        </form>
</div>

<?php 
$servername="localhost";
$username="root";
$password="";
$dbname="mahesh";
$conn=mysqli_connect($servername,$username,$password,$dbname);
if(!$conn){
    die ("couldnot connect".mysqli_error());
}
if(isset($_POST['login'])){
    $user=$_POST['email'];
    $pass=$_POST['password'];
    $sql="SELECT email,password FROM signup where email='{$user}' and password='{$pass}'";
    $query_run=mysqli_query($conn,$sql);
    
    if(mysqli_num_rows($query_run)==1){

           $_SESSION['access']=true;

        //    echo "<script>window.open('displayDb1.php','_self')</script>";

    }else{


        echo "invalid user name";
    }

}

?>
</body>
</html>