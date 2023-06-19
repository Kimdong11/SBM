import React, {useEffect, useState} from 'react';
import {API, Amplify, graphqlOperation, Auth, Storage} from 'aws-amplify';
import {listSupervisors} from '../graphql/queries';
import {listManagers} from '../graphql/queries';
import styled from 'styled-components';
import {Alert, Modal} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Image} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import {useWindowDimensions} from 'react-native';

import awsmobile from '../aws-exports';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faHome} from '@fortawesome/free-solid-svg-icons';

const sbmUri =
  'https://sbm99ddee2e11634e04a84bbed0bb697c34164633-sbmdev.s3.ap-northeast-2.amazonaws.com/public/';

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

Amplify.configure(awsmobile);

const ModalMainContainer = styled.View`
  flex: 1;
`;

const ModalDataContainer = styled.View``;

const Container = styled.View`
  flex: 1;
`;
const ImageModalContainer = styled.View`
  flex: 1;
`;

const ImageViewContainer = styled.ScrollView``;

const PlaceMainContainer = styled.View`
  justify-content: center;
`;

const MainContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 6%;
`;

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ScrollView = styled.ScrollView``;

const Context = styled.TouchableOpacity`
  margin-top: 30px;
  width: 90%;
  height: 100px;
  border: 1px solid gray;
`;

const PlaceModal = styled.ScrollView`
  flex: 1;
`;

const DataContainer = styled.View`
  margin-top: 50px;
  justify-content: center;
  align-items: center;
`;

const PlaceTouchableContainer = styled.View`
  width: 100%;
  align-items: center;
  margin-bottom: 10%;
`;

const PlaceTouchable = styled.TouchableOpacity`
  width: 85%;
  height: 30px;
  justify-content: center;
  border: 1px solid black;
  border-radius: 30px;
  padding-left: 10%;
  margin-top: 5%;
`;

const PlaceText = styled.Text`
  color: black;
  font-size: 24px;
`;

const Text = styled.Text`
  color: black;
  font-size: 24px;
`;

const Te = styled.Text`
  font-size: 16px;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
  margin-top: 25px;
`;

const DataTextContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 20px;
`;

const DataText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  margin-left: 20px;
`;

const TitleText = styled.Text`
  font-size: 16px;
  font-weight: 900;
  margin-right: 28px;
`;

const Dates = styled.Text``;

const Pressable = styled.Pressable`
  width: 100px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 10px;
`;

const ButtonContainer = styled.View`
  margin-bottom: 10%;
`;

const Button = styled.Button``;

const CloseButton2 = styled.Button``;

const PlaceContainer = styled.View`
  width: 85%;
  height: 30px;
  justify-content: center;
  border: 1px solid black;
  border-radius: 30px;
  padding-left: 10%;
  margin-top: 3%;
`;

const NameContainer = styled.View`
  width: 85%;
  height: 30px;
  border: 1px solid black;
  justify-content: center;
  border-radius: 30px;
  padding-left: 10%;
  margin-top: 3%;
`;

const ContentsContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const DateContainer = styled.View`
  width: 85%;
  height: 30px;
  justify-content: center;
  border: 1px solid black;
  border-radius: 30px;
  padding-left: 10%;
  margin-top: 3%;
`;

const ProblemContainer = styled.ScrollView`
  width: 85%;
  height: 120px;
  border: 1px solid black;
  border-radius: 30px;
  margin-top: 15px;
  padding-left: 20px;
  margin-bottom: 20px;
  padding-top: 3%;
  padding-right: 4.5%;
`;

const SolvedContainer = styled.ScrollView`
  width: 85%;
  height: 120px;
  border: 1px solid black;
  border-radius: 30px;
  margin-top: 15px;
  padding-left: 20px;
  margin-bottom: 20px;
  padding-top: 3%;
  padding-right: 4.5%;
`;

const NameTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  margin-top: 20px;
  margin-left: 8%;
`;
const DateTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  margin-top: 20px;
  margin-left: 8%;
`;
const PlaceTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  margin-top: 20px;
  margin-left: 8%;
`;
const ProblemTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  margin-top: 20px;
  margin-left: 8%;
`;
const SolvedTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  margin-top: 20px;
  margin-left: 8%;
`;

