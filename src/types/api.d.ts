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
  postUuid: string;
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
  postUuid: string;
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
  postUuid: string;
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
  uuid: any | null;
  name: string | null;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  userImg: string | null;
}

export interface CreatePost_createPost_post {
  __typename: "PostType";
  uuid: any | null;
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
  uuid: any | null;
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
// GraphQL query operation: GetMainFeed
// ====================================================

export interface GetMainFeed_getMainFeed_posts_postedBy {
  __typename: "UserType";
  uuid: any | null;
  name: string | null;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  userImg: string | null;
}

export interface GetMainFeed_getMainFeed_posts {
  __typename: "PostType";
  uuid: any | null;
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
// GraphQL query operation: Me
// ====================================================

export interface Me_me_user_sports {
  __typename: "UserPlaysSportType";
  sportUuid: string | null;
  name: string | null;
}

export interface Me_me_user {
  __typename: "UserType";
  uuid: any | null;
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
  uuid: any | null;
  name: string | null;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  userImg: string | null;
}

export interface GetMyFeed_getMyFeed_posts {
  __typename: "PostType";
  uuid: any | null;
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
// GraphQL query operation: GetUser
// ====================================================

export interface GetUser_getUser_user_sports {
  __typename: "UserPlaysSportType";
  sportUuid: string | null;
  name: string | null;
}

export interface GetUser_getUser_user {
  __typename: "UserType";
  uuid: any | null;
  name: string | null;
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
  uuid: string;
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
