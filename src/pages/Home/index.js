/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';
import PageDefault from '../../components/PageDefault';
import categoriasRepository from '../../repositories/categorias';

function Home() {
  const [dadosIniciais, setDadosIniciais] = useState([]);
  const [indexInit, setIndexInit] = useState(0);

  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
  }

  useEffect(() => {
    categoriasRepository.getAllWithVideos()
      .then((categoriasComVideos) => {
        setIndexInit(getRandomArbitrary(0, categoriasComVideos.length - 1));
        setDadosIniciais(categoriasComVideos);
      }).catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <PageDefault paddingAll={0}>
      {dadosIniciais.length === 0 && (<div>Loading...</div>)}
      {dadosIniciais.length > 0 && (
        <BannerMain
          videoTitle={dadosIniciais[indexInit].videos[0].titulo}
          url={dadosIniciais[indexInit].videos[0].url}
          videoDescription={dadosIniciais[indexInit].videos[0].description}
        />
      )}

      {dadosIniciais.map((categoria, indice) => {
        if (indice === 0) {
          return (
            <div key={categoria.id}>
              {/* <BannerMain
                videoTitle={categoria.videos[0].titulo}
                url={categoria.videos[0].url}
                videoDescription={categoria.videos[0].description}
              /> */}
              <Carousel
                ignoreFirstVideo
                category={categoria}
              />
            </div>
          );
        }

        return (
          <Carousel
            key={categoria.id}
            category={categoria}
          />
        );
      })}

    </PageDefault>
  );
}

export default Home;
