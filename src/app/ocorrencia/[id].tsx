import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as ocorrenciasService from "@/services/ocorrenciasService";
import { Ocorrencia } from "@/types/Ocorrencia";
import { RISCO_COR, RISCO_LABEL } from "@/types/risco";

export default function DetalheOcorrenciaScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [ocorrencia, setOcorrencia] = useState<Ocorrencia | undefined>();
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    ocorrenciasService.getOcorrenciaPorId(Number(id)).then((o) => {
      setOcorrencia(o);
      setCarregando(false);
    });
  }, [id]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Detalhes da Ocorrência</Text>

      {carregando ? (
        <ActivityIndicator size="large" color="#2F6FED" />
      ) : !ocorrencia ? (
        <Text style={styles.value}>Ocorrência não encontrada.</Text>
      ) : (
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>ID</Text>
            <Text style={styles.value}>{ocorrencia.id}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Descrição</Text>
            <Text style={styles.value}>{ocorrencia.descricao}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Local</Text>
            <Text style={styles.value}>{ocorrencia.local}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Risco</Text>
            <View
              style={[styles.badge, { backgroundColor: RISCO_COR[ocorrencia.risco] }]}
            >
              <Text style={styles.badgeText}>{RISCO_LABEL[ocorrencia.risco]}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Data</Text>
            <Text style={styles.value}>{ocorrencia.data}</Text>
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F6FA", padding: 20 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 20, color: "#222" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  label: { fontSize: 14, fontWeight: "600", color: "#555" },
  value: { fontSize: 14, fontWeight: "500", color: "#111", maxWidth: "60%", textAlign: "right" },
  divider: { height: 1, backgroundColor: "#EEE" },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, backgroundColor: "#999" },
  badgeText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  button: {
    marginTop: 20,
    backgroundColor: "#2F6FED",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
