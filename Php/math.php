<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
    echo (pi())."<br><br>"; //returns 3.14

     echo (min(0,5,33,-200))."<br><br>"; //returns -200

     echo (max(0,5,33,-200))."<br><br>"; //returns 33

     echo (abs(-33.67))."<br><br>"; //returns 33.67

     echo (sqrt(25))."<br><br>"; //returns 5

     echo (round(33.67))."<br><br>"; //returns 34
     echo (round(33.27))."<br><br>"; //returns 33

     echo (rand())."<br><br>"; //returns random num

     echo (rand(0,100))."<br><br>"; //returns random num 0 to 100

    ?>
</body>
</html>