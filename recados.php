<?php
header('Content-Type: application/json; charset=utf-8');

$host = 'localhost';
$dbname = 'casamento';  
$user = 'root';     
$pass = '';           

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(["erro" => "Erro de conexão com o banco de dados."]));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = $_POST['nome'] ?? '';
    $mensagem = $_POST['mensagem'] ?? '';

    if (!empty($nome) && !empty($mensagem)) {
        $stmt = $pdo->prepare("INSERT INTO recados (nome, mensagem) VALUES (:nome, :mensagem)");
        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':mensagem', $mensagem);
        $stmt->execute();
        
        echo json_encode(["sucesso" => true]);
    } else {
        echo json_encode(["erro" => "Preencha todos os campos."]);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->query("SELECT nome, mensagem, DATE_FORMAT(data_envio, '%d/%m/%Y') as data FROM recados ORDER BY data_envio DESC");
    $recados = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($recados);
    exit;
}
?>