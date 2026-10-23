import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as ocorrenciasService from "@/services/ocorrenciasService";
import { Ocorrencia } from "@/types/Ocorrencia";

export default function CadastroOcorrenciaScreen() {
  const router = useRouter();
  const [descricao, setDescricao] = useState("");
  const [local, setLocal] = useState("");
  const [risco, setRisco] = useState<Ocorrencia["risco"]>("baixo");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function handleSalvar() {
    if (!descricao.trim() || !local.trim()) {
      const msg = "Preencha descrição e local.";
      setErro(msg);
      // Alert.alert não exibe nada no navegador; no web o erro aparece inline.
      if (Platform.OS !== "web") Alert.alert("Campos obrigatórios", msg);
      return;
    }
    setErro("");
    setSalvando(true);
    try {
      await ocorrenciasService.adicionarOcorrencia({
        descricao: descricao.trim(),
        local: local.trim(),
        risco,
      });
      router.back();
    } catch {
      setErro("Não foi possível salvar. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Nova Ocorrência</Text>

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
                    {item === "medio" ? "MÉDIO" : item.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {!!erro && <Text style={styles.erro}>{erro}</Text>}

            <TouchableOpacity
              style={[styles.saveButton, salvando && { opacity: 0.6 }]}
              onPress={handleSalvar}
              disabled={salvando}
            >
              <Text style={styles.saveText}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Text style={styles.backText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F6FA", padding: 20 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20, color: "#222" },
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
  riskRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  riskButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#F2F4F8",
    alignItems: "center",
  },
  riskButtonActive: { backgroundColor: "#2F6FED" },
  riskText: { fontSize: 12, fontWeight: "600", color: "#555" },
  riskTextActive: { color: "#fff" },
  saveButton: {
    marginTop: 20,
    backgroundColor: "#2F6FED",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  backButton: {
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CCC",
  },
  backText: { color: "#555", fontWeight: "600", fontSize: 15 },
  erro: { color: "#E74C3C", fontSize: 13, marginTop: 12 },
});
