import { View, Text, TouchableOpacity } from "react-native";
import { Ocorrencia } from "../interfaces/Ocorrencias";
import React from "react";

type Props = {
  ocorrencia: Ocorrencia;
  onPress: () => void;
};

export default function OcorrenciaCard({
  ocorrencia,
  onPress,
}: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          padding: 15,
          borderWidth: 1,
          marginBottom: 10,
          borderRadius: 8,
        }}
      >
        <Text>{ocorrencia.descricao}</Text>
        <Text>{ocorrencia.local}</Text>
        <Text>Risco: {ocorrencia.risco}</Text>
      </View>
    </TouchableOpacity>
  );
}