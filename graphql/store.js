import gql from "graphql-tag";

export const register_store = gql`
    mutation store_reg($Name: String!, $Email: String!, $AuthProvider:String!, $UserType:String!) {
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