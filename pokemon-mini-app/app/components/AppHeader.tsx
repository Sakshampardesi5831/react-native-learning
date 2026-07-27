import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/colors";

interface Props {
  title: string;
  showLogo?: boolean;
  rightAction?: React.ReactNode;
}

const PokeballLogo = () => (
  <View style={logoStyles.container}>
    <View style={logoStyles.topHalf} />
    <View style={logoStyles.bottomHalf} />
    <View style={logoStyles.middleLine} />
    <View style={logoStyles.outerCenterCircle}>
      <View style={logoStyles.innerCenterCircle} />
    </View>
  </View>
);

const AppHeader = ({ title, rightAction, showLogo = false }: Props) => {
  return (
    <View style={styles.headerContainer}>
      <SafeAreaView>
        <View style={styles.leftContainer}>
          {showLogo && <PokeballLogo />}
          <Text style={styles.titleText}>{title}</Text>
        </View>
        {rightAction && (
          <View style={styles.rightContainer}>{rightAction}</View>
        )}
      </SafeAreaView>
    </View>
  );
};

export default AppHeader;

const logoStyles = StyleSheet.create({
  container: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: COLORS.primary,
    overflow: "hidden",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    backgroundColor: COLORS.background,
  },
  topHalf: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 12,
    backgroundColor: COLORS.primary,
  },
  bottomHalf: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 12,
    backgroundColor: "#ffffff",
  },
  middleLine: {
    position: "absolute",
    height: 2,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
  },
  outerCenterCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    borderWidth: 1.5,
    borderColor: COLORS.background,
  },
  innerCenterCircle: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "#ffffff",
  },
});

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: "transparent",
    width: "100%",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: 0.5,
  },
  rightContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
