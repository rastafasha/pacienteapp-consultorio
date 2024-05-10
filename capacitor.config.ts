import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.patientapp.app',
  appName: 'pacienteapp',
  webDir: 'dist/pacienteapp',
  server: {
    androidScheme: 'https'
  }
};

export default config;
