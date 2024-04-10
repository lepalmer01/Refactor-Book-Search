import { gql } from "@apollo/client";

export const ME = gql`
    query Query {
        me {
            username
            _id
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                image
                link
                title
            }
        }
    }
`

export const ADD_USER = gql`
    mutation Mutation($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                username
                _id
                email
            }
        }
    }
`

export const LOGIN_USER = gql`
    mutation Mutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                username
                _id
                email
                bookCount
                savedBooks {
                    bookId
                    authors
                    description
                    image
                    link
                    title
                }

            }
        }
    }
`

export const SAVE_BOOK = gql`
    mutation Mutation($bookData: BookInput!) {
        saveBook(bookData: $bookData) {
            username
            _id
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                image
                link
                title
            }
        }
    }
`

export const REMOVE_BOOK = gql`
    mutation Mutation($bookId: ID!) {
        removeBook(bookId: $bookId) {
            username
            _id
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                image
                link
                title
            }
        }
    }
`

