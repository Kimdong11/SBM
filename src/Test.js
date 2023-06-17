// import React, {useEffect, useState} from 'react';
// import {API, Amplify, graphqlOperation} from 'aws-amplify';
// import {listSuperVisors} from './graphql/queries';
// import styled from 'styled-components';
// import {Modal} from 'react-native';
// import DatePicker from 'react-native-date-picker';

// import awsmobile from './aws-exports';
// import {TabItem} from '@aws-amplify/ui-react';

// Amplify.configure(awsmobile);

// const ModalMainContainer = styled.View`
//   flex: 1;
// `;

// const ModalDataContainer = styled.View``;

// const Container = styled.View`
//   flex: 1;
// `;

// const MainContainer = styled.View`
//   justify-content: center;
//   align-items: center;
// `;

// const View = styled.View`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
// `;

// const ScrollView = styled.ScrollView``;

// const Context = styled.TouchableOpacity`
//   margin-top: 30px;
//   width: 90%;
//   height: 100px;
//   border: 1px solid gray;
// `;

// const PlaceModal = styled.ScrollView`
//   flex: 1;
//   background-color: aqua;
// `;

// const DataContainer = styled.View`
//   margin-top: 100px;
//   justify-content: center;
//   align-items: center;
// `;

// const PlaceTouchable = styled.TouchableOpacity`
//   width: 85%;
//   height: 30px;
//   justify-content: center;
//   border: 1px solid black;
//   border-radius: 30px;
//   padding-left: 10%;
//   margin-top: 3%;
// `;

// const PlaceText = styled.Text`
//   color: black;
//   font-size: 24px;
// `;

// const Text = styled.Text`
//   color: black;
//   font-size: 24px;
// `;

// const TitleContainer = styled.View`
//   flex-direction: row;
//   justify-content: space-evenly;
//   align-items: flex-start;
//   margin-top: 25px;
// `;

// const DataTextContainer = styled.View`
//   flex-direction: row;
//   justify-content: space-evenly;
//   margin-top: 20px;
// `;

// const DataText = styled.Text`
//   font-size: 14px;
//   font-weight: 600;
//   margin-left: 20px;
// `;

// const TitleText = styled.Text`
//   font-size: 16px;
//   font-weight: 900;
//   margin-right: 28px;
// `;

// const Dates = styled.Text``;

// const Pressable = styled.Pressable`
//   width: 100px;
//   height: 100px;
//   background-color: black;
// `;

// const Button = styled.Button``;

// const CloseButton2 = styled.Button``;

// const PlaceContainer = styled.View`
//   width: 85%;
//   height: 30px;
//   justify-content: center;
//   border: 1px solid black;
//   border-radius: 30px;
//   padding-left: 10%;
//   margin-top: 3%;
// `;

// const NameContainer = styled.View`
//   width: 85%;
//   height: 30px;
//   border: 1px solid black;
//   justify-content: center;
//   border-radius: 30px;
//   padding-left: 10%;
//   margin-top: 3%;
// `;

// const ContentsContainer = styled.View`
//   justify-content: center;
//   align-items: center;
// `;

// const DateContainer = styled.View`
//   width: 85%;
//   height: 30px;
//   justify-content: center;
//   border: 1px solid black;
//   border-radius: 30px;
//   padding-left: 10%;
//   margin-top: 3%;
// `;

// const ProblemContainer = styled.ScrollView`
//   width: 85%;
//   height: 120px;
//   border: 1px solid black;
//   border-radius: 30px;
//   margin-top: 15px;
//   padding-left: 20px;
//   margin-bottom: 20px;
//   padding-top: 3%;
//   padding-right: 4.5%;
// `;

// const SolvedContainer = styled.ScrollView`
//   width: 85%;
//   height: 120px;
//   border: 1px solid black;
//   border-radius: 30px;
//   margin-top: 15px;
//   padding-left: 20px;
//   margin-bottom: 20px;
//   padding-top: 3%;
//   padding-right: 4.5%;
// `;

