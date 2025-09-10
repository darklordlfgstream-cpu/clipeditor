<?php
$data = json_decode(file_get_contents("php://input"), true);
$url = $data['url'];
$start = $data['start'];
$end = $data['end'];

file_put_contents("clips.txt", "$url | Start: $start | End: $end\n", FILE_APPEND);
echo "Saved clip info!";
?>
