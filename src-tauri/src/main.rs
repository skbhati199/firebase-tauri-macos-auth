#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod device_info;

use device_info::{get_machine_id, get_device_name, get_os_version};
use tauri::api::shell;
use tauri::{command, Manager, Window};

#[command]
fn open_browser(window: Window, url: String) -> Result<(), String> {
    shell::open(&window.shell_scope(), url, None).map_err(|e| e.to_string())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_machine_id,
            get_device_name,
            get_os_version,
            open_browser
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
