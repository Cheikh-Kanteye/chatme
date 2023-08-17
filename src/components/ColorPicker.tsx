import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ColorValue,
} from "react-native";
import React from "react";
import { PRIMARY_COLOR, colors } from "@misc/colors";
import { SHEET_H, SPACING, WIDTH, gap } from "@misc/const";

interface ColorPickerProps {
  onPick: (color: ColorValue) => void;
}

const ColorPicker = ({ onPick }: ColorPickerProps) => {
  return (
    <>
      <Text style={styles.label}>Choose accent</Text>
      <View style={styles.container}>
        {colors.map((color) => {
          return (
            <TouchableOpacity
              key={color}
              style={[styles.swatch, { backgroundColor: color }]}
              onPress={() => onPick(color)}
            />
          );
        })}
      </View>
    </>
  );
};

export default ColorPicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: gap,
    flex: 1,
    height: SHEET_H,
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: SPACING,
    color: PRIMARY_COLOR,
  },
  swatch: {
    height: (WIDTH - 10 * gap) / 7,
    aspectRatio: 1,
    borderRadius: 4,
  },
});
