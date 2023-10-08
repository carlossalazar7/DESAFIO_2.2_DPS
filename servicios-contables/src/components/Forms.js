import React from 'react';
import {TextInput, View} from 'react-native';
import {styles} from "../utils/styles";

export default function Form(props) {
    const {setNombre, setApellidos, setSalario} = props;
    return (
        <View style={styles.viewForm}>
            <View style={styles.viewInputs}>
                <TextInput
                    placeholder="Ingrese nombre"
                    keyboardType="default"
                    style={styles.input}
                    onChange={(e) => setNombre(e.nativeEvent.text)}
                />
                <TextInput
                    placeholder="Ingrese apellido"
                    keyboardType="default"
                    style={styles.input}
                    onChange={(e) => setApellidos(e.nativeEvent.text)}
                />
            </View>

            <View style={styles.viewInputs}>
                <TextInput
                    placeholder="Sueldo Mensual"
                    keyboardType="numeric"
                    style={styles.input}
                    onChange={(e) => setSalario(e.nativeEvent.text)}
                />
            </View>
        </View>

    );
}