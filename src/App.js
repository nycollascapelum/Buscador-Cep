import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import Styles from "./Styles.module.css";
import api from "./services/api";
function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  function verification(response){
    if (Object.keys(response.data).length === 1) {
      alert("Verifique o campo preenchido e tente novamente!");
  }
}

  async function handleSearch() {

    if (input === "") {
      alert("Preencha algum CEP!")
      return;
    }
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
      verification(response);
    }
    catch {
      alert("Ops, erro ao buscar CEP");
      setInput("");
    }
  }
  return (
    <div className={Styles.container}>
      <h1 className={Styles.title}>Buscador CEP</h1>

      <div className={Styles.containerInput}>
        <input
          type="text"
          placeholder="Digite seu cep..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className={Styles.buttonSearch} onClick={handleSearch}>
          <FiSearch size={25} color="FFF" />
        </button>

      </div>
      {Object.keys(cep).length > 1 && (
        <main className={Styles.main}>
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>{cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}
    </div>
  );
}

export default App;
