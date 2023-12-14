'use client'

import React, { useEffect, useState } from 'react';
import getAllDocs from '../../firebase/firestore/getAllDocs';
import classes from './Library.module.css';
import BookCard from '../components/BookCard';
import GenreSelector from '../components/GenreSelector';
import LoadingSpinner from '../components/LoadingSpinner'; // Import your LoadingSpinner component

const Library = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchBooks() {
            try {
                const { results, error } = await getAllDocs('books');
                if (error) {
                    setError(error);
                } else {
                    setBooks(results);
                    setFilteredBooks(results);
                }
            } catch (error) {
                console.error('Error fetching books:', error);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchBooks();
    }, []);

    useEffect(() => {
        if (selectedGenre !== 'All') {
            const filtered = books.filter(book => book.genres && book.genres.includes(selectedGenre));
            setFilteredBooks(filtered);
        } else {
            setFilteredBooks(books);
        }
    }, [selectedGenre, books]);

    const handleGenreChange = (genre) => {
        setSelectedGenre(genre);
    };

    return (
        <>
            <h1>Books</h1>
            <GenreSelector onSelectGenre={handleGenreChange} />
            {isLoading ? (
                <div className="d-flex justify-content-center mt-5">
                    <LoadingSpinner />
                </div>
            ) : (
                <div className={classes.bookgrid}>
                    {error && <p>Error: {error.message}</p>}
                    <div className={classes.bookgridcontainer}>
                        {filteredBooks.map(book => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Library;
