<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
    $time=date("H");
    if($time>10)
    {
        echo "have a good day";
    }
    else
    {
        echo "have a good night";
    }
    ?>
</body>
</html>