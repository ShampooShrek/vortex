"use client"

import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react"
import { setCookie, deleteCookie, getCookie } from "cookies-next"
import { FriendsWithMessages, GamesStore, GroupMessage, GroupMessageReceived, Groups, GroupsWithMessages, Message, SocialRequestInterface, UserAuth, UsersOnline } from "@/models/frontModels"
import { useRouter } from "next/navigation"
import api from "@/services/api"
import ApiRequest from "@/utils/ApiRequests"
import socket from "@/services/socket"

interface LoginResponse {
  token: string
  user: UserAuth
  refreshToken: {
    expiresIn: number
  }
}

interface Response<T> {
  type: "success" | "error"
  response: T | string
}


interface ContextProps {
  login(nickname: string, password: string): Promise<any>
  logout(): void
  loading: boolean
  logged: boolean
  user: UserAuth | null
  addToCart(gameId: number): Promise<void | string>
  setUser: Dispatch<SetStateAction<UserAuth | null>>
  setFriendsWithMessages: Dispatch<SetStateAction<FriendsWithMessages[]>>
  setGroupsWithMessages: Dispatch<SetStateAction<GroupsWithMessages[]>>
  setSocial(data: SocialRequestInterface): void
  userStatus(id: string): string
  setGroups(data: Groups): void
  usersOnline: UsersOnline[]
  friendsWithMessages: FriendsWithMessages[]
  groupsWithMessages: GroupsWithMessages[]
  getFriends(): Promise<void>
  getGroups(): Promise<void>
  newMessages: Message[]

}

const setAuthCookies = (key: string, login: boolean, value: string) => {
  if (login) {
    setCookie(key, value, {
      maxAge: 60 * 60 * 24 * 7, // 7 DAYS
      path: "/"
    })
  } else {
    deleteCookie(key)
  }
}

export const AuthContext = createContext({} as ContextProps)

