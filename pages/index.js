import config from "../config.json"
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/TimeLine";

function HomePage () {
    const mensagem = "Bem vindo! :3"
    const estiloDaHomePage = { backgroundColor: "#FFC0CB"};
    console.log(config.playlists);

    return (
    <>
        <CSSReset />
    <div style={estiloDaHomePage} >
        <Menu />
        <Header />
        <TimeLine playlists={config.playlists} />
    </div>
    </>
    );
}

export default HomePage



const StyledHeader = styled.div`
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
        display: flex;
        align-items: center;
    }
`;
function Header() {
    return (
        <StyledHeader>
            <img src="Baner" />
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                 {config.name}
                    {config.job}
                </div>
            </section>
        </StyledHeader>
    )

}

function TimeLine(props) {
    console.log("Dentro do componente", props.playlists);
    const playlistNames = Object.keys(props.playlists)
    // statement
    // retorno por expressãi

    return (
        <StyledTimeline>
            {playlistNames.map((playlistNames) => {
            const videos = props.playlists[playlistNames];
            return (
                <section>
                    <h2>{playlistNames}</h2>
                    <div>
                        {
                            videos.map((video) => {
                                return (
                                    <a href={video.url}>
                                    <img src={video.thumb} />
                                    <span>
                                        {video.title}
                                    </span>
                                    </a>
                                        )
                            
                                })
                        }
                    </div>
                </section>
            )
            })}
        </StyledTimeline>
    )

}