// const NameTitle = styled.Text`
//   font-size: 20px;
//   font-weight: 600;
//   margin-top: 20px;
//   margin-left: 8%;
// `;
// const DateTitle = styled.Text`
//   font-size: 20px;
//   font-weight: 600;
//   margin-top: 20px;
//   margin-left: 8%;
// `;
// const PlaceTitle = styled.Text`
//   font-size: 20px;
//   font-weight: 600;
//   margin-top: 20px;
//   margin-left: 8%;
// `;
// const ProblemTitle = styled.Text`
//   font-size: 20px;
//   font-weight: 600;
//   margin-top: 20px;
//   margin-left: 8%;
// `;
// const SolvedTitle = styled.Text`
//   font-size: 20px;
//   font-weight: 600;
//   margin-top: 20px;
//   margin-left: 8%;
// `;

// const Name = styled.Text``;
// const DateText = styled.Text``;
// const Place = styled.Text``;
// const Problem = styled.Text``;
// const Solved = styled.Text``;

// const ImageButtonContainer = styled.View`
//   margin-top: -20px;
// `;
// const CloseButtonContainer = styled.View`
//   margin-top: 20px;
// `;

// const ImageButton = styled.Button``;

// // import {withAuthenticator} from 'aws-amplify-react-native';

// const Test = () => {
//   const [datas, setDatas] = useState(null);
//   const [selectedData, setSelctedData] = useState(null);

//   const [date, setDate] = useState(new Date());
//   const [open, setOpen] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(null);

//   const [placeModalVisivle, setPlaceModalVisible] = useState(false);
//   const [dataModalVisible, setDataModalVisible] = useState(false);

//   const [selectedPlaces, setSelectedPlaces] = useState(null);
//   const [placeDatas, setPlaceDatas] = useState([
//     '마이온홈 곽지',
//     '마이온홈 귀덕',
//     '마이온홈 애월',
//     '모호 in 표선',
//     '하버하우스웨스트',
//   ]);

//   const searchDataDatePlace = async (date, place) => {
//     const todoData = await API.graphql(
//       graphqlOperation(listSuperVisors, {
//         filter: {date: {contains: date}, and: {place: {eq: place}}},
//       }),
//     );

//     const datas = todoData.data.listSuperVisors.items;
//     setDatas(datas);
//   };

//   const searchDataDate = async date => {
//     const todoData = await API.graphql(
//       graphqlOperation(listSuperVisors, {
//         filter: {date: {contains: date}},
//       }),
//     );
//     const datas = todoData.data.listSuperVisors.items;
//     setDatas(datas);
//   };

//   const searchDataPlace = async place => {
//     const todoData = await API.graphql(
//       graphqlOperation(listSuperVisors, {
//         filter: {place: {eq: place}},
//       }),
//     );
//     const datas = todoData.data.listSuperVisors.items;
//     setDatas(datas);
//   };

//   const clickedPlace = a => {
//     setSelectedPlaces(current => {
//       return (current = a);
//     });
//     return closeButton2();
//   };

//   const closeButton = () => {
//     return setDataModalVisible(!dataModalVisible);
//   };

//   const closeButton2 = () => {
//     return setPlaceModalVisible(!placeModalVisivle);
//   };

//   return (
//     <>
//       <Container>
//         {datas === null ? (
//           <View>
//             {selectedPlaces === null ? (
//               <Button
//                 title="장소 선택"
//                 onPress={() => {
//                   setPlaceModalVisible(!placeModalVisivle);
//                 }}></Button>
//             ) : (
//               <PlaceTouchable
//                 onPress={() => setPlaceModalVisible(!placeModalVisivle)}>
//                 <Dates>{selectedPlaces}</Dates>
//               </PlaceTouchable>
//             )}
//             {selectedDate === null ? (
//               <Button
//                 title="날짜 선택"
//                 onPress={() => {
//                   setOpen(!open);
//                 }}></Button>
//             ) : (
//               <PlaceTouchable
//                 onPress={() => {
//                   setOpen(!open);
//                 }}>
//                 <Dates>{selectedDate}</Dates>
//               </PlaceTouchable>
//             )}
//             <Pressable
//               onPress={() => {
//                 if (selectedDate !== null && selectedPlaces !== null) {
//                   console.log('날짜 장소 데이터');
//                   return searchDataDatePlace(selectedDate, selectedPlaces);
//                 }

//                 if (selectedPlaces !== null) {
//                   console.log('장소');
//                   return searchDataPlace(selectedPlaces);
//                 }

