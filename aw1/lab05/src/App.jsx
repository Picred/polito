import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';
import { MyNavbar } from './components/MyNavbar';
import { Sidebar } from './components/Sidebar';
import { Film } from './types';
import { FilmTable } from './components/FilmTable';
import { Container, Row, Col } from 'react-bootstrap';

export const App = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    let filmList = [
        new Film(1, "Pulp Fiction", true, "2024-03-10", 5),
        new Film(2, "21 Grams", true, "2024-03-17", 4),
        new Film(3, "Star Wars", false),
        new Film(4, "Matrix", false),
        new Film(5, "Shrek", false, "2024-03-21", 3)
    ];    

    const filters = [
        { name: 'All'},
        { name: 'Favorite'},
        { name: 'Best rated'},
        { name: 'Seen last month'},
        { name: 'Unseen'},
    ];

    const updateFilter = (newFilter) => {
        setActiveFilter(newFilter);
    }

    return (
    <>
        <MyNavbar />
        <Container fluid>
        <Row>
            <Sidebar 
                filter={activeFilter}
                filters={filters} 
                updateFilter={updateFilter} 
            />
            
            <FilmTable activeFilter={activeFilter} filmList={filmList}/>

            
            
        </Row>
        </Container>
    </>
    );
};