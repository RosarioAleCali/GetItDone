import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Svg, { Line, Path } from "react-native-svg";
import PropTypes from "prop-types";

import ButtonTypes from "../types/buttonTypes";

const lineProps = {
  strokeOpacity: 1,
  strokeWidth: 1,
  strokeLineCap: "round",
  strokeLineJoin: "round",
};

function PlusIcon({ size }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 122.88 122.88" {...lineProps}>
      <Line x1="30.72" y1="61.44" x2="92.16" y2="61.44" fill="white" stroke="white" strokeWidth="8" />
      <Line x1="61.44" y1="30.72" x2="61.44" y2="92.16" fill="white" stroke="white" strokeWidth="8" />
    </Svg>
  );
}

function MinusIcon({ size }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 122.88 122.88" {...lineProps}>
      <Line x1="30.72" y1="61.44" x2="92.16" y2="61.44" fill="white" stroke="white" strokeWidth="8" />
    </Svg>
  );
}

function StartIcon({ size }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 60 60" {...lineProps}>
      <Path d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30
		c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15
		C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z" fill="white" stroke="white" />
    </Svg>
  );
}

function PauseIcon({ size }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 122.88 122.88" {...lineProps}>
      <Line x1="46.08" y1="30.72" x2="46.08" y2="92.16" fill="white" stroke="white" strokeWidth="8" />
      <Line x1="76.80" y1="30.72" x2="76.80" y2="92.16" fill="white" stroke="white" strokeWidth="8" />
    </Svg>
  );
}

function ResetIcon({ size }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 1024 1024" {...lineProps}>
      <Path d="M181.731 569.606l63.275-8.713A331.732 331.732 0 0 1 242.255 501l-63.809-2.835a395.86 395.86 0 0 0 3.285 71.441z" fill="white" stroke="white" />
      <Path d="M569.205 906.945c52.791 0 104.019-10.346 152.263-30.752 46.581-19.703 88.409-47.902 124.321-83.814 35.912-35.912 64.111-77.74 83.814-124.322 20.405-48.244 30.752-99.471 30.752-152.263 0-52.791-10.346-104.019-30.752-152.263-19.703-46.581-47.902-88.409-83.814-124.321-35.912-35.912-77.74-64.111-124.321-83.814-48.244-20.405-99.472-30.752-152.263-30.752-101.406 0-197.547 38.644-270.712 108.813-72.938 69.952-115.572 163.96-120.047 264.706L242.255 501c7.783-175.224 151.397-312.483 326.95-312.483 180.462 0 327.278 146.817 327.278 327.278S749.667 843.074 569.205 843.074c-69.625 0-136.091-21.563-192.21-62.357L339.44 832.38c67.106 48.781 146.558 74.565 229.765 74.565z" fill="white" stroke="white" />
      <Path d="M222.367 629.329c8.173 0 16.346-3.118 22.581-9.354l117.233-117.232c12.472-12.471 12.472-32.692 0-45.164-12.471-12.472-32.692-12.472-45.163 0L199.786 574.811c-12.472 12.472-12.472 32.693 0 45.164 6.236 6.236 14.409 9.354 22.581 9.354z" fill="white" stroke="white" />
      <Path d="M215.632 631.398c8.174 0 16.345-3.117 22.581-9.354 12.472-12.471 12.472-32.692 0-45.164L120.981 459.648c-12.47-12.471-32.691-12.471-45.163 0-12.472 12.472-12.472 32.692 0 45.164l117.233 117.232c6.234 6.235 14.409 9.354 22.581 9.354z" fill="white" stroke="white" />
    </Svg>
  );
}

function renderIcon(size, type) {
  switch (type) {
    case ButtonTypes.PLUS_ICON:
      return (<PlusIcon size={size} />);
    case ButtonTypes.MINUS_ICON:
      return (<MinusIcon size={size} />);
    case ButtonTypes.START_ICON:
      return (<StartIcon size={size} />);
    case ButtonTypes.PAUSE_ICON:
      return (<PauseIcon size={size} />);
    case ButtonTypes.RESET_ICON:
      return (<ResetIcon size={size} />);
    default:
      return (<></>);
  }
}

export default function IconButton({ disabled, margin, onPress, size, type }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        ...styles.appButtonContainer,
        width: size,
        height: size,
        marginHorizontal: margin,
        opacity: disabled? 0.2 : 1,
      }}
    >
      <View style={{ width: size, height: size }}>
        {renderIcon(size, type)}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "red",
    borderRadius: 100,
  },
});

PlusIcon.propTypes = {
  size: PropTypes.number.isRequired,
};

MinusIcon.propTypes = {
  size: PropTypes.number.isRequired,
};

StartIcon.propTypes = {
  size: PropTypes.number.isRequired,
};

PauseIcon.propTypes = {
  size: PropTypes.number.isRequired,
};

ResetIcon.propTypes = {
  size: PropTypes.number.isRequired,
};

IconButton.propTypes = {
  disabled: PropTypes.bool,
  margin: PropTypes.number,
  onPress: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired
};
