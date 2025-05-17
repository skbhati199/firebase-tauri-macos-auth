use std::process::Command;
use tauri::command;

#[command]
pub fn get_machine_id() -> Result<String, String> {
    #[cfg(target_os = "macos")]
    {
        let output = Command::new("ioreg")
            .args(["-rd1", "-c", "IOPlatformExpertDevice"])
            .output()
            .map_err(|e| e.to_string())?;
            
        let stdout = String::from_utf8(output.stdout).map_err(|e| e.to_string())?;
        
        // Extract the IOPlatformUUID
        if let Some(line) = stdout.lines().find(|line| line.contains("IOPlatformUUID")) {
            if let Some(uuid) = line.split("\"").nth(3) {
                return Ok(uuid.to_string());
            }
        }
        
        Err("Failed to extract machine ID".to_string())
    }
    
    #[cfg(target_os = "linux")]
    {
        let output = Command::new("cat")
            .arg("/etc/machine-id")
            .output()
            .map_err(|e| e.to_string())?;
            
        let id = String::from_utf8(output.stdout).map_err(|e| e.to_string())?;
        Ok(id.trim().to_string())
    }
    
    #[cfg(target_os = "windows")]
    {
        let output = Command::new("wmic")
            .args(["csproduct", "get", "UUID"])
            .output()
            .map_err(|e| e.to_string())?;
            
        let stdout = String::from_utf8(output.stdout).map_err(|e| e.to_string())?;
        
        // Extract the UUID
        let lines: Vec<&str> = stdout.lines().collect();
        if lines.len() >= 2 {
            return Ok(lines[1].trim().to_string());
        }
        
        Err("Failed to extract machine ID".to_string())
    }
    
    #[cfg(not(any(target_os = "macos", target_os = "linux", target_os = "windows")))]
    {
        Ok("unknown-device".to_string())
    }
}

#[command]
pub fn get_device_name() -> Result<String, String> {
    #[cfg(target_os = "macos")]
    {
        let output = Command::new("scutil")
            .args(["--get", "ComputerName"])
            .output()
            .map_err(|e| e.to_string())?;
            
        let name = String::from_utf8(output.stdout).map_err(|e| e.to_string())?;
        Ok(name.trim().to_string())
    }
    
    #[cfg(target_os = "linux")]
    {
        let output = Command::new("hostname")
            .output()
            .map_err(|e| e.to_string())?;
            
        let name = String::from_utf8(output.stdout).map_err(|e| e.to_string())?;
        Ok(name.trim().to_string())
    }
    
    #[cfg(target_os = "windows")]
    {
        let output = Command::new("hostname")
            .output()
            .map_err(|e| e.to_string())?;
            
        let name = String::from_utf8(output.stdout).map_err(|e| e.to_string())?;
        Ok(name.trim().to_string())
    }
    
    #[cfg(not(any(target_os = "macos", target_os = "linux", target_os = "windows")))]
    {
        Ok("Unknown Device".to_string())
    }
}

#[command]
pub fn get_os_version() -> Result<String, String> {
    #[cfg(target_os = "macos")]
    {
        let output = Command::new("sw_vers")
            .arg("-productVersion")
            .output()
            .map_err(|e| e.to_string())?;
            
        let version = String::from_utf8(output.stdout).map_err(|e| e.to_string())?;
        Ok(format!("macOS {}", version.trim()))
    }
    
    #[cfg(target_os = "linux")]
    {
        let output = Command::new("lsb_release")
            .args(["-ds"])
            .output()
            .map_err(|e| e.to_string())?;
            
        let version = String::from_utf8(output.stdout).map_err(|e| e.to_string())?;
        Ok(version.trim().to_string())
    }
    
    #[cfg(target_os = "windows")]
    {
        let output = Command::new("wmic")
            .args(["os", "get", "Caption"])
            .output()
            .map_err(|e| e.to_string())?;
            
        let stdout = String::from_utf8(output.stdout).map_err(|e| e.to_string())?;
        
        // Extract the OS Caption
        let lines: Vec<&str> = stdout.lines().collect();
        if lines.len() >= 2 {
            return Ok(lines[1].trim().to_string());
        }
        
        Err("Failed to get OS version".to_string())
    }
    
    #[cfg(not(any(target_os = "macos", target_os = "linux", target_os = "windows")))]
    {
        Ok("Unknown OS".to_string())
    }
}
