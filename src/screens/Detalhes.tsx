import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ocorrencia } from "../interfaces/Ocorrencias";

type Props = {
  ocorrencia: Ocorrencia;
  voltar: () => void;
};

export default function DetalheOcorrenciaScreen({
  ocorrencia,
  voltar,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes da Ocorrência</Text>

      {/* CARD PRINCIPAL */}
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
            style={[
              styles.badge,
              ocorrencia.risco === "alto" && styles.badgeAlto,
              ocorrencia.risco === "medio" && styles.badgeMedio,
              ocorrencia.risco === "baixo" && styles.badgeBaixo,
            ]}
          >
            <Text style={styles.badgeText}>
              {ocorrencia.risco.toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>Data</Text>
          <Text style={styles.value}>{ocorrencia.data}</Text>
        </View>
      </View>

      {/* BOTÃO */}
      <TouchableOpacity style={styles.button} onPress={voltar}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    color: "#222",
  },

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

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
  },

  value: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111",
    maxWidth: "60%",
    textAlign: "right",
  },

  divider: {
    height: 1,
    backgroundColor: "#EEE",
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#999",
  },

  badgeBaixo: {
    backgroundColor: "#2ECC71",
  },

  badgeMedio: {
    backgroundColor: "#F1C40F",
  },

  badgeAlto: {
    backgroundColor: "#E74C3C",
  },

  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },

  button: {
    marginTop: 20,
    backgroundColor: "#2F6FED",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});