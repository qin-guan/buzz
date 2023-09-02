export interface Settings {
  geolocation: boolean
}

const defaultSettings: Settings = {
  geolocation: true,
}

export const settings = useLocalStorage('buzz-settings', defaultSettings)
