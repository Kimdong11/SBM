import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Alert, Keyboard, KeyboardAvoidingView} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faCamera} from '@fortawesome/free-solid-svg-icons';
import {faHome} from '@fortawesome/free-solid-svg-icons';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {faImage} from '@fortawesome/free-regular-svg-icons';
import {Modal} from 'react-native';

import {TouchableWithoutFeedback} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {API, graphqlOperation} from 'aws-amplify';
import {createSupervisor} from '../graphql/mutations';
import {createManager} from '../graphql/mutations';

const initialState = {
  name: '',
  date: '',
  place: '',
  problem: '',
  solved: '',
};

/* 여기는 스타일 컴포넌트*/

const ModalTest = styled.View`
  flex: 1;
  background-color: beige;
  justify-content: center;
  align-items: center;
`;

const PlaceModal = styled.ScrollView`
  flex: 1;
  background-color: aqua;
`;

const Texts = styled.Text``;

const Test = styled.View`
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.Button``;
const CloseButton2 = styled.Button``;

const ModalContainer = styled.ScrollView``;

const Container = styled.View`
  flex: 1;
`;

const FirstContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const MainContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const IconContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 11%;
`;

const ContentContainer = styled.View`
  justify-content: center;
  align-items: center;
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

const DateContainer = styled.View`
  width: 85%;
  height: 30px;
  justify-content: center;
  border: 1px solid black;
  border-radius: 30px;
  padding-left: 10%;
  margin-top: 3%;
`;

const SubmitContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const UploadIconConatainer = styled.View``;

const PlaceTouchable = styled.TouchableOpacity`
  width: 85%;
  height: 30px;
  justify-content: center;
  border: 1px solid black;
  border-radius: 30px;
  padding-left: 10%;
  margin-top: 3%;
`;

const PlaceText = styled.Text`
  color: black;
  font-size: 24px;
`;

const Line = styled.View`
  height: 1px;
  background-color: black;
  opacity: 50;
`;

const Submit = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 40px;
  border: 1px solid black;
  border-radius: 20px;
  background-color: #e4ae3d;
`;

const TextInput = styled.TextInput`
  width: 220px;
  height: 45px;
  border: 1px solid black;
  border-radius: 30px;
  margin-top: 5px;
  padding-left: 20px;
  margin-bottom: 20px;
`;

const Content = styled.TextInput`
  width: 85%;
  height: 120px;
  border: 1px solid black;
  border-radius: 30px;
  margin-top: 5px;
  padding-left: 20px;
  margin-bottom: 20px;
  padding-top: 3%;
  padding-right: 4.5%;
`;

const Button = styled.Button``;

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

const UploadImage = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const Icons = styled.Pressable`
  justify-content: center;
  align-items: center;
`;

const ProbImage = styled.Image`
  width: 100px;
  height: 100px;
`;

const SolvedImage = styled.Image`
  width: 100px;
  height: 100px;
`;

const Text = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-top: 4%;
  margin-left: 10%;
`;

const SubmitText = styled.Text`
  font-size: 16px;
  color: black;
`;

const Name = styled.Text``;

const Dates = styled.Text``;

const FileName = styled.Text`
  font-size: 10px;
`;

const ImageView = styled.ScrollView`
  max-width: 200px;
  height: 20px;
  margin-left: -30px;
  margin-right: -30px;
  border: 1px solid black;
  border-radius: 10px;
  padding-left: 10px;
