import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

type Props = {
  onSalvar: (
    descricao: string,
    local: string,
    risco: "baixo" | "medio" | "alto"
  ) => void;
  voltar: () => void; // CORRIGIDO: prop voltar adicionada
};

export default function CadastroOcorrenciaScreen({ onSalvar, voltar }: Props) {
  const [descricao, setDescricao] = useState("");
  const [local, setLocal] = useState("");
  const [risco, setRisco] = useState<"baixo" | "medio" | "alto">("baixo");

  function handleSalvar() {
    if (!descricao.trim() || !local.trim()) return; // CORRIGIDO: validação básica
    onSalvar(descricao, local, risco);
    setDescricao(""); // CORRIGIDO: limpa campos após salvar
    setLocal("");
    setRisco("baixo");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Ocorrência</Text>

      {/* CARD FORM */}
      <View style={styles.card}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          placeholder="Digite a descrição"
          placeholderTextColor="#999"
          value={descricao}
          onChangeText={setDescricao}
          style={styles.input}
        />

        <Text style={styles.label}>Local</Text>
        <TextInput
          placeholder="Digite o local"
          placeholderTextColor="#999"
          value={local}
          onChangeText={setLocal}
          style={styles.input}
        />

        <Text style={styles.label}>Nível de Risco</Text>

        <View style={styles.riskRow}>
          {(["baixo", "medio", "alto"] as const).map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setRisco(item)}
              style={[
                styles.riskButton,
                risco === item && styles.riskButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.riskText,
                  risco === item && styles.riskTextActive,
                ]}
              >
                {item.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSalvar}
        >
          <Text style={styles.saveText}>Salvar</Text>
        </TouchableOpacity>

        {/* CORRIGIDO: botão voltar */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={voltar}
        >
          <Text style={styles.backText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 26,
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
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 6,
    color: "#444",
  },
  input: {
    backgroundColor: "#F2F4F8",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 10,
  },
  riskRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  riskButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#F2F4F8",
    alignItems: "center",
  },
  riskButtonActive: {
    backgroundColor: "#2F6FED",
  },
  riskText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#555",
  },
  riskTextActive: {
    color: "#fff",
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: "#2F6FED",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  backButton: {
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CCC",
  },
  backText: {
    color: "#555",
    fontWeight: "600",
    fontSize: 15,
  },
});