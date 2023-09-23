import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Gedis',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  // android studio
  android: {
    allowMixedContent: true,
    }
};

export default config;