export default function AuthProvider({ children }: { children: React.ReactNode }) {

  const [user, setUser] = useState<UserAuth | null>(null)
  const [usersOnline, setUsersOnline] = useState<UsersOnline[]>([])
  const [friendsWithMessages, setFriendsWithMessages] = useState<FriendsWithMessages[]>([])
  const [groupsWithMessages, setGroupsWithMessages] = useState<GroupsWithMessages[]>([])
  const [newMessages, setNewMessages] = useState<Message[]>([])
  const [logged, setLogged] = useState(false)
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    async function validateToken() {
      const token = getCookie("vortex-auth-token")
      if (!token) {
        setUser(null)
        setLogged(false)
        setLoading(false)
      } else {
        const response = await ApiRequest<UserAuth>("/api/users/auth/authentication", "post", { token })
        if (response && response.type === "success") {
          const dataUser = response.response as UserAuth
          setUser({
            ...dataUser, adminGroups: [], groups: []
          })
          setLogged(true)
          socket.emit("login", dataUser.id)
        }
        setLoading(false)
      }
    }

    validateToken()
  }, [])

  useEffect(() => {
    socket.on("users-online", (usersOnline) => setUsersOnline(usersOnline))
    return () => {
      socket.off("users-online")
    }
  }, [])

  useEffect(() => {
    socket.on("message-received", (createMessage: Message) => {
      const { recipient, sender } = createMessage
      const friend = friendsWithMessages.find(f => f.id === sender || f.id === recipient)
      if (friend) {
        friend.messages.push(createMessage)
        setFriendsWithMessages(prevFriends => {
          const updatedFriends = [...prevFriends]
          const friendIndex = updatedFriends.findIndex(f => f.id === friend.id)
          if (friendIndex !== -1) {
            updatedFriends[friendIndex] = friend
          }
          return updatedFriends
        })
      }
    })


    return () => {
      socket.off("message-received")
    }
  }, [friendsWithMessages])

  useEffect(() => {
    socket.on("group-message-received", (createMessage: GroupMessage) => {
      const { group: groupId } = createMessage
      const group = groupsWithMessages.find(g => g.id === groupId)
      if (group) {
        group.messages.push(createMessage as GroupMessageReceived)
        setGroupsWithMessages(prevGroup => {
          const updatedGroups = [...prevGroup]
          const groupIndex = updatedGroups.findIndex(f => f.id === groupId)
          if (groupIndex !== -1) {
            updatedGroups[groupIndex] = group
          }
          return updatedGroups
        })
      }
    })


    return () => {
      socket.off("group-message-received")
    }
  }, [groupsWithMessages])

  const login = async (nicknameOrEmail: string, password: string) => {
    const response = await ApiRequest<LoginResponse>("/api/users/auth", "post", { nicknameOrEmail, password })
    if (response) {
      if (response.type === "success") {
        const data = response.response as LoginResponse
        api.defaults.headers["Authorization"] = `Bearer ${data.token}`
        setAuthCookies("vortex-auth-token", true, data.token)
        setUser(data.user)
        setLogged(true)
        socket.emit("login", data.user.id)
        router.push("/home")
        return true
      } else {
        return response.response
      }
    }
  }

  const addToCart = async (gameId: number) => {
    if (user) {
      let game;
      const gameResp = await ApiRequest<GamesStore>(`/api/users/account/cart/${gameId}`, "post")

      if (gameResp) {
        if (gameResp.type === "success") {
          game = gameResp.response as GamesStore
        } else {
          return gameResp.response as string
        }
      }

      if (!user.cart) {
        try {
          const cart = await ApiRequest<number[]>(`/api/users/account/cart`, "get")
          if (cart) {
            if (cart.type === "success") {
              const data = cart.response as number[]
              if (cart) {
                setUser(prevUser => ({ ...prevUser!, cart: data.map(c => ({ id: c })) }))
              }

              if (game) {
                const userCart = [game.id, ...user.cart!]
                setUser(prev => ({ ...prev!, cart: userCart.map(c => ({ id: c })) }))
              }
            } else {
              return "error"
            }
          }
        } catch (err) {
          alert(err)
        }
      } else {
        const updatedCart = [{ id: gameId }, ...user.cart]
        setUser(prev => ({ ...prev!, cart: updatedCart }))
      }
    }
  }


  const getFriends = async () => {
    if (user) {
      const resp = await ApiRequest<FriendsWithMessages[]>(`/api/users/social/friends`, "get")
      if (resp) {
        if (resp.type === "success") {
          const data = resp.response as FriendsWithMessages[]
          setFriendsWithMessages(data)
          data.map(f => {
            socket.emit("join-room", { id1: user.id, id2: f.id })
          })
        }
      }
    }
  }

  const getGroups = async () => {
    if (user) {
      const resp = await ApiRequest<GroupsWithMessages[]>(`/api/users/chat/groups`, "get")
      if (resp) {
        if (resp.type === "success") {
          const data = resp.response as GroupsWithMessages[]
          setGroupsWithMessages(data)
          data.map(g => {
            socket.emit("join-group-room", { groupId: g.id })
          })
        }
      }
    }
  }

  const setSocial = (data: SocialRequestInterface) => {
    setUser(prev => ({ ...prev!, ...data }))
  }

  const setGroups = (data: Groups) => {
    const groups = user?.adminGroups ? [...user.adminGroups] : []
    if (!groups.some(g => g.id === data.id)) {
      groups.push(data)
      setUser(prev => ({ ...prev!, adminGroups: groups }))
    }
  }

  const logout = () => {
    setUser(null)
    setLogged(false)
    deleteCookie("vortex-auth-token")
    delete api.defaults.headers["Authorization"]
    router.push("/auth/signIn")
  }

  const userStatus = (id: string) => {
    const findUser = usersOnline.find(u => u.id === id)
    if (findUser) {
      return findUser.status
    } else {
      return "off-line"
    }
  }


  return (
    <AuthContext.Provider value={{
      setSocial,
      userStatus,
      setGroups,
      setGroupsWithMessages,
      setFriendsWithMessages,
      newMessages,
      friendsWithMessages,
      getFriends,
      getGroups,
      groupsWithMessages,
      usersOnline,
      addToCart,
      setUser,
      logged,
      login,
      logout,
      user,
      loading
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}
