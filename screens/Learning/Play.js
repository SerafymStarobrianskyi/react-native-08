import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../../constants";
import dummyData from "../../dummyData";
import { playSound } from "../../services/soundHandler";

export default function Play({ words }) {
  const [studyWords, setStudyWords] = useState(() => (words ?? dummyData).map((word) => ({ ...word })));
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const available = studyWords.filter((word) => (word.status ?? 0) < 2);
  const current = available[index % available.length];

  const advance = (remembered) => {
    if (remembered) {
      setStudyWords((previous) => previous.map((word) =>
        word === current ? { ...word, status: (word.status ?? 0) + 1 } : word
      ));
    }
    setIndex((previous) => previous + 1);
    setRevealed(false);
  };

  if (!current) {
    return (
      <View style={styles.container}>
        <Text style={styles.congrats}>Congrats!</Text>
        <Text style={styles.description}>For now you have learned all the words</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.card} onPress={() => setRevealed(true)}>
        <Text style={styles.word}>{current.word}</Text>
        {revealed && (
          <View style={styles.details}>
            {!!current.phonetics && <Text style={styles.description}>{current.phonetics}</Text>}
            {!!current.partOfSpeech && <Text style={styles.description}>{current.partOfSpeech}</Text>}
            <Text style={styles.description}>{current.meaning}</Text>
            {!!current.audio && (
              <Pressable accessibilityLabel="Play pronunciation" onPress={() => playSound(current.audio)}>
                <Ionicons name="volume-medium-outline" size={28} color={COLORS.primary900} />
              </Pressable>
            )}
          </View>
        )}
      </Pressable>
      {revealed && (
        <View style={styles.actions}>
          <Pressable style={styles.button} onPress={() => advance(false)}>
            <Text style={styles.buttonText}>Didn't know it</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => advance(true)}>
            <Text style={styles.buttonText}>Knew it</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.appBackground, justifyContent: "center", padding: 20 },
  card: { minHeight: 180, borderRadius: 12, backgroundColor: COLORS.primary200, alignItems: "center", justifyContent: "center", padding: 20 },
  word: { color: COLORS.fontMain, fontSize: 30, fontWeight: "bold" },
  details: { alignItems: "center", gap: 10, marginTop: 20 },
  description: { color: COLORS.fontMain, fontSize: 17, textAlign: "center" },
  actions: { flexDirection: "row", gap: 12, marginTop: 18 },
  button: { flex: 1, padding: 12, borderRadius: 6, backgroundColor: COLORS.primary900, alignItems: "center" },
  buttonText: { color: COLORS.fontInverse, fontSize: 16 },
  congrats: { color: COLORS.primary900, fontSize: 30, textAlign: "center", marginBottom: 12 },
});
