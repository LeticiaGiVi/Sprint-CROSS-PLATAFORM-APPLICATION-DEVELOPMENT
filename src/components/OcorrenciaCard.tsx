import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ocorrencia } from "../types/Ocorrencia";

type Props = {
  ocorrencia: Ocorrencia;
  onPress: () => void;
};

const RISCO_LABEL: Record<Ocorrencia["risco"], string> = {
  baixo: "BAIXO",
  medio: "MÉDIO",
  alto: "ALTO",
};

const RISCO_COR: Record<Ocorrencia["risco"], string> = {
  baixo: "#2ECC71",
  medio: "#F1C40F",
  alto: "#E74C3C",
};

export default function OcorrenciaCard({ ocorrencia, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.descricao} numberOfLines={1}>
            {ocorrencia.descricao}
          </Text>
          <View
            style={[
              styles.badge,
              { backgroundColor: RISCO_COR[ocorrencia.risco] },
            ]}
          >
            <Text style={styles.badgeText}>
              {RISCO_LABEL[ocorrencia.risco]}
            </Text>
          </View>
        </View>

        <Text style={styles.local}>{ocorrencia.local}</Text>
        <Text style={styles.data}>{ocorrencia.data}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  descricao: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    color: "#222",
    marginRight: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
  local: {
    fontSize: 13,
    color: "#555",
  },
  data: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
});
