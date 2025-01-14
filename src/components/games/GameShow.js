import React, { useEffect, useState } from 'react' 
import { Container, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { gameShow } from '../../api/game'

const backgroundCSS = {
    backgroundColor: 'rgb(212, 212, 212)',
    // backgroundColor: 'rgb(120, 219, 111)',
    display: 'flex',
    justifyContent: 'center'
}

const cardBody = {
    width: '100%',
    height: '100%'
}

const boldText = {
    fontWeight: 'bold'
}

const cardCSS = {
    marginTop: '20px',
    marginBottom: '20px',
    width: '20rem',
    height: '35rem',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: '2.5%'
}

const findingResult = {
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 'bold',
    marginTop: '30%',
    fontSize: '200%',
    color: 'rgb(241, 50, 50)'
}

const imageDisplay = {
    height: '90%',
    width: '90%'
}

const GameShow = ({ user, msgAlert }) => {

    const [game, setGame] = useState(null)

    const { apiId } = useParams()

    useEffect(() => {
        gameShow(user, apiId)
            .then((res) => {
                console.log(res.data.results)
                setGame({
                    name: res.data.results.name,
                    description: res.data.results.deck,
                    image: res.data.results.image.original_url
                })
                // setGame(res.data.results.name)
            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Failure to show game ' + error,
                    variant: 'danger'
                })
            })
    }, [])

    if (!game) {
        return (
        <>
        <Container style={findingResult}>
            <p>Finding game...</p>
        </Container>
        </>
    )}

    return (
        <>
        <div style={backgroundCSS}>
			<Container className="fluid">
                <Card style={cardCSS}>
                <Card.Header><h3>{ game.name }</h3></Card.Header>
                <Card.Body>
                    <Card.Text>
                        <div style={cardBody}>
                        <img src={ game.image } style={imageDisplay}/><br/><br/>
                        </div>
                        <div>
                            <small><span style={boldText}>Description:</span> { game.description }</small>
                        </div>
                    </Card.Text>
                </Card.Body>
                </Card>
            </Container>
        </div>
        </>
    )
}

export default GameShow