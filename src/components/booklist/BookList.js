import React, { useState, useContext, useEffect } from "react"
import { BookContext } from "./BookProvider"
import Book from "./Book"
import "./Books.css"

export const BookList = ({ history }) => {
    const { getBooks, books, searchTerms } = useContext(BookContext)

    const [filteredBooks, setFiltered] = useState([])

    // Initialization effect hook -> Go get book data
    useEffect(() => {
        getBooks()
    }, [])

    useEffect(() => {
        const matchingBooks = books.filter(book => book.name.toLowerCase().includes(searchTerms.toLowerCase()))
        setFiltered(matchingBooks)
    }, [searchTerms])


    useEffect(() => {
        setFiltered(books)
    }, [books])

    return (
        <main className="bookContainer">
            <h1>Books</h1>

            <button onClick={() => history.push("/books/create")}>
                Add Book
            </button>
            <div className="books">
                {
                    filteredBooks.map(book => {
                        return <Book key={book.id} book={book} />
                    })
                }
            </div>
        </main>
    )
}