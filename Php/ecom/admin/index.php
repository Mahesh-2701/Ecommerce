<?php
   session_start();

   if(isset($_SESSION['admin'])){
       header("location:dashboard.php");
   }
  
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin's Login</title>
    <?php include('../assets/cdn.php'); ?>
   </head>
<body>

<!-- admins login -->
    <section>
        <div class="container d-flex justify-content-center m-5 p-5 ">
            <form action="/server5/magesh/ecom/admin/" method="POST" class="border border-dark rounded-2 w-50 d-flex flex-column gap-3 text-center my-5 p-3">
                <h2>Admin's Login</h2>
                <input type="email" placeholder="Email" name="email" class="form-control" required>
                <input type="password" placeholder="Password" name="password" class="form-control" required>
                <button type="submit" name="submit" class="btn btn-primary">Login</button>
            </form>
        </div>
    </section>
   

    <?php
          if(isset($_POST['submit'])){
            $admin_email=$_POST['email'];
            $admin_pass=$_POST['password'];

            $conn=new mysqli("localhost","root","","mahesh");

            if($conn->connect_error){
                die("Error in connection".$conn->connect_error);
            }

            $sql="select * from admin where email='{$admin_email}' and password='{$admin_pass}'";

            if($res=$conn->query($sql)){

                if(mysqli_num_rows($res)== 1){

                    $_SESSION['admin']=true;
                    echo "<script>window.open('dashboard.php','_self');</script>" ;

                    
                }
                else{
                echo "<script>alert('Invalid Email/Password');</script>";
                }
            }
           

            $conn->close();
          }
    ?>
</body>
</html>