const Name = styled.Text``;
const DateText = styled.Text``;
const Place = styled.Text``;
const Problem = styled.Text``;
const Solved = styled.Text``;

const ImageButtonContainer = styled.View`
  margin-top: -20px;
`;
const CloseButtonContainer = styled.View`
  margin-top: 20px;
`;

const ImageButton = styled.Button``;

const ImageContainer = styled.View``;

// const Image = styled.Image`
//   width: 66px;
//   height: 66px;
// `;

const Search = ({navigation, route}) => {
  const {width} = useWindowDimensions();

  const [state, setState] = useState(true);
  const [datas, setDatas] = useState(null);
  const [selectedData, setSelctedData] = useState(null);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [probImageData, setProbImageData] = useState([]);
  const [solvedImageData, setSolvedImageData] = useState([]);
  const [getProbImage, setGetProbImage] = useState([]);
  const [getSolvedImage, setGetSolvedImage] = useState([]);

  const [placeModalVisivle, setPlaceModalVisible] = useState(false);
  const [dataModalVisible, setDataModalVisible] = useState(false);
  const [probImageModalVisible, setProbImageModalVisible] = useState(false);
  const [solvedImageModalVisible, setSolvedImageModalVisible] = useState(false);

  const [selectedPlaces, setSelectedPlaces] = useState(null);
  const [placeDatas, setPlaceDatas] = useState([
    '마이온홈 곽지',
    '마이온홈 귀덕',
    '마이온홈 애월',
    '모호 in 표선',
    '하버하우스웨스트',
  ]);

  const BackPage = () => {
    if (state === false) {
      setState(current => {
        return !current;
      });
    } else {
      return navigation.navigate(route.params);
    }
  };

  const searchDataDatePlace = async (date, place) => {
    if (route.params === 'Stay') {
      try {
        const todoData = await API.graphql(
          graphqlOperation(listManagers, {
            filter: {date: {contains: date}, and: {place: {eq: place}}},
          }),
        );
        const datas = todoData.data.listManagers.items;
        if (datas[0].probimage !== '') {
          const prob = JSON.parse(datas[0].probimage);
          setProbImageData(prob);
        } else if (datas[0].solvedimage !== '') {
          const solved = JSON.parse(datas[0].solvedimage);
          setSolvedImageData(solved);
        }
        if (datas.length === 0) return Alert.alert('검색 결과가 없습니다!');
        setDatas(datas);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const todoData = await API.graphql(
          graphqlOperation(listSupervisors, {
            filter: {date: {contains: date}, and: {place: {eq: place}}},
          }),
        );
        const datas = todoData.data.listSupervisors.items;
        if (datas[0].probimage !== '') {
          const prob = JSON.parse(datas[0].probimage);
          setProbImageData(prob);
        } else if (datas[0].solvedimage !== '') {
          const solved = JSON.parse(datas[0].solvedimage);
          setSolvedImageData(solved);
        }
        if (datas.length === 0) return Alert.alert('검색 결과가 없습니다!');
        setDatas(datas);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const searchDataDate = async date => {
    if (route.params === 'Stay') {
      try {
        const todoData = await API.graphql(
          graphqlOperation(listManagers, {
            filter: {date: {contains: date}},
          }),
        );
        const datas = todoData.data.listManagers.items;
        const prob = JSON.parse(datas[0].probimage);
        const solved = JSON.parse(datas[0].solvedimage);
        if (datas.length === 0) return Alert.alert('검색 결과가 없습니다!');
        setDatas(datas);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const todoData = await API.graphql(
          graphqlOperation(listSupervisors, {
            filter: {date: {contains: date}},
          }),
        );
        const datas = todoData.data.listSupervisors.items;
        if (datas[0].probimage !== '') {
          const prob = JSON.parse(datas[0].probimage);
          setProbImageData(prob);
        } else if (datas[0].solvedimage !== '') {
          const solved = JSON.parse(datas[0].solvedimage);
          setSolvedImageData(solved);
        }
        if (datas.length === 0) return Alert.alert('검색 결과가 없습니다!');
        setDatas(datas);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const searchDataPlace = async place => {
    if (route.params === 'Stay') {
      try {
        const todoData = await API.graphql(
          graphqlOperation(listManagers, {
            filter: {place: {eq: place}},
          }),
        );
        const datas = todoData.data.listManagers.items;
        if (datas[0].probimage !== '') {
          const prob = JSON.parse(datas[0].probimage);
          setProbImageData(prob);
        } else if (datas[0].solvedimage !== '') {
          const solved = JSON.parse(datas[0].solvedimage);
          setSolvedImageData(solved);
        }
        if (datas.length === 0) return Alert.alert('검색 결과가 없습니다!');
        setDatas(datas);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const todoData = await API.graphql(
          graphqlOperation(listSupervisors, {
            filter: {place: {eq: place}},
          }),
        );
        const datas = todoData.data.listSupervisors.items;
        if (datas[0].probimage !== '') {
          const prob = JSON.parse(datas[0].probimage);
          setProbImageData(prob);
        } else if (datas[0].solvedimage !== '') {
          const solved = JSON.parse(datas[0].solvedimage);
          setSolvedImageData(solved);
        }

        if (datas.length === 0) return Alert.alert('검색 결과가 없습니다!');
        setDatas(datas);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const HomePage = () => {
    return navigation.navigate('Home');
  };

  const clickedPlace = a => {
    setSelectedPlaces(current => {
      return (current = a);
    });
    return closeButton2();
  };

  const closeButton = () => {
    return setDataModalVisible(!dataModalVisible);
  };

  const closeButton2 = () => {
    return setPlaceModalVisible(!placeModalVisivle);
  };

  // const getImage = async () => {
  //   probImageData.map(async uri => {
  //     const image = await Storage.get(uri);
  //     return setGetProbImage([...getProbImage, image]);
  //   });
  //   console.log(probImageData[0].uri);
  // };

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
        {datas === null ? (
          <View>
            {selectedPlaces === null ? (
              <ButtonContainer>
                <Button
                  title="장소 선택"
                  onPress={() => {
                    setPlaceModalVisible(!placeModalVisivle);
                  }}></Button>
              </ButtonContainer>
            ) : (
              <PlaceTouchableContainer>
                <PlaceTouchable
                  onPress={() => setPlaceModalVisible(!placeModalVisivle)}>
                  <Dates>{selectedPlaces}</Dates>
                </PlaceTouchable>
              </PlaceTouchableContainer>
            )}
            {selectedDate === null ? (
              <ButtonContainer>
                <Button
                  title="날짜 선택"
                  onPress={() => {
                    setOpen(!open);
                  }}></Button>
              </ButtonContainer>
            ) : (
              <PlaceTouchableContainer>
                <PlaceTouchable
                  onPress={() => {
                    setOpen(!open);
                  }}>
                  <Dates>{selectedDate}</Dates>
                </PlaceTouchable>
              </PlaceTouchableContainer>
            )}
            <Pressable
              onPress={() => {
                if (selectedDate !== null && selectedPlaces !== null) {
                  return searchDataDatePlace(selectedDate, selectedPlaces);
                }

                if (selectedPlaces !== null) {
                  return searchDataPlace(selectedPlaces);
                }

                if (selectedDate !== null) {
                  return searchDataDate(selectedDate);
                }
              }}>
              <Te>검색하기</Te>
            </Pressable>
          </View>
        ) : (
          <ScrollView>
            <DataContainer>
              {datas.map(item => {
                return (
                  <Context
                    key={item.id}
                    onPress={() => {
                      setSelctedData(item);
                      return setDataModalVisible(!dataModalVisible);
                    }}>
                    <TitleContainer>
                      <TitleText>보고자</TitleText>
                      <TitleText>날짜</TitleText>
                      <TitleText>장소</TitleText>
                    </TitleContainer>
                    <DataTextContainer>
                      <DataText>{item.name}</DataText>
                      <DataText>{item.date}</DataText>
                      <DataText>{item.place}</DataText>
                    </DataTextContainer>
                  </Context>
                );
              })}
            </DataContainer>
          </ScrollView>
        )}
      </Container>
      <Modal
        animationType="slide"
        //transparent={true}
        visible={placeModalVisivle}
        presentationStyle="formSheet"
        onRequestClose={() => {
          //   Alert.alert('Modal has been closed.');
          setPlaceModalVisible(!placeModalVisivle);
        }}>
        <PlaceModal>
          <PlaceMainContainer>
            {placeDatas.map((item, index) => {
              return (
                <MainContainer key={index}>
                  <PlaceTouchable
                    onPress={() => {
                      clickedPlace(item);
                    }}>
                    <PlaceText>{item}</PlaceText>
                  </PlaceTouchable>
                </MainContainer>
              );
            })}
            <CloseButtonContainer></CloseButtonContainer>
          </PlaceMainContainer>
        </PlaceModal>
      </Modal>
      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={date => {
          setOpen(false);

          const month = date.getMonth() + 1;
          const day = date.getDate();

          const dates = `${month}-${day}`;

          setSelectedDate(dates);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <Modal
        animationType="slide"
        //transparent={true}
        visible={dataModalVisible}
        presentationStyle="formSheet"
        onRequestClose={() => {
          //   Alert.alert('Modal has been closed.');
          closeButton();
        }}>
        {selectedData === null ? null : (
          <ModalMainContainer>
            <ModalDataContainer>
              <NameTitle>이름</NameTitle>
              <ContentsContainer>
                <NameContainer>
                  <Name>{selectedData.name}</Name>
                </NameContainer>
              </ContentsContainer>
              <DateTitle>날짜</DateTitle>
              <ContentsContainer>
                <DateContainer>
                  <DateText>{selectedData.date}</DateText>
                </DateContainer>
              </ContentsContainer>
              <PlaceTitle>장소</PlaceTitle>
              <ContentsContainer>
                <PlaceContainer>
                  <Place>{selectedData.place}</Place>
                </PlaceContainer>
              </ContentsContainer>
              <ProblemTitle>문제</ProblemTitle>
              <ContentsContainer>
                <ProblemContainer>
                  <Problem>{selectedData.problem}</Problem>
                </ProblemContainer>
                <ImageButtonContainer>
                  <ImageButton
                    title="문제 이미지 보기"
                    color="green"
                    onPress={() => {
                      setDataModalVisible(!dataModalVisible);
                      setProbImageModalVisible(!probImageModalVisible);
                    }}></ImageButton>
                </ImageButtonContainer>
              </ContentsContainer>
              <SolvedTitle>해결</SolvedTitle>
              <ContentsContainer>
                <SolvedContainer>
                  <Solved>{selectedData.solved}</Solved>
                </SolvedContainer>
                <ImageButtonContainer>
                  <ImageButton
                    title="해결 이미지 보기"
                    color="green"
                    onPress={() => {
                      setDataModalVisible(!dataModalVisible);
                      setSolvedImageModalVisible(!solvedImageModalVisible);
                    }}></ImageButton>
                </ImageButtonContainer>
              </ContentsContainer>
            </ModalDataContainer>
            <CloseButtonContainer></CloseButtonContainer>
          </ModalMainContainer>
        )}
      </Modal>
      <Modal
        animationType="fade"
        //transparent={true}
        visible={probImageModalVisible}
        presentationStyle="pageSheet"
        onRequestClose={() => {
          //   Alert.alert('Modal has been closed.');
          setDataModalVisible(!dataModalVisible);
          setProbImageModalVisible(!probImageModalVisible);
        }}>
        <ImageModalContainer>
          <ImageViewContainer>
            {probImageData.map(image => {
              return (
                <ImageContainer key={image.fileName}>
                  <AutoHeightImage
                    width={width}
                    source={{uri: `${sbmUri}${image.uri}`}}
                  />
                </ImageContainer>
              );
            })}
          </ImageViewContainer>
        </ImageModalContainer>
      </Modal>
      <Modal
        animationType="none"
        //transparent={true}
        visible={solvedImageModalVisible}
        presentationStyle="pageSheet"
        onRequestClose={() => {
          //   Alert.alert('Modal has been closed.');
          setDataModalVisible(!dataModalVisible);
          setSolvedImageModalVisible(!solvedImageModalVisible);
        }}>
        <ImageModalContainer>
          <ImageViewContainer>
            {solvedImageData.map(image => {
              return (
                <ImageContainer key={image.fileName}>
                  <AutoHeightImage
                    width={width}
                    source={{uri: `${sbmUri}${image.uri}`}}
                  />
                </ImageContainer>
              );
            })}
          </ImageViewContainer>
        </ImageModalContainer>
      </Modal>
    </>
  );
};

export default Search;
