import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

const API = "http://192.168.253.12:8080"; // <— tuo IP

export default function HomeScreen() {
  const [status, setStatus] = useState<"loading"|"ok"|"err">("loading");
  const [msg, setMsg] = useState("Connecting…");

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`${API}/ping`, { method: "GET" });
        const data = await res.json();
        setMsg(data?.message ?? "no message");
        setStatus("ok");
      } catch (e: any) {
        setMsg(e?.message ?? "unknown error");
        setStatus("err");
      }
    };
    run();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚧 Coming Soon 🚧</Text>
      <Text style={styles.subtitle}>PaperInvest preview</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Backend check</Text>
        {status === "loading" && (
          <View style={styles.row}>
            <ActivityIndicator />
            <Text style={styles.text}>  contacting {API}/ping…</Text>
          </View>
        )}
        {status === "ok" && <Text style={styles.ok}>✅ {msg}</Text>}
        {status === "err" && (
          <>
            <Text style={styles.err}>❌ {msg}</Text>
            <Text style={styles.hint}>
              Hints: stesso Wi-Fi • firewall macOS • URL = {API}/ping
            </Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A84FF", alignItems: "center", justifyContent: "center", padding: 24 },
  title: { fontSize: 32, fontWeight: "800", color: "#fff" },
  subtitle: { fontSize: 16, color: "#E8F0FF", marginBottom: 24 },
  card: { width: "100%", backgroundColor: "white", borderRadius: 16, padding: 16, shadowOpacity: 0.15, shadowRadius: 10 },
  cardTitle: { fontWeight: "700", fontSize: 16, marginBottom: 8 },
  row: { flexDirection: "row", alignItems: "center" },
  text: { fontSize: 14 },
  ok: { color: "#0A7D2E", fontWeight: "700", fontSize: 16 },
  err: { color: "#B00020", fontWeight: "700", fontSize: 14 },
  hint: { marginTop: 6, color: "#666", fontSize: 12 }
});
