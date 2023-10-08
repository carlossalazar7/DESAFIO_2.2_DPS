import React from 'react';
import {Text, View} from 'react-native';
import {styles} from "../utils/styles";
import {DataResult} from "./DataResult";

export default function Result(props) {
    const {nombre, apellidos, salario, renta, isss, afp, sueldoneto, errorMessage} = props;

    return (
        <View style={styles.content}>
                    <View style={styles.boxResult}>
                        <Text style={styles.title}>RESUMEN</Text>
                        <DataResult title="Nombre Completo: " value={`${nombre} ${apellidos}`}/>
                        <DataResult title="Salario Actual: " value={`$ ${salario} `}/>
                        <DataResult title="Renta: " value={`$ ${renta} `}/>
                        <DataResult title="ISSS: " value={`$ ${isss} `}/>
                        <DataResult title="AFP: " value={`$ ${afp} `}/>
                        <DataResult title="Salario Neto: " value={`$ ${sueldoneto} `}/>
                    </View>
            <View>
                <Text style={styles.error}>{errorMessage}</Text>
            </View>
        </View>
    );
}

