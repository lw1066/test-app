import React, { useState } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

const GenreSelector = ({ onSelectGenre }) => {
    const genres = ['Reading', 'Speaking', 'Writing', 'Listening', 'Culture', 'Medical', 'All'];
    const [selectedGenre, setSelectedGenre] = useState('');

    const handleGenreClick = (genre) => {
        setSelectedGenre(genre);
        onSelectGenre(genre);
    };

    return (
        <div style={{ margin: '3rem 0', display: 'flex', justifyContent: 'center' }}>
            
            <ButtonGroup aria-label="Genres">
                {genres.map(genre => (
                    <Button
                        key={genre}
                        variant="outline-secondary"
                        onClick={() => handleGenreClick(genre)}
                        active={selectedGenre === genre}
                        style={{ margin: '0.1rem', minWidth: '10px' }}
                    >
                        {genre}
                    </Button>
                ))}
            </ButtonGroup>
        </div>
    );
};

export default GenreSelector;
