<?php

exec('RD /S /Q milestone\smartkitchen\assets\css');
exec('RD /S /Q milestone\smartkitchen\assets\js');
exec('RD /S /Q milestone\smartkitchen\assets\fonts');

exec('XCOPY "dist/pwa/js" "milestone/smartkitchen/assets/js" /EHRYI');
exec('XCOPY "dist/pwa/css" "milestone/smartkitchen/assets/css" /EHRYI');
exec('XCOPY "dist/pwa/fonts" "milestone/smartkitchen/assets/fonts" /EHRYI');

exec('COPY dist\pwa\favicon.ico milestone\smartkitchen\assets\favicon.ico /Y');
exec('COPY "dist\pwa\Import Data Template.xlsx" "milestone\smartkitchen\assets\Import Data Template.xlsx" /Y');
exec('COPY dist\pwa\*.js* milestone\smartkitchen\assets /Y');

$json = [];
preg_match_all('/(link href|script src)=(css|js)\/(vendor|app).(.{8}).(css|js)/',file_get_contents(implode(DIRECTORY_SEPARATOR,[__DIR__,'..','..','dist','pwa','index.html'])),$matches);
foreach ($matches[5] as $idx => $ext){
    if(!array_key_exists($ext,$json)) $json[$ext] = [];
    if(!array_key_exists($matches[3][$idx],$json[$ext])) $json[$ext][$matches[3][$idx]] = "";
    $json[$ext][$matches[3][$idx]] = $matches[4][$idx];
}

file_put_contents(implode(DIRECTORY_SEPARATOR,[__DIR__,'assets','pack.json']),json_encode($json));

exec('XCOPY "' . implode(DIRECTORY_SEPARATOR,[__DIR__,'assets']) . '" "' . implode(DIRECTORY_SEPARATOR,[__DIR__,'..','..','public']) . '" /EHRYI');
