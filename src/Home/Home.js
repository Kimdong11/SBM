import React, {useState} from 'react';
import {Alert} from 'react-native';
import styled from 'styled-components';
import {Amplify, Storage} from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);
// #0A7E56,#E4AE3D

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  position: absolute;
`;

const StayContainer = styled.TouchableOpacity`
  width: 100%;
  height: 200px;
  justify-content: center;
  align-items: center;
  margin-bottom: 5%;
  background-color: #0a7e56;
`;

const MoveContainer = styled.TouchableOpacity`
  width: 100%;
  height: 200px;
  justify-content: center;
  align-items: center;
  margin-bottom: 5%;
  background-color: #e4ae3d;
`;

const Button = styled.Button`
  width: fit-content;
  height: fit-content;
`;

const TestButton = styled.Button``;

const Home = ({navigation}) => {
  const goStay = () => {
    return navigation.navigate('Stay');
  };

  const goMove = () => {
    return navigation.navigate('Move');
  };

  const result = async () => {
    await Storage.put('text.txt', 'Hello', {
      progressCallback(progress) {
        console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
      },
    });
  };
  return (
    <Container>
      <StayContainer
        onPress={() => {
          goStay();
        }}>
        <Button
          title="STAY"
          color="black"
          onPress={() => {
            goStay();
          }}
        />
      </StayContainer>
      <MoveContainer
        onPress={() => {
          goMove();
        }}>
        <Button
          title="MOVE"
          color="white"
          onPress={() => {
            goMove();
          }}
        />
      </MoveContainer>
    </Container>
  );
};

export default Home;
