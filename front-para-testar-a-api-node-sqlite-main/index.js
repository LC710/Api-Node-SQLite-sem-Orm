const URLBASE = "http://127.0.0.1:3000";

let getAllRecords = () => {
  fetch(URLBASE + "/pessoas")
    .then((res) => res.json())
    .then((res) => {
      document.getElementById("listAllRecords").innerHTML = "";
      res.forEach((record) => {
        let line = `<li style="list-style-type: none;">
                      <span>ID: ${record.id}</span> |
                      <span>NOME: ${record.nome}</span> |
                      <span>IDADE: ${record.idade}</span> |
                      <button onclick="deleteRecord(${record.id})" style="background-color: red ;" >Deletar</button></button>
                    </li>`;
        console.log(record);
        document.getElementById("listAllRecords").innerHTML += line;
      });
    });
};

let getById = () => {
  let id = document.getElementById("idRecord").value;
  fetch(URLBASE + `/pessoa?id=${id}`)
    .then((res) => res.json())
    .then((res) => {
      if (!res) return;

      document.getElementById("listById").innerHTML = `<li>
                <span>${res.id}</span>
                <span>${res.nome}</span>
                <span>${res.idade}</span>
            </li>`;

      console.log(res);
    })
    .catch(() => {
      document.getElementById("listById").innerHTML = "";
      alert("Não existe registro com esse id.");
    });
};

let postRecord = () => {
  let name = document.getElementById("nameRecord").value;
  let age = document.getElementById("ageRecord").value;

  fetch(URLBASE + `/pessoa`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nome: name,
      idade: age,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res) return;

      document.getElementById("listByPost").innerHTML = `<li>
                <span>statusCode: ${res.statusCode}</span>
            </li>`;

      console.log(res);
      getAllRecords();
    })
    .catch(() => {
      document.getElementById("listById").innerHTML = "";
      alert("Não existe registro com esse id.");
    });
  document.getElementById("nameRecord").value = "";
  document.getElementById("ageRecord").value = "";
};

let getRecordToEdit = () => {
  let id = document.getElementById("idRecordToEdit").value;
  fetch(URLBASE + `/pessoa?id=${id}`)
    .then((res) => res.json())
    .then((res) => {
      if (!res) return;

      document.getElementById("nameRecordEdit").value = res.nome;
      document.getElementById("ageRecordEdit").value = res.idade;

      console.log(res);
    })
    .catch(() => {
      document.getElementById("idRecordToEdit").innerHTML = "";
      alert("Não existe registro com esse id.");
    });
};

let putRecord = () => {
  let id = document.getElementById("idRecordToEdit").value;
  let name = document.getElementById("nameRecordEdit").value;
  let age = document.getElementById("ageRecordEdit").value;

  fetch(URLBASE + `/pessoa`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id,
      nome: name,
      idade: age,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res) return;

      document.getElementById("listByPost").innerHTML = `<li>
                <span>statusCode: ${res.statusCode}</span>
            </li>`;

      console.log(res);
      getAllRecords();
    })
    .catch(() => {
      alert("Não exixte registro com esse id.");
    });

  document.getElementById("idRecordToEdit").value = "";
  document.getElementById("nameRecordEdit").value = "";
  document.getElementById("ageRecordEdit").value = "";
};

let deleteRecord = (id) => {

  fetch(URLBASE + `/pessoa`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res) return;

      getAllRecords();
      console.log(res);
    })
    .catch(() => {
      alert("Não existe registro com esse id.");
    });
  document.getElementById("idRecordToDelete").value = "";
};

getAllRecords();
