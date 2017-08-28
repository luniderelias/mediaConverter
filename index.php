<?php
$myfile = fopen("teste.mp3", "w") or die("Unable to open file!");
$blobMp3 = $_GET["uid"];
fwrite($myfile, $blobMp3);
fclose($myfile);
?>