import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';

function MangaItem() {
  const {id} = useParams()
  //state
  const [manga, setManga] = React.useState({})
  const [characters, setCharacters] = React.useState([])
  const [showMore, setShowMore] = React.useState(false)



  //destructure manga
  const {
    title, synopsis, chapters,
    volumes, images, rank, 
    score, scored_by, popularity, 
    status } = manga


  const navigate = useNavigate();

  const handleBackClick = () => {
      navigate('/manga');
  };
    

  //get id of Manga
  const getManga = async (manga) => {
    const response = await fetch(`https://api.jikan.moe/v4/manga/${manga}`)
    const data = await response.json()
    setManga(data.data);
    console.log(data.data)
  }

  //get characters
  const getCharacters = async (manga) => {
      const response = await fetch(`https://api.jikan.moe/v4/manga/${manga}/characters`)
      const data = await response.json()
      setCharacters(data.data)
      console.log(data.data)
  }

  useEffect(() => {
      getManga(id)
      getCharacters(id)
  }, [])

  return (
    <MangaItemStyled>
        <h1>{title}</h1>
        <button onClick={handleBackClick} style={back_button_styles.backButton}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={back_button_styles.arrowIcon}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
        <div className='details'>
          <div className='detail'>
            <div className='image'>
              <img src={images?.jpg.large_image_url} alt="" />
            </div>  
            <div className='manga-details'>
              <p><span>Rank:</span><span>{rank}</span></p>
              <p><span>Score:</span><span>{score}</span></p>
              <p><span>Scored By:</span><span>{scored_by}</span></p>
              <p><span>Popularity:</span><span>{popularity}</span></p>
              <p><span>Status:</span><span>{status}</span></p>
              <p><span>Volumes:</span><span>{volumes}</span></p>
              <p><span>Chapters:</span><span>{chapters}</span></p>
            </div>
          </div>  
          <p className="description">
            {showMore ? synopsis : synopsis?.substring(0, 450) + '...'}
            <button onClick={() => {
                setShowMore(!showMore)
            }}>{showMore ? 'Show Less': 'Read More'}</button>
          </p>
        </div>  
        <h3 className="title">Characters</h3>
        <div className="characters">
          {characters?.map((character, index) => {
            const { role } = character;
            const { images, name, mal_id } = character.character;
            return (
              <div className="character" key={index}>
                <img src={images?.jpg.image_url} alt="" />
                <h4>{name}</h4>
                <p>{role}</p>
              </div>
            );
          })}
        </div>         
    </MangaItemStyled >
  )
}

const back_button_styles = {
  backButton: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: '10px',
      borderRadius: '50%',
      transition: 'background-color 0.3s',
  },
  arrowIcon: {
      width: '24px',
      height: '24px',
      color: '#32CD32', 
  }
};

const MangaItemStyled = styled.div`
    padding: 3rem 18rem;
    background-color: #001B3A;
    h1{
        display: inline-block;
        font-size: 3rem;
        margin-bottom: 1.5rem;
        cursor: pointer;
        color: #710193;
        transition: all .4s ease-in-out;
        h1:hover{
            transform: skew(-3deg);
        }
    }
    .title{
        display: inline-block;
        margin: 3rem 0;
        font-size: 2rem;
        cursor: pointer;
        color: #710193;
    }

    .description{
        margin-top: 2rem;
        color: #6c7983;
        line-height: 1.7rem;
        button{
            background-color: transparent;
            border: none;
            outline: none;
            cursor: pointer;
            font-size: 1.2rem;
            color: #27AE60;
            font-weight: 600;
        }
    }

    .details{
        background-color: #00224B;
        border-radius: 20px;
        padding: 2rem;
        border: 5px solid #3E424B;
        .detail{
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            img{
                border-radius: 7px;
            }
        }
        .manga-details{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            p{
                display: flex;
                gap: 1rem;
            }
            p span:first-child{
                font-weight: 600;
                color: #A855F7;
            }
        }
    }

    .characters{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        grid-gap: 2rem;
        background-color: #00224B;
        padding: 2rem;
        border-radius: 20px;
        border: 5px solid #3E424B;
        .character{
            padding: .4rem .6rem;
            border-radius: 7px;
            background-color: #002366;
            transition: all .4s ease-in-out;
            img{
                width: 100%;
            }
            h4{
                padding: .5rem 0;
                color: #9867C5;
            }
            p{
                color: #B76E79;
            }
            &:hover{
                transform: translateY(-5px);
            }
        }
    }
`;

export default MangaItem