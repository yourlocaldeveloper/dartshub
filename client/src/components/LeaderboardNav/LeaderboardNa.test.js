import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'
import LeaderboardNav from './index';

describe('LeaderboardNav', () => {

    // beforeEach(() => {
    //     render(
    //         <BrowserRouter>
    //             <LeaderboardNav />
    //         </BrowserRouter>
    //     )
    // })
    test('it renders a Nav bar', () => {
        render(<LeaderboardNav />)
        const Leaderboardnav = screen.queryByRole('navigation');
        expect(Leaderboardnav).toBeInTheDocument();
    })
})