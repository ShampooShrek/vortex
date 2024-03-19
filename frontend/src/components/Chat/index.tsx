"use client"

import authHook from "@/data/hooks/authHook"
import { redirect } from "next/navigation"
import { useEffect, useState, useRef } from "react"
//@ts-ignore
import VideoTumbnail from "react-video-thumbnail"

import * as S from "./style"
import { FriendsWithMessages, GroupMessage, GroupMessageReceived, GroupsWithMessages, Message } from "@/models/frontModels"
import { FileIcon, Bars3Icon, MicrophoneIcon, PauseIcon, PlayIcon, PlusIcon, Trash, XIcon } from "../Icons"
import TextArea from "../TextArea"
import socket from "@/services/socket"
import ApiRequest from "@/utils/ApiRequests"
import messageAuth from "@/data/hooks/messageHook"
import Video from "./Video"


export default function Chat() {
  const {
    friendsWithMessages,
    getFriends,
    user,
    loading,
    usersOnline,
    setFriendsWithMessages,
    getGroups,
    groupsWithMessages,
    setGroupsWithMessages
  } = authHook()


  if (!user) redirect("/home")

  const { showMessageBox } = messageAuth()

  const [message, setMessage] = useState("")
  const [lastMessage, setLastMessage] = useState<Message | null>(null)
  const [messageFileUrl, setMessageAudioFileUrl] = useState("")
  const [messageFile, setMessageFile] = useState<File | null>(null)
  const [showMessages, setShowMessages] = useState(false)

  const [messageAudioFile, setMessageAudioFile] = useState<File | null>(null)
  const [recordingAudio, setRecordingAudio] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [audioPercentage, setAudioPercentage] = useState(0)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)

  const [friendsSearch, setFriendsSearch] = useState("")
  const [friendsWithMessagesFiltred, setFriendsWithMessagesFiltred] = useState<FriendsWithMessages[]>(friendsWithMessages)
  const [friendsOnline, setFriendsOnline] = useState<FriendsWithMessages[]>([])
  const [friendsOffLine, setFriendsOffLine] = useState<FriendsWithMessages[]>([])
  const [friendsOffLineOpen, setFriendsOffLineOpen] = useState(true)
  const [friendsOnLineOpen, setFriendsOnLineOpen] = useState(true)

  const [groupContainerHeight, setGroupContaienrHeight] = useState(0)
  const [groupsSearch, setGroupsSearch] = useState("")
  const [groupsWithMessagesFiltred, setGroupsWithMessagesFiltred] = useState<GroupsWithMessages[]>(groupsWithMessages)
  const [dragStartY, setDragStartY] = useState<number | null>(null);

  const [chatTabs, setChatTabs] = useState<(FriendsWithMessages | GroupsWithMessages)[]>([])
  const [openItemsDropDown, setOpenItemsDropDown] = useState(false)
  const [isOpenAside, setIsOpenAside] = useState(false)
  const [selectedFriend, setSelectedFriend] = useState<FriendsWithMessages | null>(null)
  const [selectedGroup, setSelectedGroup] = useState<GroupsWithMessages | null>(null)

  const chatRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const inputImageFileRef = useRef<HTMLInputElement>(null)
  const inputVideoFileRef = useRef<HTMLInputElement>(null)
  const inputAnyFileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const asyncGetFriends = async () => await getFriends()
    const asyncGetGroups = async () => await getGroups()
    asyncGetFriends()
    asyncGetGroups()
  }, [])

  useEffect(() => {
    setFriendsWithMessagesFiltred(friendsWithMessages)
    setGroupsWithMessagesFiltred(groupsWithMessages)
  }, [groupsWithMessages, friendsWithMessages])

  useEffect(() => {
    const friendsWithStatus: FriendsWithMessages[] = friendsWithMessagesFiltred.map(f => {
      const friend = { ...f }
      const friendIsOnline = usersOnline.find(u => u.id === f.id)

      if (friendIsOnline) friend.status = friendIsOnline.status
      else friend.status = "off-line"

      return friend
    })

    setFriendsOffLine(friendsWithStatus.filter(f => f.status === "off-line"))
    setFriendsOnline(friendsWithStatus.filter(f => f.status !== "off-line"))
  }, [usersOnline, friendsWithMessagesFiltred])

  useEffect(() => {
    const getMessages = async () => {
      setShowMessages(false)
      if (selectedFriend?.messages.length === 0) {
        const response = await ApiRequest<Message[]>(`/api/users/friends/${selectedFriend!.id}/messages`, "get")
        if (response) {
          if (response.type === "success") {
            selectedFriend.messages = response.response as Message[]
            const friends = [...friendsWithMessages]
            const friendIndex = friends.findIndex(f => f.id === selectedFriend.id)
            if (friendIndex !== -1) {
              friends[friendIndex] = selectedFriend
              setFriendsWithMessages(friends)
              handleShowMessages(600)
            }
          } else {
            showMessageBox(response.response as string, "error")
          }
        }
      } else handleShowMessages(500)
    }
    getMessages()
  }, [selectedFriend])

  useEffect(() => {
    if (selectedGroup) {
      const getGroupMessages = async () => {
        setShowMessages(false)
        if (selectedGroup?.messages.length < 1) {
          const response = await ApiRequest<GroupMessageReceived[]>(`/api/groups/${selectedGroup.id}/messages`, "get")
          if (response) {
            if (response.type === "success") {
              selectedGroup.messages = response.response as GroupMessageReceived[]
              const groups = [...groupsWithMessages]
              const groupIndex = groups.findIndex(f => f.id === selectedGroup.id)
              if (groupIndex !== -1) {
                groups[groupIndex] = selectedGroup
                setGroupsWithMessages(groups)
                handleShowMessages(1000)
              }
            } else {
              showMessageBox(response.response as string, "error")
            }
          }
        } else handleShowMessages(1000)
      }
      getGroupMessages()
    }
  }, [selectedGroup])

  useEffect(() => {
    if (friendsSearch !== "") {
      setFriendsWithMessagesFiltred(() =>
        friendsWithMessages.filter(f => f.nickname.toLowerCase().replace(" ", "").
          includes(friendsSearch.toLowerCase().replace(" ", "")))
      )
    } else setFriendsWithMessagesFiltred(friendsWithMessages)
  }, [friendsSearch])

  useEffect(() => {
    if (groupsSearch !== "") {
      setGroupsWithMessagesFiltred(() =>
        groupsWithMessages.filter(g => g.name.toLowerCase().replace(" ", "").
          includes(groupsSearch.toLowerCase().replace(" ", "")))
      )
    } else setGroupsWithMessagesFiltred(groupsWithMessages)
  }, [groupsSearch])

  useEffect(() => {
    socket.on("message-received", (message: Message) => setLastMessage(message))


    return () => {
      socket.off("message-received")
    }
  }, [friendsWithMessages])

  useEffect(() => {
    scrollToBottom()
  }, [chatRef.current?.scrollHeight, lastMessage, selectedFriend]);

  useEffect(() => {
    if (mediaRecorder && !recordingAudio) {
      mediaRecorder.stop()
    } else if (mediaRecorder && recordingAudio) {
      mediaRecorder.start()
    }
  }, [mediaRecorder, recordingAudio])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlayingAudio) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlayingAudio])



  const scrollToBottom = () => {
    if (lastMessage) {
      if (chatRef.current) {
        let { scrollHeight, scrollTop, clientHeight } = chatRef.current
        if (lastMessage.sender) {
          chatRef.current.scrollTop = scrollHeight
        } else {
          const calcScroll = (scrollHeight - clientHeight) - scrollTop

          if (calcScroll < 150) {
            chatRef.current.scrollTop = scrollHeight
          }
        }
      }
    } else {
      if (chatRef.current) {
        let { scrollHeight } = chatRef.current
        chatRef.current.scrollTop = scrollHeight
      }
    }
  }


  const addTab = (tab: FriendsWithMessages | GroupsWithMessages) => {
    const updatedTabs = [...chatTabs]
    if (!updatedTabs.find(f => f.id === tab.id)) {
      if ("nickname" in tab) {
        updatedTabs.push(tab as FriendsWithMessages)
        setChatTabs(updatedTabs)
        setSelectedGroup(null)
        setSelectedFriend(tab)
      } else {
        updatedTabs.push(tab as GroupsWithMessages)
        setChatTabs(updatedTabs)
        setSelectedFriend(null)
        setSelectedGroup(tab as GroupsWithMessages)
      }
    }
  }

  const removeTab = (tab: FriendsWithMessages | GroupsWithMessages) => {
    const updatedTabs = chatTabs.filter(tabs => tabs.id !== tab.id)
    if (updatedTabs.length > 0) {
      if ("nickname" in updatedTabs[updatedTabs.length - 1]) {
        setSelectedGroup(null)
        setSelectedFriend(updatedTabs[updatedTabs.length - 1] as FriendsWithMessages)
      } else {
        setSelectedFriend(null)
        setSelectedGroup(updatedTabs[updatedTabs.length - 1] as GroupsWithMessages)
      }
    } else {
      setSelectedFriend(null)
      setSelectedGroup(null)
    }
    setChatTabs(prevTabs => prevTabs.filter(t => t.id !== tab.id))
  }

  const selectChat = (tab: FriendsWithMessages | GroupsWithMessages) => {
    if ("nickname" in tab) {
      if (!selectedFriend || selectedFriend.id !== tab.id) {
        setSelectedGroup(null)
        setSelectedFriend(tab as FriendsWithMessages)
      }
    } else {
      if (!selectedGroup || selectedGroup.id !== tab.id) {
        setSelectedFriend(null)
        setSelectedGroup(tab as GroupsWithMessages)
      }
    }
  }

  const changeMessage = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = ev.target.value
    setMessage(value)
  }

  const onKeyDownTextArea = async (ev: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const key = ev.key
    if (key === "Enter") {
      ev.preventDefault()
      setMessage("")
      if (selectedFriend || selectedGroup) {
        await sendMessage("text", message)
      }
    }
  }

  const handleChangeInputFile = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files![0]
    if (file) {
      setMessageFile(file)
      setOpenItemsDropDown(false)
    }
  }

  const handleInputFileClick = (type: "image" | "video" | "any") => {
    if (type === "image") {
      if (inputImageFileRef.current) {
        inputImageFileRef.current.click()
      }
    } else if (type === "video") {
      if (inputVideoFileRef.current) {
        inputVideoFileRef.current.click()
      }
    } else {
      if (inputAnyFileRef.current) {
        inputAnyFileRef.current.click()
      }
    }
  }

  const readAudio = async () => {
    setRecordingAudio(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const chunks: Blob[] = []

      const recorder = new MediaRecorder(stream)


      recorder.ondataavailable = blobEvent => {
        chunks.push(blobEvent.data)
      }

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/ogg code=opus" })
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onload = () => {
          const url = URL.createObjectURL(blob)
          setMessageAudioFileUrl(url)
          setMessageAudioFile(new File([blob], "file", { type: "audio/ogg" }))
        }
      }

      setMediaRecorder(recorder)

    } catch (error) {
      alert("Erro ao acessar o microfone")
    }
  }

  const handleAudioPlay = () => {
    setIsPlayingAudio(prev => !prev)
  }

  const cancelAudio = () => {
    setRecordingAudio(false)
    setIsPlayingAudio(false)
    setAudioPercentage(0)
    setMediaRecorder(null)
    setMessageAudioFileUrl("")
    setMessageAudioFile(null)
  }

  const removeMessageFile = () => {
    setMessageFile(null)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef!.current.currentTime
      const total = audioRef.current.duration
      setAudioPercentage((current / total) * 100)
    }
  }

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const value = Number(event.target.value)
      audioRef.current.currentTime = (value / 100) * audioRef.current.duration
      setAudioPercentage(value)
    }
  }

  type typeMessage = "text" | "image" | "video" | "audio" | "file"

  const sendMessage = async (type: typeMessage, message: File | string | null, callback?: () => void) => {
    if (!message) {
      return false
    }

    const date: Date = new Date(Date.now())

    if (typeof message === "string") {
      if (selectedFriend) {
        const data: Message = {
          content: message,
          date,
          recipient: selectedFriend!.id,
          sender: user.id,
          type: "text"
        }

        const idRoom = [user.id, selectedFriend!.id].sort()
        const roomKey = `${idRoom[0]}-${idRoom[1]}`
        socket.emit("send-message", ({ data, roomKey }))
      } else if (selectedGroup) {
        const data: GroupMessage = {
          content: message,
          date,
          group: selectedGroup.id,
          sender: user.id,
          type: "text"
        }
        socket.emit("send-group-message", data)
      }
    } else {
      const form = new FormData()
      form.append("file", message)
      const fileUrl = await ApiRequest<string>(`/api/users/chat/files/${type}`, "post", form)

      if (selectedFriend) {
        if (fileUrl) {
          if (fileUrl.type === "success") {
            const data: Message = {
              content: fileUrl.response as string,
              date,
              recipient: selectedFriend!.id,
              sender: user.id,
              type: type
            }

            const idRoom = [user.id, selectedFriend!.id].sort()
            const roomKey = `${idRoom[0]}-${idRoom[1]}`
            socket.emit("send-message", ({ data, roomKey }))
          } else {
            showMessageBox(fileUrl.response as string, "error")
          }
        }
      } else if (selectedGroup) {
        if (fileUrl) {
          if (fileUrl.type === "success") {
            const data: GroupMessage = {
              content: fileUrl.response as string,
              date,
              group: selectedGroup.id,
              sender: user.id,
              type: type
            }
            socket.emit("send-group-message", data)
          } else {
            showMessageBox(fileUrl.response as string, "error")
          }
        }
      }
    }
    if (callback) {
      callback()
    }
  }

  const cutFileName = (name: string): string => {
    const splitName = name.split("-")
    splitName.splice(0, 1)

    return splitName.join("")
  }

  const downloadFile = (fileUrl: string) => {
    const link = document.createElement("a")
    link.href = fileUrl
    link.download = "arquivo"
    link.target = "_blank"
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
  }

  const handleShowMessages = (time: number) => {
    setTimeout(() => {
      setShowMessages(true)
      scrollToBottom()
    }, time)
  }

  const handleContainerDragStart = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.dataTransfer.effectAllowed = 'move';
    ev.dataTransfer.setData('text/html', ev.currentTarget.innerHTML);
    setDragStartY(ev.clientY);
  };

  const handleContainerDrag = (ev: React.DragEvent<HTMLDivElement>) => {
    if (dragStartY !== null) {
      const pageHeight = window.innerHeight;
      const dragY = ev.clientY;
      if (dragY > 0) {
        let result = pageHeight - dragY;

        if (result > 200) result = 200;

        setGroupContaienrHeight(result);
      }
    }
  };

  const handleContainerDragEnd = () => {
    setDragStartY(null);
  };


  if (loading) return ""

  return (
    <S.Container>
      <S.AsideContainer isOpen={isOpenAside}>
        <S.AsideHeader>
          <S.AsideHeaderContent>
            <S.AsideHeaderImage>
              <img src={user.image ? user.image.url : "/player.jpg"} />
            </S.AsideHeaderImage>
            <S.AsideHeaderNickname>
              {user.nickname}
            </S.AsideHeaderNickname>
          </S.AsideHeaderContent>
        </S.AsideHeader>
        <S.AsideContent>
          <S.AsideFriendsContainer height={groupContainerHeight}>
            <S.HeaderList>
              <h1>AMIGOS</h1>
              <input onChange={ev => setFriendsSearch(ev.target.value)} value={friendsSearch} type="text" placeholder="Pesquisar por nickname" />
            </S.HeaderList>
            <S.FriendsStatusFilter onClick={() => setFriendsOnLineOpen(prev => !prev)}>
              <PlusIcon />
              <span>On-line ({friendsOnline.length})</span>
            </S.FriendsStatusFilter>
            <S.AsideFriendsCardContainer>
              {friendsOnLineOpen && friendsOnline.map(f => (
                <S.AsideContentCard onClick={() => addTab(f)} key={`friends-online-${f.id}`}>
                  <S.AsideContentCardImage>
                    <img src={f.image ? f.image.url : "/player.jpg"} alt="" />
                  </S.AsideContentCardImage>
                  <S.AsideContentCardContent>
                    <S.AsideContentCardNickname>{f.nickname}</S.AsideContentCardNickname>
                    <S.AsideContentCardStatus>{f.status}</S.AsideContentCardStatus>
                  </S.AsideContentCardContent>
                </S.AsideContentCard>
              ))}
            </S.AsideFriendsCardContainer>
            <S.FriendsStatusFilter onClick={() => setFriendsOffLineOpen(prev => !prev)}>
              <PlusIcon />
              <span>Off-line ({friendsOffLine.length})</span>
            </S.FriendsStatusFilter>
            <S.AsideFriendsCardContainer>
              {friendsOffLineOpen && friendsOffLine.map(f => (
                <S.AsideContentCard onClick={() => addTab(f)} key={`friends-online-${f.id}`}>
                  <S.AsideContentCardImage>
                    <img src={f.image ? f.image.url : "/player.jpg"} alt="" />
                  </S.AsideContentCardImage>
                  <S.AsideContentCardNickname>{f.nickname}</S.AsideContentCardNickname>
                </S.AsideContentCard>
              ))}
            </S.AsideFriendsCardContainer>
          </S.AsideFriendsContainer>
          <S.GroupsContainer>
            <S.GroupContainerHeader
              draggable={true}
              onDragStart={handleContainerDragStart}
              onDrag={handleContainerDrag}
              onDragEnd={handleContainerDragEnd}
            >
              <h1>GRUPOS</h1>
              <input type="text" onChange={ev => setGroupsSearch(ev.target.value)} value={groupsSearch} placeholder="Pesquisar por nome" />
            </S.GroupContainerHeader>
            <S.GroupContaienrContentContainer height={groupContainerHeight}>
              {groupsWithMessagesFiltred.length > 0 && groupsWithMessagesFiltred.map(g => (
                <S.AsideContentCard onClick={() => addTab(g)} key={`groups-online-${g.id}`}>
                  <S.AsideContentCardImage>
                    <img src={g.image ? g.image.url : "/player.jpg"} alt="" />
                  </S.AsideContentCardImage>
                  <S.AsideContentCardNickname>{g.name}</S.AsideContentCardNickname>
                </S.AsideContentCard>
              ))}
            </S.GroupContaienrContentContainer>
          </S.GroupsContainer>
        </S.AsideContent>
      </S.AsideContainer>
      <S.Chat isOpen={isOpenAside}>
        {messageFile?.name !== undefined && (
          <S.FileSelectedContainer>
            <XIcon onClick={removeMessageFile} />
            {messageFile.type.includes("image/") && (
              <>
                <S.FileSelectedImage src={URL.createObjectURL(messageFile)} />
                <span>
                  {messageFile.name}
                </span>
                <button onClick={() => sendMessage("image", messageFile, removeMessageFile)}>Enviar</button>
              </>
            )}
            {messageFile.type.includes("video/") && (
              <>
                <S.FileSelectedVideoTumb>
                  <VideoTumbnail videoUrl={URL.createObjectURL(messageFile)} />
                </S.FileSelectedVideoTumb>
                {/* <S.FileSelectedImage src={URL.createObjectURL(messageFile)} /> */}
                <span>
                  {messageFile.name}
                </span>
                <button onClick={() => sendMessage("video", messageFile, removeMessageFile)}>Enviar</button>
              </>
            )}

            {!messageFile.type.includes("image/") && !messageFile.type.includes("video/") && (
              <>
                <S.FileSelectedFile>
                  <span>{messageFile.name}</span>
                </S.FileSelectedFile>
                <button onClick={() => sendMessage("file", messageFile, removeMessageFile)}>Enviar</button>
              </>
            )}
          </S.FileSelectedContainer>
        )}
        <S.ChatHeader
          delayOnTouchOnly
          animation={350}
          delay={10}
          list={chatTabs}

          //@ts-ignore
          setList={setChatTabs}
        >
          <S.ToglButton onClick={() => setIsOpenAside(p => !p)}>
            <Bars3Icon />
          </S.ToglButton>
          {chatTabs.map(tab => (
            <S.ChatHeaderCard onClick={() => selectChat(tab)} key={`chat-tab-${tab.id}`}>
              <S.ChatHeaderCardContent>
                <S.ChatHeaderCardContentImage>
                  <img src={tab.image ? tab.image.url : "/player.jpg"} />
                </S.ChatHeaderCardContentImage>
                <S.ChatHeaderCardContentNicname>{tab.name}</S.ChatHeaderCardContentNicname>
              </S.ChatHeaderCardContent>
              <XIcon onClick={() => removeTab(tab)} />
            </S.ChatHeaderCard>
          ))}
        </S.ChatHeader>
        <S.ChatContent ref={chatRef}>
          <>
            {selectedFriend && showMessages && selectedFriend.messages.map(f => (
              <S.ChatMessageContainer showMessages={showMessages} isFriend={f.recipient === user.id} key={f._id} >
                <S.ChatMessageContent>
                  {f.type === "text" && <span onLoad={scrollToBottom} >{f.content}</span>}
                  {f.type === "audio" && <audio onLoad={scrollToBottom} src={f.content} controls >Audio</audio>}
                  {f.type === "image" && <img onLoad={scrollToBottom} src={f.content} />}
                  {f.type === "video" && <Video content={f.content} />}
                  {f.type === "file" && (
                    <S.FileFileMessageContainer>
                      <S.FileFileMessage>
                        <FileIcon />
                        <span>{cutFileName(f.content)}</span>
                      </S.FileFileMessage>
                      <button onClick={() => downloadFile(f.content)} >Download</button>
                    </S.FileFileMessageContainer>
                  )}
                </S.ChatMessageContent>
              </S.ChatMessageContainer>
            ))}
            {selectedGroup && selectedGroup.messages.map(g => (
              <S.ChatMessageContainer showMessages={showMessages} isFriend={g.sender !== user.id} key={g._id} >
                {g.sender !== user.id && (
                  <S.ChatMessageHeader isSender={g.sender === user.id}>
                    <img src={g.image === "" ? "player.jpg" : g.image} alt="" />
                    <span>{g.nickname}</span>
                  </S.ChatMessageHeader>
                )}
                <S.ChatMessageContent>
                  {g.type === "text" && <span onLoad={scrollToBottom} >{g.content}</span>}
                  {g.type === "audio" && <audio onLoad={scrollToBottom} src={g.content} controls >Audio</audio>}
                  {g.type === "image" && <img onLoad={scrollToBottom} src={g.content} />}
                  {g.type === "video" && <Video content={g.content} />}
                  {g.type === "file" && (
                    <S.FileFileMessageContainer>
                      <S.FileFileMessage>
                        <FileIcon />
                        <span>{cutFileName(g.content)}</span>
                      </S.FileFileMessage>
                      <button onClick={() => downloadFile(g.content)} >Download</button>
                    </S.FileFileMessageContainer>
                  )}
                </S.ChatMessageContent>
              </S.ChatMessageContainer>
            ))}
            {chatTabs.length === 0 && (
              <S.NotSelectedText>
                Clique em um(a) amigo(a) ou grupo para começar um bate-papo
              </S.NotSelectedText>
            )}

          </>
        </S.ChatContent>
        {(selectedFriend || selectedGroup) && (
          <S.ChatInputContainer>
            {recordingAudio && (
              <S.ReadingAudioContainer>
                <S.ReadingAudioContentContainer>
                  <Trash onClick={cancelAudio} />
                  <S.ReadingAudio>
                    <S.ReadingAudioTime></S.ReadingAudioTime>
                    <S.ReadingAudioGif src="/readingAudio.gif" />
                  </S.ReadingAudio>
                  <PauseIcon onClick={() => setRecordingAudio(false)} />
                </S.ReadingAudioContentContainer>
              </S.ReadingAudioContainer>
            )}
            {messageFileUrl && (
              <>
                <S.PlayerAudio>
                  <Trash onClick={cancelAudio} />
                  <S.PlayerAudioListener>
                    {isPlayingAudio ? <PauseIcon onClick={handleAudioPlay} /> : <PlayIcon onClick={handleAudioPlay} />}
                    <S.PlayerAudioLine width={0}>
                      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} src={messageFileUrl}></audio>
                      <input
                        type="range"
                        value={audioPercentage}
                        max={100}
                        onChange={handleSeek}
                      />
                    </S.PlayerAudioLine>
                  </S.PlayerAudioListener>
                  <button onClick={() => sendMessage("audio", messageAudioFile!, cancelAudio)} >Enviar</button>
                </S.PlayerAudio>
              </>
            )}
            {!recordingAudio && !messageFileUrl && (
              <>
                <S.ChatInput>
                  <TextArea
                    textAreaStyle={{ height: "50px", border: "2px solid black" }}
                    value={message}
                    onChange={changeMessage}
                    onKeyDown={onKeyDownTextArea}
                  />
                </S.ChatInput>
                <S.ChatItems>
                  <S.Items>
                    <FileIcon onClick={() => setOpenItemsDropDown(prev => !prev)} />
                    <S.DropDown isOpen={openItemsDropDown} >
                      <S.dropDownItem onClick={() => handleInputFileClick("image")}>Enviar Imagem</S.dropDownItem>
                      <S.dropDownItem onClick={() => handleInputFileClick("video")}>Enviar Video</S.dropDownItem>
                      <S.dropDownItem onClick={() => handleInputFileClick("any")}>Enviar Arquivo</S.dropDownItem>
                      <input
                        ref={inputImageFileRef}
                        onChange={handleChangeInputFile}
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }} />
                      <input
                        ref={inputVideoFileRef}
                        onChange={handleChangeInputFile}
                        accept="video/*"
                        type="file"
                        style={{ display: "none" }} />
                      <input
                        ref={inputAnyFileRef}
                        onChange={handleChangeInputFile}
                        type="file"
                        style={{ display: "none" }} />
                    </S.DropDown>
                  </S.Items>
                  <S.Items onClick={readAudio}>
                    <MicrophoneIcon />
                  </S.Items>
                </S.ChatItems>
              </>
            )}
          </S.ChatInputContainer>
        )}
      </S.Chat>
    </S.Container>
  )
}
