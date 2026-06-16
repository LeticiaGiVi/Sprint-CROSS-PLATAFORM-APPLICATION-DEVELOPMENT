import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

import OcorrenciaCard from "../components/OcorrenciaCard";
import DetalheOcorrenciaScreen from "../screens/Detalhes";
import { useOcorrencias } from "../components/OcorrenciaContext"; // CORRIGIDO: caminho do import
import { Ocorrencia } from "../interfaces/Ocorrencias";

type RootDrawerParamList = {
  Home: undefined;
  Lista: undefined;
  Cadastro: undefined;
};

type ListaScreenProp = DrawerNavigationProp<RootDrawerParamList, "Lista">;

export default function ListaOcorrenciasScreen() {
  const { ocorrencias } = useOcorrencias();
  const navigation = useNavigation<ListaScreenProp>();
  const [selecionada, setSelecionada] = useState<Ocorrencia | null>(null);

  if (selecionada) {
    return (
      <DetalheOcorrenciaScreen
        ocorrencia={selecionada}
        voltar={() => setSelecionada(null)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.newButton}
        onPress={() => navigation.navigate("Cadastro")}
      >
        <Text style={styles.newButtonText}>+ Nova Ocorrência</Text>
      </TouchableOpacity>

      {ocorrencias.length === 0 ? (
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
              onPress={() => setSelecionada(item)}
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
  newButton: {
    backgroundColor: "#2F6FED",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  newButtonText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center", marginTop: 60 },
  emptyText: { color: "#999", fontSize: 16 },
});