import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PropertyForm from './Components/property/PropertyForm';
import UserComponent from './UserComponent';
import ImageUploadmore from './Components/property/ImageUploadmore';
import PropertyCard2 from './Components/property/PropertyCard2';
import ViewProperty from './Components/property/ViewProperty';
import PropertyImage from './Components/property/PropertyImage';
import PostAvailableDate from './Components/property/PostAvailableDate';
import PropertiesList from './Components/property/PropertiesList';
import PropertiesListByType from './Components/property/PropertiesListByType';
import { PropertyProvider } from './Components/property/PropertyContext';
import {UserProvider} from './Components/property/UserContext'
import Landingpage from './Components/Landingpage'
import AgentList from './Components/Agent/AgentList';
import NewsList from './Components/Admin/NewsList';
import MortgageCalculator from './MortgageCalculator';
import AdminDashBoard from './Components/Admin/AdminDashBoard';
import AgentDashboard from './Components/Agent/AgentDashboard';
import AgencyDashBoard from './Components/Agency/AgencyDashBoard'
import Editproperty from './Components/property/Editproperty'
import NewsFormEdit from './Components/Admin/NewsFormEdit';
import UserShortlist from './Components/property/UserShortlist';
import UsersBooking from './Components/property/UsersBooking';
import SignUp from './SignUp';
import MyProperty from './Components/property/MyProperty';
import ImageManager from './Components/property/ImageManager';


const App = () => {
  const propertyIdToShow = 1;

  return (
    <PropertyProvider>
      <UserProvider>

     
      <Router>
        <Routes>
          
          <Route path="/" element={< Landingpage />} />
          <Route path="/MyProperty" element={< MyProperty />} />
          <Route path="/Find-Agent" element={< AgentList />} />
          <Route path="/PropertyForm" element={<PropertyForm />} />
          <Route path="/PropertyImage" element={<PropertyImage />} />
          <Route path="/PropertiesList/:type?" element={<PropertiesList />} />
          <Route path="/News/:type?" element={<NewsList />} />
          <Route path="/PropertiesListByType/:type" element={<PropertiesListByType />} />
          <Route path="/login" element={<UserComponent />} />
          <Route path="/UploadImage/:propertyID" element={<ImageUploadmore />} />
          <Route path="/PostAvailableDates/:propertyId" element={<PostAvailableDate />} />
          <Route path="/property/:propertyId" element={<ViewProperty />} />
          <Route path="/Editproperty/:propertyId" element={<Editproperty />} />
          <Route path="/ImageManager/:propertyId" element={<ImageManager />} />
          <Route path="/EditNews/:NewsId" element={<NewsFormEdit />} />
          <Route path="/PropertyList" element={<PropertyCard2 propertyId={propertyIdToShow} />} />
          <Route path="/PropertyList" element={<PropertyCard2 propertyId={propertyIdToShow} />} />
          <Route path="/AdminDashBoard" element={<AdminDashBoard />} />
          <Route path="/AgentDashboard" element={<AgentDashboard />} />
          <Route path="/AgencyDashBoard" element={<AgencyDashBoard />} />
          <Route path="/Shortlist" element={< UserShortlist />} />
          <Route path="/MortgageCalculator" element={< MortgageCalculator />} />
          <Route path="/Bookings" element={< UsersBooking />} />
          <Route path="/SignUp" element={< SignUp />} />

        </Routes>
      </Router>
      </UserProvider>
    </PropertyProvider>
  );
};

export default App;
