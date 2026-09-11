import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function findWinner(board) {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return board.every(Boolean) ? "draw" : null;
}

function BMWBadge() {
  return (
    <View style={styles.bmwOuter}>
      <View style={styles.bmwInner}>
        <Text style={styles.bmwText}>BMW</Text>
      </View>
    </View>
  );
}

function AudiBadge() {
  return (
    <View style={styles.audiBadge}>
      {[0, 1, 2, 3].map((ring) => (
        <View key={ring} style={[styles.audiRing, ring > 0 && styles.audiRingOverlap]} />
      ))}
    </View>
  );
}

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const winner = useMemo(() => findWinner(board), [board]);

  const play = (index) => {
    if (board[index] || winner) return;
    const next = [...board];
    next[index] = player;
    setBoard(next);
    setPlayer(player === "X" ? "O" : "X");
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setPlayer("X");
  };

  let status = player === "X" ? "Ruch BMW" : "Ruch Audi";
  if (winner) status = "Audi to gówno tylko BMW i M50";

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.eyebrow}>APLIKACJA iPHONE</Text>
        <Text style={styles.title}>Kółko i krzyżyk</Text>
        <Text style={styles.status}>{status}</Text>
        <View style={styles.board}>
          {[0, 1, 2].map((row) => (
            <View key={row} style={styles.row}>
              {[0, 1, 2].map((column) => {
                const index = row * 3 + column;
                const value = board[index];
                return (
                  <Pressable
                    key={index}
                    accessibilityLabel={"Pole " + (index + 1)}
                    onPress={() => play(index)}
                    style={({ pressed }) => [styles.cell, pressed && !value && styles.pressed]}
                  >
                    {value === "X" && <BMWBadge />}
                    {value === "O" && <AudiBadge />}
                  </Pressable>
                );
              })}
            </View>
          ))}
        </View>
        <Pressable onPress={reset} style={styles.button}>
          <Text style={styles.buttonText}>Nowa gra</Text>
        </Pressable>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#090d18" },
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  eyebrow: { color: "#7f8ba8", fontSize: 12, fontWeight: "800", letterSpacing: 2.5 },
  title: { color: "#fff", fontSize: 34, fontWeight: "900", marginTop: 8 },
  status: { color: "#cbd5e1", fontSize: 20, fontWeight: "700", marginTop: 18, marginBottom: 28 },
  board: { width: "100%", maxWidth: 340, aspectRatio: 1, gap: 8 },
  row: { flex: 1, flexDirection: "row", gap: 8 },
  cell: { flex: 1, aspectRatio: 1, borderRadius: 18, backgroundColor: "#151c2d", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#27324b" },
  pressed: { backgroundColor: "#202b43", transform: [{ scale: 0.97 }] },
  bmwOuter: { width: 72, height: 72, borderRadius: 36, backgroundColor: "#111", borderWidth: 5, borderColor: "#e8edf5", alignItems: "center", justifyContent: "center" },
  bmwInner: { width: 52, height: 52, borderRadius: 26, backgroundColor: "#147cc1", borderWidth: 3, borderColor: "#fff", alignItems: "center", justifyContent: "center" },
  bmwText: { color: "#fff", fontSize: 14, fontWeight: "900", letterSpacing: 1 },
  audiBadge: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
  audiRing: { width: 27, height: 27, borderRadius: 14, borderWidth: 4, borderColor: "#e9edf5" },
  audiRingOverlap: { marginLeft: -9 },
  button: { marginTop: 34, backgroundColor: "#3478f6", paddingVertical: 15, paddingHorizontal: 34, borderRadius: 15 },
  buttonText: { color: "#fff", fontSize: 17, fontWeight: "800" },
});
