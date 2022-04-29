import styled from 'styled-components';

interface TextStyleProps {
  margin?: string;
  width?: string;
}

const ChatLobbyTitle = styled.text<TextStyleProps>`
margin: ${(props) => props.margin};
width: ${(props) => props.width || '100%'};
font-size: 2rem;
font-weight: bold;
display: flex;
margin: 1rem 0;
justify-content: flex-start;
background-color: #EEF8FF;
`;

const ChatLobbyDescription = styled.text<TextStyleProps>`
margin: ${(props) => props.margin};
width: ${(props) => props.width || '100vh'};
font-size: 1.5rem;
font-weight: bold;
display: flex;
margin: 1rem 0;
justify-content: center;
background-color: #EEF8FF;
`;

const ChatRoomTitle = styled.text<TextStyleProps>`
margin: ${(props) => props.margin};
width: ${(props) => props.width || '100%'};
font-size: 2rem;
font-weight: bold;
display: flex;
margin: 1rem 0;
justify-content: center;
background-color: #EEF8FF;
`;

const LoginTitle = styled.text<TextStyleProps>`
margin: ${(props) => props.margin};
width: ${(props) => props.width || '100%'};
font-size: 2rem;
font-weight: bold;
display: flex;
margin: 1rem 0;
justify-content: center;
background-color: #EEF8FF;
`;

const LeftMessageCount = styled.div<TextStyleProps>`
  margin: ${(props) => props.margin};
  width: ${(props) => props.width || '100%'};
  display: flex;
  height: 2rem;
  width: 2rem;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #71E155;
  color: white;
  margin: 1rem;
  border: none;
`;

const RecentMessage = styled.text<TextStyleProps>`
  margin: ${(props) => props.margin};
  width: ${(props) => props.width || '100%'};
  font-size: 1rem;
  display: flex;
  margin: 1rem 0;
  color: #8E8E8E;
`;

const RandomNickname = styled.text<TextStyleProps>`
  margin: ${(props) => props.margin};
  width: ${(props) => props.width || '100%'};
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  margin: 1rem 0;
`;

const Timeline = styled.text<TextStyleProps>`
margin: ${(props) => props.margin};
width: ${(props) => props.width };
font-size: 0.8rem;
display: flex;
color: #8E8E8E;
justify-content: center;
margin: 1rem 1rem;
`;

const OtherUserChatText = styled.text<TextStyleProps>`
margin: ${(props) => props.margin};
width: ${(props) => props.width};
padding: 8px 16px;
border-radius: 10px;
border: none;
font-weight: 300;
background-color: #FFFFFF;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);  
`;

const MyChatText = styled.text<TextStyleProps>`
margin: ${(props) => props.margin};
width: ${(props) => props.width};
padding: 8px 16px;
border-radius: 10px;
border: none;
font-weight: 300;
background-color: #FFFFFF;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);  
margin-right : 1rem;
`;


export { ChatLobbyTitle, ChatLobbyDescription, ChatRoomTitle, LeftMessageCount, RecentMessage, RandomNickname, Timeline, LoginTitle, OtherUserChatText, MyChatText };
