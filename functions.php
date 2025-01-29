<?php

use EvoMark\WpVite\WpVite;

require_once __DIR__ . '/vendor/autoload.php';

$wpVite = new WpVite();

$wpVite->enqueue([
    'input' => [
        'src/main.tsx'
    ],
    'namespace' => 'theme-vite'
]);

// add_action('wp_enqueue_scripts', 'load_scripts');
 
// function load_scripts()
// {
//     $isViteDevServer = get_theme_file_path('/assets/hot');
//     if (file_exists($isViteDevServer)) {
//         $viteDevServer = 'http://localhost:5173';
//         wp_enqueue_script_module('vite-client', $viteDevServer . '/@vite/client', [], null);
//         wp_enqueue_script_module('main-script', $viteDevServer . '/src/main.tsx', ['vite-client'], null);
//         wp_localize_script('main-script', 'VITE_APP_WP_PASSWORD', ['teste 123']);
//     } else {
//         $manifestPath = get_theme_file_path('/assets/build/manifest.json');
//         if (file_exists($manifestPath)) {
//             $manifest = json_decode(file_get_contents($manifestPath), true);
//             $mainJsEntry = 'src/main.tsx';
//             if (isset($manifest[$mainJsEntry])) {
//                 $mainJs = $manifest[$mainJsEntry]['file'];
//                 wp_enqueue_script_module('main-script', get_stylesheet_directory_uri() . '/assets/build/' . $mainJs, [], null);
//             }
//         }
//     }
// }