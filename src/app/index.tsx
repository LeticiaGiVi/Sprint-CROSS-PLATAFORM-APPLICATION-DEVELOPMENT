import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import OcorrenciaCard from "@/components/OcorrenciaCard";
import * as ocorrenciasService from "@/services/ocorrenciasService";
import { Ocorrencia } from "@/types/Ocorrencia";

// Tela de lista. Os dados vêm do AsyncStorage via service e são recarregados
// toda vez que a tela volta ao foco (ex.: depois de salvar um cadastro).
export default function ListaOcorrenciasScreen() {
  const router = useRouter();
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [carregando, setCarregando] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let ativo = true;
      ocorrenciasService.getOcorrencias().then((salvas) => {
        if (!ativo) return;
        setOcorrencias(salvas);
        setCarregando(false);
      });
      return () => {
        ativo = false;
      };
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Ocorrências</Text>

      <TouchableOpacity
        style={styles.newButton}
        onPress={() => router.push("/cadastro")}
      >
        <Text style={styles.newButtonText}>+ Nova Ocorrência</Text>
      </TouchableOpacity>

      {carregando ? (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color="#2F6FED" />
          <Text style={styles.emptyText}>Carregando ocorrências...</Text>
        </View>
      ) : ocorrencias.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma ocorrência cadastrada.</Text>
        </View>
      ) : (
        <FlatList
          data={ocorrencias}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <OcorrenciaCard
              ocorrencia={item}
              onPress={() =>
                router.push({
                  pathname: "/ocorrencia/[id]",
                  params: { id: String(item.id) },
                })
              }
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F6FA", padding: 20 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 16, color: "#222" },
  newButton: {
    backgroundColor: "#2F6FED",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  newButtonText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
  emptyText: { color: "#999", fontSize: 16, marginTop: 12 },
});
