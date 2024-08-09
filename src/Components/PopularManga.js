import React from 'react'
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/global';
import styled from 'styled-components';

function PopularManga({rendered}) {
    const {popularManga, isSearch, searchResults} = useGlobalContext()

    const conditionalRender = () => {
        if(!isSearch && rendered === 'popular_manga'){
            return popularManga?.map((manga) => {
                return <Link to={`/manga/${manga.mal_id}`} key={manga.mal_id}> 
                    <img src={manga.images.jpg.large_image_url} alt = "" />
                </Link>
            })
        }else{
            return searchResults?.map((manga) => {
                return <Link to={`/manga/${manga.mal_id}`} key={manga.mal_id}> 
                <img src={manga.images.jpg.large_image_url} alt = "" />
            </Link>
            })
        }
    }

    return  (
        <PopularStyled>
            <div className='popular-manga'>
                {conditionalRender()}
            </div>
        </PopularStyled>
    );
}

const PopularStyled = styled.div`
    display: flex;
    .popular-manga{
        margin-top: 2rem;
        padding-top: 2rem;
        padding-bottom: 2rem;
        padding-left: 1rem;
        padding-right: 0;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 2rem;
        background-color: #00224B;
        border-top: 5px solid #3E424B;
        a{
            height: 500px;
            border-radius: 7px;
            border: 5px solid #3E424B;
        }
        a img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 5px;
        
        }
    }
`;


export default PopularManga;