// pages/AddBook.js
import React from 'react';
import BookForm from '../components/BookForm';

const AddBook = ({ onSuccess }) => {
    return (
        <div>
            <h1>Add New Book</h1>
            <BookForm onSuccess={onSuccess} />
        </div>
    );
};

export default AddBook;
