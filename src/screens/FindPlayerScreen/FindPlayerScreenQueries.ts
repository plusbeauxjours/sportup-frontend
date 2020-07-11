import gql from "graphql-tag";

export const GET_ALL_SPORTS = gql`
    query GetAllSports{
        getAllSports{
            sports {
                id
                name
            }
        }
    }

`;
