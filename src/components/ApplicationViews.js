import React from "react"
import { Route } from "react-router-dom"
import { LocationProvider } from "./booklist/BookStatus"
import { BookProvider } from "./booklist/BookProvider.js"
// import { LocationList } from "./Welcome.js"
import { BookList } from './booklist/BookList.js'
import { BookForm } from "./booklist/BookForm.js"
import { BookDetails } from "./booklist/BookDetail.js"
import { BookSearch } from "./booklist/BookSearch.js"

export const ApplicationViews = (props) => {
    return (
        <>

            {/* <Route exact path="/">
                <LocationList />
            </Route> */}

            <BookProvider>
                {/* <BookProvider> */}
                    <LocationProvider>

                        <Route exact path="/books" render={(props) => {
                            return <>
                                <BookSearch />
                                <BookList history={props.history} />
                            </>
                        }} />


                        <Route exact path="/books/create" render={(props) => {
                            return <BookForm {...props} />
                        }} />

                        {/*
                            /books/2
                            /books/:bookId(\d+)
                        */}
                        <Route path="/books/:bookId(\d+)" render={
                            props => <BookDetails {...props} />
                        } />
                        <Route path="/books/edit/:bookId(\d+)" render={
                            props => <BookForm {...props} />
                        } />
                    </LocationProvider>
                {/* </BookProvider> */}
            </BookProvider>

            <Route path="/logout" render={
                (props) => {
                    localStorage.removeItem("book_reader")
                    props.history.push("/login")
                }
            } />

        </>
    )
}