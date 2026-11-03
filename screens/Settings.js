import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { COLORS, COLORS_LIGHT } from "../constants";

export default function Settings() {
  const [darkTheme, setDarkTheme] = useState(true);
  const colors = darkTheme ? COLORS : COLORS_LIGHT;

  return (
    <View style={[styles.container, { backgroundColor: colors.appBackground }]}>
      <Text style={[styles.title, { color: colors.fontMain }]}>Choose color theme:</Text>
      <View style={styles.choice}>
        <Text style={[styles.label, { color: colors.fontMain }]}>Light</Text>
        <Switch
          value={darkTheme}
          onValueChange={setDarkTheme}
          trackColor={{ false: COLORS_LIGHT.grey300, true: COLORS.primary300 }}
          thumbColor={darkTheme ? COLORS.primary900 : COLORS_LIGHT.grey600}
        />
        <Text style={[styles.label, { color: colors.fontMain }]}>Dark</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 16, marginBottom: 44 },
  choice: { flexDirection: "row", alignItems: "center", gap: 14 },
  label: { fontSize: 16 },
});
