import React, { useContext, useState, useEffect } from "react"
import { BookContext } from "./BookProvider"
import { LocationContext } from "./BookStatus"


export const BookForm = (props) => {
    // Use the required context providers for data
    const { locations, getLocations } = useContext(LocationContext)
    const { addBook, books, updateBook, getBooks } = useContext(BookContext)

    // Component state
    const [book, setBook] = useState({})

    // Is there a a URL parameter??
    const editMode = props.match.params.hasOwnProperty("bookId")  // true or false

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newBook = Object.assign({}, book)          // Create copy
        newBook[event.target.name] = event.target.value    // Modify copy
        setBook(newBook)                                 // Set copy as new state
    }

    /*
        If there is a URL parameter, then the user has chosen to
        edit an book.
            1. Get the value of the URL parameter.
            2. Use that `id` to find the book.
            3. Update component state variable.
    */
    const getBookInEditMode = () => {
        if (editMode) {
            const bookId = parseInt(props.match.params.bookId)
            const selectedBook = books.find(a => a.id === bookId) || {}
            setBook(selectedBook)
        }
    }

    // Get books from API when component initializes
    useEffect(() => {
        getBooks()
        getLocations()
    }, [])

    // Once provider state is updated, determine the book (if edit)
    useEffect(() => {
        getBookInEditMode()
    }, [books])


    const constructNewBook = () => {
        // const locationId = parseInt(book.locationId)
        const locationId = 1
        if (locationId === 0) {
            window.alert("Please select a location")
        } else {
            if (editMode) {
                // PUT
                updateBook({
                    id: book.id,
                    name: book.name,
                    breed: book.breed,
                    locationId: locationId,
                    treatment: book.treatment,
                    readerId: parseInt(localStorage.getItem("book_reader"))
                })
                    .then(() => props.history.push("/books"))
            } else {
                // POST
                addBook({
                    name: book.name,
                    breed: book.breed,
                    locationId: locationId,
                    treatment: book.treatment,
                    readerId: parseInt(localStorage.getItem("book_reader"))
                })
                    .then(() => props.history.push("/books"))
            }
        }
    }

    return (
        <form className="bookForm">
            <h2 className="bookForm__title">{editMode ? "Update Book" : "Add Book"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Book name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        placeholder="Book name"
                        defaultValue={book.name}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="breed">Author: </label>
                    <input type="text" name="breed" required className="form-control"
                        placeholder="Book Author"
                        defaultValue={book.breed}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="locationId">Read Status: </label>
                    <select name="locationId" className="form-control"
                        value={book.locationId}
                        onChange={handleControlledInputChange}>

                        <option value="1">Read Later</option>
                        <option value="2">Currently Reading</option>
                        <option value="3">Finished Reading</option>
                        {/* {locations.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))} */}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="treatment">Synopsis: </label>
                    <textarea type="text" name="treatment" className="form-control"
                        value={book.treatment}
                        onChange={handleControlledInputChange}>
                    </textarea>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewBook()
                }}
                className="btn btn-primary">
                {editMode ? "Save Updates" : "Add Book"}
            </button>
        </form>
    )
}