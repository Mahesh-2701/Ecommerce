<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body{
            display: flex;
            justify-content: center;
            align-items: center;
        }
     .calc{
        width: 50%;
     }
     #jj
     {
        width:100%;
        height:45px;
        background:red;
        border-radius: 15px;
     }
    </style>
</head>
<body>
    <div class="calc">
        <form action="calc.php" method="POST">
            <fieldset>
                <div>
                <legend>calculator</legend>
                <label for="n1">Value 1:</label>
                <input type="number" name="n1">
                </div>
                <div>
                <label for="n2">Value 2:</label>
                <input type="number" name="n2">
                <input type="text" value="<?php 
                 if(isset($_POST['add']))
        {
            $a=$_POST['n1'];
            $b=$_POST['n2'];
            $ans=$a+$b;
            echo "Answer:".$ans;
        }
                ?>" />
                </div>
                <button type="submit" name="add">ADD</button>
                <button type="submit" name="sub">SUBTRACT</button>
                <button type="submit" name="mul">MULTIPLY</button>
                <button type="submit" name="div">DIVIDE</button>
               <div id="jj">
</div> 
            </fieldset>
        </form>
    </div>
    <?php
        if(isset($_POST['add']))
        {
            $a=$_POST['n1'];
            $b=$_POST['n2'];
            $ans=$a+$b;
            echo "Answer:".$ans;
        }
        if(isset($_POST['sub']))
            {
                $a=$_POST['n1'];
                $b=$_POST['n2'];
                $ans=$a-$b;
                echo "<script>alert('answ:".$ans."');</script>";
        }
        if(isset($_POST['mul']))
        {
            $a=$_POST['n1'];
            $b=$_POST['n2'];
            $c=$a*$b;
            echo "<script>alert('answer is: '+".$c.")</script>";
        }
        if(isset($_POST['div']))
        {
            $a=$_POST['n1'];
            $b=$_POST['n2'];
            $c=$a/$b;
            echo "<script>alert('answer is : '+".$c.");</script>";
        }

    ?>
</body>
</html>