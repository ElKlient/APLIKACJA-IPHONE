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

  let status = "Ruch gracza " + player;
  if (winner === "draw") status = "Remis";
  if (winner && winner !== "draw") status = "Wygrywa " + winner + "!";

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.eyebrow}>APLIKACJA iPHONE</Text>
        <Text style={styles.title}>Kółko i krzyżyk</Text>
        <Text style={styles.status}>{status}</Text>
        <View style={styles.board}>
          {board.map((value, index) => (
            <Pressable
              key={index}
              accessibilityLabel={"Pole " + (index + 1)}
              onPress={() => play(index)}
              style={({ pressed }) => [styles.cell, pressed && !value && styles.pressed]}
            >
              <Text style={[styles.mark, value === "X" ? styles.x : styles.o]}>{value}</Text>
            </Pressable>
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
  board: { width: "100%", maxWidth: 360, aspectRatio: 1, flexDirection: "row", flexWrap: "wrap", gap: 8 },
  cell: { width: "31.8%", height: "31.8%", borderRadius: 18, backgroundColor: "#151c2d", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#27324b" },
  pressed: { backgroundColor: "#202b43", transform: [{ scale: 0.97 }] },
  mark: { fontSize: 58, fontWeight: "900" },
  x: { color: "#5da9ff" },
  o: { color: "#ff6b91" },
  button: { marginTop: 34, backgroundColor: "#3478f6", paddingVertical: 15, paddingHorizontal: 34, borderRadius: 15 },
  buttonText: { color: "#fff", fontSize: 17, fontWeight: "800" },
});
