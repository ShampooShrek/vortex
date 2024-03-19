import { Router } from "express"
import * as Games from "../controllers/GamesController/games"
import * as Images from "../controllers/GamesController/images"
import * as Videos from "../controllers/GamesController/videos"
import * as Categories from "../controllers/GamesController/categories"
import * as Genres from "../controllers/GamesController/genres"
import * as Subgenres from "../controllers/GamesController/subgenres"
import * as Achievements from "../controllers/GamesController/achievements"
import * as File from "../controllers/GamesController/gameFile"
import { PostRequesites } from "../controllers/GamesController/requesites"
import { gameUploadFile, gameUploadVideos, gameUploadImage, gameUploadDescriptionImage, gameReadFile } from "../middlewares/multer"
import TokenVerify, { TokenOptional } from "../middlewares/TokenVerify"

const routes: Router = Router()

// -- Games --
routes.route("/api/games")
  .post(TokenVerify, Games.postGame)
  .get(Games.getGames)

routes.get("/api/games/home", TokenOptional, Games.HomeRequest)
routes.get("/api/games/home/games", Games.HomeGames)
routes.post("/api/games/filters/filter_games/:tag", Games.FilterGamesByTags)

routes.route("/api/games/:gameId")
  .get(Games.getGame)
  .put(TokenVerify, Games.putGame)
  .delete(TokenVerify, Games.desactiveGame)

routes.get("/api/games/:gameId/developers", Games.GetGameDevelopers)

routes.post("/api/games/:gameId/requesites", TokenVerify, PostRequesites)

routes.get("/api/games/edit/:gameId", TokenVerify, Games.getGameEdit)
routes.get("/api/games/beta/:gameId", TokenVerify, Games.getBetaGame)
routes.get("/api/games/beta/:gameId/images", TokenVerify, Images.getGameImages)

routes.post("/api/games/:gameId/change_status", TokenVerify, Games.changeGameStatus)
routes.post("/api/games/:gameId/publish/set_pending", TokenVerify, Games.publisherGame)
routes.post("/api/games/:gameId/publish/set_developing", TokenVerify, Games.CancelSendGame)

routes.put("/api/games/description/:gameId", TokenVerify, Games.putGameDescription)
routes.get("/api/games/desactived_games", Games.getDesactivedGames)
routes.put("/api/games/desactived_games/:gameId", Games.activeGame)
routes.post("/api/games/search", TokenOptional, Games.MainSearchGames)
routes.get("/api/games/search/:name", Games.GetGamesByName)

// -- Videos --
routes.route("/api/games/videos/:videoId")
  .put(TokenVerify, Videos.putGameVideo)
  .delete(TokenVerify, Videos.deleteGameVideo)

routes.post("/api/games/:gameId/videos", gameUploadVideos.single("file"), TokenVerify, Videos.postGameVideos)

// -- Imases --
routes.post("/api/games/:gameId/screen_shoot_images", gameUploadImage.single("file"), TokenVerify, Images.postGameImages)
routes.post("/api/games/:gameId/description_images", gameUploadDescriptionImage.single("file"), TokenVerify, Images.postGameDescriptionImages)
routes.post("/api/games/:gameId/images/:tag", gameUploadImage.single("file"), TokenVerify, Images.postGameImage)

// routes.route("/api/games/:gameId/images/:imageId")
//   .put(TokenVerify, gameUploadImage.single("file"), Images.putGameImage)
//   .delete(TokenVerify, Images.deleteGameImage)

routes.route("/api/games/screen_shoot_images/:imageId")
  .put(TokenVerify, Images.putGameImage)
  .delete(TokenVerify, Images.deleteGameImage)

routes.delete("/api/games/:gameId/description_images/:imageId", TokenVerify, Images.deleteGameDescriptionImage)


// -- Achievements --
routes.route("/api/games/:gameId/achievements")
  .post(TokenVerify, Achievements.postAchievements)
  .get(Achievements.getAchievements)

routes.route("/api/games/:gameId/achievements/:achievementId")
  .put(TokenVerify, Achievements.putAchievements)
  .delete(TokenVerify, Achievements.deleteAchievement)

routes.post("/api/games/achievements/:achievementId/image", gameUploadImage.single("file"), TokenVerify, Achievements.postAchievementImage)

// -- Categories --
routes.route("/api/games/:gameId/categories")
  .post(TokenVerify, Categories.postCategoyInGames)
  .put(TokenVerify, Categories.removeCategoryInGame)

routes.post("/api/category/games_by_categories", Categories.getGameByCategories)
routes.get("/api/category/games_by_categories/:categoryParam", Games.GetBetterOfCategory)
routes.get("/api/category/games_with_category/:categoryParam", Categories.GetGamesWithCoisaInCategories)

routes.post("/api/categories", Categories.postCategory)
routes.get("/api/categories", Categories.getCategories)


// -- Genres --
routes.route("/api/games/:gameId/genres")
  .post(TokenVerify, Genres.postGenreInGames)
  .put(TokenVerify, Genres.removeGenreInGame)

routes.post("/api/genres", Genres.postGenres)
routes.get("/api/genres", Genres.getGenres)

routes.get("/api/genres/games_by_genre/:genreParam", Games.GetBetterOfGenre)
routes.get("/api/genres/games_with_genres/:genreParam", Genres.GetGamesWithCoisaInGenres)

// -- Subgenres --
routes.route("/api/games/:gameId/subgenres")
  .post(TokenVerify, Subgenres.postSubgenresInGames)
  .put(TokenVerify, Subgenres.removeSubgenreInGame)

routes.post("/api/subgenres", Subgenres.postSubgenres)
routes.get("/api/subgenres", Subgenres.getSubgenres)

routes.get("/api/subgenres/games_by_subgenre/:subgenreParam", Games.GetBetterOfSubgenre)
routes.get("/api/subgenres/games_with_subgenres/:subgenreParam", Subgenres.GetGamesWithCoisaInSubgenres)


routes.get("/api/games/filters/tags", Games.GetFilters)

// -- File -- 
routes.post("/api/games/file/get_file_entries", gameReadFile.single("file"), File.getGameFiles)
routes.post("/api/games/:gameId/game_file", gameUploadFile.single("file"), TokenVerify, File.postGameFile)

export default routes
