/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: FollowUser
// ====================================================

export interface FollowUser_followUser_following {
  __typename: "FollowType";
  id: string;
  name: string | null;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  userImg: string | null;
  bio: string;
  isFollowing: boolean | null;
}

export interface FollowUser_followUser {
  __typename: "FollowUserResponse";
  following: FollowUser_followUser_following | null;
}

export interface FollowUser {
  followUser: FollowUser_followUser;
}

export interface FollowUserVariables {
  userId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UnfollowUser
// ====================================================

export interface UnfollowUser_unfollowUser_following {
  __typename: "FollowType";
  id: string;
  name: string | null;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  userImg: string | null;
  bio: string;
  isFollowing: boolean | null;
}

export interface UnfollowUser_unfollowUser {
  __typename: "UnfollowUserResponse";
  following: UnfollowUser_unfollowUser_following | null;
}

export interface UnfollowUser {
  unfollowUser: UnfollowUser_unfollowUser;
}

export interface UnfollowUserVariables {
  userId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTeamsForPlayer
// ====================================================

export interface GetTeamsForPlayer_getTeamsForPlayer_teams_sport {
  __typename: "SportType";
  id: string;
  name: string;
}

export interface GetTeamsForPlayer_getTeamsForPlayer_teams {
  __typename: "TeamType";
  id: string;
  teamName: string;
  coverImg: string | null;
  sport: GetTeamsForPlayer_getTeamsForPlayer_teams_sport;
  rating: number | null;
}

export interface GetTeamsForPlayer_getTeamsForPlayer {
  __typename: "GetTeamsForPlayerResponse";
  teams: (GetTeamsForPlayer_getTeamsForPlayer_teams | null)[] | null;
}

export interface GetTeamsForPlayer {
  getTeamsForPlayer: GetTeamsForPlayer_getTeamsForPlayer;
}

export interface GetTeamsForPlayerVariables {
  sportIds: (string | null)[];
  userId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpvotePost
// ====================================================

export interface UpvotePost_upvotePost {
  __typename: "UpvotePostResponse";
  ok: boolean | null;
}

export interface UpvotePost {
  upvotePost: UpvotePost_upvotePost;
}

export interface UpvotePostVariables {
  postId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DownvotePost
// ====================================================

export interface DownvotePost_downvotePost {
  __typename: "DownvotePostResponse";
  ok: boolean | null;
}

export interface DownvotePost {
  downvotePost: DownvotePost_downvotePost;
}

export interface DownvotePostVariables {
  postId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemovePostInteraction
// ====================================================

export interface RemovePostInteraction_removePostInteraction {
  __typename: "RemovePostInteractionResponse";
  ok: boolean | null;
}

export interface RemovePostInteraction {
  removePostInteraction: RemovePostInteraction_removePostInteraction;
}

export interface RemovePostInteractionVariables {
  postId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreatePost
// ====================================================

export interface CreatePost_createPost_post_postedBy {
  __typename: "UserType";
  id: string;
  name: string | null;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  userImg: string | null;
}

export interface CreatePost_createPost_post {
  __typename: "PostType";
  id: string;
  text: string | null;
  postImg: string | null;
  createdAt: any;
  score: number;
  interaction: string | null;
  postedBy: CreatePost_createPost_post_postedBy;
}

export interface CreatePost_createPost {
  __typename: "CreatePostReponse";
  post: CreatePost_createPost_post | null;
}

export interface CreatePost {
  createPost: CreatePost_createPost;
}

export interface CreatePostVariables {
  text: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_tokenAuth {
  __typename: "ObtainJSONWebToken";
  token: string | null;
}

export interface Login {
  /**
   * Obtain JSON Web Token mutation
   */
  tokenAuth: Login_tokenAuth | null;
}

export interface LoginVariables {
  username: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Signup
// ====================================================

export interface Signup_createUser_user {
  __typename: "UserType";
  id: string;
}

export interface Signup_createUser {
  __typename: "CreateUserReponse";
  user: Signup_createUser_user | null;
}

export interface Signup {
  createUser: Signup_createUser;
}

export interface SignupVariables {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateEvent
// ====================================================

export interface CreateEvent_createEvent_event_sport {
  __typename: "SportType";
  id: string;
  name: string;
}

export interface CreateEvent_createEvent_event_owner {
  __typename: "UserType";
  id: string;
  name: string | null;
}

export interface CreateEvent_createEvent_event {
  __typename: "EventType";
  id: string;
  name: string;
  description: string | null;
  sport: CreateEvent_createEvent_event_sport;
  maximumMembers: number;
  minimumMembers: number;
  expectedTeams: number;
  startDate: any | null;
  endDate: any | null;
  startTime: any | null;
  endTime: any | null;
  owner: CreateEvent_createEvent_event_owner;
}

export interface CreateEvent_createEvent {
  __typename: "CreateEventResponse";
  event: CreateEvent_createEvent_event | null;
}

export interface CreateEvent {
  createEvent: CreateEvent_createEvent;
}

export interface CreateEventVariables {
  name: string;
  description?: string | null;
  sportId: string;
  maximumMembers: number;
  minimumMembers: number;
  expectedTeams?: number | null;
  startDate?: any | null;
  endDate?: any | null;
  startTime?: any | null;
  endTime?: any | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateTeam
// ====================================================

export interface CreateTeam_createTeam {
  __typename: "CreateTeamResponse";
  ok: boolean | null;
}

export interface CreateTeam {
  createTeam: CreateTeam_createTeam;
}

export interface CreateTeamVariables {
  teamName: string;
  sportId: string;
  memberIds?: (string | null)[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserFromUsername
// ====================================================

export interface GetUserFromUsername_getUserFromUsername_user {
  __typename: "UserType";
  id: string;
  name: string | null;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  userImg: string | null;
}

export interface GetUserFromUsername_getUserFromUsername {
  __typename: "GetUserFromUsernameReponse";
  user: GetUserFromUsername_getUserFromUsername_user | null;
}

export interface GetUserFromUsername {
  getUserFromUsername: GetUserFromUsername_getUserFromUsername;
}

export interface GetUserFromUsernameVariables {
  username: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUser
// ====================================================

export interface UpdateUser_updateUser_user {
  __typename: "UserType";
  firstName: string;
  lastName: string;
  bio: string;
  userImg: string | null;
}

export interface UpdateUser_updateUser {
  __typename: "UpdateUserResponse";
  user: UpdateUser_updateUser_user | null;
}

export interface UpdateUser {
  updateUser: UpdateUser_updateUser;
}

export interface UpdateUserVariables {
  firstName: string;
  lastName: string;
  bio: string;
  password: string;
  userImg?: any | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateSports
// ====================================================

export interface UpdateSports_updateSports_user_sports {
  __typename: "UserPlaysSportType";
  id: string;
  name: string | null;
}

export interface UpdateSports_updateSports_user {
  __typename: "UserType";
  sports: (UpdateSports_updateSports_user_sports | null)[] | null;
}

export interface UpdateSports_updateSports {
  __typename: "UpdateSportsResponse";
  user: UpdateSports_updateSports_user | null;
}

export interface UpdateSports {
  updateSports: UpdateSports_updateSports;
}

export interface UpdateSportsVariables {
  sportIds: (string | null)[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateTeam
// ====================================================

export interface UpdateTeam_updateTeam_team_sport {
  __typename: "SportType";
  id: string;
  name: string;
}

export interface UpdateTeam_updateTeam_team_members {
  __typename: "UserType";
  id: string;
  name: string | null;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  userImg: string | null;
  bio: string;
  isFollowing: boolean | null;
}

export interface UpdateTeam_updateTeam_team {
  __typename: "TeamType";
  id: string;
  teamName: string;
  coverImg: string | null;
  sport: UpdateTeam_updateTeam_team_sport;
  members: UpdateTeam_updateTeam_team_members[];
}

export interface UpdateTeam_updateTeam {
  __typename: "UpdateTeamResponse";
  team: UpdateTeam_updateTeam_team | null;
}

export interface UpdateTeam {
  updateTeam: UpdateTeam_updateTeam;
}

export interface UpdateTeamVariables {
  teamId: string;
  teamName: string;
  sportId: string;
  memberIds?: (string | null)[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMainFeed
// ====================================================

export interface GetMainFeed_getMainFeed_posts_postedBy {
  __typename: "UserType";
  id: string;
  name: string | null;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  userImg: string | null;
}

export interface GetMainFeed_getMainFeed_posts {
  __typename: "PostType";
  id: string;
  text: string | null;
  postImg: string | null;
  createdAt: any;
  score: number;
  interaction: string | null;
  postedBy: GetMainFeed_getMainFeed_posts_postedBy;
}

export interface GetMainFeed_getMainFeed {
  __typename: "GetMainFeedResponse";
  posts: (GetMainFeed_getMainFeed_posts | null)[] | null;
}

export interface GetMainFeed {
  getMainFeed: GetMainFeed_getMainFeed;
}

export interface GetMainFeedVariables {
  pageNum?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllSports
// ====================================================

export interface GetAllSports_getAllSports_sports {
  __typename: "SportType";
  id: string;
  name: string;
}

export interface GetAllSports_getAllSports {
  __typename: "GetAllSportReponse";
  sports: (GetAllSports_getAllSports_sports | null)[] | null;
}

export interface GetAllSports {
  getAllSports: GetAllSports_getAllSports;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserFollowers
// ====================================================

export interface GetUserFollowers_getUser_user_followers {
  __typename: "FollowType";
  id: string;
  name: string | null;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  userImg: string | null;
  bio: string;
  isFollowing: boolean | null;
}

export interface GetUserFollowers_getUser_user {
  __typename: "UserType";
  id: string;
  followers: (GetUserFollowers_getUser_user_followers | null)[] | null;
}

export interface GetUserFollowers_getUser {
  __typename: "GetUserReponse";
  user: GetUserFollowers_getUser_user | null;
}

export interface GetUserFollowers {
  getUser: GetUserFollowers_getUser;
}

export interface GetUserFollowersVariables {
  userId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserFollowing
// ====================================================

export interface GetUserFollowing_getUser_user_following {
  __typename: "FollowType";
  id: string;
  name: string | null;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  userImg: string | null;
  bio: string;
  isFollowing: boolean | null;
}

export interface GetUserFollowing_getUser_user {
  __typename: "UserType";
  id: string;
  following: (GetUserFollowing_getUser_user_following | null)[] | null;
}

export interface GetUserFollowing_getUser {
  __typename: "GetUserReponse";
  user: GetUserFollowing_getUser_user | null;
}

export interface GetUserFollowing {
  getUser: GetUserFollowing_getUser;
}

export interface GetUserFollowingVariables {
  userId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUsersForGame
// ====================================================

export interface GetUsersForGame_getUsersForGame_users_sports {
  __typename: "UserPlaysSportType";
  id: string;
  name: string | null;
}

export interface GetUsersForGame_getUsersForGame_users {
  __typename: "UserType";
  id: string;
  name: string | null;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  userImg: string | null;
  bio: string;
  isFollowing: boolean | null;
  sports: (GetUsersForGame_getUsersForGame_users_sports | null)[] | null;
}

export interface GetUsersForGame_getUsersForGame {
  __typename: "GetUsersForGamesResponse";
  users: (GetUsersForGame_getUsersForGame_users | null)[] | null;
}

export interface GetUsersForGame {
  getUsersForGame: GetUsersForGame_getUsersForGame;
}

export interface GetUsersForGameVariables {
  sportIds: (string | null)[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTeamsForGame
// ====================================================

export interface GetTeamsForGame_getTeamsForGame_teams_sport {
  __typename: "SportType";
  id: string;
  name: string;
}

export interface GetTeamsForGame_getTeamsForGame_teams {
  __typename: "TeamType";
  id: string;
  teamName: string;
  rating: number | null;
  coverImg: string | null;
  sport: GetTeamsForGame_getTeamsForGame_teams_sport;
}

export interface GetTeamsForGame_getTeamsForGame {
  __typename: "GetTeamsForGameResponse";
  teams: (GetTeamsForGame_getTeamsForGame_teams | null)[] | null;
}

export interface GetTeamsForGame {
  getTeamsForGame: GetTeamsForGame_getTeamsForGame;
}

export interface GetTeamsForGameVariables {
  sportIds: (string | null)[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Me
// ====================================================

export interface Me_me_user_sports {
  __typename: "UserPlaysSportType";
  id: string;
  name: string | null;
}

export interface Me_me_user {
  __typename: "UserType";
  id: string;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  firstName: string;
  lastName: string;
  bio: string;
  userImg: string | null;
  sports: (Me_me_user_sports | null)[] | null;
  teamsCount: number | null;
  followersCount: number | null;
  followingCount: number | null;
}

export interface Me_me {
  __typename: "MeReponse";
  user: Me_me_user | null;
}

export interface Me {
  me: Me_me;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMyFeed
// ====================================================

export interface GetMyFeed_getMyFeed_posts_postedBy {
  __typename: "UserType";
  id: string;
  name: string | null;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  userImg: string | null;
}

export interface GetMyFeed_getMyFeed_posts {
  __typename: "PostType";
  id: string;
  text: string | null;
  postImg: string | null;
  createdAt: any;
  score: number;
  interaction: string | null;
  postedBy: GetMyFeed_getMyFeed_posts_postedBy;
}

export interface GetMyFeed_getMyFeed {
  __typename: "GetMyFeedResponse";
  posts: (GetMyFeed_getMyFeed_posts | null)[] | null;
}

export interface GetMyFeed {
  getMyFeed: GetMyFeed_getMyFeed;
}

export interface GetMyFeedVariables {
  pageNum?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSearchResults
// ====================================================

export interface GetSearchResults_getSearchUsers_users {
  __typename: "UserType";
  id: string;
  name: string | null;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  userImg: string | null;
}

export interface GetSearchResults_getSearchUsers {
  __typename: "GetSearchUsersResponse";
  users: (GetSearchResults_getSearchUsers_users | null)[] | null;
}

export interface GetSearchResults_getSearchTeams_teams_createdBy {
  __typename: "UserType";
  id: string;
  name: string | null;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
}

export interface GetSearchResults_getSearchTeams_teams {
  __typename: "TeamType";
  id: string;
  teamName: string;
  createdBy: GetSearchResults_getSearchTeams_teams_createdBy;
}

export interface GetSearchResults_getSearchTeams {
  __typename: "GetSearchTeamsResponse";
  teams: (GetSearchResults_getSearchTeams_teams | null)[] | null;
}

export interface GetSearchResults_getSearchEvents_events_owner {
  __typename: "UserType";
  id: string;
  name: string | null;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
}

export interface GetSearchResults_getSearchEvents_events {
  __typename: "EventType";
  id: string;
  name: string;
  owner: GetSearchResults_getSearchEvents_events_owner;
}

export interface GetSearchResults_getSearchEvents {
  __typename: "GetSearchEventsResponse";
  events: (GetSearchResults_getSearchEvents_events | null)[] | null;
}

export interface GetSearchResults {
  getSearchUsers: GetSearchResults_getSearchUsers;
  getSearchTeams: GetSearchResults_getSearchTeams;
  getSearchEvents: GetSearchResults_getSearchEvents;
}

export interface GetSearchResultsVariables {
  searchText: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTeam
// ====================================================

export interface GetTeam_getTeam_team_sport {
  __typename: "SportType";
  id: string;
  name: string;
}

export interface GetTeam_getTeam_team_members {
  __typename: "UserType";
  id: string;
  name: string | null;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  userImg: string | null;
  bio: string;
  isFollowing: boolean | null;
}

export interface GetTeam_getTeam_team {
  __typename: "TeamType";
  id: string;
  teamName: string;
  coverImg: string | null;
  isAdmin: boolean | null;
  sport: GetTeam_getTeam_team_sport;
  rating: number | null;
  members: GetTeam_getTeam_team_members[];
}

export interface GetTeam_getTeam {
  __typename: "GetTeamResponse";
  team: GetTeam_getTeam_team | null;
}

export interface GetTeam {
  getTeam: GetTeam_getTeam;
}

export interface GetTeamVariables {
  teamId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserTeams
// ====================================================

export interface GetUserTeams_getUser_user_teamSet_sport {
  __typename: "SportType";
  id: string;
  name: string;
}

export interface GetUserTeams_getUser_user_teamSet {
  __typename: "TeamType";
  id: string;
  teamName: string;
  rating: number | null;
  coverImg: string | null;
  sport: GetUserTeams_getUser_user_teamSet_sport;
}

export interface GetUserTeams_getUser_user {
  __typename: "UserType";
  id: string;
  teamSet: GetUserTeams_getUser_user_teamSet[];
}

export interface GetUserTeams_getUser {
  __typename: "GetUserReponse";
  user: GetUserTeams_getUser_user | null;
}

export interface GetUserTeams {
  getUser: GetUserTeams_getUser;
}

export interface GetUserTeamsVariables {
  userId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUpcomingEvents
// ====================================================

export interface GetUpcomingEvents_getUpcomingEvents_events_sport {
  __typename: "SportType";
  id: string;
  name: string;
}

export interface GetUpcomingEvents_getUpcomingEvents_events_owner {
  __typename: "UserType";
  id: string;
  name: string | null;
}

export interface GetUpcomingEvents_getUpcomingEvents_events {
  __typename: "EventType";
  id: string;
  name: string;
  coverImg: string | null;
  sport: GetUpcomingEvents_getUpcomingEvents_events_sport;
  owner: GetUpcomingEvents_getUpcomingEvents_events_owner;
  startDate: any | null;
  endDate: any | null;
  startTime: any | null;
  endTime: any | null;
}

export interface GetUpcomingEvents_getUpcomingEvents {
  __typename: "GetUpcomingEventsResponse";
  events: (GetUpcomingEvents_getUpcomingEvents_events | null)[] | null;
}

export interface GetUpcomingEvents {
  getUpcomingEvents: GetUpcomingEvents_getUpcomingEvents;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUser
// ====================================================

export interface GetUser_getUser_user_sports {
  __typename: "UserPlaysSportType";
  id: string;
  name: string | null;
}

export interface GetUser_getUser_user {
  __typename: "UserType";
  id: string;
  name: string | null;
  firstName: string;
  lastName: string;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  bio: string;
  userImg: string | null;
  isFollowing: boolean | null;
  sports: (GetUser_getUser_user_sports | null)[] | null;
  teamsCount: number | null;
  followersCount: number | null;
  followingCount: number | null;
}

export interface GetUser_getUser {
  __typename: "GetUserReponse";
  user: GetUser_getUser_user | null;
}

export interface GetUser {
  getUser: GetUser_getUser;
}

export interface GetUserVariables {
  userId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserFeed
// ====================================================

export interface GetUserFeed_getUserFeed_posts_postedBy {
  __typename: "UserType";
  id: string;
  name: string | null;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  userImg: string | null;
}

export interface GetUserFeed_getUserFeed_posts {
  __typename: "PostType";
  id: string;
  text: string | null;
  postImg: string | null;
  createdAt: any;
  score: number;
  interaction: string | null;
  postedBy: GetUserFeed_getUserFeed_posts_postedBy;
}

export interface GetUserFeed_getUserFeed {
  __typename: "GetUserFeedResponse";
  posts: (GetUserFeed_getUserFeed_posts | null)[] | null;
}

export interface GetUserFeed {
  getUserFeed: GetUserFeed_getUserFeed;
}

export interface GetUserFeedVariables {
  userId: string;
  pageNum?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RateUserSport
// ====================================================

export interface RateUserSport_rateUserSport {
  __typename: "RateUserSportResponse";
  ok: boolean | null;
}

export interface RateUserSport {
  rateUserSport: RateUserSport_rateUserSport;
}

export interface RateUserSportVariables {
  userId: string;
  sportId: string;
  rating: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
