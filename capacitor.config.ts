import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.soundground.app',
  appName: 'soundground',
  webDir: 'public',
  server: {
    androidScheme: 'https'
  }
};

export default config;
