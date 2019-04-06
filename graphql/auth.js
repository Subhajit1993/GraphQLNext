import gql from "graphql-tag";

export const user_auth = gql`
    mutation authenticate($Name: String!, $Email: String!, $AuthProvider:String!, $UserType:String!) {
        UserAuth(Name: $Name, Email: $Email, AuthProvider:$AuthProvider, UserType:$UserType) {
            Name,
            Email,
            isNewUser,
            Phone,
            jwt_token,
            UserType
        }
    }
`;

export const user_from_session = gql`
    query getUser{
        GetUserFromSession{
            Email,
            Name
        }
    }
`