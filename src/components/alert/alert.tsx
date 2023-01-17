import {useEffect, useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ModalCloseBtn from '../../assets/modalclosetbtn.svg';
const AlertCustom = ({setModalVisible, modalVisible}: any) => {
  //   const [modalVisible, setModalVisible] = useState(false);
  console.log(setModalVisible, modalVisible);
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
            }}
            style={{width: '100%'}}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={{justifyContent: 'flex-end', marginLeft: '80%'}}
                onPress={() => {
                  setModalVisible(false);
                }}>
                <ModalCloseBtn></ModalCloseBtn>
              </TouchableOpacity>
              <Text style={styles.modalText1}>오류</Text>
              <Text style={styles.modalText2}>잘못된 접근</Text>

              <View style={styles.modalBtn}>
                <Text style={styles.modalText4}>확인</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba( 0, 0, 0, 0.5 )',
  },
  modalContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    marginLeft: '10%',
    borderRadius: 20,
  },
  modalText1: {
    fontSize: 20,
    color: 'black',
    fontWeight: '700',
    marginTop: '1%',
    fontFamily: 'Noto Sans',
  },
  modalText2: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
    marginTop: '1%',
    fontFamily: 'Noto Sans',
  },
  modalText3: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
    fontFamily: 'Noto Sans',
  },
  modalText4: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '500',

    fontFamily: 'Noto Sans',
  },
  modalBtn: {
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    backgroundColor: 'black',
    width: '100%',
    marginTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '25%',

    marginBottom: '-10%',
  },
});

export default AlertCustom;
