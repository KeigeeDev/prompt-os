/** Tauri bridge helpers (Milestone 1+) */

export async function pingHost(): Promise<string | null> {
  try {
    const { invoke } = await import('@tauri-apps/api/core');
    return await invoke<string>('health_ping');
  } catch {
    return null;
  }
}
