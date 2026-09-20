import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import OcorrenciaCard from "../components/OcorrenciaCard";
import { Ocorrencia } from "../types/Ocorrencia";

type Props = {
  ocorrencias: Ocorrencia[];
  carregando: boolean;
  onNovaOcorrencia: () => void;
  onSelecionar: (ocorrencia: Ocorrencia) => void;
};

// Tela apenas exibe os dados que recebe via props.
// Quem busca e persiste os dados é o App, através de src/services/ocorrenciasService.ts.
export default function ListaOcorrenciasScreen({
  ocorrencias,
  carregando,
  onNovaOcorrencia,
  onSelecionar,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ocorrências</Text>

      <TouchableOpacity style={styles.newButton} onPress={onNovaOcorrencia}>
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
              onPress={() => onSelecionar(item)}
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F6FA", padding: 20 },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 16,
    color: "#222",
  },
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
