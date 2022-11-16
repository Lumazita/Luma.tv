import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/Menu";
import { StyledTimeline } from "../src/components/TimeLine";
import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://hczcpjqpjkpxrcmvadwt.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjemNwanFwamtweHJjbXZhZHd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzNjU2NTAsImV4cCI6MTk4Mzk0MTY1MH0.7B9YiW5huFkBG0MaFiBjjr87tjNo1aPDZTvp3QVzalw";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);


function HomePage() {
  const mensagem = "Bem vindo! :3";
  const estiloDaHomePage = {};
  const [valorDoFiltro, setvalorDoFiltro] = React.useState("");
  const [playlists, setPlaylists] = React.useState({}); //config.playlist

  React.useEffect(() => {
    console.log("useEffect");
    
    supabase.from("video")
    .select("*")
    .then((dados) => {
        console.log(dados.data);
        // Fomra imutavel
        const novasPlaylists = {...playlists};
        dados.data.forEach((video) => {
          if(!novasPlaylists[video.playlist]) {
              novasPlaylists[video.playlist] = [];
          }
          novasPlaylists[video.playlist].push(video);
        })
        setPlaylists(novasPlaylists)
    });

  }, []);

  console.log("Playlists Pronto", playlists);

  return (
    <>
      <div style={estiloDaHomePage}>
        <Menu valorDoFiltro={valorDoFiltro} setvalorDoFiltro={setvalorDoFiltro} />
        <Header />
        <TimeLine searchValue={valorDoFiltro} playlists={playlists} />
      </div>
    </>
  );
}

export default HomePage;

const StyledHeader = styled.div`
background-color: ${({theme}) => theme.backgroundLevel1 };
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info {
    display: flex;
    align-items: center;
  }
  .banner {
    width: 100%;
    height: 50vh;
    border-radius: 0%;
  }
`;
function Header() {
  return (
    <StyledHeader>
      <img
        className="banner"
        src="https://cdn.discordapp.com/attachments/979458546246770801/1039677126548410480/Lulumazita_1.png"
      />
      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          {config.name}
          {config.job}
        </div>
      </section>
    </StyledHeader>
  );
}

function TimeLine({searchValue, ...props}) {
  const playlistNames = Object.keys(props.playlists);
  // statement
  // retorno por expressãi

  return (
    <StyledTimeline>
      {playlistNames.map((playlistNames) => {
        const videos = props.playlists[playlistNames];
        return (
          <section key={playlistNames}>
            <h2>{playlistNames}</h2>
            <div>
              {videos.filter((video) => {
                const titleNormalized = video.title.toLowerCase();
                const searchValueNormalized = searchValue.toLowerCase();
                return titleNormalized.includes(searchValueNormalized)
              }).map((video) => {
                return (
                  <a key={video.url} href={video.url}>
                    <img src={video.thumb} />
                    <span>{video.title}</span>
                  </a>
                );
              })}
            </div>
          </section>
        );
      })}
    </StyledTimeline>
  );
}
