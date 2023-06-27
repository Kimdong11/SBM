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

import {API, graphqlOperation, Storage} from 'aws-amplify';
import {createSupervisor} from '../graphql/mutations';
import {createManager} from '../graphql/mutations';

import AutoHeightImage from 'react-native-auto-height-image';
import {useWindowDimensions} from 'react-native';

const initialState = {
  name: '',
  date: '',
  place: '',
  problem: '',
  solved: '',
  probimage: '',
  solvedimage: '',
};

/* 여기는 스타일 컴포넌트*/

const ModalTest = styled.View`
  flex: 1;
`;

const ModalTest2 = styled.ScrollView``;

const PlaceModal = styled.ScrollView`
  flex: 1;
`;

const Texts = styled.Text``;

const Test = styled.View``;

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
  margin-top: 20px;
`;

const UploadIconConatainer = styled.View``;

const PlaceTouchable = styled.TouchableOpacity`
  width: 85%;
  height: 30px;
  justify-content: center;
  border: 1px solid black;
  border-radius: 30px;
  padding-left: 10%;
  margin-top: 10%;
`;

const PlaceTouchable2 = styled.TouchableOpacity`
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
  width: 25%;
  height: 50px;
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

const SolvedImage = styled.Image``;

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

const TextContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 2%;
`;

const StateText = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;

/* 여기부터 렌더링 파트*/

const Inspection = ({navigation, route}) => {
  const {width} = useWindowDimensions();

  const [keyword, setKeyWord] = useState('');

  const [state, setState] = useState(true);

  const [worker, setWorker] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [placeModalVisivle, setPlaceModalVisible] = useState(false);

  const [probResponse, setProbResponse] = useState('');
  const [solvedResponse, setSolvedResponse] = useState('');
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
        includeBase64: Platform.OS === 'android',
        selectionLimit: 0,
      },
      res => {
        if (res.didCancel) return null;
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
        includeBase64: Platform.OS === 'android',
        selectionLimit: 0,
      },
      res => {
        if (res.didCancel) return null;

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
    return setModalVisible(!modalVisible);
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

  const fetchResourceFromURI = async (uri, state) => {
    if (state === 'prob') {
      const response = await fetch(uri);
      const blob = await response.blob();
      return blob;
    } else {
      const response = await fetch(uri);
      const blob = await response.blob();
      return blob;
    }
  };

  const result = async (uri, state) => {
    const img = await fetchResourceFromURI(uri, state);

    await Storage.put(uri, img, {
      level: 'public',
      contentType: img.type,
    });
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
            <TextContainer>
              <StateText>{route.params}</StateText>
            </TextContainer>
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
              <TextContainer>
                <StateText>{route.params}</StateText>
              </TextContainer>
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
                  <PlaceTouchable2
                    onPress={() => {
                      setPlaceModalVisible(!placeModalVisivle);
                    }}>
                    <Dates>{selectedPlace}</Dates>
                  </PlaceTouchable2>
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
                    {probResponse.length === 0 ? null : (
                      <ImageView>
                        {probResponse.assets.map((images, index) => {
                          return (
                            <FileName key={index}>{images.fileName}</FileName>
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
                    {solvedResponse.length === 0 ? null : (
                      <ImageView>
                        {solvedResponse.assets.map((images, index) => {
                          return (
                            <FileName key={index}>{images.fileName}</FileName>
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
                <Submit
                  onPress={async () => {
                    if (route.params === 'Stay') {
                      try {
                        if (!formState.problem || !formState.solved)
                          return null;

                        if (
                          probResponse.length !== 0 &&
                          solvedResponse.length === 0
                        ) {
                          const prob = JSON.stringify(probResponse.assets);
                          const todo = {
                            ...formState,
                            probimage: prob,
                            solvedimage: '',
                          };

                          setTodos([...todos, todo]);

                          await API.graphql(
                            graphqlOperation(createManager, {input: todo}),
                          );

                          probResponse.assets.map(item => {
                            result(item.uri, 'prob');
                          });
                        }
                        if (
                          probResponse.length === 0 &&
                          solvedResponse.length !== 0
                        ) {
                          const solved = JSON.stringify(solvedResponse.assets);
                          const todo = {
                            ...formState,
                            probimage: '',
                            solvedimage: solved,
                          };

                          setTodos([...todos, todo]);

                          await API.graphql(
                            graphqlOperation(createManager, {input: todo}),
                          );

                          solvedResponse.assets.map(item => {
                            result(item.uri, 'solved');
                          });
                        }
                        if (
                          probResponse.length === 0 &&
                          solvedResponse.length === 0
                        ) {
                          const todo = {
                            ...formState,
                            probimage: '',
                            solvedimage: '',
                          };

                          setTodos([...todos, todo]);

                          await API.graphql(
                            graphqlOperation(createManager, {input: todo}),
                          );
                        }

                        if (
                          probResponse.length !== 0 &&
                          solvedResponse.length !== 0
                        ) {
                          const solved = JSON.stringify(solvedResponse.assets);
                          const prob = JSON.stringify(probResponse.assets);
                          const todo = {
                            ...formState,
                            probimage: prob,
                            solvedimage: solved,
                          };

                          setTodos([...todos, todo]);

                          await API.graphql(
                            graphqlOperation(createManager, {input: todo}),
                          );
                          probResponse.assets.map(item => {
                            result(item.uri, 'prob');
                          });
                          solvedResponse.assets.map(item => {
                            result(item.uri, 'solved');
                          });
                        }
                        return checkContents();
                      } catch (err) {
                        console.log('error creating todo:', err);
                      }
                    } else
                      try {
                        if (!formState.problem || !formState.solved)
                          return null;

                        if (
                          probResponse.length !== 0 &&
                          solvedResponse.length === 0
                        ) {
                          const prob = JSON.stringify(probResponse.assets);
                          const todo = {
                            ...formState,
                            probimage: prob,
                            solvedimage: '',
                          };

                          setTodos([...todos, todo]);

                          await API.graphql(
                            graphqlOperation(createSupervisor, {input: todo}),
                          );

                          probResponse.assets.map(item => {
                            result(item.uri, 'prob');
                          });
                        }
                        if (
                          probResponse.length === 0 &&
                          solvedResponse.length !== 0
                        ) {
                          const solved = JSON.stringify(solvedResponse.assets);
                          const todo = {
                            ...formState,
                            probimage: '',
                            solvedimage: solved,
                          };

                          setTodos([...todos, todo]);

                          await API.graphql(
                            graphqlOperation(createSupervisor, {input: todo}),
                          );

                          solvedResponse.assets.map(item => {
                            result(item.uri, 'solved');
                          });
                        }
                        if (
                          probResponse.length === 0 &&
                          solvedResponse.length === 0
                        ) {
                          const todo = {
                            ...formState,
                            probimage: '',
                            solvedimage: '',
                          };

                          setTodos([...todos, todo]);

                          await API.graphql(
                            graphqlOperation(createSupervisor, {input: todo}),
                          );
                        }

                        if (
                          probResponse.length !== 0 &&
                          solvedResponse.length !== 0
                        ) {
                          const solved = JSON.stringify(solvedResponse.assets);
                          const prob = JSON.stringify(probResponse.assets);
                          const todo = {
                            ...formState,
                            probimage: prob,
                            solvedimage: solved,
                          };

                          setTodos([...todos, todo]);

                          await API.graphql(
                            graphqlOperation(createSupervisor, {input: todo}),
                          );
                          probResponse.assets.map(item => {
                            result(item.uri, 'prob');
                          });
                          solvedResponse.assets.map(item => {
                            result(item.uri, 'solved');
                          });
                        }

                        // setFormState(initialState);

                        return checkContents();
                      } catch (err) {
                        console.log('error creating todo:', err);
                      }
                  }}>
                  <SubmitText>확인</SubmitText>
                </Submit>
              </SubmitContainer>
            </KeyboardAwareScrollView>
            <Modal
              animationType="slide"
              visible={modalVisible}
              presentationStyle="pageSheet"
              onRequestClose={() => {
                closeButton();
              }}>
              <ModalTest>
                <ModalTest2>
                  {imageState == true
                    ? probResponse === '없음'
                      ? null
                      : probResponse.assets.map(images => {
                          return (
                            <Test key={images.fileName}>
                              <AutoHeightImage
                                width={width}
                                source={{uri: images.uri}}
                              />
                            </Test>
                          );
                        })
                    : solvedResponse.length === 0
                    ? null
                    : solvedResponse.assets.map(images => {
                        return (
                          <Test key={images.fileName}>
                            <AutoHeightImage
                              width={width}
                              source={{uri: images.uri}}
                            />
                          </Test>
                        );
                      })}
                </ModalTest2>
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
          closeButton2();
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
        </PlaceModal>
      </Modal>
    </>
  );
};

export default Inspection;
