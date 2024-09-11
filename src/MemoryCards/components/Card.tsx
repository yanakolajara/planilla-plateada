import './Card.scss';

interface CardType {
  id: string;
  value: string;
  flipped: boolean;
  image: string;
}
type Props = {
  id: string;
  value: string;
  flipped: boolean;
  handleFlip: (card: CardType) => void;
  image: string;
};

export default function Card({ id, value, flipped, handleFlip, image }: Props) {
  const cardImage = require(`./assets/${image}`);
  return (
    <div
      key={id}
      className={`card card__${flipped ? 'flipped' : 'hidden'}`}
      onClick={() => handleFlip({ id, value, flipped, image })}
    >
      {flipped && <img src={cardImage} alt='game card' />}
    </div>
  );
}
