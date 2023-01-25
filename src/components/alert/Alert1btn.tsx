import {useEffect, useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import error from '../../@model/error';
import ModalCloseBtn from '../../assets/modalclosetbtn.svg';
const AlertCustom_1btn = ({setModalVisible, modalVisible, errorMsg}: any) => {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.signUpModalWrap}>
        <View style={styles.signUpModalView}>
          <View style={styles.signUpModalTop}>
            <View style={styles.signUpModalTopHead}>
              <TouchableOpacity
                style={styles.signUpModalTopHeadBtn}
                onPress={setModalVisible}>
                <Text style={styles.signUpModalTopHeadText}>X</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.signUpModalTopBody}>
              <Text style={styles.signUpModalTopBodyTitle}>title</Text>
              <Text style={styles.signUpModalTopBodyContent}>content</Text>
            </View>
          </View>
          <View style={styles.signUpModalBottom}>
            <TouchableOpacity
              style={styles.signUpModalBottomBtn}
              onPress={setModalVisible}>
              <Text style={styles.signUpModalBottomText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  // signUpModal
  signUpModalWrap: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba( 0, 0, 0, 0.5 )',
  },
  signUpModalView: {
    width: '80%',
    height: 200,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 15,
  },
  signUpModalTop: {height: '75%'},
  signUpModalTopHead: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  signUpModalTopHeadBtn: {
    backgroundColor: 'black',
    width: 33,
    height: 33,
    borderRadius: 100,
    marginTop: 10,
    marginRight: 10,
  },
  signUpModalTopHeadText: {
    color: 'white',
    fontSize: 20,
    lineHeight: 33,
    textAlign: 'center',
  },
  signUpModalTopBody: {
    display: 'flex',
    alignItems: 'center',
  },
  signUpModalTopBodyTitle: {
    color: '#292929',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 35,
    marginBottom: 10,
  },
  signUpModalTopBodyContent: {
    color: '#666666',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  signUpModalTopBodyCarNumber: {
    color: '#226EC8',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  signUpModalBottom: {
    display: 'flex',
    height: '25%',
    backgroundColor: '#73A2D9',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  signUpModalBottomBtn: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpModalBottomText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 20,
  },
});

export default AlertCustom_1btn;
