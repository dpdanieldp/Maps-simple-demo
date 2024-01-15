// Import necessary dependencies for testing
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import PopupTile from '../../src/components/PopupTile/PopupTile'

const onSaveMock = jest.fn();
const onDeleteMock = jest.fn();

const mockMapPoint = {
    _id: '1',
    type: 'Feature',
    geometry: {
        type: 'Point',
        coordinates: [2.3512454590045366, 48.852630265737005],
    },
    properties: {
        name: 'My Point 1',
        description: 'Test description 1',
    },
};


describe('PopupTile', () => {
    it('renders with the provided mapPoint data', () => {
        render(
            <PopupTile
                mapPoint={mockMapPoint}
                onDeleteButtonClick={onDeleteMock}
                onSaveButtonClick={onSaveMock}
            />
        );

        // Use Testing Library queries to check if elements are rendered
        expect(screen.getByDisplayValue('My Point 1')).toBeInTheDocument();
        expect(screen.getByText('Test description 1')).toBeInTheDocument();
    });

    it('updates editedTitle and editedText when user inputs data', () => {
        render(
            <PopupTile
                mapPoint={mockMapPoint}
                onDeleteButtonClick={onDeleteMock}
                onSaveButtonClick={onSaveMock}
            />
        );

        fireEvent.change(screen.getByLabelText('Name'), {
            target: { value: 'New Title' },
        });
        fireEvent.change(screen.getByLabelText('Description'), {
            target: { value: 'New Description' },
        });

        // Assert that the state is updated
        expect(screen.getByLabelText('Name')).toHaveValue(
            'New Title'
        );
        expect(screen.getByLabelText('Description')).toHaveValue(
            'New Description'
        );
    });

    it('calls onSaveButtonClick with modified mapPoint when Save button is clicked', () => {
        render(
            <PopupTile
                mapPoint={mockMapPoint}
                onDeleteButtonClick={onDeleteMock}
                onSaveButtonClick={onSaveMock}
            />
        );

        // Simulate user input and click on the Save button
        fireEvent.change(screen.getByLabelText('Name'), {
            target: { value: 'New Title' },
        });
        fireEvent.change(screen.getByLabelText('Description'), {
            target: { value: 'New Description' },
        });
        fireEvent.click(screen.getByLabelText('Save'));

        // Assert that onSaveButtonClick is called with the modified mapPoint
        expect(onSaveMock).toHaveBeenCalledWith({
            ...mockMapPoint,
            properties: {
                name: 'New Title',
                description: 'New Description',
            },
        });
    });

    it('calls onDeleteButtonClick when Delete button is clicked', () => {
        render(
            <PopupTile
                mapPoint={mockMapPoint}
                onDeleteButtonClick={onDeleteMock}
                onSaveButtonClick={onSaveMock}
            />
        );

        // Simulate user click on the Delete button
        fireEvent.click(screen.getByLabelText('Delete'));
        fireEvent.click(screen.getByLabelText('Confirm-delete'));

        // Assert that onDeleteButtonClick is called with the correct mapPoint ID
        expect(onDeleteMock).toHaveBeenCalledWith('1');
    });
});
