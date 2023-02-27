import { gql } from '@apollo/client';

export const GET_CONTACTS = gql`
    query getContacts (
        $page: Int! = 1
        $name : String
        $phone : String
        ){
            load(page: $page, name: $name, phone: $phone){
                data{
                    params{
                        rowCount
                        totalCount
                        page
                        totalPages
                        name
                        phone
                    }
                    contacts{
                     _id
                     name
                     phone    
                    }
                } 
                success
            } 
        } 
    
`; 
 
export const CREATE_CONTACT = gql`
    mutation createContact($name: String!, $phone: String!) {
        createContact(input: { name: $name, phone: $phone }) {
            _id
            name
            phone
        }
    }
`;

export const DELETE_CONTACT = gql`
    mutation deleteContact($id: ID!) {
        deleteContact(id: $id) {
            _id
            name
            phone
        }
    }
`;

export const UPDATE_CONTACT = gql`
    mutation updateContact($id: ID!, $name: String!, $phone: String!) {
        updateContact(id: $id, input: { name: $name, phone: $phone }) {
            _id
            name
            phone
        }
    }
`;
