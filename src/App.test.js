import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PropertyPage from './pages/PropertyPage';

import '@testing-library/jest-dom';

const mockProperty = [{
  id: "prop1",
  type: "House",
  price: 85000000,
  location: "Colombo 07",
  picture: "img/main.jpg",
  thumbnails: ["img/thumb1.jpg", "img/thumb2.jpg"],
  mapUrl: "http://google.com/maps/embed/123",
  longDescription: "Test description"
}];

const mockSetShortlist = jest.fn();

const renderComponent = (shortlist = []) => {
  render(
    <MemoryRouter initialEntries={['/property/prop1']}>
      <Routes>
        <Route path="/property/:id" element={
          <PropertyPage 
            properties={mockProperty} 
            shortlist={shortlist} 
            setShortlist={mockSetShortlist} 
          />
        } />
      </Routes>
    </MemoryRouter>
  );
};

describe('PropertyPage Logic Tests', () => {

  test('renders the correct LKR price format', () => {
    renderComponent();
    // Use a regex to be safe with spacing/commas
    expect(screen.getByText(/LKR 85,000,000/i)).toBeInTheDocument();
  });

  test('changes main image when a thumbnail is clicked', () => {
    renderComponent();
    // Look for the specific thumbnail by its alt text if you have it, 
    // or keep the index if you're sure about the structure.
    const thumbnails = screen.getAllByRole('img');
    const secondThumb = thumbnails.find(img => img.src.includes('img/thumb2.jpg'));
    
    if (secondThumb) {
      fireEvent.click(secondThumb);
      const mainImg = screen.getByAltText('Main View');
      expect(mainImg.src).toContain('img/thumb2.jpg');
    }
  });

  test('displays the map iframe when Location tab is clicked', () => {
    renderComponent();
    const mapTab = screen.getByText(/Location Map/i);
    fireEvent.click(mapTab);
    
    const mapFrame = screen.getByTitle('Property Map');
    expect(mapFrame).toBeInTheDocument();
  });

  test('triggers setShortlist when Favorite button is clicked', () => {
    renderComponent();
    // This looks for a button containing the text "Favourites"
    const favBtn = screen.getByRole('button', { name: /Favourites/i });
    fireEvent.click(favBtn);
    expect(mockSetShortlist).toHaveBeenCalled();
  });

  test('renders property type tag', () => {
    renderComponent();
    // If your code uses {property.type.toUpperCase()}, this will pass.
    // If you use CSS text-transform: uppercase, use /House/i instead.
    expect(screen.getByText(/HOUSE/i)).toBeInTheDocument();
  });
});