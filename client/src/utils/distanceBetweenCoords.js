export class CalcDistance {
  constructor(userCoords) {
    this.userCoords = userCoords;
  }

  nearByStops(stops) {
    if (stops && this.userCoords) {
      const nearBy = stops.map((stop) => {
        const stopCoord = stop.coords;
        const distance = this.haversineformula(
          stopCoord.latitude,
          this.userCoords.latitude,
          stopCoord.longitude,
          this.userCoords.longitude
        );

        if (distance < 2) {
          return stop;
        }
      });
      return nearBy.filter((stop) => stop != null);
    }
  }

  nearByBuses(buses) {
    if (buses && this.userCoords) {
      const nearBy = buses.map((bus) => {
        const busCoord = bus.coords;
        const distance = this.haversineformula(
          busCoord.latitude,
          this.userCoords.latitude,
          busCoord.longitude,
          this.userCoords.longitude
        );

        if (distance < 5) {
          return bus;
        }
      });
      return nearBy.filter((stop) => stop != null);
    }
  }

  haversineformula(lat1, lat2, lon1, lon2) {
    lon1 = (lon1 * Math.PI) / 180;
    lon2 = (lon2 * Math.PI) / 180;
    lat1 = (lat1 * Math.PI) / 180;
    lat2 = (lat2 * Math.PI) / 180;

    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a =
      Math.pow(Math.sin(dlat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    let r = 6371;
    return c * r;
  }
}
