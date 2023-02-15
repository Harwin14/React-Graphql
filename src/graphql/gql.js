import { gql } from '@apollo/client';

export const GET_CONTACTS = gql`
    query {
        getContacts {
            _id
            name
            phone
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
