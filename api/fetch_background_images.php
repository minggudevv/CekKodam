<?php
header('Content-Type: application/json');
include '../config/db_config.php';

$sql = "SELECT url FROM background_images";
$result = $conn->query($sql);

$images = [];
if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $images[] = $row["url"];
  }
}

$conn->close();

echo json_encode($images);
?>
