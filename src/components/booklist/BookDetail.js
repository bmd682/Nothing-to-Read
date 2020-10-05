import React, { useContext, useEffect, useState } from "react"
import { BookContext } from "./BookProvider"
import "./Books.css"

export const BookDetails = (props) => {
    const { releaseBook, getBookById } = useContext(BookContext)

    const [book, setBook] = useState({location: {}})

    useEffect(() => {
        const bookId = parseInt(props.match.params.bookId)
        getBookById(bookId)
            .then(setBook)
    }, [])

    return (
        <section className="book">
            <h3 className="book__name">{book.name}</h3>
            <div className="book__breed">Author: {book.breed}</div>
            <div className="book__status">Status: {book.location.name}</div>
            <div className="book__treatment">Synopsis: {book.treatment}</div>

            <button onClick={() => releaseBook(book.id).then(() => props.history.push("/books"))} >Delete Book</button>

            <button onClick={() => {
                props.history.push(`/books/edit/${book.id}`)
            }}>Edit Entry</button>
        </section>
    )
}