import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { ping } from "../../src/api/client";

export default function HomeScreen() {
  const [state, setState] = useState<"loading"|"ok"|"err">("loading");
  const [msg, setMsg] = useState("Connecting…");

  useEffect(() => {
    (async () => {
      try {
        const data = await ping();
        setMsg(data?.message ?? "no message");
        setState("ok");
      } catch (e: any) {
        setMsg(e?.message ?? "error");
        setState("err");
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚧 Coming Soon 🚧</Text>
      <Text style={styles.subtitle}>PaperInvest preview</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Backend check</Text>
        {state === "loading" && (
          <View style={styles.row}>
            <ActivityIndicator />
            <Text style={styles.text}> contacting /ping…</Text>
          </View>
        )}
        {state === "ok" && <Text style={styles.ok}>✅ {msg}</Text>}
        {state === "err" && <Text style={styles.err}>❌ {msg}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:"#0A84FF", alignItems:"center", justifyContent:"center", padding:24 },
  title: { fontSize:32, fontWeight:"800", color:"#fff" },
  subtitle: { fontSize:16, color:"#E8F0FF", marginBottom:24 },
  card: { width:"100%", backgroundColor:"#fff", borderRadius:16, padding:16, shadowOpacity:0.15, shadowRadius:10, marginTop:16 },
  cardTitle: { fontWeight:"700", fontSize:16, marginBottom:8 },
  row: { flexDirection:"row", alignItems:"center" },
  text: { fontSize:14 },
  ok: { color:"#0A7D2E", fontWeight:"700", fontSize:16 },
  err: { color:"#B00020", fontWeight:"700", fontSize:14 }
});
