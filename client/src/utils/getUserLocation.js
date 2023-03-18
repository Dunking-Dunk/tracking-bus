import * as Location from "expo-location";
import { getUserLocation } from "../store/action";
import { showError, showSuccess } from "./helperFunction";
import * as TaskManager from "expo-task-manager";

class GetUserLocation {
  constructor(dispatch) {
    this.dispatch = dispatch;
    this.TASK_NAME = "BACKGROUND_LOCATION_TASK";
    this.getPermissions();
    // this.defineTask();
  }

  async getPermissions() {
    let foregroundPermission =
      await Location.requestForegroundPermissionsAsync();

    if (!foregroundPermission.granted) {
      this.error = "Permission to access location was denied";
      showError("Permission to access location was denied");
    }

    this.getUserLocation();
  }

  // defineTask() {
  //   TaskManager.defineTask(this.TASK_NAME, async ({ data, error }) => {
  //     if (error) {
  //       this.error = error;
  //       return;
  //     }
  //     if (data) {
  //       const { locations } = data;
  //       const location = locations[0];

  //       if (location) {
  //         this.dispatch(getUserLocation(location));
  //       }
  //     }
  //   });
  // }

  async getUserLocation() {
    const location = await Location.getCurrentPositionAsync();
    console.log(this.location);
    this.dispatch(getUserLocation(location));
    setInterval(async () => {
      const location = await Location.getCurrentPositionAsync();
      this.dispatch(getUserLocation(location));
    }, 5000);

    // this.getUserLocationBackground();
  }

  // getUserLocationBackground() {
  //   Location.startLocationUpdatesAsync(this.TASK_NAME, {
  //     // The following notification options will help keep tracking consistent
  //     showsBackgroundLocationIndicator: true,
  //     distanceInterval: 5,
  //     deferredUpdatesInterval: 5000,
  //     accuracy: Location.Accuracy.Highest,
  //     foregroundService: {
  //       notificationTitle: "Location",
  //       notificationBody: "Location tracking in background",
  //       notificationColor: "#fff",
  //     },
  //   });
  // }
}

export default GetUserLocation;
