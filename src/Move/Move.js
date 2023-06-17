import React, {useState} from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faHome} from '@fortawesome/free-solid-svg-icons';

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

const IconContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 11%;
`;

const Back = styled.Pressable`
  justify-content: center;
  align-items: center;
  margin-left: 5%;
`;

const Home = styled.Pressable`
  justify-content: center;
  align-items: center;
  margin-right: 5%;
  margin-bottom: 1%;
`;

const Line = styled.View`
  height: 1px;
  background-color: black;
  opacity: 50;
`;

const Move = ({navigation}) => {
  const [state, setState] = useState(true);

  const goSearch = () => {
    return navigation.navigate('Search', 'Move');
  };

  const goWrite = () => {
    return navigation.navigate('Inspection', 'Move');
  };

  const BackPage = () => {
    if (state === false) {
      setState(current => {
        return !current;
      });
    } else {
      return navigation.navigate('Home');
    }
  };

  return (
    <>
      <IconContainer>
        <Back
          onPress={() => {
            BackPage();
          }}>
          <FontAwesomeIcon icon={faArrowLeft} size={22} />
        </Back>
        <Home
          onPress={() => {
            HomePage();
          }}>
          <FontAwesomeIcon icon={faHome} size={22} />
        </Home>
      </IconContainer>
      <Line />
      <Container>
        <StayContainer
          onPress={() => {
            goSearch();
          }}>
          <Button
            title="보고서 검색"
            color="black"
            onPress={() => {
              goSearch();
            }}
          />
        </StayContainer>
        <MoveContainer
          onPress={() => {
            goWrite();
          }}>
          <Button
            title="보고서 작성"
            color="white"
            onPress={() => {
              goWrite();
            }}
          />
        </MoveContainer>
      </Container>
    </>
  );
};

export default Move;
