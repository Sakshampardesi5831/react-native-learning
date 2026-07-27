import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { COLORS } from "../constants/colors";

interface SearchInputProps extends Omit<TextInputProps, "style"> {
  onClear?: () => void;
  style?: StyleProp<ViewStyle>;
}

const SearchInput = ({ onClear, style, value, ...props }: SearchInputProps) => {
  return (
    <View style={[styles.container, style]}>
      <Ionicons
        name="search-outline"
        size={20}
        color={COLORS.textMuted}
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={COLORS.textMuted}
        value={value}
        cursorColor={COLORS.primary}
        selectionColor={COLORS.primary + "40"} // subtle transparent primary color
        {...props}
      />
      {value ? (
        <TouchableOpacity
          onPress={onClear}
          activeOpacity={0.7}
          style={styles.clearButton}
        >
          <Ionicons name="close-circle" size={18} color={COLORS.textMuted} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 50,
    width: "100%",
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    color: COLORS.text,
    fontSize: 16,
    paddingVertical: 0,
  },
  clearButton: {
    padding: 4,
    marginLeft: 6,
    justifyContent: "center",
    alignItems: "center",
  },
});
