declare module 'react-native-config' {
    export interface NativeConfig {
        HOST?: string;
        HOST_CHAT: string;
    }
    
    export const Config: NativeConfig
    export default Config
  }