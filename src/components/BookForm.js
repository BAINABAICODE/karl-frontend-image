import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookForm = ({ onSuccess }) => {
    const { id } = useParams(); // Get the book ID from the URL
    const navigate = useNavigate(); // For navigation after submission
    const [file, setFile] = useState(null); // State for the uploaded file

    // Initialize form data state
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        published_year: '',
        genre: '',
        description: '',
        image: null,
    });

    // Fetch the book data if editing
    useEffect(() => {
        if (id) {
            const fetchBook = async () => {
                try {
                    const response = await fetch(`http://localhost:8000/api/books/${id}`);
                    if (!response.ok) throw new Error('Failed to fetch book');
                    const data = await response.json();
                    setFormData(data); // Set the fetched book data into the form
                } catch (error) {
                    console.error(error);
                }
            };
            fetchBook();
        }
    }, [id]);

    // Handle changes in input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value }); // Update corresponding field in state
    };

    // Handle file input changes
    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Update file state
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataObj = new FormData(); // Create FormData object for file upload
        Object.keys(formData).forEach((key) => formDataObj.append(key, formData[key])); // Append all fields to FormData
        if (file) formDataObj.append('image', file); // Append the image if it exists

        const method = id ? 'PUT' : 'POST'; // Determine method (PUT for edit, POST for new)
        const url = id ? `http://localhost:8000/api/books/${id}` : 'http://localhost:8000/api/books'; // Set the API endpoint

        try {
            const response = await fetch(url, {
                method: method,
                body: formDataObj, // Send FormData as request body
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to save book');
            }

            // Trigger success callback and navigate
            onSuccess(id ? 'Book updated successfully!' : 'Book added successfully!');
            navigate('/'); // Navigate back to home page after successful operation
        } catch (error) {
            console.error(error); // Log any errors
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{id ? 'Edit Book' : 'Add New Book'}</h2>
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="author"
                placeholder="Author"
                value={formData.author}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="published_year"
                placeholder="Published Year"
                value={formData.published_year}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="genre"
                placeholder="Genre"
                value={formData.genre}
                onChange={handleChange}
                required
            />
            <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
            />
            <input type="file" onChange={handleFileChange} />

            <div className="button-container">
                <button type="submit">{id ? 'Update Book' : 'Add Book'}</button>
                <button type="button" onClick={() => navigate('/')}>Cancel</button>
            </div>
        </form>
    );
};

export default BookForm;
