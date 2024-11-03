// pages/Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookList from '../components/BookList';


const Home = () => {
    const [books, setBooks] = useState([]);
    const [message, setMessage] = useState(''); // State for message

    const fetchBooks = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/books');
            if (!response.ok) throw new Error('Failed to fetch books');
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/books/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete book');
            setMessage('Book deleted successfully!'); // Set success message
            fetchBooks();
        } catch (error) {
            console.error(error);
        }
    };

    const clearMessage = () => {
        setMessage(''); // Clear message
    };

    return (
        <div>
            <header className="header">
                <h1 className="page-title">Book Management System</h1>
            </header>
            
            {message && (
                <div className="success-message" onClick={clearMessage}>
                    {message}
                </div>
            )}

            <BookList books={books} onDelete={handleDelete} />
            <Link to="/add" className="fixed-add-button">Add Book</Link>
        </div>
    );
};

export default Home;