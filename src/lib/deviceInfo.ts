import { invoke } from '@tauri-apps/api';

export interface DeviceInfo {
  machineId: string;
  deviceName: string;
  osVersion: string;
}

export async function getDeviceInfo(): Promise<DeviceInfo> {
  try {
    const [machineId, deviceName, osVersion] = await Promise.all([
      invoke<string>('get_machine_id'),
      invoke<string>('get_device_name'),
      invoke<string>('get_os_version')
    ]);

    return {
      machineId,
      deviceName,
      osVersion
    };
  } catch (error) {
    console.error('Error getting device info:', error);
    throw error;
  }
}

// Helper function to get a unique device identifier for Firebase auth persistence
export async function getDeviceIdentifier(): Promise<string> {
  try {
    const machineId = await invoke<string>('get_machine_id');
    return machineId;
  } catch (error) {
    console.error('Error getting device identifier:', error);
    // Fallback to a random ID if we can't get the machine ID
    return 'device-' + Math.random().toString(36).substring(2, 15);
  }
}
