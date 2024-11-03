// src/components/BookDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/books/${id}`);
                if (!response.ok) throw new Error('Failed to fetch book');
                const data = await response.json();
                setBook(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBookDetails();
    }, [id]);

    if (!book) return <div className="loading">Loading...</div>;

    return (
        <div className="book-details-card"> 
            <h2 className="book-title">{book.title}</h2>
            <p className="book-author"><strong>Author:</strong> {book.author}</p>
            <p><strong>Published Year:</strong> {book.published_year}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p className="book-description"><strong>Description:</strong> {book.description}</p>
            {book.image && <img src={`http://localhost:8000/storage/${book.image}`} alt={book.title} />}
            <button onClick={() => navigate('/')} className="back-button">Back</button>
        </div>
    );
};
    
export default BookDetails;
