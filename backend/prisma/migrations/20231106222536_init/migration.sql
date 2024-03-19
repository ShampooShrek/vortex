-- CreateEnum
CREATE TYPE "BanStatus" AS ENUM ('BANNED', 'UNBANNED');

-- CreateEnum
CREATE TYPE "GroupType" AS ENUM ('PUBLIC', 'RESTRICT', 'PRIVATE');

-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('PENDING', 'ACEPTED', 'DECLINED', 'CANCELED', 'DEVELOPING');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED', 'CANCELED');

-- CreateEnum
CREATE TYPE "AvaliationOptions" AS ENUM ('LIKE', 'DISLIKE');

-- CreateEnum
CREATE TYPE "AchievementType" AS ENUM ('DEFAULT', 'SECRET');

-- CreateEnum
CREATE TYPE "AchievementLevel" AS ENUM ('BRONZE', 'SILVER', 'GOLD', 'PLATINUM');

-- CreateEnum
CREATE TYPE "TypeEmail" AS ENUM ('ConfEmail', 'ForgetPassword');

-- CreateEnum
CREATE TYPE "AdmGameActionOptions" AS ENUM ('DELETE', 'DECLINED', 'ACEPTED', 'DISABLE');

-- CreateEnum
CREATE TYPE "AdmUserActionOptions" AS ENUM ('BAN', 'TIMEOUT', 'PERMANETBAN', 'UNBAN', 'REMOVETIMEOUT');

