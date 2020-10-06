import React, { useState } from "react"

export const BookContext = React.createContext()

export const BookProvider = (props) => {
    const [books, setBooks] = useState([])
    const [searchTerms, setTerms] = useState("")

    const getBooks = () => {
        return fetch("http://localhost:8088/books")
            .then(res => res.json())
            .then(setBooks)
    }

    const getBookById = (id) => {
        return fetch(`http://localhost:8088/books/${id}?_expand=location`)
            .then(res => res.json())
    }

    const addBook = book => {
        return fetch("http://localhost:8088/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        })
            .then(getBooks)
    }

    const updateBook = book => {
        return fetch(`http://localhost:8088/books/${book.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        })
            .then(getBooks)
    }

    const releaseBook = (bookId) => {
        return fetch(`http://localhost:8088/books/${bookId}`, {
            method: "DELETE"
        })
            .then(getBooks)
    }

    return (
        <BookContext.Provider value={{
            books, addBook, getBooks, getBookById,
            searchTerms, setTerms, releaseBook, updateBook
        }}>
            {props.children}
        </BookContext.Provider>
    )
}