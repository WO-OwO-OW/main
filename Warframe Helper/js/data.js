const data = JSON.parse(localStorage.getItem("selectedItem"));

    const content = document.getElementById("content");

    if (!data) {
      content.innerHTML = "<p>Ничего не выбрано.</p>";
    } else {
      switch (data.category) {
        case "resource":
          content.innerHTML = `
            <h1>${data.name}</h1>
            <p>Это <strong>ресурс</strong>. Здесь будет описание, где его фармить и для чего он нужен.</p>
          `;
          break;

        case "prime":
          content.innerHTML = `
            <h1>${data.name}</h1>
            <p>Это <strong>Prime-предмет</strong>. Здесь будет информация о реликвиях, чертежах и т.д.</p>
          `;
          break;

        case "mission":
          content.innerHTML = `
            <h1>${data.name}</h1>
            <p>Это <strong>миссия</strong>. Здесь будет описание, враги, награды и советы.</p>
          `;
          break;

        case "relic":
          content.innerHTML = `
            <h1>${data.name}</h1>
            <p>Это <strong>реликвия</strong>. Здесь будет список предметов, которые можно выбить, и миссии для фарма.</p>
          `;
          break;

        default:
          content.innerHTML = `
            <h1>${data.name}</h1>
            <p>Категория: ${data.category}</p>
            <p>Нет данных для отображения.</p>
          `;
          break;
      }
    }