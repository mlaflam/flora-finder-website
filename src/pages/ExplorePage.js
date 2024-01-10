import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

import '../style.css';
import ExamplePlant from '../components/Example-Plant';
import Navbar from '../components/Navbar';
import compassIcon from '../icons/compass-icon-4.png';
import searchIcon from '../icons/search-icon-3.png';
import xIcon from '../icons/x-button-icon.png';
import Footer from '../components/Footer';

const API_URL = 'https://www.omdbapi.com?apikey=e0340b1'
const plants_api_url = 'https://explorer.natureserve.org/api/data/speciesSearch';


const customIdError = "custom-id-no";
const customIdError2 = "custom-id-no-2";

function ExplorePage() {
  const validStates = ["Alabama", "Alaska", "Arizona", "Arkansas", "California",
    "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii",
    "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
    "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
    "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
    "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
    "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee",
    "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
    "Wisconsin", "Wyoming", ""
  ]
  

  const [state, setState] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const isValidState = (input) => {
    const isValid = validStates.includes(input);
    console.log(`${input} is a valid state?`, isValid);

    const lowercasedInput = input.toLowerCase();
    return validStates.map(state => state.toLowerCase()).includes(lowercasedInput);
  };

  { /*search here*/}
  const searchState = async (stateName) => {
    // Map state name to abbreviation
    const stateAbbreviations = {
      Alabama: 'AL',
      Alaska: 'AK',
      Arizona: 'AZ',
      Arkansas: 'AR',
      California: 'CA',
      Colorado: 'CO',
      Connecticut: 'CT',
      Delaware: 'DE',
      Florida: 'FL',
      Georgia: 'GA',
      Hawaii: 'HI',
      Idaho: 'ID',
      Illinois: 'IL',
      Indiana: 'IN',
      Iowa: 'IA',
      Kansas: 'KS',
      Kentucky: 'KY',
      Louisiana: 'LA',
      Maine: 'ME',
      Maryland: 'MD',
      Massachusetts: 'MA',
      Michigan: 'MI',
      Minnesota: 'MN',
      Mississippi: 'MS',
      Missouri: 'MO',
      Montana: 'MT',
      Nebraska: 'NE',
      Nevada: 'NV',
      NewHampshire: 'NH',
      NewJersey: 'NJ',
      NewMexico: 'NM',
      NewYork: 'NY',
      NorthCarolina: 'NC',
      NorthDakota: 'ND',
      Ohio: 'OH',
      Oklahoma: 'OK',
      Oregon: 'OR',
      Pennsylvania: 'PA',
      RhodeIsland: 'RI',
      SouthCarolina: 'SC',
      SouthDakota: 'SD',
      Tennessee: 'TN',
      Texas: 'TX',
      Utah: 'UT',
      Vermont: 'VT',
      Virginia: 'VA',
      Washington: 'WA',
      WestVirginia: 'WV',
      Wisconsin: 'WI',
      Wyoming: 'WY',
      // Add more state mappings as needed
    };

    const stateAbbreviation = stateAbbreviations[stateName];

    if (!stateAbbreviation) {
      { /*if (!isValidState)*/ }
      toast.error("Please enter a valid US state", {
        toastId: customIdError
      });
      return;
    }

    try {
      const response = await fetch(plants_api_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          criteriaType: 'species',
          textCriteria: [],
          statusCriteria: [],
          locationCriteria: [{
            paramType: 'subnation',
            subnation: stateAbbreviation,  // Replace 'state' with the actual state code or name
            nation: 'US',
          }],
          pagingOptions: {
            page: null,
            recordsPerPage: 5,
          },
          recordSubtypeCriteria: [],
          modifiedSince: null,
          locationOptions: {
            origin: 'onlyNatives',
          },
          classificationOptions: null,
          speciesTaxonomyCriteria: [],
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setState(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching data:', error.message);
      toast.error("Error fetching data", {
        toastId: customIdError2
      });
    }
  };

  useEffect(() => {
    searchState('');
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchState(searchTerm);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  


  return (

    <div>
      <div className="block-main">
        <Navbar />

        <div className="block">

          <div id="search-box-container">
            <div className="explore-container">
              <img className="explore-icon" src={compassIcon} alt="Compass Icon" />
              <div className="explore-title">Explore</div>
            </div>

            <div className="explore-info">
              Explore, learn, and connect with the unique plants that call each state home.
            </div>

            <div id="search-container">
              <div className='search-inner-container'>
                <img className="search-icon" src={searchIcon} alt="Search Icon" />
                <input
                  id='search'
                  className="search"
                  type="text"
                  placeholder="Enter state"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
              </div>

              {searchTerm && (
                <img className="x-icon" src={xIcon} alt="X Icon" onClick={handleClearSearch} />
              )}
            </div>
          </div>

          <div className="block-ex">

              {
                state?.length > 0 ?
                  (<div id="example-plants-grid">
                  {state.map((plant) => (<ExamplePlant plant={plant} />))}

                  </div>
                  ) : (
                    <div className="empty">
                      { /*<h2>No Plants Found</h2> */ }
                    </div>
                  )

              }


          </div>

        </div>

        <Footer />
        
      </div>
      <ToastContainer />
    </div>

  );
}

export default ExplorePage;
