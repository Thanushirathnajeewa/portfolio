<?php

require_once "database.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: ../contact.html");
    exit;
}

$name = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$message = trim($_POST["message"] ?? "");

if ($name === "" || $email === "" || $message === "") {
    die("Please fill in all required fields.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Please enter a valid email address.");
}

$sql = "INSERT INTO contact_messages (name, email, message)
        VALUES (?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $name, $email, $message);

if ($stmt->execute()) {
    echo "Message sent successfully!";
} else {
    echo "Sorry, your message could not be sent.";
}

$stmt->close();
$conn->close();

?>