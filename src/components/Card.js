import './Card.css'

const Card = ({ card, handleChoice, flipped, isDisabled }) => {
  return (
    <div className={`card ${flipped ? 'flipped' : ''}`}>
      <img src={card.src} alt='card front' className='front' />
      <img
        src='img/cover.png'
        alt='card back'
        className='back'
        onClick={() => !isDisabled && handleChoice(card)}
      />
    </div>
  )
}

export default Card
