import React from 'react'
import leafIconThree from '../icons/leaf-icon-3.png';
import searchIcon from '../icons/search-icon-3.png';

const Classification = ({ plantData, id }) => {
  return (
    <div className='sections-container-inner-1' id={id}>
      <div className='plant-page-header-container'>
        <img className="plant-page-search-icon" src={searchIcon} alt="Search Icon" />
        <div className='plant-page-header'>Classification</div>
      </div>
      {/*<hr className='divider-2'></hr>*/}

      <div className='class-container'>
        <div className='class-scien'> Scientific Name:
          <div className='class-1 '> {plantData.plant.scientificName}</div></div>


        <div className='class-scien'> Other Common Names:
          <div className='class-1 '> {plantData.plant.speciesGlobal.otherCommonNames[0]}</div></div>


        <div className='classes-outer-container'>

          <div class="triangle"></div>
          <div className='classes-container'>
            <div className='class-k'>Kingdom:
              <div className='class-2 '> Plantae </div> </div>
            <div className='class-p'>Phylum:
              <div className='class-2 '> {plantData.plant.speciesGlobal.phylum} </div> </div>
            <div className='class-c'>Class:
              <div className='class-2 '>{plantData.plant.speciesGlobal.taxclass}</div></div>
            <div className='class-o'>Order:
              <div className='class-2 '>{plantData.plant.speciesGlobal.taxorder}</div></div>
            <div className='class-f'>Family:
              <div className='class-2 '>{plantData.plant.speciesGlobal.family}</div></div>
            <div className='class-s'> Genus:
              <div className='class-2 '>{plantData.plant.speciesGlobal.genus}</div></div>
          </div>

        </div>


      </div>

    </div>
  )
}

export default Classification