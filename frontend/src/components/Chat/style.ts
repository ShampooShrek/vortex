import vars from "@/styles/vars";
import styled, { keyframes } from "styled-components";

import { ReactSortable } from "react-sortablejs";

interface OpenProps {
  isOpen: boolean
}

const openDropDown = keyframes`
  from {
    display: none;
    opacity: 0;
  } 
  1% {
    display: flex;
  }
  to {
    opacity: 1;
  }
`
const closeDropDown = keyframes`
  from {
    opacity: 1;
  } 
  to {
    opacity: 0;
    display: none;
  }
`

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - ${vars.topBar.height});
  display: flex;
`

export const AsideContainer = styled.div<OpenProps>`
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${vars.containers.primaryColor};


  @media screen and (max-width: 960px) {
    width: 250px;
  }

  @media screen and (max-width: 764px) {
    position: fixed;
    top: 0;
    left: 0;
    /* transform: translateX(); */
    transform: translateX(${props => props.isOpen ? "0" : "-250px"});
    transition: transform .3s ease-in-out;
  }
`

export const AsideHeader = styled.div`
  width: 100%;
  height: 100px;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const AsideHeaderContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const AsideHeaderImage = styled.div`
  width: 60px;
  height: 60px;
  margin-right: 10px;

  img {
    width: 100%;
    height: 100%;
    border: 1px solid ${vars.secundaryColor};
    border-radius: 100%;
  }
`

export const AsideHeaderNickname = styled.h3`
  font-size: 1.6rem;
  color: ${vars.color};
`

export const AsideContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
`

export const AsideContentCard = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: ${vars.containers.secundaryColor};
  }
`

export const AsideContentCardImage = styled.div`
  width: 35px;
  height: 35px;
  margin-right: 10px;

  img {
    width: 100%;
    height: 100%;
    border: 1px solid ${vars.secundaryColor};
    border-radius: 100%;
  }
`

export const AsideContentCardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

export const AsideContentCardNickname = styled.span`
  font-size: 1rem;
  color: ${vars.color};
`

export const AsideContentCardStatus = styled.div`
  font-size: .8rem;
  color: ${vars.colorAlpha};
`

export const Chat = styled.div<OpenProps>`
  width: calc(100% - 300px);
  height: 100%;
  position: relative;

  @media screen and (max-width: 960px) {
     width: calc(100% - 250px);
  }

  @media screen and (max-width: 764px) {
    width: 100%;
    transform: translateX(${props => props.isOpen ? "250px" : "0"});
    transition: transform 0.3s ease-in-out;
  }
`

export const ChatHeader = styled(ReactSortable)`
  display: flex;
  justify-content: start;
  align-items: end;
  width: 100%;
  height: 50px;
  background-color: ${vars.containers.primaryColor};
  overflow-x: auto;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    position: absolute;
    height: 4px;
    cursor: nw-resize;
  }

  &::-webkit-scrollbar-track {
    background: #000;
    padding: 0 1px;
    width: 2px;
    cursor: nw-resize;
  }

  &::-webkit-scrollbar-corner {
    height: 1px;
    cursor: nw-resize;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${vars.secundaryColor};
    height: 1px;
    border-radius: 50px;
    cursor: nw-resize;
  }
`
export const ChatHeaderCard = styled.div`
  cursor: pointer;
  height: 35px;
  min-width: 150px;
  margin-left: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${vars.containers.secundaryColor};

  svg {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`

export const ChatHeaderCardContent = styled.div`
  width: 90%;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
`

export const ChatHeaderCardContentImage = styled.div`
  width: 25px;
  height: 25px;
  margin-right: 5px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    border: 1px solid ${vars.secundaryColor};
    border-radius: 100%;
  }
`

export const ChatHeaderCardContentNicname = styled.span`
  font-size: 1rem;
  color: ${vars.colorAlpha};
`

export const ChatContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(100% - 120px);
  overflow-y: auto;


  &::-webkit-scrollbar {
    position: absolute;
    width: .5rem;
  }

  &::-webkit-scrollbar-track {
    background: #000;
    padding: 0 20px;
    width: 3rem;
  }

  &::-webkit-scrollbar-corner {
    width: 100px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #AB1A1A;
    height: 3rem;
    border-radius: 50px;
  }
