import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { useNavigate, Link } from "react-router-dom";

function Cadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [mensagem, setMensagem] = useState("");

  const navigate = useNavigate();

  const handleCadastro = async () => {
    if (!email || !senha || !nome || !sobrenome || !dataNascimento) {
      setMensagem("Preencha todos os campos.");
      return;
    }

    try {
      // cria usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );
      const user = userCredential.user;

      // salva dados adicionais no Firestore
      await setDoc(doc(db, "usuarios", user.uid), {
        uid: user.uid,
        email: email,
        nome: nome,
        sobrenome: sobrenome,
        dataNascimento: dataNascimento,
      });

      setMensagem("Cadastro realizado com sucesso!");
      // redireciona para o login ou direto para página principal
      navigate("/");
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao cadastrar: " + error.message);
    }
  };

  return (
    <div className="container">
      <h2>Cadastro</h2>

      <input
        type="text"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <br />

      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <br />

      <input
        type="text"
        placeholder="Sobrenome"
        value={sobrenome}
        onChange={(e) => setSobrenome(e.target.value)}
      />
      <br />

      <input
        type="date"
        placeholder="Data de nascimento"
        value={dataNascimento}
        onChange={(e) => setDataNascimento(e.target.value)}
      />
      <br />

      <button onClick={handleCadastro}>Cadastrar</button>

      <p>{mensagem}</p>

      <p>
        Já tem conta? <Link to="/">Voltar ao Login</Link>
      </p>
    </div>
  );
}

export default Cadastro;
