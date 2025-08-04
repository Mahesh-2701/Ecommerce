<?php
   session_start();

   if(!isset($_SESSION['admin'])){
       header("location:index.php");
   }
  
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <?php include("../assets/cdn.php") ?>
</head>
<body>
    Dashboard
    <a href="logout.php" class="btn btn-danger">Logout</a>
</body>
</html>