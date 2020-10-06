import React, { useContext } from "react"
import { BookContext } from "./BookProvider"

export const BookSearch = () => {
    const { setTerms } = useContext(BookContext)

    return (
        <>
            <div>Search for a book</div>
            <input type="text" className="books__search"
                onChange={
                    (changeEvent) => {
                        setTerms(changeEvent.target.value)
                    }
                }
                placeholder="Enter search string here..." />
        </>
    )
}