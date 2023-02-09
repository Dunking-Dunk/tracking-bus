import { Marker } from "react-native-maps";
import { memo } from "react";

const CustomMarker = ({ children, anchor, coordinate }) => {
  return (
    <Marker coordinate={coordinate} anchor={anchor} tracksViewChanges={false}>
      {children}
    </Marker>
  );
};

export default memo(CustomMarker);
