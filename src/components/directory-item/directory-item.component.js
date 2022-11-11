
import './directory-item.styles.scss'
import { useNavigate } from 'react-router-dom';

export default function DirectoryItem ({category}) {

  const {id, title, imageUrl, route} = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <div key={id} className='directory-item-container' onClick={onNavigateHandler}>
      <div className='background-image' style={{
        backgroundImage: `url(${imageUrl})`
      }} />
      <div className='body-container'>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  )
}