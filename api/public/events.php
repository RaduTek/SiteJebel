<?php

class Event {
    public int $id;
    public string $date;
    public string $title;
    public string $photoId;
    public string $color;
    public string $description;
    public array $links;
}

require_once('../include.php');
$pdo = db_connect();

$query = isset($_GET['past']) 
    ? "SELECT * FROM events WHERE date < NOW() AND visible = 1 ORDER BY date DESC"
    : "SELECT * FROM events WHERE date >= NOW() AND visible = 1 ORDER BY date ASC";

$stmt = $pdo -> query($query);
$events = [];

while ($row = $stmt -> fetch(PDO::FETCH_ASSOC)) {
    $event = new Event();
    $event->id = (int)$row['id'];
    $event->date = (new DateTime($row['date']))->format(DateTime::ATOM);
    $event->title = (string)$row['title'];
    $event->photoId = (string)$row['photoId'];
    $event->color = (string)$row['color'];
    $event->description = (string)$row['description'];
    
    $links = json_decode($row['links'], true);
    if (isset($_GET['past'])) {
        $links = array_filter($links, function ($link) {
            return $link['visibleAfterEvent'];
        });
        $links = array_values($links);
    }
    foreach ($links as &$link) {
        unset($link['visibleAfterEvent']);
    }
    
    $event->links = $links;
    $events[] = $event;
}

return_json($events);

?>