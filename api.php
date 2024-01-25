<?php
$servername = "localhost";
$username = "root";
$password = "123456789";
$dbname = "equipo_futbol";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Error de conexión: " . $conn->connect_error);
}

$section = $_GET['section'];

if ($section === 'partidos') {
  $sql = "SELECT * FROM partidos ORDER BY fecha DESC";
  $result = $conn->query($sql);

  $data = array();

  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      $data[] = array(
        'fecha' => $row['fecha'],
        'equipo_local' => $row['equipo_local'],
        'equipo_visitante' => $row['equipo_visitante'],
        'resultado_local' => $row['resultado_local'],
        'resultado_visitante' => $row['resultado_visitante']
      );
    }
  }
} elseif ($section === 'partidos-en-directo') {
  $data = array(
    array(
      'equipo_local' => 'Equipo A',