//                 if (selectedDate !== null) {
//                   console.log('날짜');
//                   console.log(typeof selectedDate);
//                   return searchDataDate(selectedDate);
//                 }
//               }}></Pressable>
//           </View>
//         ) : (
//           <ScrollView>
//             <DataContainer>
//               {datas.map(item => {
//                 return (
//                   <Context
//                     key={item.id}
//                     onPress={() => {
//                       setSelctedData(item);
//                       return setDataModalVisible(!dataModalVisible);
//                     }}>
//                     <TitleContainer>
//                       <TitleText>보고자</TitleText>
//                       <TitleText>날짜</TitleText>
//                       <TitleText>장소</TitleText>
//                     </TitleContainer>
//                     <DataTextContainer>
//                       <DataText>{item.name}</DataText>
//                       <DataText>{item.date}</DataText>
//                       <DataText>{item.place}</DataText>
//                     </DataTextContainer>
//                   </Context>
//                 );
//               })}
//             </DataContainer>
//           </ScrollView>
//         )}
//       </Container>
//       <Modal
//         animationType="slide"
//         //transparent={true}
//         visible={placeModalVisivle}
//         presentationStyle="formSheet"
//         onRequestClose={() => {
//           Alert.alert('Modal has been closed.');
//           setPlaceModalVisible(!placeModalVisivle);
//         }}>
//         <PlaceModal>
//           {placeDatas.map(item => {
//             return (
//               <MainContainer>
//                 <PlaceTouchable
//                   key={item}
//                   onPress={() => {
//                     clickedPlace(item);
//                   }}>
//                   <PlaceText>{item}</PlaceText>
//                 </PlaceTouchable>
//               </MainContainer>
//             );
//           })}
//           <CloseButton2 title="닫기" onPress={closeButton2}></CloseButton2>
//         </PlaceModal>
//       </Modal>
//       <DatePicker
//         modal
//         open={open}
//         date={date}
//         mode="date"
//         onConfirm={date => {
//           setOpen(false);

//           const month = date.getMonth() + 1;
//           const day = date.getDate();

//           const dates = `${month}-${day}`;

//           setSelectedDate(dates);
//         }}
//         onCancel={() => {
//           setOpen(false);
//         }}
//       />
//       <Modal
//         animationType="slide"
//         //transparent={true}
//         visible={dataModalVisible}
//         presentationStyle="formSheet"
//         onRequestClose={() => {
//           Alert.alert('Modal has been closed.');
//           setPlaceModalVisible(!dataModalVisible);
//         }}>
//         {selectedData === null ? null : (
//           <ModalMainContainer>
//             <ModalDataContainer>
//               <NameTitle>이름</NameTitle>
//               <ContentsContainer>
//                 <NameContainer>
//                   <Name>{selectedData.name}</Name>
//                 </NameContainer>
//               </ContentsContainer>
//               <DateTitle>날짜</DateTitle>
//               <ContentsContainer>
//                 <DateContainer>
//                   <DateText>{selectedData.date}</DateText>
//                 </DateContainer>
//               </ContentsContainer>
//               <PlaceTitle>장소</PlaceTitle>
//               <ContentsContainer>
//                 <PlaceContainer>
//                   <Place>{selectedData.place}</Place>
//                 </PlaceContainer>
//               </ContentsContainer>
//               <ProblemTitle>문제</ProblemTitle>
//               <ContentsContainer>
//                 <ProblemContainer>
//                   <Problem>{selectedData.problem}</Problem>
//                 </ProblemContainer>
//                 <ImageButtonContainer>
//                   <ImageButton
//                     title="문제 이미지 보기"
//                     color="green"></ImageButton>
//                 </ImageButtonContainer>
//               </ContentsContainer>
//               <SolvedTitle>해결</SolvedTitle>
//               <ContentsContainer>
//                 <SolvedContainer>
//                   <Solved>{selectedData.solved}</Solved>
//                 </SolvedContainer>
//                 <ImageButtonContainer>
//                   <ImageButton
//                     title="해결 이미지 보기"
//                     color="green"></ImageButton>
//                 </ImageButtonContainer>
//               </ContentsContainer>
//             </ModalDataContainer>
//             <CloseButtonContainer>
//               <CloseButton2 title="닫기" onPress={closeButton}></CloseButton2>
//             </CloseButtonContainer>
//           </ModalMainContainer>
//         )}
//       </Modal>
//     </>
//   );
// };

// export default Test;
