import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { getUserLocation } from "../store/action";
import { showError, showSuccess } from "./helperFunction";

class GetUserLocation {
  constructor() {
    this.TASK_NAME = "BACKGROUND_LOCATION_TASK";
    this.getPermissions();
  }

  async getPermissions() {
    let foregroundPermission =
      await Location.requestForegroundPermissionsAsync();
    if (foregroundPermission.granted) {
      this.backgroundPermission =
        await Location.requestBackgroundPermissionsAsync();
    }

    if (!this.backgroundPermission.granted || !foregroundPermission.granted) {
      this.error = "Permission to access location was denied";
      showError("Permission to access location was denied");
    }
  }

  async getUserLocation(dispatch) {
    this.location = await Location.getCurrentPositionAsync();
    this.coords = {
      latitude: this.location.coords.latitude,
      longitude: this.location.coords.longitude,
    };
    dispatch(getUserLocation(this.location));
    if (this.backgroundPermission.granted) {
      this.getUserLocationBackground(dispatch);
    }
  }

  getUserLocationBackground(dispatch) {
    TaskManager.defineTask(this.TASK_NAME, async ({ data, error }) => {
      if (error) {
        this.error = error;
        return;
      }
      if (data) {
        const { locations } = data;
        const location = locations[0];

        if (location) {
          dispatch(getUserLocation(location));
        }
      }
    });

    Location.startLocationUpdatesAsync(this.TASK_NAME, {
      // The following notification options will help keep tracking consistent
      showsBackgroundLocationIndicator: true,
      distanceInterval: 5,
      deferredUpdatesInterval: 5000,
      accuracy: Location.Accuracy.Highest,
      foregroundService: {
        notificationTitle: "Location",
        notificationBody: "Location tracking in background",
        notificationColor: "#fff",
      },
    });
  }
}

export const userLocation = new GetUserLocation();
