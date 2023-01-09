import styled from 'styled-components';

interface TextStyleProps {
  margin?: string;
  width?: string;
}

const ChatLobbyTitle = styled.p<TextStyleProps>`
  margin: ${(props) => props.margin};
  width: ${(props) => props.width || '100%'};
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  margin: 1rem 0;
  justify-content: flex-start;
  background-color: #eef8ff;
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
  background-color: #71e155;
  color: white;
  margin: 1rem;
  border: none;
`;

const RecentMessage = styled.p<TextStyleProps>`
  margin: ${(props) => props.margin};
  width: ${(props) => props.width || '100%'};
  font-size: 1rem;
  display: flex;
  margin: 1rem 0;
  color: #8e8e8e;
`;

const RandomNickname = styled.p<TextStyleProps>`
  margin: ${(props) => props.margin};
  width: ${(props) => props.width || '100%'};
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  margin: 1rem 0;
`;

const Timeline = styled.p<TextStyleProps>`
  margin: ${(props) => props.margin};
  width: ${(props) => props.width};
  font-size: 0.8rem;
  display: flex;
  color: #8e8e8e;
  justify-content: center;
  margin: 1rem 1rem;
`;

const OtherUserChatText = styled.p<TextStyleProps>`
  margin: ${(props) => props.margin};
  width: ${(props) => props.width};
  max-width: 70%;
  overflow-wrap: break-word;
  padding: 8px 16px;
  border-radius: 10px;
  border: none;
  font-weight: 300;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const MyChatText = styled.p<TextStyleProps>`
  margin: ${(props) => props.margin};
  width: ${(props) => props.width};
  max-width: 70%;
  overflow-wrap: break-word;
  padding: 8px 16px;
  border-radius: 10px;
  border: none;
  font-weight: 300;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin-right: 1rem;
`;

const IconText = styled.span<TextStyleProps>`
  margin: 0 0.5rem;
  margin: ${(props) => props.margin};
  width: ${(props) => props.width};
  font-weight: 300;
  text-align: center;
`;

export {
  ChatLobbyTitle,
  LeftMessageCount,
  RecentMessage,
  RandomNickname,
  Timeline,
  OtherUserChatText,
  MyChatText,
  IconText,
};