`;

/* 여기부터 렌더링 파트*/

const Inspection = ({navigation, route}) => {
  const [name, setName] = useState(false);
  const [place, setPlace] = useState(false);

  const [keyword, setKeyWord] = useState('');

  const [state, setState] = useState(true);

  const [worker, setWorker] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [placeModalVisivle, setPlaceModalVisible] = useState(false);

  const [probResponse, setProbResponse] = useState('없음');
  const [solvedResponse, setSolvedResponse] = useState('없음');
  const [imageState, setImageState] = useState(false);

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [placeData, setPlaceData] = useState([
    '마이온홈 곽지',
    '마이온홈 귀덕',
    '마이온홈 애월',
    '모호 in 표선',
    '하버하우스웨스트',
  ]);

  const [formState, setFormState] = useState(initialState);
  const [todos, setTodos] = useState([]);

  function setInput(key, value) {
    setFormState({...formState, [key]: value});
  }

  // const nav = () => {
  //   return navigation.navigate('Inspection');
  // };

  const today = new Date();

  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  const time = today.toLocaleTimeString();

  useEffect(() => {
    return setWorker(route.params);
  }, []);

  useEffect(() => {
    return setInput('name', keyword);
  }, [placeModalVisivle]);

  useEffect(() => {
    return setInput('place', selectedPlace);
  }, [selectedPlace]);

  useEffect(() => {
    return setInput('date', `${year}-${month}-${day}`);
  }, []);

  const onProbSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === 'android',
        selectionLimit: 0,
      },
      res => {
        if (res.didCancel) return;
        setProbResponse(res);
      },
    );
  };

  const onProbSelectCamera = async () => {
    await launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
      },
      res => {
        console.log('카메라');
        if (res.didCancel) return null;
        else {
          console.log(res);
          // const localUri = res.assets[0].uri;
          // const uriPath = localUri.split('//').pop();
          // const imageName = localUri.split('/').pop();
          // setProbResponse('file://' + uriPath);
        }
      },
    );
  };

  const onSolvedSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === 'android',
        selectionLimit: 0,
      },
      res => {
        if (res.didCancel) return;
        setSolvedResponse(res);
      },
    );
  };

  const clickedButton = keyword => {
    setModalVisible(current => {
      return !current;
    });

    if (keyword == 'prob') {
      return setImageState(true);
    } else {
      return setImageState(false);
    }
  };

  const closeButton = () => {
    return setModalVisible(current => {
      return !current;
    });
  };

  const closeButton2 = () => {
    return setPlaceModalVisible(!placeModalVisivle);
  };

  const clickedPlace = a => {
    setInput('name');
    setInput('place', selectedPlace);
    setSelectedPlace(current => {
      return (current = a);
    });
    return closeButton2();
  };

  const checkName = () => {
    if (keyword !== '') {
      setState(current => {
        return !current;
      });
    } else {
      Alert.alert('이름을 입력해주세요');
    }
  };

  const checkContents = () => {
    Alert.alert('보고서가 등록되었습니다!');
    return navigation.navigate('Home');
  };

  const BackPage = () => {
    if (state === false) {
      setState(current => {
        return !current;
      });
    } else {
      return navigation.navigate(route.params);
    }
  };

  const HomePage = () => {
    return navigation.navigate('Home');
  };

  const goTest = () => {
    return navigation.navigate('Test');
  };

  return (
    <>
      {state ? (
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
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <FirstContainer>
              <TextInput
                placeholder={
                  worker == 'Stay'
                    ? '관리인의 이름을 입력해 주세요'
                    : '점검자의 이름을 입력해 주세요'
                }
                value={keyword}
                onChangeText={text => {
                  setKeyWord(text);
                }}></TextInput>
              <Button
                title="확인"
                color="black"
                onPress={() => {
                  checkName();
                }}></Button>
            </FirstContainer>
          </TouchableWithoutFeedback>
        </>
      ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Container>
            <IconContainer>
              <Back
                onPress={() => {
                  BackPage();
                }}>
                <FontAwesomeIcon icon={faArrowLeft} size={26} />
              </Back>
              <Home
                onPress={() => {
                  HomePage();
                }}>
                <FontAwesomeIcon icon={faHome} size={24} />
              </Home>
            </IconContainer>
            <Line />
            <KeyboardAwareScrollView>
              <Text>작성자</Text>
              <MainContainer>
                <NameContainer>
                  <Name>{keyword}</Name>
                </NameContainer>
              </MainContainer>
              <Text>일시</Text>
              <MainContainer>
                <DateContainer>
                  <Dates>
                    {year +
                      '-' +
                      month +
                      '-' +
                      day +
                      '                 ' +
                      time}
                  </Dates>
                </DateContainer>
              </MainContainer>
              <Text>장소</Text>
              <MainContainer>
                {selectedPlace === null ? (
                  <Button
                    title="장소 선택"
                    onPress={() => {
                      setPlaceModalVisible(!placeModalVisivle);
                    }}></Button>
                ) : (
                  <PlaceTouchable
                    onPress={() => {
                      setPlaceModalVisible(!placeModalVisivle);
                    }}>
                    <Dates>{selectedPlace}</Dates>
                  </PlaceTouchable>
                )}
              </MainContainer>
              <Text>문제</Text>
              <ContentContainer>
                <Content
                  multiline={true}
                  onChangeText={value => {
                    return setInput('problem', value);
                  }}
                  value={formState.problem}
                />
              </ContentContainer>
              <UploadIconConatainer>
                <UploadImage>
                  <Icons onPress={onProbSelectImage}>
                    <FontAwesomeIcon icon={faImage} size={30} />
                  </Icons>
                  <Icons
                    onPress={() => {
                      return clickedButton('prob');
                    }}>
                    {probResponse === '없음' ? null : (
                      <ImageView>
                        {probResponse.assets.map(images => {
                          return (
                            <FileName key={images.id}>
                              {images.fileName}
                            </FileName>
                          );
                        })}
                      </ImageView>
                    )}
                  </Icons>
                  <Icons onPress={onProbSelectCamera}>
                    <FontAwesomeIcon icon={faCamera} size={30} />
                  </Icons>
                </UploadImage>
              </UploadIconConatainer>
              <Text>해결</Text>
              <ContentContainer>
                <Content
                  multiline={true}
                  onChangeText={value => {
                    return setInput('solved', value);
                  }}
                  value={formState.solved}
                />
              </ContentContainer>
              <UploadIconConatainer>
                <UploadImage>
                  <Icons onPress={onSolvedSelectImage}>
                    <FontAwesomeIcon icon={faImage} size={30} />
                  </Icons>
                  <Icons
                    onPress={() => {
                      return clickedButton('solved');
                    }}>
                    {solvedResponse === '없음' ? null : (
                      <ImageView>
                        {solvedResponse.assets.map(images => {
                          return (
                            <FileName key={images.fileName}>
                              {images.fileName}
                            </FileName>
                          );
                        })}
                      </ImageView>
                    )}
                  </Icons>
                  <Icons onPress={onProbSelectCamera}>
                    <FontAwesomeIcon icon={faCamera} size={30} />
                  </Icons>
                </UploadImage>
              </UploadIconConatainer>
              <SubmitContainer>
                <Submit>
                  <SubmitText
                    onPress={async () => {
                      if (route.params === 'Stay') {
                        try {
                          if (!formState.problem || !formState.solved)
                            return null;
                          const todo = {...formState};
                          setTodos([...todos, todo]);
                          setFormState(initialState);
                          console.log(todo);
                          await API.graphql(
                            graphqlOperation(createManager, {input: todo}),
                          );

                          return checkContents();
                        } catch (err) {
                          console.log('error creating todo:', err);
                        }
                      } else
                        try {
                          if (!formState.problem || !formState.solved)
                            return null;

                          const todo = {...formState};
                          setTodos([...todos, todo]);
                          setFormState(initialState);
                          console.log(todo);
                          await API.graphql(
                            graphqlOperation(createSupervisor, {input: todo}),
                          );

                          return checkContents();
                        } catch (err) {
                          console.log('error creating todo:', err);
                        }
                    }}>
                    확인
                  </SubmitText>
                </Submit>
              </SubmitContainer>
            </KeyboardAwareScrollView>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              // presentationStyle="overFullScreen"
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <ModalTest>
                {imageState == true ? (
                  probResponse === '없음' ? null : (
                    <Test>
                      {probResponse.assets.map(images => {
                        return (
                          <ProbImage
                            source={{uri: images.uri}}
                            key={images.fileName}
                          />
                        );
                      })}
                    </Test>
                  )
                ) : solvedResponse === '없음' ? null : (
                  <Test>
                    {solvedResponse.assets.map(images => {
                      return (
                        <SolvedImage
                          source={{uri: images.uri}}
                          key={images.fileName}
                        />
                      );
                    })}
                  </Test>
                )}
                <CloseButton title="닫기" onPress={closeButton}></CloseButton>
              </ModalTest>
            </Modal>
          </Container>
        </TouchableWithoutFeedback>
      )}
      <Modal
        animationType="slide"
        //transparent={true}
        visible={placeModalVisivle}
        presentationStyle="formSheet"
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setPlaceModalVisible(!placeModalVisivle);
        }}>
        <PlaceModal>
          {placeData.map((item, index) => {
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
          <CloseButton2 title="닫기" onPress={closeButton2}></CloseButton2>
        </PlaceModal>
      </Modal>
    </>
  );
};

export default Inspection;
