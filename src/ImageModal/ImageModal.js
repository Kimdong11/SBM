import React, {useState} from 'react';
import styled from 'styled-components';
import {Modal} from 'react-native';
import Inspection from '../Inspection/Inspection';

const ModalTest = styled.View`
  flex: 1;
  background-color: beige;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

const Test = styled.View`
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.Button``;

const ModalContainer = styled.ScrollView``;

export const ImageModal = ({navigation, boolean, setModal}) => {
  const [modalVisible, setModalVisible] = useState(false);
  useState(() => {
    setModalVisible(boolean);
  });

  const clickedButton = () => {
    setModalVisible(current => {
      return !current;
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      // presentationStyle="overFullScreen"
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <ModalTest>
        <CloseButton title="닫기" onPress={clickedButton}></CloseButton>
      </ModalTest>
    </Modal>
  );
};