`

interface ChatMessageContentProps {
  isFriend: boolean
  showMessages: boolean
}

export const ChatMessageContainer = styled.div<ChatMessageContentProps>`
  opacity: ${props => props.showMessages ? 1 : 0};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.isFriend ? "start" : "end"};
  align-items: ${props => props.isFriend ? "start" : "end"};
  transition: background-color 0.15s ease-in-out;
  padding: 5px 10px;

  &:hover {
    background-color: ${vars.lineColor + "20"};
  }
`

interface ChatMessageHeaderProps {
  isSender: boolean
}

export const ChatMessageHeader = styled.div<ChatMessageHeaderProps>`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  margin-bottom: 5px;
  margin-top: 10px;

  img {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    border: 2px solid ${vars.secundaryColor};
    margin-right: 5px;
  }

  span {
    font-size: 1rem;
    color: ${vars.colorAlpha};
  }

`

export const ChatMessageContent = styled.div`
  display: flex;
  max-width: 45%;
  padding: 10px;
  border-radius: 10px;
  background-color: ${vars.containers.secundaryColor};

  span {
    width: 100%;
    word-wrap: break-word;
    word-break: break-all;
    font-size: 1rem;
    color: ${vars.colorAlpha};
  }

  img {
    max-width: 100%;
    max-height: 300px;
  }

  video {
    max-width: 100%;
    max-height: 300px;
  }

  @media screen and (max-width: 600px) {
    max-width: 70%;
  }

`

export const ChatInputContainer = styled.div`
  height: 70px;
  padding: 10px;
  bottom: 0%;
  width: 100%;
  background-color: ${vars.containers.primaryColor};
  display: flex;
  justify-content: space-between;
`

export const ChatInput = styled.div`
  width: 86%;
`

export const ChatItems = styled.div`
  display: flex;
  border: 2px solid black;
`

export const Items = styled.button`
  position: relative;
  border: 1px solid black;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;  
  height: 100%;
  width: 100%;

  transition: .2s ease-in-out;

  &:hover {
    background-color: ${vars.containers.secundaryColor};
  }

  svg {
    width: 100%;
    height: 100%;
    padding: 5px;
    path {
      color: ${vars.colorAlpha};
    }
  }
`

interface DropDownProps {
  isOpen: boolean
}


export const DropDown = styled.div<DropDownProps>`
  opacity: ${props => props.isOpen ? 1 : 0};
  position: absolute;
  bottom: 100%;
  right: 0;
  width: 200px;
  display: ${props => props.isOpen ? "flex" : "none"};
  align-items: start;
  justify-content: start;
  flex-direction: column;
  background-color: ${vars.containers.primaryColor};
  border: 4px solid black;
  z-index: 2;
  animation: ${props => props.isOpen ? openDropDown : closeDropDown} .3s ease-in-out;
`

export const dropDownItem = styled.span`
  width: 100%;
  cursor: pointer;
  padding: 10px;  
  font-size: 1rem;
  color: ${vars.colorAlpha};
  transition: .2s ease-in-out;

  &:hover {
    background-color: ${vars.containers.secundaryColor};
  }
`

export const NotSelectedText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.2rem;
  color: ${vars.color};
`

export const ReadingAudioContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  height: 50px;
`

export const ReadingAudioContentContainer = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    cursor: pointer;
    width: 40px;
    height: 40px;
    padding: 5px;
    border-radius: 100%;
    transition: .2s ease-in-out;

    &:hover {
      background-color: ${vars.lineColor};
    }
  }
`

export const ReadingAudio = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`

export const ReadingAudioTime = styled.span`
  font-size: 1.1rem;
  margin-right: 10px;
  color: ${vars.color};
`

export const ReadingAudioGif = styled.img`
  object-fit: fill;
  height: 100%;
`

export const PlayerAudio = styled.div`
  padding: 10px;
  width: 100%;
  height: 50px;
  
  display: flex;
  align-items: center;
  justify-content: end;

  & > svg {
    width: 40px;
    height: 40px;
    cursor: pointer;
    margin-right: 20px;

    path {
      color: ${vars.colorAlpha};
    }
  }
`

interface PlayerAudioLineProps {
  width: number
}

export const PlayerAudioListener = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 150px;
  height: 100%;
  background-color: ${vars.lineColor};
  border-radius: 10px;
  padding: 20px 10px;

  svg {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
`

export const PlayerAudioLine = styled.div<PlayerAudioLineProps>`
  width: 70%;
  height: 2px;
  display: flex;
  align-items: center;

  input[type="range"] {
    width: 100%;
    appearance: none;
    height: 2px;
    background-color: ${vars.secundaryColor};
    color: black;

    &::-webkit-slider-thumb {
      appearance: none;
      background: ${vars.secundaryColor};
      width: 16px;
      height: 16px;
      border-radius: 100%;
      cursor: pointer;
      z-index: 1;
    }
  }
`


