import { AndroidPermissions } from "@ionic-native/android-permissions";
import { LocationAccuracy } from "@ionic-native/location-accuracy";
import { Capacitor } from "@capacitor/core";

const LocationService = {
  // Check if application having GPS access permission
  checkGPSPermission: async (): Promise<boolean> => {
    return await new Promise((resolve, reject) => {
      if (Capacitor.isNative) {
        AndroidPermissions.checkPermission(
          AndroidPermissions.PERMISSION.ACCESS_FINE_LOCATION
        ).then(
          (result: any) => {
            if (result.hasPermission) {
              // If having permission show 'Turn On GPS' dialogue
              resolve(true);
            } else {
              // If not having permission ask for permission
              resolve(false);
            }
          },
          (err: any) => {
            alert(err);
          }
        );
      } else {
        resolve(true);
      }
    });
  },

  requestGPSPermission: async (): Promise<string> => {
    return await new Promise((resolve, reject) => {
      LocationAccuracy.canRequest().then((canRequest: boolean) => {
        if (canRequest) {
          resolve("CAN_REQUEST");
        } else {
          // Show 'GPS Permission Request' dialogue
          AndroidPermissions.requestPermission(
            AndroidPermissions.PERMISSION.ACCESS_FINE_LOCATION
          ).then(
            (result: any) => {
              if (result.hasPermission) {
                // call method to turn on GPS
                resolve("GOT_PERMISSION");
              } else {
                resolve("DENIED_PERMISSION");
              }
            },
            (error: any) => {
              // Show alert if user click on 'No Thanks'
              alert(
                "requestPermission Error requesting location permissions " +
                  error
              );
            }
          );
        }
      });
    });
  },
};

export default LocationService;
