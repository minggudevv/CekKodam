<?php
header('Content-Type: application/json');
include '../config/db_config.php';

$name = isset($_GET['nama']) ? $_GET['nama'] : '';

$sql = "SELECT text FROM random_texts ORDER BY RAND() LIMIT 1";
$result = $conn->query($sql);

$texts = [];
if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $texts[] = $row["text"];
  }
}

$conn->close();

echo json_encode(['texts' => $texts]);
?>
