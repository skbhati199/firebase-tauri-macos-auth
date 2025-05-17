import { invoke } from '@tauri-apps/api';

/**
 * Opens a URL in the system browser
 * @param url The URL to open
 * @returns A promise that resolves when the browser is opened
 */
export async function openBrowser(url: string): Promise<void> {
  try {
    await invoke('open_browser', { url });
  } catch (error) {
    console.error('Failed to open browser:', error);
    throw error;
  }
}
