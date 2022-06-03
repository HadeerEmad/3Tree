<?php

$name = $_POST['name'];
$email = $_POST['email'];
$subject = "New Message form 3Tree website";
$message = $_POST['message'];

$formContent = "From: $name \n Email: $email  \n Message: $message";

$recipient = "hadeer.cis@gmail.com"; // write email here
$mailHeader = "From: $email \r\n";
mail($recipient, $subject, $formContent, $mailHeader) or die("Error!");
header('Location: index.html');

?>