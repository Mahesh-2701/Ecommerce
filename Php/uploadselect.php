

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</head>
<body>
    <?php
    echo" <table class='table'>";
    echo "<tr><th>SNO</th><th>Image</th></tr>";
    
    $conn=new mysqli("localhost","root","","mahesh");

    $sql="select * from files";

    if($res=mysqli_query($conn,$sql)){

        while($row=$res->fetch_assoc()){
            $sno = $row['sno'];
            $img=$row['filename'];

?>
      <tr>
        <td><?php echo $sno ?></td>
        <td><img src="Files/<?php echo $img ?>" alt="" class="img-fluid" width="200px" height="100px"></td>
      </tr>


<?php
        }

        $conn->close();

    }


 echo "</table>";
?>
</body>
</html>