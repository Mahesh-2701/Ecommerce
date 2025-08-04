<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>   
       <script>
            function msg(id){
                   var ans=confirm("Are You Sure You Want To Delete This Row");
            if(ans){

                window.location.assign("deletedb.php?Id="+id);

            }
        }
        </script>
</head>
<body>
    <div class="container">
    <h2 class="h2 text-center mt-5">Login Details</h2>
    <table class="table table-striped table-dark table-hover mt-3 rounded w-80">
        <tr>
            <td>Sno</td>
            <td>Name</td>
            <td>Email</td>
            <td>Password</td>
            <td>DOB</td>
            <td>Gender</td>
            <td>Courses</td>
            <td>Phno</td>
            <td>Action</td>
        </tr>
    <?php
     $username="root";
     $password="";
     $databasename="mahesh";

     $mysql=new mysqli("localhost",$username,$password,$databasename);

     $query="select * from loginform";

     if($result=$mysql->query($query)){
        while($row=$result->fetch_assoc()){
            $sno=$row["sno"];
            $nam=$row["name"];
            $email=$row["email"];
            $pass=$row["PASSWORD"];
            $dob=$row["dob"];
            $gender=$row["gender"];
            $courses=$row["courses"];
            $phno=$row["phno"];
              
     ?>
      <tr>
     <td><?php echo $sno ?></td>   
     <td><?php echo $nam ?></td>
     <td><?php echo $email ?></td>
     <td><?php echo $pass ?></td>
     <td><?php echo $dob ?></td>
     <td><?php echo $gender ?></td>
     <td><?php echo $courses ?></td>
     <td><?php echo $phno ?></td>
     <td>
        <!-- Button trigger modal -->
        <button type="button" class="btnx btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Edit
        </button>
        <button class="btn btn-danger rounded ms-2" name="delete" onclick="msg(<?php echo $sno ?>)">Delete</button></td>
      </tr>
    <?php 
   
          
        }
        

        $result->free();
    }
    ?>
    </table>

    <!-- script for getting input from above -->
     <script>
        $(document).ready(function(){
            $('.btnx').on('click',function(){
                $('#exampleModal').modal('show');
                $tr=$(this).closest('tr');
                var data=$tr.children("td").map(function(){
                    return $(this).text();
                }).get();


                $('#name').val(data[1]);
                $('#email').val(data[2]);
                $('#pass').val(data[3]);
                $('#dob').val(data[4]);
                $('#gender').val(data[5]);
                $('#courses').val(data[6]);
                $('#phno').val(data[7]);
            });
        });
     </script>
     

    <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="displaydb.php" method="POST">
            <div class="modal-body">
                    <div>
                    <label class="form-label">Name :</label>
                    <input type="text" class="form-control" id="name" name="name">
                    </div>
                    <div>
                    <label class="form-label">Email :</label>
                    <input type="text" class="form-control" id="email" name="email" readonly>
                    </div>
                    <div>
                    <label class="form-label">Password :</label>
                    <input type="text" class="form-control" id="pass" name="pass">
                    </div>
                    <div>
                    <label class="form-label">DOB :</label>
                    <input type="text" class="form-control" id="dob" name="dob">
                    </div>
                    <div>
                    <label class="form-label">Gender :</label>
                    <input type="text" class="form-control" id="gender" name="gender">
                    </div>
                    <div>
                    <label class="form-label">Courses :</label>
                    <input type="text" class="form-control" id="courses" name="courses">
                    </div>
                    <div>
                    <label class="form-label">Phno :</label>
                    <input type="text" class="form-control" id="phno" name="phno">
                    </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary" name="submit">Save changes</button>
            </div>
            </form>
            </div>
        </div>
        </div>
    </div>

    <?php
      
      if(isset($_POST['submit'])){

        $nam=$_POST["name"];
        $email=$_POST["email"];
        $pass=$_POST["pass"];
        $dob=$_POST["dob"];
        $gender=$_POST["gender"];
        $courses=$_POST["courses"];
        $phno=$_POST["phno"];

        $conn=new mysqli("localhost",$username,"",$databasename);

        $sql="update loginform set name='".$nam."',PASSWORD='".$pass."',dob='".$dob."',gender='".$gender."',courses='".$courses."',phno='".$phno." where email='".$email."'";

        if($conn->query($sql)){
            echo "<script>alert('updation success');</script>";
        }
        else{
            echo "<script>alert('updation error');</script>";
        }

        $conn->close();
      }


    ?>
</body>
</html>