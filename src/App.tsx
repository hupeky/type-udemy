import React, { Fragment } from "react";
import { Store, IAction } from "./Store/Store";

import s from "./App.module.css";

export interface IEpisode {
  airdate: string;
  airstamp: string;
  airtime: string;
  id: number;
  image: {
    medium: string;
    original: string;
  };
  name: string;
  number: number;
  runtime: number;
  season: number;
  summary: string;
  url: string;
}

export default function App(): JSX.Element {
  const { state, dispatch } = React.useContext(Store);

  React.useEffect(() => {
    (async () => {
      const URL =
        "https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes";
      const data = await fetch(URL);
      const dataJSON = await data.json();
      console.log(dataJSON);
      return dispatch({
        type: "FETCH_DATA",
        payload: dataJSON._embedded.episodes
      });
    })();
  }, []);

  const toggleFavAction = (favedEpisode: IEpisode): IAction => {
    const foundInFav = state.favourites.includes(favedEpisode);
    if (foundInFav) {
      return dispatch({
        type: "REM_FAV",
        payload: favedEpisode
      });
    } else {
      return dispatch({
        type: "ADD_FAV",
        payload: favedEpisode
      });
    }
  };

  console.log(state);
  return (
    <Fragment>
      <header className={s.header}>
        <h1>Rick and Morty</h1>
        <p>Pick your favourit episode!!</p>
      </header>
      <section className={s.episodeLayout}>
        {state.episodes.map((episode: IEpisode, i: number) => {
          try {
            if (episode.image.medium === null) {
              throw new Error();
            }
            return (
              <React.Fragment key={episode.id}>
                <section className={s.episodeBox}>
                  <img
                    src={episode.image.medium}
                    alt={`Rick and Mort ${episode.name}`}
                  />
                  <section>
                    <div>{`${episode.name} s:${episode.season}e:${
                      episode.number
                    }`}</div>
                    <button
                      type="button"
                      onClick={() => toggleFavAction(episode)}
                    >
                      Fave
                    </button>
                  </section>
                </section>
              </React.Fragment>
            );
          } catch (e) {
            return (
              <p key={episode.id}>{`error getting image ${i}: ` + e.name}</p>
            );
          }
        })}
      </section>
    </Fragment>
  );
}

// https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embe.ud=episodes
