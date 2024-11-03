// pages/EditBook.js
import React from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get URL parameters
import BookForm from '../components/BookForm';

const EditBook = ({ onSuccess }) => {
    const { id } = useParams(); // Get the book ID from the URL parameters

    return (
        <div>
            <h1>Edit Book</h1>
            <BookForm id={id} onSuccess={onSuccess} /> {/* Pass the ID to the BookForm */}
        </div>
    );
};

export default EditBook;
