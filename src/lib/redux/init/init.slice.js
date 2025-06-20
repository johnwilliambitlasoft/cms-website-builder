import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  pages: [
    {
      id: 'home_page',
      title: 'Home page',
      description: 'The homepage provides a seamless search experience, allowing users to find and book bus tickets effortlessly.',
      component: '<div class="home-page">Welcome to the Home Page</div>',
      styles: '.home-page { color: blue; }',
      scripts: 'console.log("Welcome to the Bus Booking System")',
    },
    {
      id: 'search_results_page',
      title: 'Search Results Page',
      description: 'The search results page displays available bus options based on user queries, facilitating easy selection and booking.',
      component: '<div id="comp2">Search Results</div>',
      scripts: 'console.log("Displaying search results")',
      styles: '#comp2 { color: blue }',
    },
    {
      id: 'bookings_page',
      title: 'Bookings Page',
      description: 'The bookings page allows users to view and manage their bus reservations, ensuring a smooth travel experience.',
      component: '<div id="comp3">Your Bookings</div>',
      scripts: 'console.log("Managing bookings")',
      styles: '#comp3 { color: green }',
    },
    {
      id: 'payments_page',
      title: 'Payments Page',
      description: 'The payments page provides a secure platform for users to complete their bus ticket purchases.',
      component: '<div id="comp4">Payment Gateway</div>',
      scripts: 'console.log("Processing payment")',
      styles: '#comp4 { color: purple }',
    },
    {
      id: 'about_us',
      title: 'About Us',
      description: 'The About Us page offers insights into the company\'s mission, values, and history, building trust with users.',
      component: '<div id="comp5">About Our Company</div>',
      scripts: 'console.log("About Us section")',
      styles: '#comp5 { color: orange }',
    },
    {
      id: 'gallery',
      title: 'Gallery',
      description: 'The gallery showcases images of buses, destinations, and travel experiences, enhancing user engagement.',
      component: '<div id="comp6">Gallery of Our Buses</div>',
      scripts: 'console.log("Displaying gallery")',
      styles: '#comp6 { color: pink }',
    },
    {
      id: 'track_my_bus',
      title: 'Track My Bus',
      description: 'The Track My Bus feature allows users to monitor the real-time location of their booked buses, ensuring timely updates.',
      component: '<div id="comp7">Track Your Bus</div>',
      scripts: 'console.log("Tracking bus location")',
      styles: '#comp7 { color: teal }',
    },
    {
      id: 'manage_booking',
      title: 'Manage Booking',
      description: 'The Manage Booking page enables users to modify or cancel their bus reservations, providing flexibility and convenience.',
      component: '<div id="comp8">Manage Your Booking</div>',
      scripts: 'console.log("Managing booking details")',
      styles: '#comp8 { color: brown }',

    },
    {
      id: 'contact_us',
      title: 'Contact Us',
      description: 'The Contact Us page provides users with various ways to reach customer support, enhancing user satisfaction.',
      component: '<div id="comp9">Get in Touch</div>',
      scripts: 'console.log("Contacting support")',
      styles: '#comp9 { color: gray }',
    },
  ],
  currentPage: 'home_page',
  currentWidget: [{
    id: 'header_navigation',
    title: 'Header Navigation',
    data: {}
  },
  {
    id: 'banner_&_search_widget',
    title: 'Banner & Search Widget',
    data: {}
  }
  ],
}

const initSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      debugger;
      state.currentPage = action.payload;
    },
    setCurrentWidget: (state, action) => {
      state.currentWidget = action.payload;
    }
  },
  extraReducers: (builder) => {
  },
});

export const {
  setCurrentPage,
  setCurrentWidget
} = initSlice.actions;

export default initSlice.reducer;