export const FileSelectedContainer = styled.div`
  position: absolute;
  bottom: 90px;
  left: 20px;
  width: 270px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${vars.containers.secundaryColor};
  border: 2px solid black;
  z-index: 3;

  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    position: absolute;
    right: 0px;
    top: 0px;
    width: 50px;
    height: 50px;
    padding: 10px;
    border-radius: 5px;
    z-index: 1;
    cursor: pointer;
  }

  span {
    overflow: hidden;
    margin: 10px 0;
    max-width: 100%;
    word-wrap: break-word;
  }

  button {
    cursor: pointer;
    width: 60%;
    padding: 5px 0;
    border-radius: 3px;
    border: 0;
    outline: 0;
    background-color: ${vars.secundaryColor};

    transition: .3s ease-in-out;

    &:hover {
      filter: brightness(1.4);
    }
  }

`

export const FileSelectedImage = styled.img`
  border-radius: 10px;
  max-width: 250px;
  max-height: 200px;
  margin: 0 auto;
  box-shadow: 0 0 4px black;
`

export const FileSelectedVideoTumb = styled.div`

  width: 100%;

  .react-thumbnail-generator img {
    border-radius: 10px;
    max-width: 250px;
    max-height: 200px;
    margin: 0 auto;
    box-shadow: 0 0 4px black;
  }
`

export const FileSelectedFile = styled.div`
  width: 100%;
  height: 100px;
  background-color: ${vars.containers.primaryColor};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  span {
    font-size: 1rem;
    text-align: center;
    text-overflow: ellipsis;
    color: ${vars.colorAlpha}
  }
`

export const FileFileMessageContainer = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    cursor: pointer;
    width: 60%;
    padding: 5px 0;
    border-radius: 3px;
    border: 0;
    outline: 0;
    background-color: ${vars.secundaryColor};

    transition: .3s ease-in-out;

    &:hover {
      filter: brightness(1.4);
    }
  }

`

export const FileFileMessage = styled.div`
  padding: 10px;
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${vars.containers.primaryColor};
  border-radius: 10px;
  margin-bottom: 10px;

  span {
    color: ${vars.color};
    font-size: 1rem;
  }

  svg {
    width: 30px;
    height: 30px;
  }
`

export const AsideFriendsContainer = styled.div<GroupContainerProps>`
  height: calc(100% - ${props => props.height+"px"});
  overflow: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    position: absolute;
    width: .5rem;
  }

  &::-webkit-scrollbar-track {
    background: #000;
    padding: 0 20px;
    width: 3rem;
  }

  &::-webkit-scrollbar-corner {
    width: 100px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #AB1A1A;
    height: 3rem;
    border-radius: 50px;
  }
`

export const AsideFriendsCardContainer = styled.div`

`

export const HeaderList = styled.div`
  background-color: ${vars.lineColor};
  width: 100%;
  padding: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    text-transform: uppercase;
    font-size: .9rem;
    font-weight: 600;
    color: ${vars.color};
  }

  input {
    padding: 3px;
    border: 1px solid black;
    outline: 0;
    font-size: .8rem;
    color: ${vars.color};
    background-color: ${vars.containers.secundaryColor};

    &::placeholder {
      color: ${vars.colorAlpha};
    }
  }
`

export const FriendsStatusFilter = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px;
  margin: 5px 0;

  span {
    font-size: .9rem;
    color: ${vars.colorAlpha};
  }

  svg {
    width: 15px;
    height: 15px;


    path {
      color: ${vars.colorAlpha};
    }
  }
`


export const GroupsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const GroupContainerHeader = styled(HeaderList)`
  cursor: ns-resize;
  user-select: none;
  
  &:hover {
    filter: brightness(1.4);
  }
`

interface GroupContainerProps {
  height: number
}

export const GroupContaienrContentContainer = styled.div<GroupContainerProps>`
  max-height: 200px;
  min-height: 0;
  height: ${props => props.height}px;
  transition: height .1s;
`

export const ToglButton = styled.div`
  width: 50px;
  height: 50px;
  justify-self: center;
  align-items: center;
  justify-content: center;
  display: none;
  border: 0;
  outline: 0;
  background-color: ${vars.containers.secundaryColor};

  svg {
    width: 50px;
    height: 50px;
  }

  @media screen and (max-width: 764px) {
    display: block;
  }
`
