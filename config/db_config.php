<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cek_kodam";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>
