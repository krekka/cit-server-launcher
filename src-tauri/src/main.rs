// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod downloader;

use tauri::Manager;
use crate::downloader::download_file;
use crate::downloader::compute_file_hash;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![download_file])
        // .invoke_handler(tauri::generate_handler![compute_file_hash])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
