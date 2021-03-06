import React from 'react';
import { Sidenav, UserInformation, StatInformation, CreateGame, JoinGame } from '../../components'
import { getAuthInstance } from "../../actions"
import { Lobby } from '../'

const User = () => {
    // User Information
    const [auth, setAuth] = React.useState(false);
    const [username, setUsername] = React.useState(""); 
    const [email, setEmail] = React.useState(""); 
    // Stats Data
    const [threeDartAvg, setThreeDartAvg] = React.useState(""); 
    const [oneDartAvg, setOneDartAvg] = React.useState(""); 
    const [wins, setWins] = React.useState(""); 
    const [loses, setLoses] = React.useState(""); 
    const [totalGames, setTotalGames] = React.useState(""); 
    const [highestFinish, setHighestFinish] = React.useState(""); 
    const [doublesHit, setDoublesHit] = React.useState(""); 
    const [hit180, setHit180] = React.useState(""); 
    const [hit160, setHit160] = React.useState(""); 
    const [hit140, setHit140] = React.useState(""); 
    const [hit120, setHit120] = React.useState(""); 
    const [hit100, setHit100] = React.useState(""); 
    const [hit80, setHit80] = React.useState(""); 
    const [hit60, setHit60] = React.useState(""); 
    const [hit0, setHit0] = React.useState(""); 
    // Modals
    const [showCreateGame, setShowCreateGame] = React.useState(false);
    const [showJoinGame, setShowJoinGame] = React.useState(false);
    const [showLobby, setShowLobby] = React.useState(false);
    async function getStatsInformation() {
        try {
            const response = await getAuthInstance.get('/stats/user/')
            setThreeDartAvg(response.data.three_dart_avg);
            setOneDartAvg(response.data.one_dart_avg);
            setWins(response.data.wins);
            setLoses(response.data.loses);
            setTotalGames(response.data.total_games);
            setHighestFinish(response.data.highest_finish);
            setDoublesHit(response.data.doubles_hit);
            setHit180(response.data.hit_180);
            setHit160(response.data.hit_160_179);
            setHit140(response.data.hit_140_159);
            setHit120(response.data.hit_120_139);
            setHit100(response.data.hit_100_119);
            setHit80(response.data.hit_80_99);
            setHit60(response.data.hit_60_79);
            setHit0(response.data.hit_0_59);
        } catch (error) {
            throw error;
        }
    }

    React.useEffect(() => {
        async function getUserInformation() {
            try {
                const response = await getAuthInstance.get('/users/')
                localStorage.setItem('username', response.data.username)
                setUsername(response.data.username);
                setEmail(response.data.email);
                setAuth(true);
                getStatsInformation()
            } catch (error) {
                setAuth(false);
                throw error;
            }
        }
        getUserInformation()
    }, [])

    return (
        <div id="user-page">
            { auth ? 
            <div className="user-page">
                <div id="createGameModal" className={showCreateGame ? "d-flex justify-content-center align-items-center" : ""} style={showCreateGame ? {display: "block"} : {display: "none"}}>
                    <CreateGame/>
                </div>
                <div id="createGameModal" className={showJoinGame ? "d-flex justify-content-center align-items-center" : ""} style={showJoinGame ? {display: "block"} : {display: "none"}}>
                    <JoinGame/>
                </div>
                <div className="sidenav-layout">
                    <Sidenav showCreateGame={showCreateGame} setShowCreateGame={setShowCreateGame} showJoinGame={showJoinGame} setShowJoinGame={setShowJoinGame} username={username} setShowLobby={setShowLobby} showLobby={showLobby} />
                </div>
                <div className="main-content">
                    <div id="lobbyScreen" style={showLobby ? {display: "block"} : {display: "none"}} >
                        <Lobby />
                    </div>
                    <div style={!showLobby ? {display: "block"} : {display: "none"}}>
                        <UserInformation username={username} email={email} />
                        <StatInformation
                            threeDartAvg={threeDartAvg}
                            oneDartAvg={oneDartAvg}
                            wins={wins}
                            loses={loses}
                            totalGames={totalGames}
                            highestFinish={highestFinish}
                            doublesHit={doublesHit}
                            hit180={hit180}
                            hit160={hit160}
                            hit140={hit140}
                            hit120={hit120}
                            hit100={hit100}
                            hit80={hit80}
                            hit60={hit60}
                            hit0={hit0}
                        />
                    </div>
                </div>
            </div>
            :
            <div>
                YOU ARE NOT AUTHORISED.
                LOGIN!
            </div>
            }  

        </div>
    )
}

export default User;