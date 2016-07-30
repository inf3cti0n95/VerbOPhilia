<?php

$word = $_GET['word'];
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "myDB";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT * FROM words where word='$word'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
    	// sleep(5);
        echo json_encode($row);
    }
} 
else{
	$err = array('explaination' => "");
	echo json_encode($err);
}
$conn->close();

?>