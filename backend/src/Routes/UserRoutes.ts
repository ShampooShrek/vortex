import { Router } from "express"
import { userChatAudioUpload, userChatFileUpload, userChatImageUpload, userChatVideoUpload, userImageUpload } from "../middlewares/multer"

import * as User from "../controllers/UserController/user"
import * as UserImage from "../controllers/UserController/images"
import * as Favorites from "../controllers/UserController/favorites"
import * as Avaliations from "../controllers/UserController/avaliations"
import * as FriendsAndBlocks from "../controllers/UserController/friendsAndBlocks"
import * as Games from "../controllers/UserController/games"
import * as Cart from "../controllers/UserController/cart"
import * as Groups from "../controllers/UserController/group"
import * as Chat from "../controllers/UserController/chat"
import TokenVerify, { TokenOptional } from "../middlewares/TokenVerify"
import { SignIn } from "../controllers/UserController/Auth/login"
import { GetUserByToken, refreshToken } from "../controllers/UserController/Auth/token"
import { GetAdminData } from "../controllers/UserController/admin"
import { getMessages } from "../controllers/UserController/messages"
import { getGameDevelopers } from "../controllers/GamesController/games"

const routes: Router = Router()

// -- User --
routes.post("/api/users/auth", SignIn)
routes.post("/api/refresh_token", refreshToken)
routes.post("/api/users/auth/authentication", GetUserByToken)

routes.route("/api/users")
  .post(User.postUser)
  .get(User.getUsers)

routes.route("/api/users/:userId")
  .get(TokenOptional, User.getUser)
  .put(TokenVerify, User.updateUser)


routes.get("/api/users/recover_key/:key", User.GetUserByRecoverKey)
routes.get("/api/users/account/social", TokenVerify, User.Social)
routes.get("/api/users/account/edit", TokenVerify, User.Edit)
routes.post("/api/users/:userId/send_new_email", User.sendNewEmail)
// routes.post("/api/users/:userId/send_conf_email", User.SendConfEmail)
routes.post("/api/users/:userId/confirm_email", User.confEmail)
routes.post("/api/users/recover/recover_password", User.RecoverPasswordEmail)
routes.put("/api/users/:userId/update_privacy", TokenVerify, User.updateUserPrivacy)
routes.put("/api/users/password/update_password", User.updateUserPassword)

routes.get("/api/users/:userId/details", TokenOptional, User.GetDetails)
routes.get("/api/users/search/:nickname", User.SearchUsers)

// -- Image --
routes.route("/api/users/:userId/image")
  .post(userImageUpload.single("file"), UserImage.addPerfilImage)
  .delete(UserImage.deleteImage)

// -- Favorites --
routes.get("/api/users/account/favorites", TokenVerify, Favorites.getFavorites)
routes.post("/api/users/account/favorites", TokenVerify, Favorites.updateFavorites)
routes.post("/api/users/account/favorites/add", TokenVerify, Favorites.addToFavorites)
routes.post("/api/users/account/favorites/remove", TokenVerify, Favorites.removeFromFavorites)
// routes.delete("/api/users/account/favorites/:gameId", TokenVerify, Favorites.desfavorite)

// -- Cart --
routes.get("/api/users/account/cart", TokenVerify, Cart.getCartItems)
routes.post("/api/users/account/cart/:gameId", TokenVerify, Cart.addItemCart)
routes.delete("/api/users/account/cart/:gameId", TokenVerify, Cart.removeItemCart)

routes.route("/api/users/account/transactions")
  .post(TokenVerify, Cart.createTransaction)
  .get(TokenVerify, Cart.getTransactions)

// -- Avaliations --
routes.post("/api/users/avaliations/:gameId", TokenVerify, Avaliations.postAvaliations)

routes.route("/api/users/avaliations/:id")
  .put(TokenVerify, Avaliations.updateUserAvaliation)
  .delete(TokenVerify, Avaliations.deleteAvaliation)

routes.get("/api/users/avaliations/get_all_avaliations", TokenVerify, Avaliations.getUserAvaliations)
routes.get("/api/users/:userId/avaliations/:avaliationId", Avaliations.getAvaliation)

