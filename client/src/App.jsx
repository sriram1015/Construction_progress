import { Link } from 'react-router-dom';
import Carousel from './component/Carousel';
import './App.css';
import './index.css';

const App = () => {
  const constructionTypes = [
    { id: 1, name: 'Adi Dravidar & Tribal Welfare', icon: '🌍' },
    { id: 2, name: 'Agriculture', icon: '🌾' },
    { id: 3, name: 'Animal Husbandry & Fisheries', icon: '🐄' },
    { id: 4, name: 'BC, MBC and Minorities Welfare', icon: '🤝' },
    { id: 5, name: 'Commercial Taxes and Registration Department', icon: '💰' },
    { id: 6, name: 'Co-operation, Food and Consumer Protection', icon: '🍎' },
    { id: 7, name: 'Energy', icon: '⚡' },
    { id: 8, name: 'Environment and Forests', icon: '🌳' },
    { id: 9, name: 'Handlooms, Handicrafts, Textiles and Khadi', icon: '🧵' },
    { id: 10, name: 'Health and Family Welfare', icon: '🏥' },
    { id: 11, name: 'Higher Education', icon: '🎓' },
    { id: 12, name: 'Highways', icon: '🛣️' },
    { id: 13, name: 'Home Prohibition and Excise', icon: '🏠' },
    { id: 14, name: 'Housing and Urban Development', icon: '🏘️' },
    { id: 15, name: 'Industries', icon: '🏭' },
    { id: 16, name: 'Labour and Employment', icon: '👷' },
    { id: 17, name: 'Municipal Administration and Water Supply', icon: '🚰' },
    { id: 18, name: 'Public', icon: '👥' },
    { id: 19, name: 'Public Works', icon: '🏗️' },
    { id: 20, name: 'Revenue', icon: '📜' },
    { id: 21, name: 'Rural Development', icon: '🏡' },
    { id: 22, name: 'School Education', icon: '📚' },
    { id: 23, name: 'Small Industries', icon: '🏭' },
    { id: 24, name: 'Tourism and Culture', icon: '🏛️' },
    { id: 25, name: 'Transport', icon: '🚌' },
    { id: 26, name: 'Water Resources Department', icon: '💧' },
    { id: 27, name: 'Youth Welfare and Sports Development', icon: '🏅' },
];

  return (
    <div className="app-container">
      <div>
        <Carousel />
      </div>
      <h2 className="app-title">Construction Departments </h2>
        
      <div className="construction-types">

        {constructionTypes.map((type) => (
          <Link to={`/depart/${type.id}`} key={type.id} className="construction-card">
            <div className="construction-icon">{type.icon}</div>
            <div className="construction-name">{type.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default App;