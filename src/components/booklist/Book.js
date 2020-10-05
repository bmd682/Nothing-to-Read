import React from "react"
import "./Books.css"
import { Link } from "react-router-dom"

export default ({ book }) => (
    <section className="book">
        <h3 className="book__name">
            <Link to={`/books/${book.id}`}>
                { book.name }
            </Link>
        </h3>
        <div className="book__breed">{ book.breed }</div>
        <div className="book__status">{ book.location }</div>
    </section>
)