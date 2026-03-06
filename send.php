<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

  $name    = htmlspecialchars(trim($_POST["name"]));
  $email   = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
  $phone   = htmlspecialchars(trim($_POST["phone"]));
  $country = htmlspecialchars(trim($_POST["country"]));
  $message = htmlspecialchars(trim($_POST["message"]));

  // 🔴 CAMBIAR SOLO ESTA LÍNEA EN EL FUTURO
  $to = "joelmolina5139@gmail.com";

  $subject = "Nuevo contacto desde Spica Studio";
  
  $headers  = "From: Spica Studio <no-reply@spicastudio.art>\r\n";
  $headers .= "Reply-To: $email\r\n";
  $headers .= "Content-Type: text/plain; charset=UTF-8";

  $body = "Nombre: $name\n";
  $body .= "Email: $email\n";
  $body .= "Teléfono: $phone\n";
  $body .= "País: $country\n\n";
  $body .= "Mensaje:\n$message\n";

  if (mail($to, $subject, $body, $headers)) {
    echo json_encode(["success" => true]);
  } else {
    echo json_encode(["success" => false]);
  }
}