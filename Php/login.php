<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
     <style>
        .container{
            width:100vh;
        }
        #login{
            width:100%;
        }
     </style>
</head>
<body>
    <section>
        <div class="container ">
            <div  id="login">
                <h2 class="h2 text-center">Login Form</h2>
            <form action="login.php" method="POST" style="width:100%" class="d-flex flex-column gap-2">
            <label for="name" class="form-label">Name :</label>
            <input type="text" name="name" class="form-control" required>
            
            <label for="email" class="form-label">email :</label>
            <input type="text" name="email" class="form-control" required>

            <label for="pass" class="form-label">Password :</label>
            <input type="password" name="pass" class="form-control" required>

            <label for="DOB" class="form-label">DOB :</label>
            <input type="date" name="DOB" class="form-control" required>

            <div class="d-flex gap-2">
                <label >Gender :</label>
            <div class="form-check">
                    <label  class="form-check-label">Male</label>
                    <input type="radio" name="gender" class="form-check-input" value="male" required>
            </div>
            <div class="form-check">
                 <label  class="form-check-label">Female</label>
                <input type="radio" name="gender" class="form-check-input" value="female" required>
            </div>
            </div>
            

            <label for="courses" class="form-label">Courses :</label>
            <select name="courses" id="" class="form-select" required >
                <option value="c">C</option>
                <option value="c++">C++</option>
                <option value="java">Java</option>
            </select>

            <label for="" class="form-label">PH no :</label>
            <input type="number" class="form-control" name="phno">

            <button type="submit" class="btn btn-primary" name="submit">Submit</button>
            </form>
            </div>
        </div>
    </section>
    <?php
     
     if(isset($_POST['submit'])){

        $name=$_POST['name'];
        $email=$_POST['email'];
        $pass=$_POST['pass'];
        $dob=$_POST['DOB'];
        $gender=$_POST['gender'];
        $courses=$_POST['courses'];
        $phno=$_POST['phno'];


        $servername="localhost";
        $username="root";
        $password="";
        $databasename="mahesh";


        $conn=new mysqli($servername,$username,$password,$databasename);

        if($conn->connect_error)
        {
          echo "<script>alert('connection error'".$conn->connect_error.");</script>";
        }
        
        $sql="insert into loginform(name,email,PASSWORD,dob,gender,courses,phno) values('','".$email."','".$pass."','".$dob."','".$gender."','".$courses."','".$phno."');";

        if($conn->query($sql) === TRUE){
            echo "<script>alert('insertion sucess');</script>";
        }
        else{
            echo "<script>alert('insertion failed {$conn->error}');</script>";
        }

        $conn->close();

     }

    ?>
</body>
</html>