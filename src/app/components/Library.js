'use client'

import React, { useEffect, useState } from 'react';
import getAllDocs from '../../firebase/firestore/getAllDocs';
import classes from './Library.module.css';
import BookCard from '../components/BookCard'; 

const Library = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchBooks() {
            try {
                const { results, error } = await getAllDocs('books');
                if (error) {
                    setError(error);
                } else {
                    setBooks(results);
                }
            } catch (error) {
                console.error('Error fetching books:', error);
                setError(error);
            }
        }

        fetchBooks();
    }, []);

    return (<>
            <h1>Books</h1>
        <div className={classes.bookgrid}>
            {error && <p>Error: {error.message}</p>}
            <div className={classes.bookgridcontainer}>
                {books.map(book => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </div>
        </>
    );
};

export default Library;
