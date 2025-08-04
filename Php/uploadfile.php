<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

</head>

<?php

     if(isset($_POST['submit']) && !empty($_FILES['file']['name'])){

        $statusmsg="";
        $targetdirectory="Files/";
        $filenameunique=time().uniqid(rand());       //creates unique prefix based on time to filename
        $filename=basename($_FILES['file']['name']);   //finds a file name

        $Filename=$filenameunique.$filename;
        $targetfilepath=$targetdirectory.$Filename;
        $filetype=pathinfo($_FILES['file']['name'],PATHINFO_EXTENSION);  //finds a file extension


        $allowtypes=["jpg","jpeg","png","pdf","gif","html","php","doc","docs"];

        if(in_array($filetype,$allowtypes)){

            $conn=mysqli_connect("localhost","root","","mahesh");

            $sql="insert into files(filename) values('{$Filename}')";

            mysqli_query($conn,$sql);

            if(move_uploaded_file($_FILES['file']['tmp_name'],$targetfilepath)){
                $statusmsg="File {$Filename} uploaded Successfully";
            }
            else{
                $statusmsg="File Uploading";
            }
        }
        else{
            $statusmsg="Upload Valid File Format";
        }
        echo $statusmsg;
     }


?>



<body>
    <section>
        <div class="container">
            <form action="uploadfile.php" method="POST" enctype="multipart/form-data">
                <label class="form-label">Enter Your File</label>
                <input type="file" class="form-control" name="file">
                <button type="submit" name="submit" class="btn btn-outline-dark">Submit</button>
            </form>
        </div>
    </section>
</body>
</html>