-- CreateEnum
CREATE TYPE "PrivacyOptions" AS ENUM ('FRIENDS', 'PUBLIC', 'PRIVATE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" INTEGER,
    "bio" VARCHAR(3000),
    "password" TEXT NOT NULL,
    "downloadPathDefault" TEXT,
    "isAdm" BOOLEAN NOT NULL DEFAULT false,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "recoverKey" TEXT,
    "confEmail" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditCards" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "expMonth" TEXT NOT NULL,
    "expYear" TEXT NOT NULL,
    "cvv" TEXT NOT NULL,

    CONSTRAINT "CreditCards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrivacySetting" (
    "id" SERIAL NOT NULL,
    "gamesPrivacy" "PrivacyOptions" NOT NULL DEFAULT 'PUBLIC',
    "friendList" "PrivacyOptions" NOT NULL DEFAULT 'PUBLIC',
    "groupList" "PrivacyOptions" NOT NULL DEFAULT 'PUBLIC',
    "userId" TEXT NOT NULL,

    CONSTRAINT "PrivacySetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserEmailRequests" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "TypeEmail" NOT NULL,
    "code" TEXT NOT NULL,
    "actived" BOOLEAN NOT NULL DEFAULT true,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresIn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserEmailRequests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "readed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GamePath" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,
    "pathGame" TEXT NOT NULL,

    CONSTRAINT "GamePath_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdmUserAction" (
    "id" SERIAL NOT NULL,
    "admId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" "AdmUserActionOptions" NOT NULL,
    "time" INTEGER,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdmUserAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdmGameAction" (
    "id" SERIAL NOT NULL,
    "admId" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,
    "action" "AdmGameActionOptions" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdmGameAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersAndAchievements" (
    "userId" TEXT NOT NULL,
    "achievementId" INTEGER NOT NULL,
    "dateConquist" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsersAndAchievements_pkey" PRIMARY KEY ("userId","achievementId")
);

-- CreateTable
CREATE TABLE "UserGameStatus" (
    "id" SERIAL NOT NULL,
    "lastDay" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "minutesPlayed" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "UserGameStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FriendRequest" (
    "id" SERIAL NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FriendRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FriendsAndUsers" (
    "userId" TEXT NOT NULL,
    "friendId" TEXT NOT NULL,

    CONSTRAINT "FriendsAndUsers_pkey" PRIMARY KEY ("userId","friendId")
);

-- CreateTable
CREATE TABLE "BlockedFriendsOnUsers" (
    "userId" TEXT NOT NULL,
    "blockdUserId" TEXT NOT NULL,
    "blockedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlockedFriendsOnUsers_pkey" PRIMARY KEY ("userId","blockdUserId")
);

-- CreateTable
CREATE TABLE "UserImage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" SERIAL NOT NULL,
    "expiresIn" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "buyDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGamesBox" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserGamesBox_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Games" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION,
    "discount" DOUBLE PRECISION DEFAULT 0.00,
    "description" VARCHAR(5000) DEFAULT '',
    "synopsi" VARCHAR(1000),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "status" "GameStatus" NOT NULL DEFAULT 'DEVELOPING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameUpdateHistoric" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameUpdateHistoric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameAchievements" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "level" "AchievementLevel" NOT NULL DEFAULT 'BRONZE',
    "type" "AchievementType" NOT NULL,

    CONSTRAINT "GameAchievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AchievementImage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "achievementId" INTEGER NOT NULL,

    CONSTRAINT "AchievementImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameArquive" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "execFile" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "GameArquive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameImageCap" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "GameImageCap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameImageVerticalCap" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "GameImageVerticalCap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameImageHorizontalCap" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "GameImageHorizontalCap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameBackgroundImage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "GameBackgroundImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GamePopularImage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "GamePopularImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameIconImage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "GameIconImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameRating" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "GameRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameImages" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "GameImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameVideos" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "GameVideos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameDescriptionImages" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "GameDescriptionImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameCategories" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "portugueseName" TEXT NOT NULL,
    "imgUrl" TEXT,

    CONSTRAINT "GameCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genres" (
    "id" SERIAL NOT NULL,
    "genre" TEXT NOT NULL,
    "portugueseName" TEXT NOT NULL,

    CONSTRAINT "Genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subgenres" (
    "id" SERIAL NOT NULL,
    "subgenre" TEXT NOT NULL,
    "portugueseName" TEXT NOT NULL,

    CONSTRAINT "Subgenres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameDlcs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION,
    "description" VARCHAR(3000) NOT NULL,
    "size" INTEGER NOT NULL,
    "arquiveUrl" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "GameDlcs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameDlcImages" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "GameDlcImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameDlcImageCap" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "gameDlcId" INTEGER NOT NULL,

    CONSTRAINT "GameDlcImageCap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameRequesites" (
    "id" SERIAL NOT NULL,
    "minSO" TEXT NOT NULL,
    "minProcessador" TEXT NOT NULL,
    "minMemory" TEXT NOT NULL,
    "minVideo" TEXT,
    "minArmazenamento" TEXT NOT NULL,
    "others" JSONB,
    "recomendedSO" TEXT,
    "recomendedProcessador" TEXT,
    "recomendedMemory" TEXT,
    "recomendedVideo" TEXT,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "GameRequesites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Avaliations" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "comment" VARCHAR(1000),
    "avaliation" "AvaliationOptions" NOT NULL,
    "gameId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "userDateGameTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Avaliations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvaliationComments" (
    "id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "avaliationId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AvaliationComments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvaliationLikes" (
    "id" SERIAL NOT NULL,
    "type" "AvaliationOptions" NOT NULL,
    "userId" TEXT NOT NULL,
    "avaliationId" INTEGER NOT NULL,

    CONSTRAINT "AvaliationLikes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "groupLink" TEXT NOT NULL,
    "header" TEXT,
    "description" VARCHAR(3000),
    "type" "GroupType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupHistoric" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GroupHistoric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupRequests" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "requestUserId" TEXT NOT NULL,
    "admId" TEXT,
    "status" "RequestStatus" NOT NULL,
    "actionDate" TIMESTAMP(3),
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GroupRequests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupBans" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "admId" TEXT,
    "status" "BanStatus" NOT NULL DEFAULT 'BANNED',
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GroupBans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupImage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "GroupImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupBanner" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "GroupBanner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Developers" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Users" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GamesToGenres" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_GamesToSubgenres" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Favorites" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Cart" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_WishList" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GamesToTransaction" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_GamesToUserGamesBox" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_GamesToGroup" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_GameCategoriesToGames" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_GameDlcsToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Group" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AdminGroup" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nickname_key" ON "User"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PrivacySetting_userId_key" ON "PrivacySetting"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UsersAndAchievements_userId_achievementId_key" ON "UsersAndAchievements"("userId", "achievementId");

-- CreateIndex
CREATE UNIQUE INDEX "UserGameStatus_userId_gameId_key" ON "UserGameStatus"("userId", "gameId");

-- CreateIndex
CREATE UNIQUE INDEX "FriendsAndUsers_userId_friendId_key" ON "FriendsAndUsers"("userId", "friendId");

-- CreateIndex
CREATE UNIQUE INDEX "BlockedFriendsOnUsers_userId_key" ON "BlockedFriendsOnUsers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BlockedFriendsOnUsers_userId_blockdUserId_key" ON "BlockedFriendsOnUsers"("userId", "blockdUserId");

-- CreateIndex
CREATE UNIQUE INDEX "UserImage_userId_key" ON "UserImage"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_userId_key" ON "RefreshToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserGamesBox_userId_key" ON "UserGamesBox"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AchievementImage_achievementId_key" ON "AchievementImage"("achievementId");

-- CreateIndex
CREATE UNIQUE INDEX "GameArquive_gameId_key" ON "GameArquive"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "GameImageCap_gameId_key" ON "GameImageCap"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "GameImageVerticalCap_gameId_key" ON "GameImageVerticalCap"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "GameImageHorizontalCap_gameId_key" ON "GameImageHorizontalCap"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "GameBackgroundImage_gameId_key" ON "GameBackgroundImage"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "GamePopularImage_gameId_key" ON "GamePopularImage"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "GameIconImage_gameId_key" ON "GameIconImage"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "GameCategories_category_key" ON "GameCategories"("category");

-- CreateIndex
CREATE UNIQUE INDEX "GameCategories_portugueseName_key" ON "GameCategories"("portugueseName");

-- CreateIndex
CREATE UNIQUE INDEX "GameCategories_imgUrl_key" ON "GameCategories"("imgUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Genres_genre_key" ON "Genres"("genre");

-- CreateIndex
CREATE UNIQUE INDEX "Genres_portugueseName_key" ON "Genres"("portugueseName");

-- CreateIndex
CREATE UNIQUE INDEX "Subgenres_subgenre_key" ON "Subgenres"("subgenre");

-- CreateIndex
CREATE UNIQUE INDEX "Subgenres_portugueseName_key" ON "Subgenres"("portugueseName");

-- CreateIndex
CREATE UNIQUE INDEX "GameDlcs_gameId_key" ON "GameDlcs"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "GameDlcImages_gameId_key" ON "GameDlcImages"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "GameDlcImageCap_gameDlcId_key" ON "GameDlcImageCap"("gameDlcId");

-- CreateIndex
CREATE UNIQUE INDEX "GameRequesites_gameId_key" ON "GameRequesites"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "Avaliations_gameId_userId_key" ON "Avaliations"("gameId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "AvaliationLikes_avaliationId_userId_key" ON "AvaliationLikes"("avaliationId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Group_name_key" ON "Group"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Group_groupLink_key" ON "Group"("groupLink");

-- CreateIndex
CREATE UNIQUE INDEX "GroupImage_groupId_key" ON "GroupImage"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "GroupBanner_groupId_key" ON "GroupBanner"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "_Developers_AB_unique" ON "_Developers"("A", "B");

-- CreateIndex
CREATE INDEX "_Developers_B_index" ON "_Developers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Users_AB_unique" ON "_Users"("A", "B");

-- CreateIndex
CREATE INDEX "_Users_B_index" ON "_Users"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GamesToGenres_AB_unique" ON "_GamesToGenres"("A", "B");

-- CreateIndex
CREATE INDEX "_GamesToGenres_B_index" ON "_GamesToGenres"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GamesToSubgenres_AB_unique" ON "_GamesToSubgenres"("A", "B");

-- CreateIndex
CREATE INDEX "_GamesToSubgenres_B_index" ON "_GamesToSubgenres"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Favorites_AB_unique" ON "_Favorites"("A", "B");

-- CreateIndex
CREATE INDEX "_Favorites_B_index" ON "_Favorites"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Cart_AB_unique" ON "_Cart"("A", "B");

-- CreateIndex
CREATE INDEX "_Cart_B_index" ON "_Cart"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_WishList_AB_unique" ON "_WishList"("A", "B");

-- CreateIndex
CREATE INDEX "_WishList_B_index" ON "_WishList"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GamesToTransaction_AB_unique" ON "_GamesToTransaction"("A", "B");

-- CreateIndex
CREATE INDEX "_GamesToTransaction_B_index" ON "_GamesToTransaction"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GamesToUserGamesBox_AB_unique" ON "_GamesToUserGamesBox"("A", "B");

-- CreateIndex
CREATE INDEX "_GamesToUserGamesBox_B_index" ON "_GamesToUserGamesBox"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GamesToGroup_AB_unique" ON "_GamesToGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_GamesToGroup_B_index" ON "_GamesToGroup"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GameCategoriesToGames_AB_unique" ON "_GameCategoriesToGames"("A", "B");

-- CreateIndex
CREATE INDEX "_GameCategoriesToGames_B_index" ON "_GameCategoriesToGames"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GameDlcsToUser_AB_unique" ON "_GameDlcsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_GameDlcsToUser_B_index" ON "_GameDlcsToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Group_AB_unique" ON "_Group"("A", "B");

-- CreateIndex
CREATE INDEX "_Group_B_index" ON "_Group"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AdminGroup_AB_unique" ON "_AdminGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_AdminGroup_B_index" ON "_AdminGroup"("B");

-- AddForeignKey
ALTER TABLE "CreditCards" ADD CONSTRAINT "CreditCards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivacySetting" ADD CONSTRAINT "PrivacySetting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEmailRequests" ADD CONSTRAINT "UserEmailRequests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GamePath" ADD CONSTRAINT "GamePath_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GamePath" ADD CONSTRAINT "GamePath_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmUserAction" ADD CONSTRAINT "AdmUserAction_admId_fkey" FOREIGN KEY ("admId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmUserAction" ADD CONSTRAINT "AdmUserAction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmGameAction" ADD CONSTRAINT "AdmGameAction_admId_fkey" FOREIGN KEY ("admId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmGameAction" ADD CONSTRAINT "AdmGameAction_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersAndAchievements" ADD CONSTRAINT "UsersAndAchievements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersAndAchievements" ADD CONSTRAINT "UsersAndAchievements_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "GameAchievements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGameStatus" ADD CONSTRAINT "UserGameStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGameStatus" ADD CONSTRAINT "UserGameStatus_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendsAndUsers" ADD CONSTRAINT "FriendsAndUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendsAndUsers" ADD CONSTRAINT "FriendsAndUsers_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlockedFriendsOnUsers" ADD CONSTRAINT "BlockedFriendsOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlockedFriendsOnUsers" ADD CONSTRAINT "BlockedFriendsOnUsers_blockdUserId_fkey" FOREIGN KEY ("blockdUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserImage" ADD CONSTRAINT "UserImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGamesBox" ADD CONSTRAINT "UserGamesBox_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameUpdateHistoric" ADD CONSTRAINT "GameUpdateHistoric_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameUpdateHistoric" ADD CONSTRAINT "GameUpdateHistoric_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameAchievements" ADD CONSTRAINT "GameAchievements_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchievementImage" ADD CONSTRAINT "AchievementImage_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "GameAchievements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameArquive" ADD CONSTRAINT "GameArquive_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameImageCap" ADD CONSTRAINT "GameImageCap_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameImageVerticalCap" ADD CONSTRAINT "GameImageVerticalCap_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameImageHorizontalCap" ADD CONSTRAINT "GameImageHorizontalCap_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameBackgroundImage" ADD CONSTRAINT "GameBackgroundImage_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GamePopularImage" ADD CONSTRAINT "GamePopularImage_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameIconImage" ADD CONSTRAINT "GameIconImage_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameRating" ADD CONSTRAINT "GameRating_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameRating" ADD CONSTRAINT "GameRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameImages" ADD CONSTRAINT "GameImages_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameVideos" ADD CONSTRAINT "GameVideos_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameDescriptionImages" ADD CONSTRAINT "GameDescriptionImages_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameDlcs" ADD CONSTRAINT "GameDlcs_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameDlcImages" ADD CONSTRAINT "GameDlcImages_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "GameDlcs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameDlcImageCap" ADD CONSTRAINT "GameDlcImageCap_gameDlcId_fkey" FOREIGN KEY ("gameDlcId") REFERENCES "GameDlcs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameRequesites" ADD CONSTRAINT "GameRequesites_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliations" ADD CONSTRAINT "Avaliations_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliations" ADD CONSTRAINT "Avaliations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvaliationComments" ADD CONSTRAINT "AvaliationComments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvaliationComments" ADD CONSTRAINT "AvaliationComments_avaliationId_fkey" FOREIGN KEY ("avaliationId") REFERENCES "Avaliations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvaliationLikes" ADD CONSTRAINT "AvaliationLikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvaliationLikes" ADD CONSTRAINT "AvaliationLikes_avaliationId_fkey" FOREIGN KEY ("avaliationId") REFERENCES "Avaliations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupHistoric" ADD CONSTRAINT "GroupHistoric_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupHistoric" ADD CONSTRAINT "GroupHistoric_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupRequests" ADD CONSTRAINT "GroupRequests_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupRequests" ADD CONSTRAINT "GroupRequests_requestUserId_fkey" FOREIGN KEY ("requestUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupRequests" ADD CONSTRAINT "GroupRequests_admId_fkey" FOREIGN KEY ("admId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupBans" ADD CONSTRAINT "GroupBans_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupBans" ADD CONSTRAINT "GroupBans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupBans" ADD CONSTRAINT "GroupBans_admId_fkey" FOREIGN KEY ("admId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupImage" ADD CONSTRAINT "GroupImage_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupBanner" ADD CONSTRAINT "GroupBanner_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Developers" ADD CONSTRAINT "_Developers_A_fkey" FOREIGN KEY ("A") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Developers" ADD CONSTRAINT "_Developers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Users" ADD CONSTRAINT "_Users_A_fkey" FOREIGN KEY ("A") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Users" ADD CONSTRAINT "_Users_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToGenres" ADD CONSTRAINT "_GamesToGenres_A_fkey" FOREIGN KEY ("A") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToGenres" ADD CONSTRAINT "_GamesToGenres_B_fkey" FOREIGN KEY ("B") REFERENCES "Genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToSubgenres" ADD CONSTRAINT "_GamesToSubgenres_A_fkey" FOREIGN KEY ("A") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToSubgenres" ADD CONSTRAINT "_GamesToSubgenres_B_fkey" FOREIGN KEY ("B") REFERENCES "Subgenres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Favorites" ADD CONSTRAINT "_Favorites_A_fkey" FOREIGN KEY ("A") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Favorites" ADD CONSTRAINT "_Favorites_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Cart" ADD CONSTRAINT "_Cart_A_fkey" FOREIGN KEY ("A") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Cart" ADD CONSTRAINT "_Cart_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WishList" ADD CONSTRAINT "_WishList_A_fkey" FOREIGN KEY ("A") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WishList" ADD CONSTRAINT "_WishList_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToTransaction" ADD CONSTRAINT "_GamesToTransaction_A_fkey" FOREIGN KEY ("A") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToTransaction" ADD CONSTRAINT "_GamesToTransaction_B_fkey" FOREIGN KEY ("B") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToUserGamesBox" ADD CONSTRAINT "_GamesToUserGamesBox_A_fkey" FOREIGN KEY ("A") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToUserGamesBox" ADD CONSTRAINT "_GamesToUserGamesBox_B_fkey" FOREIGN KEY ("B") REFERENCES "UserGamesBox"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToGroup" ADD CONSTRAINT "_GamesToGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToGroup" ADD CONSTRAINT "_GamesToGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameCategoriesToGames" ADD CONSTRAINT "_GameCategoriesToGames_A_fkey" FOREIGN KEY ("A") REFERENCES "GameCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameCategoriesToGames" ADD CONSTRAINT "_GameCategoriesToGames_B_fkey" FOREIGN KEY ("B") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameDlcsToUser" ADD CONSTRAINT "_GameDlcsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "GameDlcs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameDlcsToUser" ADD CONSTRAINT "_GameDlcsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Group" ADD CONSTRAINT "_Group_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Group" ADD CONSTRAINT "_Group_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdminGroup" ADD CONSTRAINT "_AdminGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdminGroup" ADD CONSTRAINT "_AdminGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
