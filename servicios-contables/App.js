import React, {useEffect, useState} from 'react';
import {Alert, Modal, Pressable, SafeAreaView, StatusBar, Text, View} from 'react-native';
import Form from './src/components/Forms';
import Footer from './src/components/Footer';
import {styles} from './src/utils/styles';
import Result from './src/components/Result';
import AsyncStorage from '@react-native-community/async-storage'
import {DataResult} from "./src/components/DataResult";

export default function App() {
  const [nombre, setNombre] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [apellidos, setApellidos] = useState('');
  const [salario, setSalario] = useState(0);
  const [renta, setRenta] = useState(0);
  const [isss, setIsss] = useState(0);
  const [afp, setAfp] = useState(0);
  const [sueldoneto, setSueldoneto] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (nombre && apellidos && salario) calculate(); else reset();
  }, [nombre, apellidos, salario, renta, isss, afp, sueldoneto, usuarios]);

  const calculate = async () => {
    reset();
    if (nombre === '') {
      setErrorMessage('Ingrese sus nombres');
    } else if (apellidos === '') {
      setErrorMessage('Ingrese sus apellidos');
    } else if (salario <= 0) {
      setErrorMessage('Ingrese su salario');
    }else {
      //TODO: logica para calcular las deducciones generales

      // calcular renta
      if(salario <= 325 ){
        setRenta(0);
      }else if(salario > 325 && salario <= 700){
        setRenta(salario*0.15);
      }else if(salario > 700  && salario <= 1200){
        setRenta(salario*0.17);
      }else if(salario > 1200   && salario <= 2200){
        setRenta(salario*0.21);
      }else if(salario > 2200    && salario <= 3700){
        setRenta(salario*0.25);
      }else if(salario >= 3700){
        setRenta(salario*0.29);
      }

      //calcular isss
      setIsss(parseInt(salario*0.03));

      //calcular afp
      setAfp(parseInt(salario*0.0725));

      //sueldo neto
      setSueldoneto(parseInt(salario-renta-isss-afp));

      let indice = nombre.substring(0, 2).toLocaleUpperCase() + '-' + apellidos.substring(0, 2).toLocaleUpperCase();

      // AsyncStorage.clear();

      await AsyncStorage.setItem(indice, JSON.stringify({
        nombre: nombre,
        apellidos: apellidos,
        salario: salario,
        renta: renta,
        isss: isss,
        afp: afp,
        sueldoneto: sueldoneto
      }));

    }
  };
  const reset = () => {
    setErrorMessage('');
  };

  const verUsuarios = async () => {

    try {
      const keys = await AsyncStorage.getAllKeys();
      let users = []

      for (const key of keys) {
        const datos = await AsyncStorage.getItem(key);
        users.push(JSON.parse(datos))
      }
      setUsuarios(users);
      setModalVisible(true);

    } catch (error) {
      console.error(error)
    }
  }

  return (<>
    <StatusBar barStyle="light-content"/>
    <SafeAreaView style={styles.Header}>
      <Text style={styles.HeadApp}>Servicios Contables S.A. de C.V.</Text>
      <Form
          setApellidos={setApellidos}
          setNombre={setNombre}
          setSalario={setSalario}
          setRenta={setRenta}
          setIsss={setIsss}
          setAfp={setAfp}
          setSueldoneto={setSueldoneto}
      />
    </SafeAreaView>

    <Result
        nombre={nombre}
        apellidos={apellidos}
        salario={salario}
        errorMessage={errorMessage}
        renta={renta}
        isss={isss}
        afp={afp}
        sueldoneto={sueldoneto}/>
    <Footer
        verUsuarios={verUsuarios}
        calculate={calculate}/>

    <View style={styles.centeredView}>
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Usuarios</Text>
            <View>
              {usuarios.map((e) => <View
                  style={{margin: 2, backgroundColor: 'beige', borderWidth: 2, padding: 3}}>
                <DataResult title="Nombre " value={`${e.nombre}`}/>
                <DataResult title="Sueldo Neto " value={`$ ${e.sueldoneto}`}/>
              </View>)}
            </View>

            <Pressable
                style={[styles.buttonModal, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  </>);
}
