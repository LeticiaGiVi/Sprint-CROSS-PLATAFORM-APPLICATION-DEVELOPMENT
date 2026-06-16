import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
 
import ListaOcorrenciasScreen from "./src/screens/Lista";
import CadastroOcorrenciaScreen from "./src/screens/cadastro";
import DetalheOcorrenciaScreen from "./src/screens/Detalhes";
import OcorrenciaCard from "./src/components/OcorrenciaCard";
import { mockOcorrencias } from "./src/data/mock";
import { Ocorrencia } from "./src/interfaces/Ocorrencias";
import CustomDrawer from "./src/components/menu";
 
// =====================
// COMPONENTE HOME SCREEN
// =====================
export default function HomeScreen() {
  const [tela, setTela] = useState<
    "home" | "lista" | "cadastro" | "detalhe"
  >("home");
 
  const [ocorrencias, setOcorrencias] =
    useState<Ocorrencia[]>(mockOcorrencias);
 
  const [selecionada, setSelecionada] =
    useState<Ocorrencia | null>(null);
 
  function adicionarOcorrencia(
    descricao: string,
    local: string,
    risco: "baixo" | "medio" | "alto"
  ) {
    const nova: Ocorrencia = {
      id: Date.now(),
      descricao,
      local,
      risco,
      data: new Date().toLocaleDateString(),
    };
 
    setOcorrencias([...ocorrencias, nova]);
    setTela("home"); // AJUSTE: Volta para a Home após cadastrar
  }
 
  // =====================
  // TELAS DE NAVEGAÇÃO
  // =====================
 
  if (tela === "cadastro") {
    return (
      <CadastroOcorrenciaScreen
        onSalvar={adicionarOcorrencia}
        voltar={() => setTela("home")} // AJUSTE: Prop de voltar para a Home (se seu componente aceitar)
      />
    );
  }
 
  if (tela === "detalhe" && selecionada) {
    return (
      <DetalheOcorrenciaScreen
        ocorrencia={selecionada}
        voltar={() => setTela("home")} // AJUSTE: Volta para a Home após ver detalhes
      />
    );
  }
 
  if (tela === "lista") {
    return (
      <ListaOcorrenciasScreen
        ocorrencias={ocorrencias}
        onCadastrar={() => setTela("cadastro")}
        voltar={() => setTela("home")} // AJUSTE: Passando função para voltar à Home a partir da Lista
        onDetalhe={(item: any) => {
          setSelecionada(item);
          setTela("detalhe");
        }}
      />
    );
  }
 
  // =====================
  // HOME (UI PRINCIPAL)
  // =====================
  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <CustomDrawer>
               
             </CustomDrawer>
      </View>
 
 
      {/* AÇÕES */}
      <Text style={styles.sectionTitle}>Ações</Text>
 
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
 
        <ActionCard
          titulo="Nova Ocorrência"
          icone="➕"
          onPress={() => setTela("cadastro")}
        />
      </ScrollView>
 
      {/* OCORRÊNCIAS NA HOME */}
      {ocorrencias.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Ocorrências Recentes</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {ocorrencias.slice(0, 3).map((item) => (
              <View key={item.id} style={{ marginRight: 10, width: 200 }}>
                <OcorrenciaCard
                  ocorrencia={item}
                  onPress={() => {
                    setSelecionada(item);
                    setTela("detalhe");
                  }}
                />
              </View>
            ))}
          </ScrollView>
        </>
      )}
 
      {/* EQUIPES */}
      <Text style={styles.sectionTitle}>Equipes</Text>
 
      <View style={styles.teamCard}>
        <View style={styles.avatar} />
 
        <View style={{ flex: 1 }}>
          <Text style={styles.teamName}>
            Equipe Motiva
          </Text>
 
          <Text style={styles.teamInfo}>
            km 21 - km 31
          </Text>
        </View>
 
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>
            Trabalho
          </Text>
        </View>
      </View>
 
      {/* PODAS */}
      <Text style={styles.sectionTitle}>
        Podas Agendadas
      </Text>
 
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <ScheduleCard />
        <ScheduleCard />
        <ScheduleCard />
      </ScrollView>
    </ScrollView>
  );
}
 
// =====================
// COMPONENTES AUXILIARES
// =====================
 
function ActionCard({ onPress, titulo, icone }: any) {
  return (
    <TouchableOpacity
      style={styles.actionCard}
      onPress={onPress}
    >
      <Text style={styles.flag}>{icone || "⚡"}</Text>
      <Text style={styles.cardTitle}>{titulo || "Ação"}</Text>
      <Text style={styles.cardText}>
        Clique para abrir
      </Text>
    </TouchableOpacity>
  );
}
 
function ScheduleCard() {
  return (
    <View style={styles.scheduleCard}>
      <Text style={styles.scheduleDate}>
        31/05
      </Text>
 
      <View style={{ marginLeft: 15 }}>
        <Text style={styles.scheduleTeam}>
          Equipe João
        </Text>
 
        <Text>Rodonel</Text>
        <Text>km 31 - km 37</Text>
        <Text>Poda e manutenção</Text>
      </View>
    </View>
  );
}
 
// =====================
// STYLES
// =====================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  menu: {
    fontSize: 28,
    marginRight: 15,
    color: "#555",
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#ECECEC",
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "300",
    color: "#7A7A7A",
    marginBottom: 15,
    marginTop: 10,
  },
  actionCard: {
    width: 140,
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 15,
    marginRight: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E3E3E3",
  },
  flag: {
    fontSize: 24,
    marginBottom: 10,
  },
  cardTitle: {
    fontWeight: "600",
    marginTop: 5,
    textAlign: 'center'
  },
  cardText: {
    fontSize: 12,
    textAlign: "center",
    color: "#555",
  },
  teamCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#C4C4C4",
    marginRight: 12,
  },
  teamName: {
    fontWeight: "600",
  },
  teamInfo: {
    color: "#666",
    fontSize: 12,
  },
  statusBadge: {
    backgroundColor: "#D9A2A2",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: "#FFF",
    fontSize: 11,
  },
  scheduleCard: {
    flexDirection: "row",
    width: 250,
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 18,
    marginRight: 15,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  scheduleDate: {
    fontSize: 32,
    fontWeight: "300",
    color: "#444",
  },
  scheduleTeam: {
    fontWeight: "600",
  },
});
 