// -- Friends --
routes.post("/api/users/friends/requests/send_request/:friendId", TokenVerify, FriendsAndBlocks.sendFriendRequest)
routes.post("/api/users/friends/requests/request_action/:requestId", TokenVerify, FriendsAndBlocks.friendRequestAction)
routes.delete("/api/users/friends/remove_friend/:friendId", TokenVerify, FriendsAndBlocks.removeFriend)

routes.get("/api/users/:userId/friends/requests/:requestType", FriendsAndBlocks.getFriendsRequests)
routes.get("/api/users/social/friends", TokenVerify, FriendsAndBlocks.getFriends)
routes.get("/api/users/friends/:friendId/messages", TokenVerify, getMessages)

routes.delete("/api/users/friends/requests/delete_request/:friendId", TokenVerify, FriendsAndBlocks.deleteFriendRequest)

// -- Blocks --
routes.post("/api/users/blocked_users/block/:blockId", TokenVerify, FriendsAndBlocks.blockUser)
routes.post("/api/users/blocked_users/desblock/:blockedId", TokenVerify, FriendsAndBlocks.desblockFriend)
routes.get("/api/users/:userId/blocked_users", FriendsAndBlocks.getBlockedUsers)

// -- Achievements --
routes.post("/api/users/:userId/achievements/:achievementId", Games.userConnectAchievement)
routes.get("/api/users/:userId/achievements/:gameId", TokenOptional, Games.getUserAchievements)
routes.delete("/api/users/:userId/achievements/:achievementId", Games.disconnectAchievement)

// -- Games --
routes.get("/api/users/games/games_developer", TokenVerify, getGameDevelopers)
routes.post("/api/users/connect_game/:gameId", Games.connectGame)
routes.post("/api/users/download_game/:gameId", Games.downloadGame)
routes.post("/api/users/exec_game/:gameId", Games.execGame)

routes.get("/api/users/games/user_boxs", TokenVerify, Games.GetGamesBox)
routes.post("/api/users/games/user_boxs", TokenVerify, Games.createGameBox)
routes.put("/api/users/games/user_boxs", TokenVerify, Games.updateGameBox)

// -- Groups --
routes.get("/api/groups/search/:name", TokenVerify, Groups.SearchGroups)
routes.get("/api/groups/:groupId/messages", TokenVerify, Groups.getMessages)
routes.get("/api/groups/get_group/:groupLink", Groups.getGroup)
routes.get("/api/users/chat/groups", TokenVerify, Groups.getGroupsChat)
routes.get("/api/users/social/groups", TokenVerify, Groups.getGroups)
routes.post("/api/groups/create", TokenVerify, Groups.createGroup)
routes.post("/api/groups/games/connect/:gameId", Groups.connectGroupGame)

routes.post("/api/groups/user/request/:groupId", TokenVerify, Groups.userGroupRequest)
routes.post("/api/groups/user/request/action/:requestId", TokenVerify, Groups.requestAction)
routes.post("/api/groups/user/request/cancel_request/:requestId", TokenVerify, Groups.cancelRequest)
routes.post("/api/groups/user/adm_quit_user/:groupId/:userId", TokenVerify, Groups.admQuitUser)
routes.post("/api/groups/user/quit_group/:groupId", TokenVerify, Groups.userQuitGroup)
routes.post("/api/groups/user/ban/:userId", TokenVerify, Groups.admBanUser)
routes.post("/api/groups/user/unban/:userId", TokenVerify, Groups.admUnbanUser)

routes.put("/api/groups/update/:groupId/update_members", TokenVerify, Groups.UpdateMembers)
routes.put("/api/groups/update/:groupId", TokenVerify, Groups.updateGroup)
routes.put("/api/groups/update/:groupId/images/:tag", userImageUpload.single("file"), TokenVerify, Groups.updateGroupImages)

// -- Admin --
routes.get("/api/users/admins/get_coisas", TokenVerify, GetAdminData)

// -- Chat --
routes.post("/api/users/chat/files/image", userChatImageUpload.single("file"), TokenVerify, Chat.addChatImage)
routes.post("/api/users/chat/files/video", userChatVideoUpload.single("file"), TokenVerify, Chat.addChatVideo)
routes.post("/api/users/chat/files/file", userChatFileUpload.single("file"), TokenVerify, Chat.addChatFile)
routes.post("/api/users/chat/files/audio", userChatAudioUpload.single("file"), TokenVerify, Chat.addChatAudio)

export default routes
