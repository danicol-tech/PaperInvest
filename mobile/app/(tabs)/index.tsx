import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

const API = "http://192.168.253.12:8080"; // <-- IL TUO IP

export default function HomeScreen() {
  const [msg, setMsg] = useState<string>("Carico...");
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`${API}/ping`);
        const data = await res.json();
        setMsg(data.message || "Nessun messaggio");
      } catch (e: any) {
        setErr(e?.message ?? "Errore sconosciuto");
      }
    };
    run();
  }, []);

  if (err) {
    return (
      <View style={styles.container}>
        <Text style={styles.err}>Errore: {err}</Text>
      </View>
    );
  }

  if (msg === "Carico...") {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <Text style={styles.text}>Carico…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.ok}>✅ {msg}</Text>
      <Text style={styles.sub}>Dati da {API}/ping</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { marginTop: 8, fontSize: 16 },
  ok: { fontSize: 24, fontWeight: "600" },
  sub: { marginTop: 6, color: "#666" },
  err: { fontSize: 18, color: "red" },
});
