window.addEventListener('DOMContentLoaded', () => {
    // Obtener partidos
    fetch('api.php?section=partidos')
      .then(response => response.json())
      .then(data => {
        const partidosBody = document.getElementById('partidos-body');
  
        data.forEach(partido => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${partido.fecha}</td>
            <td>${partido.equipo_local}</td>
            <td>${partido.equipo_visitante}</td>
            <td>${partido.resultado_local} - ${partido.resultado_visitante}</td>
          `;
  
          partidosBody.appendChild(row);
        });
      })
      .catch(error => console.error(error));
  
    // Obtener partidos en directo
    fetch('api.php?section=partidos-en-directo')
      .then(response => response.json())
      .then(data => {
        const partidosEnDirectoContainer = document.getElementById('partidos-en-directo-container');
  
        data.forEach(partido => {
          const partidoDiv = document.createElement('div');
          partidoDiv.classList.add('partido-en-directo');
          partidoDiv.innerHTML = `
            <h3>${partido.equipo_local} vs ${partido.equipo_visitante}</h3>
            <p>En directo</p>
          `;
  
          partidosEnDirectoContainer.appendChild(partidoDiv);
        });
      })
      .catch(error => console.error(error));
  
    // Obtener noticias
    fetch('api.php?section=noticias')
      .then(response => response.json())
      .then(data => {
        const noticiasContainer = document.getElementById('noticias-container');
  
        data.forEach(noticia => {
          const noticiaDiv = document.createElement('div');
          noticiaDiv.classList.add('noticia');
          noticiaDiv.innerHTML = `
            <h3>${noticia.titulo}</h3>
            <p>${noticia.contenido}</p>
            <p class="fecha">${noticia.fecha}</p>
          `;
  
          noticiasContainer.appendChild(noticiaDiv);
        });
      })
      .catch(error => console.error(error));
  
    // Obtener opiniones
    fetch('api.php?section=opiniones')
      .then(response => response.json())
      .then(data => {
        const opinionesContainer = document.getElementById('opiniones-container');
  
        data.forEach(opinion => {
          const opinionDiv = document.createElement('div');
          opinionDiv.classList.add('opinion');
          opinionDiv.innerHTML = `
            <h4>${opinion.nombre}</h4>
            <p>${opinion.comentario}</p>
            <p class="fecha">${opinion.fecha}</p>
          `;
  
          opinionesContainer.appendChild(opinionDiv);
        });
      })
      .catch(error => console.error(error));
  
    // Enviar opinión
    const opinionesForm = document.getElementById('opiniones-form');
    opinionesForm.addEventListener('submit', event => {
      event.preventDefault();
  
      const nombreInput = document.getElementById('nombre');
      const comentarioInput = document.getElementById('comentario');
  
      const formData = new FormData();
      formData.append('nombre', nombreInput.value);
      formData.append('comentario', comentarioInput.value);
  
      fetch('api.php?section=opiniones', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          const opinionesContainer = document.getElementById('opiniones-container');
          opinionesContainer.innerHTML = '';
  
          data.forEach(opinion => {
            const opinionDiv = document.createElement('div');
            opinionDiv.classList.add('opinion');
            opinionDiv.innerHTML = `
              <h4>${opinion.nombre}</h4>
              <p>${opinion.comentario}</p>
              <p class="fecha">${opinion.fecha}</p>
            `;
  
            opinionesContainer.appendChild(opinionDiv);
          });
  
          nombreInput.value = '';
          comentarioInput.value = '';
        })
        .catch(error => console.error(error));
    });
  });